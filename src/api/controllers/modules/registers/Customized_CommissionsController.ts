import BaseRegistersController from "./BaseRegistersController.js";
import Customized_Commissions from "../../../database/models/Customized_Commissions.js";
import { NextFunction, Request, Response } from "express";
import Utils from "../../utils/Utils.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import Customized_Commission_Entities from "../../../database/models/Customized_Commission_Entities.js";
import Customized_Commission_EntitiesController from "./Customized_Commission_EntitiesController.js";
import DataSwap from "../../data/DataSwap.js";
import Customized_Commission_Entity_Items from "../../../database/models/Customized_Commission_Entity_Items.js";
import _ from "lodash";
import Relationships from "../../../database/models/Relationships.js";
import Relationship_Types from "../../../database/models/Relationship_Types.js";
import Entities_Types from "../../../database/models/Entities_Types.js";
import Report_Visions from "../../../database/models/Report_Visions.js";
import Measurement_Units from "../../../database/models/Measurement_Units.js";
import ReportsController from "../reports/ReportsController.js";
import { Sequelize } from "sequelize";
import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";


export default class Customized_CommissionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Customized_Commissions;
    }

    static handleFieldsToSave(queryParams: any) : void {    
        let keys = Object.keys(queryParams);
        if (queryParams?.conditions) {
            if (typeof queryParams.conditions !== 'string') {            
                queryParams.conditions = JSON.stringify(queryParams.conditions);
            } 
        } else if (keys.indexOf('conditions') > -1) {
            queryParams.conditions = null;
        }

        if (!Utils.hasValue(queryParams?.start_at) && keys.indexOf("start_at") > -1) {
            queryParams.start_at = null;
        }

        if (!Utils.hasValue(queryParams?.ent_at) && keys.indexOf("ent_at") > -1) {
            queryParams.ent_at = null;
        }
    }


    static async createItems(params : any) : Promise<void>{
        await Customized_Commission_EntitiesController.createEntitiesFromCustomizedCommission(params);
    }


    static async patchItems(params : any) : Promise<void>{
        await Customized_Commission_EntitiesController.patchEntitiesFromCustomizedCommission(params);
    }


    /**
     * calculate commission values
     * @created 2025-03-10
     * @version 1.0.0
     */
    static async _calculate(params?: any) : Promise<DataSwap> {
        const result = new DataSwap();
        try {
            params = params || {};            
            const queryParams = params.queryParams || params;
            let where = queryParams.where;
            if (Utils.hasValue(where)) {
                where = DatabaseUtils.prepareLogicalQueryParams(where);
                const data : any = await Customized_Commissions.findAll({
                    raw:true,
                    include:[{
                        model:Customized_Commission_Entities,
                        include:[{
                            model: Customized_Commission_Entity_Items
                        }],
                    }],
                    where: where
                });
                if (Utils.hasValue(data)) {

                    const calculatedAt = new Date();
                    const entitiesToUpdate: any = {};
                    for(let i=0; i < data.length; i++) {

                        switch(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.base_value_origin`]?.trim().toLocaleLowerCase()) {
                            case 'manual':
                            break;
                            case 'query':
                            break;
                            case 'customized_report':

                                const visionRelationship = await Relationships.findOne({
                                    raw:true,
                                    where:{
                                        relationship_type_id: Relationship_Types.RELATIONSHIP,
                                        table_1_id: Entities_Types.id,
                                        record_1_id: data[i][`${Customized_Commission_Entities.tableName}.entity_type_id`],
                                        table_2_id: Report_Visions.id
                                    }
                                });
                                if (Utils.hasValue(visionRelationship)) {

                                    let startAt = Utils.firstValid([
                                        data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.start_at`],
                                        data[i][`${Customized_Commission_Entities.tableName}.start_at`],
                                        data[i].start_at
                                    ]);                                                            
                                        let endAt = Utils.firstValid([
                                        data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.end_at`],
                                        data[i][`${Customized_Commission_Entities.tableName}.end_at`],
                                        data[i].end_at
                                    ]);
                                    if (typeof startAt == 'object') {
                                        startAt = startAt.toISOString().substring(0,10);
                                    }
                                    if (typeof endAt == 'object') {
                                        endAt = endAt.toISOString().substring(0,10);
                                    }

                                    let reportParams : any = {
                                        user: params.user,
                                        visions: [visionRelationship.record_2_id],
                                        periods: [[startAt,endAt]],
                                        considerNormalSales: Utils.toBool(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.consider_normal_sales`]),
                                        considerReturns: Utils.toBool(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.consider_returns`]),
                                        considerBonuses: Utils.toBool(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.consider_bonuses`]),
                                        conditions:[{
                                            reportVision:{id:visionRelationship.record_2_id},
                                            operation:{id:'IN'},
                                            selecteds: [data[i][`${Customized_Commission_Entities.tableName}.entity_id`]]
                                        }]
                                    } 

                                    if ([Measurement_Units.DT].indexOf(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.measurement_unit_id`]) > -1) {
                                        reportParams.visions.push(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.report_vision_id`]);                                                                        
                                    } else if ([Measurement_Units.WT,Measurement_Units.VL,Measurement_Units.UN].indexOf(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.measurement_unit_id`]) == -1) {
                                        throw new Error(`not expecter unit ${data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.measurement_unit_id`]}`)                                                                            
                                    }
                                    reportParams.viewAmount = [Measurement_Units.UN,Measurement_Units.DT].indexOf(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.measurement_unit_id`]) > -1;
                                    reportParams.viewWeight = data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.measurement_unit_id`] == Measurement_Units.WT;
                                    reportParams.viewValue = data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.measurement_unit_id`] == Measurement_Units.VL;



                                    if (Utils.hasValue(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.conditions`])) {
                                        const objCondition = JSON.parse(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.conditions`]);
                                        if (objCondition.filter((el:any)=>el.type !== 'default condition').length) {
                                            throw new Error("do implement complex conditions");
                                        }
                                        reportParams.conditions = [...reportParams.conditions, ...objCondition.filter((el:any)=>el.type === 'default condition').map((el:any)=>el.value)];
                                    }
                                    if (Utils.hasValue(data[i][`${Customized_Commission_Entities.tableName}.conditions`])) {
                                        const objCondition = JSON.parse(data[i][`${Customized_Commission_Entities.tableName}.conditions`]);
                                        if (objCondition.filter((el:any)=>el.type !== 'default condition').length) {
                                            throw new Error("do implement complex conditions");
                                        }
                                        reportParams.conditions = [...reportParams.conditions, ...objCondition.filter((el:any)=>el.type === 'default condition').map((el:any)=>el.value)];
                                    }
                                    if (Utils.hasValue(data[i].conditions)) {
                                        const objCondition = JSON.parse(data[i].conditions);
                                        if (objCondition.filter((el:any)=>el.type !== 'default condition').length) {
                                            throw new Error("do implement complex conditions");
                                        }
                                        reportParams.conditions = [...reportParams.conditions, ...objCondition.filter((el:any)=>el.type === 'default condition').map((el:any)=>el.value)];
                                    }

                                    reportParams.joinEqualsConditionsWith = 'and'; 
                                    console.log('reportParams',reportParams);
                                    const resultCustomizedReport = await ReportsController.getCustomizedReportData(reportParams);
                                    if (resultCustomizedReport.success) {
                                        resultCustomizedReport.data = resultCustomizedReport.data[0].DATA || [];
                                        const keys = Object.keys(resultCustomizedReport.data[0]);
                                        const sum : number = resultCustomizedReport.data.reduce((acc?:number,row?: any)=> acc += Utils.toNumber(row[keys[keys.length-1]]||0)||0, 0);
                                        const result = sum * Utils.toNumber(data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.percent1`]) / 100;
                                        console.log(sum,result);
                                        const row = await Customized_Commission_Entity_Items.findOne({
                                            where:{
                                                id:data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.id`]
                                            }
                                        });
                                        row.base_value = sum;
                                        row.base_value = Utils.hasValue(row.min_base_value) 
                                            ? Math.max(Utils.toNumber(row.min_base_value||0)||0,row.base_value) 
                                            : row.base_value;
                                        row.base_value = Utils.hasValue(row.max_base_value) 
                                            ? Math.min(Utils.toNumber(row.max_base_value||0)||0,row.base_value) 
                                            : row.base_value;
                                        row.result_value = result;
                                        row.result_value = Utils.hasValue(row.min_result_value) 
                                            ? Math.max(Utils.toNumber(row.min_result_value||0)||0,row.result_value) 
                                            : row.result_value;
                                        row.result_value = Utils.hasValue(row.max_result_value) 
                                            ? Math.min(Utils.toNumber(row.max_result_value||0)||0,row.result_value) 
                                            : row.result_value;
                                        row.calculated_at = calculatedAt;
                                        await row.save();
                                        entitiesToUpdate[row.customized_commission_entity_id] = entitiesToUpdate[row.customized_commission_entity_id] || {};
                                        entitiesToUpdate[row.customized_commission_entity_id].calculated_at = entitiesToUpdate[row.customized_commission_entity_id].calculated_at || calculatedAt;
                                        entitiesToUpdate[row.customized_commission_entity_id].base_value = entitiesToUpdate[row.customized_commission_entity_id].base_value || 0;
                                        entitiesToUpdate[row.customized_commission_entity_id].result_value = entitiesToUpdate[row.customized_commission_entity_id].result_value || 0;
                                        entitiesToUpdate[row.customized_commission_entity_id].base_value += sum;
                                        entitiesToUpdate[row.customized_commission_entity_id].result_value += result;
                                    } else {
                                        resultCustomizedReport.throw();
                                    }
                                } else {
                                    throw new Error(`entity type ${data[i][`${Customized_Commission_Entities.tableName}.entity_type_id`]} not relationed to report vision`);
                                }                         
                            break;
                            default:
                                throw new Error(`not expected base value origin: ${data[i][`${Customized_Commission_Entities.tableName}.${Customized_Commission_Entity_Items.tableName}.base_value_origin`]}`);

                        }
                    }    
                    
                    if (Utils.hasValue(entitiesToUpdate)) {
                        console.log('xxxxxxx',entitiesToUpdate);
                        for(const k in entitiesToUpdate) {
                            const row = await Customized_Commission_Entities.findOne({
                                where: {
                                    id: k
                                }
                            });
                            if (Utils.hasValue(row)) {
                                for(let field in entitiesToUpdate[k]) {
                                    row[field] = entitiesToUpdate[k][field];
                                    if (field === 'base_value') {
                                        row.base_value = Utils.hasValue(row.min_base_value) 
                                            ? Math.max(Utils.toNumber(row.min_base_value||0)||0,row.base_value) 
                                            : row.base_value;
                                        row.base_value = Utils.hasValue(row.max_base_value) 
                                            ? Math.min(Utils.toNumber(row.max_base_value||0)||0,row.base_value) 
                                            : row.base_value;
                                    } else if (field === 'result_value') {
                                        row.result_value = Utils.hasValue(row.min_result_value) 
                                            ? Math.max(Utils.toNumber(row.min_result_value||0)||0,row.result_value) 
                                            : row.result_value;
                                        row.result_value = Utils.hasValue(row.max_result_value) 
                                            ? Math.min(Utils.toNumber(row.max_result_value||0)||0,row.result_value) 
                                            : row.result_value;
                                    }
                                }
                                if (Utils.hasValue(row.changed())) {
                                    await row.save();
                                }
                            }
                        }
                    }
                    result.success = true;
                } else {
                    throw new Error('no data found');    
                }                
            } else {
                throw new Error('missing data');
            }            
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

    

     /**
     * default RequestHandler method to put registers of table model controller
     * @requesthandler
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            this.handleFieldsToSave(queryParams);
            await DBConnectionManager.getDefaultDBConnection()?.transaction(async transaction=>{
                res.data = await this.getTableClassModel().create(queryParams, {transaction});
                let params : any = {customized_commission:{...queryParams,...res.data.dataValues || res.data}};
                params.transaction = transaction;
                await Customized_CommissionsController.createItems(params);                                
                return true;
            });
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    static async patch(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            this.handleFieldsToSave(queryParams);
            if(Utils.hasValue(queryParams.id)) {
                await DBConnectionManager.getDefaultDBConnection()?.transaction(async transaction=>{

                    if (Utils.hasValue(queryParams.entities_ids_to_exclude)) {

                        await Customized_Commission_Entities.destroy({
                            where: {
                                id: Utils.toArray(queryParams.entities_ids_to_exclude)?.map(Utils.toNumber)
                            },
                            transaction
                        });
                    }

                    queryParams.transaction = transaction;
                    res.data = await this.getTableClassModel().patchData(queryParams);
                    let params : any = {customized_commission:{...queryParams,...res.data.dataValues || res.data}};
                    params.transaction = transaction;
                    await Customized_CommissionsController.patchItems(params);                                
                    return true;
                });
                res.sendResponse(200,true);
            }else{
                throw new Error('missing data')
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


     /**
     * request handler to calculate campaign values
     * @requesthandler
     * @override
     * @created 2025-03-10
     * @version 1.0.0
     */
    static async calculate(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body || {};            
            params.user = req.user;
            res.setDataSwap(await this._calculate(params));
        } catch (e: any) {
            res.setException(e);            
        }
        res.sendResponse();
    }


    /**
     * @requesthandler
     * @override
     * @created 2025-05-16
     * @version 1.0.0
     */
    static async get_with_totals(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const params = req.body || {};            
            const queryParams = params.queryParams || params;
            queryParams.raw = true;
            queryParams.attributes = queryParams.attributes || ['*'];
            queryParams.attributes.push(Sequelize.literal(`(select sum(coalesce(e.result_value,0)) from ${Customized_Commission_Entities.tableName} e where e.customized_commission_id = ${Customized_Commissions.tableName}.id) as result_value`));
            if (Utils.hasValue(queryParams.where)) {
                queryParams.where = DatabaseUtils.prepareLogicalQueryParams(queryParams.where);
            }
            res.data = await Customized_Commissions.findAll(queryParams);
            res.success = true;
        } catch (e: any) {
            res.setException(e);            
        }
        res.sendResponse();
    }

    static {
        this.configureDefaultRequestHandlers([
            this.calculate,
            this.get_with_totals
        ]);
    }
}
