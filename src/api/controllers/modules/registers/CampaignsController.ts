import { NextFunction, Request, Response } from "express";
import Campaigns from "../../../database/models/Campaigns.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Utils from "../../utils/Utils.js";
import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import Campaign_Kpis from "../../../database/models/Campaign_Kpis.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { Op, QueryTypes, Sequelize } from "sequelize";
import Entities_Types from "../../../database/models/Entities_Types.js";
import QueryBuilder from "../../database/QueryBuilder.js";
import Entities_TypesController from "./Entities_TypesController.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import Campaign_EntitiesController from "./Campaign_EntitiesController.js";
import Campaign_KpisController from "./Campaign_KpisController.js";
import Campaign_Kpi_Result_Values from "../../../database/models/Campaign_Kpi_Result_Values.js";
import Campaign_Kpi_Result_ValuesController from "./Campaign_Kpi_Result_ValuesController.js";
import DataSwap from "../../data/DataSwap.js";
import Campaign_Kpi_Value_Getters from "../../../database/models/Campaign_Kpi_Value_Getters.js";
import Relationships from "../../../database/models/Relationships.js";
import Users from "../../../database/models/Users.js";
import EpVendedores from "../../../database/models/ep/EpVendedores.js";
import Relationship_Types from "../../../database/models/Relationship_Types.js";


