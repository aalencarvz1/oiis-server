import { NextFunction, Request, Response } from "express";
import Campaign_Kpi_Value_Getters from "../../../database/models/Campaign_Kpi_Value_Getters.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { QueryTypes, Sequelize } from "sequelize";
import Campaign_Kpis from "../../../database/models/Campaign_Kpis.js";
import Campaigns from "../../../database/models/Campaigns.js";
import Relationships from "../../../database/models/Relationships.js";
import Entities_Types from "../../../database/models/Entities_Types.js";
import Report_Visions from "../../../database/models/Report_Visions.js";
import Relationship_Types from "../../../database/models/Relationship_Types.js";
import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import ReportsController from "../reports/ReportsController.js";
import Measurement_Units from "../../../database/models/Measurement_Units.js";
import Campaign_Entities_Kpi_Value_Getters_Values from "../../../database/models/Campaign_Entities_Kpi_Value_Getters_Values.js";
import DataSwap from "../../data/DataSwap.js";

export default class Campaign_Kpi_Value_GettersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpi_Value_Getters;
    }


    static handleFieldsToSave(queryParams: any) : void {
        if (queryParams?.conditions && typeof queryParams.conditions != 'string') {
            if (Utils.hasValue(queryParams?.conditions)) {
                queryParams.conditions = JSON.stringify(queryParams.conditions);
            } else {
                queryParams.conditions = null;
            }
        }
        if (queryParams?.campaign_entity_ids && typeof queryParams.campaign_entity_ids != 'string') {
            if (Utils.hasValue(queryParams.campaign_entity_ids)) {
                queryParams.campaign_entity_ids = queryParams.campaign_entity_ids.join(",");
            } else {
                queryParams.campaign_entity_ids = null;
            }                                
        }
    }

    /**
     * create all items of kpi
     * @version 1.0.0
     */
    static async createKpiGettersFromKpi(params : any) : Promise<void>{
        if (Utils.hasValue(params?.kpi?.kpi_value_getters)) {

            //campaign kpi value getters
            for(let k in params?.kpi?.kpi_value_getters	||[]) {
                params.kpi.kpi_value_getters[k].campaign_kpi_id = params.kpi.id;
                this.handleFieldsToSave(params.kpi.kpi_value_getters[k]);                
                params.kpi.kpi_value_getters[k] = {...params.kpi.kpi_value_getters[k], ...(await Campaign_Kpi_Value_Getters.create(params.kpi.kpi_value_getters[k],{transaction: params.transaction})).dataValues};
            }
        }
    }


    /**
     * path all items of kpi
     * @version 1.0.0
     */
    static async pathKpiGettersFromKpi(params : any) : Promise<void>{

        if (Utils.hasValue(params?.kpi?.kpi_value_getters_ids_to_exclude)) {                        
            await Campaign_Kpi_Value_Getters.destroy({
                where: {
                    id: Utils.toArray(params?.kpi?.kpi_value_getters_ids_to_exclude)?.map(Utils.toNumber)
                },
                transaction: params?.transaction
            });
        }

        if (Utils.hasValue(params?.kpi?.kpi_value_getters)) {

            //campaign kpi value getters
            for(let k in params?.kpi?.kpi_value_getters	||[]) {
                params.kpi.kpi_value_getters[k].campaign_kpi_id = params.kpi.id;
                this.handleFieldsToSave(params.kpi.kpi_value_getters[k]);                

                let saveOrCreateResult = await Campaign_Kpi_Value_Getters.saveOrCreate({
                    where:{
                        id: params.kpi.kpi_value_getters[k].id || null
                    },
                    values: params.kpi.kpi_value_getters[k],
                    transaction: params.transaction
                });

                if (!saveOrCreateResult.success) {
                    saveOrCreateResult.throw();
                }
            }
        }
    }


    /**
     * calculate the result of kpi getter 
     * @created 2025-03-06
     * @version 1.0.0
     */
    static async _calculate(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            let kpiValueGetter : any = null;
            if (queryParams.query) {
                kpiValueGetter = await this.getTableClassModel().getConnection().query(
                    queryParams.query,{
                        type:QueryTypes.SELECT
                    }
                );
            } else {
                if (((this.getTableClassModel() as any).accessLevel || 1) == 2 ) {
                    queryParams.where = queryParams.where || {};
                    queryParams.where.creator_user_id = params.user?.id
                }
                queryParams.include = queryParams.include || [];
                queryParams.include.push({
                    required: true,
                    model: Campaign_Kpis,
                    include: [{
                        required: true,
                        model: Campaigns,
                        include: [{
                            required: true,
                            model: Entities_Types
                        }]
                    }]
                });

                kpiValueGetter = await this.getTableClassModel().findOne(queryParams);
            }

            

            if (Utils.hasValue(kpiValueGetter)) {
                params.currentDate = params.currentDate || new Date();
                if (kpiValueGetter.calculated_at?.getTime() != params.currentDate.getTime()) {
                    let visionRelationship = await Relationships.findOne({
                        where:{
                            relationship_type_id: Relationship_Types.RELATIONSHIP,
                            table_1_id: Entities_Types.id,
                            record_1_id: kpiValueGetter[Campaign_Kpis.tableName.toLowerCase()][Campaigns.tableName.toLowerCase()].entity_type_id,
                            table_2_id: Report_Visions.id
                        }
                    });
                    if (Utils.hasValue(visionRelationship)) {
                        let entities = await Campaign_Entities.findAll({
                            where:{
                                campaign_id: kpiValueGetter[Campaign_Kpis.tableName.toLowerCase()].campaign_id
                            }
                        });
                        if (Utils.hasValue(entities)) {
                            let reportParams : any = {};
                            reportParams.user = params.user;
                            reportParams.visions = [visionRelationship.record_2_id];
                            reportParams.periods = [[kpiValueGetter.init_date,kpiValueGetter.end_date]];
                            reportParams.considerNormalSales = Utils.toBool(kpiValueGetter.consider_normal_sales);
                            reportParams.considerReturns = Utils.toBool(kpiValueGetter.consider_returns);
                            reportParams.considerBonuses = Utils.toBool(kpiValueGetter.consider_bonuses);


                            if ([Measurement_Units.DT].indexOf(kpiValueGetter.measurement_unit_id) > -1) {
                                reportParams.visions.push(kpiValueGetter.report_vision_id);
                            } else if ([Measurement_Units.WT,Measurement_Units.VL,Measurement_Units.UN].indexOf(kpiValueGetter.measurement_unit_id) == -1) {
                                throw new Error(`not expecter unit ${kpiValueGetter.measurement_unit_id}`)
                            }

                            reportParams.viewAmount = [Measurement_Units.UN,Measurement_Units.DT].indexOf(kpiValueGetter.measurement_unit_id) > -1;
                            reportParams.viewWeight = kpiValueGetter.measurement_unit_id == Measurement_Units.WT;
                            reportParams.viewValue = kpiValueGetter.measurement_unit_id == Measurement_Units.VL;
                            reportParams.conditions = [];
                            reportParams.conditions.push({
                                reportVision:{id:visionRelationship.record_2_id},
                                operation:{id:'IN'},
                                selecteds: entities.map(el=>({id:el.entity_id}))
                            });

                            if (Utils.hasValue(kpiValueGetter.campaign_entity_ids)) {
                                reportParams.conditions[0].selecteds = (Utils.toArray(kpiValueGetter.campaign_entity_ids) as any).map((el:any)=>({id:el}))
                            }

                            if (Utils.hasValue(kpiValueGetter[Campaign_Kpis.tableName.toLowerCase()][Campaigns.tableName.toLowerCase()].conditions)) {
                                if (JSON.parse(kpiValueGetter[Campaign_Kpis.tableName.toLowerCase()][Campaigns.tableName.toLowerCase()].conditions).filter((el:any)=>el.type != 'default condition').length) {
                                    throw new Error("do implement complex conditions");
                                }
                                reportParams.conditions = [...reportParams.conditions, ...JSON.parse(kpiValueGetter[Campaign_Kpis.tableName.toLowerCase()][Campaigns.tableName.toLowerCase()].conditions).filter((el:any)=>el.type == 'default condition').map((el:any)=>el.value)];
                            }
                            if (Utils.hasValue(kpiValueGetter[Campaign_Kpis.tableName.toLowerCase()].conditions)) {
                                if (JSON.parse(kpiValueGetter[Campaign_Kpis.tableName.toLowerCase()].conditions).filter((el:any)=>el.type != 'default condition').length) {
                                    throw new Error("do implement complex conditions");
                                }
                                reportParams.conditions = [...reportParams.conditions, ...JSON.parse(kpiValueGetter[Campaign_Kpis.tableName.toLowerCase()].conditions).filter((el:any)=>el.type == 'default condition').map((el:any)=>el.value)];
                            }
                            if (Utils.hasValue(kpiValueGetter.conditions)) {
                                if (JSON.parse(kpiValueGetter.conditions).filter((el:any)=>el.type != 'default condition').length) {
                                    throw new Error("do implement complex conditions");
                                }
                                reportParams.conditions = [...reportParams.conditions, ...JSON.parse(kpiValueGetter.conditions).filter((el:any)=>el.type == 'default condition').map((el:any)=>el.value)];
                            }

                            result.setDataSwap(await ReportsController.getCustomizedReportData(reportParams));
                            if (result.success) {
                                result.data = result.data[0].DATA || [];

                                if (Utils.hasValue(result.data)) {
                                    let keys = Object.keys(result.data[0]);

                                    //distinct item (mix count)
                                    if ([Measurement_Units.DT].indexOf(kpiValueGetter.measurement_unit_id) > -1) {
                                        let newData : any = {};
                                        for(let k in result.data) {
                                            newData[result.data[k][keys[0]]] = newData[result.data[k][keys[0]]] || {[keys[0]]: result.data[k][keys[0]], [keys[keys.length - 1]]:0};
                                            if ((Utils.toNumber(result.data[k][keys[keys.length - 1]]) || 0) > 0) {
                                                newData[result.data[k][keys[0]]][keys[keys.length - 1]]++;
                                            }
                                        }; 
                                        result.data = Object.values(newData);  
                                        keys = Object.keys(result.data[0]);                                    
                                    }

                                    for(let k in result.data) {                                    

                                        //upsert kpi value getter value
                                        await Campaign_Entities_Kpi_Value_Getters_Values.saveOrCreate({
                                            where:{
                                                campaign_entity_id: entities.find(el=>el.entity_id == result.data[k][keys[0]])?.id,
                                                campaign_kpi_value_getter_id: kpiValueGetter.id
                                            },
                                            values:{
                                                value: result.data[k][keys[keys.length - 1]],
                                                calculated_at: params.currentDate
                                            }                                        
                                        });                                    
                                    }

                                    kpiValueGetter.calculated_at = params.currentDate;
                                    await kpiValueGetter.save();
                                }
                            }
                        } else {
                            throw new Error('no has entities');
                        }
                    } else {
                        throw new Error('no has vision relationship to entity type');
                    }
                } else {
                    result.data = await Campaign_Entities_Kpi_Value_Getters_Values.findAll({
                        raw:true,
                        attributes:[
                            'entity_id',
                            'value',
                            Sequelize.literal(`${Campaign_Entities.tableName}.entity_id as entity_id`) as any
                        ],
                        include:[{
                            required: true,
                            model: Campaign_Entities,
                            attributes:[]
                        }],
                        where:{
                            campaign_kpi_value_getter_id: kpiValueGetter.id
                        }
                    });

                    result.success = true;
                }
            } else {
                throw new Error('no data found');
            }
            
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }


    /**
     * calculate the result of kpi getter and relationed expressions
     * @requesthandler
     * @created 2025-03-06
     * @version 1.0.0
     */
    static async calculate(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body;
            params.user = req.user;
            res.setDataSwap(await this._calculate(params));
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }



    static {
        this.configureDefaultRequestHandlers([
            this.calculate
        ]);
    }
}
