import { NextFunction, Request, Response } from "express";
import Campaigns from "../../../database/models/Campaigns.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Utils from "../../utils/Utils.js";
import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import Campaign_Kpis from "../../../database/models/Campaign_Kpis.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { QueryTypes } from "sequelize";
import Entities_Types from "../../../database/models/Entities_Types.js";
import QueryBuilder from "../../database/QueryBuilder.js";
import Entities_TypesController from "./Entities_TypesController.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import Campaign_EntitiesController from "./Campaign_EntitiesController.js";
import Campaign_KpisController from "./Campaign_KpisController.js";
import Campaign_Kpi_Result_Values from "../../../database/models/Campaign_Kpi_Result_Values.js";
import Campaign_Kpi_Result_ValuesController from "./Campaign_Kpi_Result_ValuesController.js";
import DataSwap from "../../data/DataSwap.js";


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
        queryParams = DatabaseUtils.prepareQueryParams(params);
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
        if (queryParams?.conditions && typeof queryParams.conditions != 'string') {
            if (Utils.hasValue(queryParams?.conditions)) {
                queryParams.conditions = JSON.stringify(queryParams.conditions);
            } else {
                queryParams.conditions = null;
            }
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
                        (entityType?: any)=>QueryBuilder.mountInClause(entityType?.identifier_column,campaignEntities.map((el: any)=> el.entity_id))
                    );

                    /*let entityType = await Entities_Types.findOne({
                        raw: true,
                        where: {
                            id: campaign.entity_type_id,       
                        },
                        include: [
                            {
                                //raw:true,
                                model: Tables,
                                attributes:[
                                    Sequelize.literal(`${Tables.tableName}.name as table_name`) as any
                                ],
                                on:Sequelize.where(Sequelize.col(`${Tables.tableName}.id`),Sequelize.col(`${Entities_Types.tableName}.table_id`)),
                                include:[
                                    {
                                        model: Schemas,
                                        attributes:[
                                            Sequelize.literal(`\`${Tables.tableName}->${Schemas.tableName}\`.name as schema_name`) as any
                                        ],
                                        on:Sequelize.where(Sequelize.col(`\`${Tables.tableName}->${Schemas.tableName}\`.id`),Sequelize.col(`${Tables.tableName}.schema_id`))    
                                    },
                                    {
                                        model: Connections,
                                        attributes:[
                                            Sequelize.literal(`\`${Tables.tableName}->${Connections.tableName}\`.name as connection_name`) as any
                                        ],
                                        on:Sequelize.where(Sequelize.col(`\`${Tables.tableName}->${Connections.tableName}\`.id`),Sequelize.col(`${Tables.tableName}.data_connection_id`)) 
                                        
                                    }
                                ]
                            }
                            
                        ]
                    })                
                    let query = `
                    SELECT
                        ${entityType?.identifier_column} as "id",
                        ${entityType?.name_column} as "name"
                    FROM
                        ${(entityType as any)?.schema_name}.${(entityType as any)?.table_name}
                    WHERE
                        ${QueryBuilder.mountInClause(entityType?.identifier_column,campaignEntities.map((el: any)=> el.entity_id) )}
                    `
                    console.log(query)
                    let connection = DBConnectionManager.getConnectionByConnectionName((entityType as any)?.connection_name) 
                    res.data = await connection?.query(query, {type:QueryTypes.SELECT});*/

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
                        (entityType?: any)=>QueryBuilder.mountInClause(entityType?.identifier_column,campaignEntities.map((el: any)=> el.entity_id))
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
                    ce.entity_id,
                    ck.name as kpi_name,
                    cv.name as result_name,
                    cev.value
                from
                    campaigns c
                    join campaign_entities ce on ce.campaign_id = c.id
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
                    ${Utils.hasValue(params.entity_id) ? `and ce.entity_id = ${params.entity_id}` : ''}
            `;
            res.data = await DBConnectionManager.getDefaultDBConnection()?.query(query, {type:QueryTypes.SELECT});
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
    


    static {
        this.configureDefaultRequestHandlers([
            this.get_entities_type_data,
            this.get_kpis_data,
            this.get_with_sub_datas,
            this.get_campaign_report_data,
            this.calculate
        ]);
    }
}