export default class CampaignsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaigns;
    }


    /**
     * get method with includes
     * @created 2025-02-04
     * @version 1.0.0
     */
    static async _get(params?: any) : Promise<any[]> {
        let result : any[] = [];
        let queryParams = params?.queryParams || params || {};
        console.log('iiiiiiiii0',queryParams);
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        console.log('iiiiiiiii1',queryParams);
        queryParams.raw = true;
        if (queryParams.query) {
            result = await this.getTableClassModel().getConnection().query(
                queryParams.query,{
                    raw:queryParams.raw,
                    type:QueryTypes.SELECT
                }
            );
        } else {
            queryParams.include = queryParams.include || [];
            queryParams.include.push({
                model: Entities_Types
            })

            if (((this.getTableClassModel() as any).accessLevel || 1) == 2 ) {
                queryParams.where = queryParams.where || {};
                queryParams.where.creator_user_id = params?.user?.id
            }
            if (params.user.access_profile_id >= 50) {
                let relationedEntitiesIds : any = await Relationships.findAll({
                    raw:true,
                    where:{
                        relationship_type_id: Relationship_Types.EP_ID,
                        table_1_id: Users.id,
                        record_1_id: params.user.id,
                        table_2_id: EpVendedores.id
                    }
                })
                if (Utils.hasValue(relationedEntitiesIds)) {
                    relationedEntitiesIds = relationedEntitiesIds.map((el: any)=>el.record_2_id);
                    queryParams.where = queryParams.where || {};
                    queryParams.where[Op.and] = queryParams.where[Op.and] || [];
                    queryParams.where[Op.and].push(Sequelize.fn('exists', Sequelize.literal(`select 1 from ${Campaign_Entities.tableName} ce where ce.entity_id in (${relationedEntitiesIds.join(',')})`)));
                }
            }

            console.log('jjjjjjjjjjjj',queryParams);

            result = await this.getTableClassModel().findAll(queryParams);
        }
        return result;
    }


    /**
     * default RequestHandler method to put registers of table model controller
     * @requesthandler
     * @override
     * @created 2025-01-30
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body || {};
            params.user = req.user;
            res.data = await this._get(params);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    static handleFieldsToSave(queryParams: any) : void {

        let keys = Object.keys(queryParams);
        if (queryParams?.conditions) {
            if (typeof queryParams.conditions != 'string') {            
                queryParams.conditions = JSON.stringify(queryParams.conditions);
            } 
        } else if (keys.indexOf('conditions') > -1) {
            queryParams.conditions = null;
        }

        if (!Utils.hasValue(queryParams?.init_date) && keys.indexOf("init_date") > -1) {
            queryParams.init_date = null;
        }

        if (!Utils.hasValue(queryParams?.end_date) && keys.indexOf("end_date") > -1) {
            queryParams.end_date = null;
        }
    }


    /**
     * create all items of campaign, such as entities and kpis
     * @version 1.0.0
     */
    static async createCampaignItems(params : any) : Promise<void>{
        await Campaign_EntitiesController.createEntitiesFromCampaign(params);
        await Campaign_KpisController.createKpisFromCampaign(params);
    }


    /**
     * path all items of campaign, such as entities and kpis
     * @version 1.0.0
     */
    static async pathCampaignItems(params : any) : Promise<void>{
        await Campaign_EntitiesController.pathEntitiesFromCampaign(params);
        await Campaign_KpisController.pathKpisFromCampaign(params);
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
                let params : any = {campaign:{...queryParams,...res.data.dataValues || res.data}};
                params.transaction = transaction;
                await CampaignsController.createCampaignItems(params);                                
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

                        await Campaign_Entities.destroy({
                            where: {
                                id: Utils.toArray(queryParams.entities_ids_to_exclude)?.map(Utils.toNumber)
                            },
                            transaction
                        });
                    }


                    if (Utils.hasValue(queryParams.kpis_ids_to_exclude)) {
                        await Campaign_Kpis.destroy({
                            where: {
                                id: Utils.toArray(queryParams.kpis_ids_to_exclude)?.map(Utils.toNumber)
                            },
                            transaction
                        })
                    }                                    

                    queryParams.transaction = transaction;
                    res.data = await this.getTableClassModel().patchData(queryParams);
                    let params : any = {campaign:{...queryParams,...res.data.dataValues || res.data}};
                    params.transaction = transaction;
                    await CampaignsController.pathCampaignItems(params);                                
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
    
    
    static async get_entities_type_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const campaignId = req.body.campaignId
            if(campaignId!){
                let campaign = await Campaigns.findOne({
                    raw:true,
                    where: {
                        id: campaignId
                        },
                })
                if(Utils.hasValue(campaign)){
                    let campaignEntities = await Campaign_Entities.findAll({
                        raw:true,
                        where:{
                            campaign_id: campaign.id
                        }
                    })
                    campaignEntities = Utils.hasValue(campaignEntities)? campaignEntities :  ([{entity_id: -1}] as any)
                    res.data = await Entities_TypesController._get_entities_type_data(
                        campaign.entity_type_id,
                        campaignEntities.map((el: any)=> el.entity_id)
                    );

                    res.sendResponse(200,true);
                }else{
                    throw new Error('not found')
                }
            }else{
                throw new Error('missing data')
            }
         
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    static async get_kpis_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const campaignId = req.body.campaignId
            if(campaignId!){
                let campaign = await Campaigns.findOne({
                    raw:true,
                    where: {
                        id: campaignId
                        },
                })
                if(Utils.hasValue(campaign)){
                    res.data = await Campaign_Kpis.findAll({
                        raw:true,
                        where:{
                            campaign_id: campaign.id
                        }
                    });
                    res.sendResponse(200,true);
                }else{
                    throw new Error('not found')
                }
            }else{
                throw new Error('missing data')
            }
         
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    /**
     * default RequestHandler method to put registers of table model controller
     * @requesthandler
     * @override
     * @created 2025-01-30
     * @version 1.0.0
     */
    static async get_with_sub_datas(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body || {};            
            params.user = req.user;
            let queryParams = params.queryParams || params;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            //queryParams.raw = true;
            queryParams.include = queryParams.include || [];
            queryParams.include.push({
                model: Entities_Types
            });
            queryParams.include.push({
                model: Campaign_Entities
            });
            queryParams.include.push({
                model: Campaign_Kpis
            })
            res.data = await this.getTableClassModel().findAll(params);
            res.data = res.data.map((el?:any)=>el.dataValues); //without raw option, data is immutable
            if (Utils.hasValue(res.data)) {
                for(let k in res.data) {
                    res.data[k].campaign_entities = res.data[k].campaign_entities.map((el?: any)=>el.dataValues);
                    let campaignEntities = Utils.hasValue(res.data[k].campaign_entities)? res.data[k].campaign_entities :  ([{entity_id: -1}] as any)
                    let newEntities = await Entities_TypesController._get_entities_type_data(
                        res.data[k].entity_type_id,
                        campaignEntities.map((el: any)=> el.entity_id)
                    );

                    res.data[k].campaign_entities = res.data[k].campaign_entities.map((el?:any)=>({...el,name:newEntities.find(entity=>entity.id == el.entity_id)?.name}))
                }
            }
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }



    /**
     * request handler to get campaign report data
     * @requesthandler
     * @override
     * @created 2025-03-07
     * @version 1.0.0
     */
    static async get_campaign_report_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body || {};            
            let query = `
                select  
                    ce.id,                  
                    ce.entity_id,                    
                    ck.name as kpi_name,
                    null as entity_name,
                    coalesce(ce.alias,ce.entity_id) as alias,
                    c.entity_type_id,                    
                    cv.name as result_name,
                    coalesce(ce.init_date,c.init_date) as init_date,
                    coalesce(ce.end_date,c.end_date) as end_date,
                    cev.value
                from
                    ${Campaigns.tableName} c
                    join ${Campaign_Entities.tableName} ce on ce.campaign_id = c.id
                    left outer join campaign_kpis ck on ck.campaign_id = c.id
                    left outer join campaign_kpi_result_values cv on (
                        cv.campaign_kpi_id = ck.id
                        and (
                            cv.campaign_entity_ids is null 
                            or (
                                cv.campaign_entity_ids is not null 
                                and (
                                    cv.campaign_entity_ids = ce.entity_id
                                    or instr(cv.campaign_entity_ids,ce.entity_id+',') > 0
                                    or instr(cv.campaign_entity_ids,','+ce.entity_id) > 0
                                )
                            )            
                        )
                    )
                    left outer join campaign_entities_kpi_result_values cev on (
                        cev.campaign_entity_id = ce.id
                        and cev.campaign_kpi_result_value_id = cv.id
                    )
                where
                    c.id = ${params.id}
                    ${Utils.hasValue(params.campaign_entity_id) ? `and ce.id = ${params.campaign_entity_id}` : ''}
            `;





            if (req.user.access_profile_id >= 50) {
                let relationedEntitiesIds : any = await Relationships.findAll({
                    raw:true,
                    where:{
                        relationship_type_id: Relationship_Types.EP_ID,
                        table_1_id: Users.id,
                        record_1_id: req.user.id,
                        table_2_id: EpVendedores.id
                    }
                })
                if (Utils.hasValue(relationedEntitiesIds)) {
                    relationedEntitiesIds = relationedEntitiesIds.map((el: any)=>el.record_2_id);
                    query += ` and ce.entity_id in (${relationedEntitiesIds.join(',')}) `;
                }
            }




            res.data = await DBConnectionManager.getDefaultDBConnection()?.query(query, {type:QueryTypes.SELECT});
            if (Utils.hasValue(res.data)) {
                let entitiesTypes = await Entities_TypesController._get_entities_type_data(res.data[0].entity_type_id);
                if (Utils.hasValue(entitiesTypes)) {
                    for(let k in res.data) {
                        let entityType = entitiesTypes.find(el=>el.id == res.data[k].entity_id);
                        if (Utils.hasValue(entityType)) {
                            res.data[k].entity_name = entityType.name;
                        }
                    }
                }
            }
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    /**
     * calculate campaign values
     * @created 2025-03-10
     * @version 1.0.0
     */
    static async _calculate(params?: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            params = params || {};            
            let campaignId = params.campaign_id;
            if (Utils.hasValue(campaignId)) {
                let resultValues = await Campaign_Kpi_Result_Values.findAll({
                    raw:true,
                    include:[{
                        model: Campaign_Kpis,
                        where:{
                            campaign_id: campaignId
                        }
                    }]
                })
                if (Utils.hasValue(resultValues)) {
                    let currentDate = new Date();
                    for(let k in resultValues) {
                        let resultTemp = await Campaign_Kpi_Result_ValuesController._calculate({
                            user: params.user,
                            currentDate: currentDate,
                            queryParams:{
                                where:{
                                    id: resultValues[k].id
                                }
                            }
                        });
                        if (!resultTemp.success) {
                            resultTemp.throw();
                        }
                    }
                    result.success = true;
                } else {
                    throw new Error("no data found");
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
     * duplicate campaign
     * @created 2025-03-17
     * @version 1.0.0
     */
    static async _duplicate(params?: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {            
            params = params || {};            
            let campaignIds = params.campaign_ids;
            if (Utils.hasValue(campaignIds)) {
                await DBConnectionManager.getDefaultDBConnection()?.transaction(async transaction=>{                    
                    let campaigns = await Campaigns.findAll({
                        raw:true,
                        where:{
                            id: campaignIds
                        }
                    })
                    if (Utils.hasValue(campaigns)) {
                        result.data = [];
                        for(let k in campaigns) {
                            let newCampaign : any = null;
                            for(let j = 0; j < (params.duplicateQuantity||0)-0; j++) {
                                newCampaign = {...(newCampaign || campaigns[k])};
                                delete newCampaign.id;
                                delete newCampaign.created_at;                            
                                delete newCampaign.updater_user_id;
                                delete newCampaign.updated_at;
                                delete newCampaign.campaign_entities;
                                delete newCampaign.campaign_kpis;
                                newCampaign.creator_user_id = params.user.id;

                                if (params.rename) {
                                    if (Utils.hasValue(params.newName)) {
                                        newCampaign.name = params.newName;
                                    } else {
                                        newCampaign.name = null;
                                    }
                                }

                                let newInitDate = new Date(newCampaign.init_date);
                                let newEndDate = new Date(newCampaign.end_date);
                                if (params.incrementDatesBy == "same period") {                                
                                    let monthsDiff = Utils.getFullMonthsDiff(newInitDate,newEndDate);
                                    if (Utils.hasValue(monthsDiff)) {
                                        Utils.addFullMonths(newInitDate,monthsDiff);
                                        Utils.addFullMonths(newEndDate,monthsDiff);
                                    } else {
                                        let diffDays = Utils.diffDays(newInitDate,newEndDate);
                                        if (Utils.hasValue(diffDays)) {
                                            newInitDate.setDate(newInitDate.getDate() + diffDays);
                                            newEndDate.setDate(newEndDate.getDate() + diffDays);                               
                                        }
                                    }                                
                                } else if (params.incrementDatesBy == "customized") {
                                    switch(params.increaseType?.trim().toLowerCase()) {
                                        case "month":
                                            Utils.addFullMonths(newInitDate,(params.increaseQuantity-0));
                                            Utils.addFullMonths(newEndDate,(params.increaseQuantity-0));
                                        break;
                                        case "day":
                                            newInitDate.setDate(newInitDate.getDate() + (params.increaseQuantity-0));
                                            newEndDate.setDate(newEndDate.getDate() + (params.increaseQuantity-0));
                                        break;
                                        case "year":
                                            newInitDate.setFullYear(newInitDate.getFullYear() + (params.increaseQuantity-0));
                                            newEndDate.setFullYear(newEndDate.getFullYear() + (params.increaseQuantity-0));
                                        break;
                                        default:
                                            throw new Error(`not expected increaseType value: ${params.increaseType}`);
                                    }
                                } else {
                                    throw new Error(`not expected incrementDatesBy value: ${params.incrementDatesBy}`);
                                }
                                newCampaign.init_date = newInitDate;
                                newCampaign.end_date = newEndDate;
                                newCampaign = await Campaigns.create(newCampaign,{transaction}); 
                                newCampaign = newCampaign.dataValues;


                                //duplicate campaign entities
                                newCampaign.campaign_entities = await Campaign_Entities.findAll({
                                    raw:true,
                                    where:{
                                        campaign_id: campaigns[k].id
                                    },
                                    transaction
                                });

                                if (Utils.hasValue(newCampaign.campaign_entities)) {
                                    for(let k2 in newCampaign.campaign_entities) {
                                        delete newCampaign.campaign_entities[k2].id;
                                        delete newCampaign.campaign_entities[k2].created_at;                            
                                        delete newCampaign.campaign_entities[k2].updater_user_id;
                                        delete newCampaign.campaign_entities[k2].updated_at;
                                        newCampaign.campaign_entities[k2].creator_user_id = params.user.id;
                                        newCampaign.campaign_entities[k2].campaign_id = newCampaign.id;

                                        //replace date if is equal of campaign
                                        if (Utils.hasValue(newCampaign.campaign_entities[k2].init_date)) {
                                            if (Utils.getUTCFullDate(newCampaign.campaign_entities[k2].init_date) == Utils.getUTCFullDate(campaigns[k].init_date)) {
                                                if (Utils.hasValue(newCampaign.campaign_entities[k2].end_date)) {
                                                    if (Utils.getUTCFullDate(newCampaign.campaign_entities[k2].end_date) == Utils.getUTCFullDate(campaigns[k].end_date)) {
                                                        newCampaign.campaign_entities[k2].init_date = newInitDate;
                                                        newCampaign.campaign_entities[k2].end_date = newEndDate;                                                    
                                                    }
                                                } else {
                                                    newCampaign.campaign_entities[k2].init_date = newInitDate;
                                                }
                                            }
                                        } else if (Utils.hasValue(newCampaign.campaign_entities[k2].end_date)) {
                                            if (Utils.getUTCFullDate(newCampaign.campaign_entities[k2].end_date) == Utils.getUTCFullDate(campaigns[k].end_date)) {
                                                newCampaign.campaign_entities[k2].end_date = newEndDate;                                                    
                                            }
                                        } 

                                        newCampaign.campaign_entities[k2] = await Campaign_Entities.create(newCampaign.campaign_entities[k2],{transaction});
                                        newCampaign.campaign_entities[k2] = newCampaign.campaign_entities[k2].dataValues;
                                    }
                                }


                                //duplicate campaign kpis
                                newCampaign.campaign_kpis = await Campaign_Kpis.findAll({
                                    raw:true,
                                    where:{
                                        campaign_id: campaigns[k].id
                                    },
                                    transaction
                                });

                                if (Utils.hasValue(newCampaign.campaign_kpis)) {
                                    for(let k2 in newCampaign.campaign_kpis) {
                                        let newKpi = {...newCampaign.campaign_kpis[k2]};
                                        delete newKpi.id;
                                        delete newKpi.created_at;                            
                                        delete newKpi.updater_user_id;
                                        delete newKpi.updated_at;
                                        newKpi.creator_user_id = params.user.id;
                                        newKpi.campaign_id = newCampaign.id;
                                        newKpi = await Campaign_Kpis.create(newKpi,{transaction});
                                        newKpi = newKpi.dataValues;

                                        //duplicate campaign kpis value getters
                                        newKpi.campaign_kpi_value_getters = await Campaign_Kpi_Value_Getters.findAll({
                                            raw:true,
                                            where:{
                                                campaign_kpi_id: newCampaign.campaign_kpis[k2].id
                                            },
                                            transaction
                                        });

                                        if (Utils.hasValue(newKpi.campaign_kpi_value_getters)) {
                                            for(let k3 in newKpi.campaign_kpi_value_getters) {
                                                delete newKpi.campaign_kpi_value_getters[k3].id;
                                                delete newKpi.campaign_kpi_value_getters[k3].created_at;                            
                                                delete newKpi.campaign_kpi_value_getters[k3].updater_user_id;
                                                delete newKpi.campaign_kpi_value_getters[k3].updated_at;
                                                delete newKpi.campaign_kpi_value_getters[k3].calculated_at;
                                                newKpi.campaign_kpi_value_getters[k3].creator_user_id = params.user.id;
                                                newKpi.campaign_kpi_value_getters[k3].campaign_kpi_id = newKpi.id;

                                                //replace date if is equal of campaign
                                                if (Utils.hasValue(newKpi.campaign_kpi_value_getters[k3].init_date)) {
                                                    if (Utils.getUTCFullDate(newKpi.campaign_kpi_value_getters[k3].init_date) == Utils.getUTCFullDate(campaigns[k].init_date)) {
                                                        if (Utils.hasValue(newKpi.campaign_kpi_value_getters[k3].end_date)) {
                                                            if (Utils.getUTCFullDate(newKpi.campaign_kpi_value_getters[k3].end_date) == Utils.getUTCFullDate(campaigns[k].end_date)) {
                                                                newKpi.campaign_kpi_value_getters[k3].init_date = newInitDate;
                                                                newKpi.campaign_kpi_value_getters[k3].end_date = newEndDate;
                                                            }
                                                        } else {
                                                            newKpi.campaign_kpi_value_getters[k3].init_date = newInitDate;
                                                        }
                                                    }
                                                } else if (Utils.hasValue(newKpi.campaign_kpi_value_getters[k3].end_date)) {
                                                    if (Utils.getUTCFullDate(newKpi.campaign_kpi_value_getters[k3].end_date) == Utils.getUTCFullDate(campaigns[k].end_date)) {
                                                        newKpi.campaign_kpi_value_getters[k3].end_date = newEndDate;
                                                    }
                                                } 

                                                newKpi.campaign_kpi_value_getters[k3] = await Campaign_Kpi_Value_Getters.create(newKpi.campaign_kpi_value_getters[k3],{transaction});
                                                newKpi.campaign_kpi_value_getters[k3] = newKpi.campaign_kpi_value_getters[k3].dataValues;                                            
                                            }
                                        }


                                        //duplicate campaign kpis result values
                                        newKpi.campaign_kpi_result_values = await Campaign_Kpi_Result_Values.findAll({
                                            raw:true,
                                            where:{
                                                campaign_kpi_id: newCampaign.campaign_kpis[k2].id
                                            },
                                            transaction
                                        });

                                        if (Utils.hasValue(newKpi.campaign_kpi_result_values)) {
                                            for(let k3 in newKpi.campaign_kpi_result_values) {
                                                delete newKpi.campaign_kpi_result_values[k3].id;
                                                delete newKpi.campaign_kpi_result_values[k3].created_at;                            
                                                delete newKpi.campaign_kpi_result_values[k3].updater_user_id;
                                                delete newKpi.campaign_kpi_result_values[k3].updated_at;
                                                delete newKpi.campaign_kpi_result_values[k3].calculated_at;
                                                newKpi.campaign_kpi_result_values[k3].creator_user_id = params.user.id;
                                                newKpi.campaign_kpi_result_values[k3].campaign_kpi_id = newKpi.id;
                                                newKpi.campaign_kpi_result_values[k3] = await Campaign_Kpi_Result_Values.create(newKpi.campaign_kpi_result_values[k3],{transaction});
                                                newKpi.campaign_kpi_result_values[k3] = newKpi.campaign_kpi_result_values[k3].dataValues;                                            
                                            }
                                        }
                                        newCampaign.campaign_kpis[k2] = newKpi;
                                    }
                                }
                                result.data.push(newCampaign);
                            }                            
                        }
                    } else {
                        throw new Error("no data found");
                    }  
                    result.success = true;
                    return true;
                });                                             
            } else {
                throw new Error('missing data');
            }            
        } catch (e: any) {
            result.setException(e);
        }
        return result;
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
     * request handler to duplicate campaign
     * @requesthandler
     * @override
     * @created 2025-03-17
     * @version 1.0.0
     */
     static async duplicate(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body || {};            
            params.user = req.user;
            res.setDataSwap(await this._duplicate(params));
        } catch (e: any) {
            res.setException(e);            
        }
        res.sendResponse();
    }
    


    static {
        this.configureDefaultRequestHandlers([
            this.get_entities_type_data,
            this.get_kpis_data,
            this.get_with_sub_datas,
            this.get_campaign_report_data,
            this.calculate,
            this.duplicate
        ]);
    }
}
