import { NextFunction, Request, Response } from "express";
import Campaigns from "../../../database/models/Campaigns.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Utils from "../../utils/Utils.js";
import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import Campaign_Kpis from "../../../database/models/Campaign_Kpis.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { QueryTypes, Sequelize } from "sequelize";
import Entities_Types from "../../../database/models/Entities_Types.js";
import QueryBuilder from "../../database/QueryBuilder.js";
import Entities_TypesController from "./Entities_TypesController.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import Campaign_Kpi_Result_Values from "../../../database/models/Campaign_Kpi_Result_Values.js";
import Campaign_Kpi_Value_Getters from "../../../database/models/Campaign_Kpi_Value_Getters.js";
import Campaign_EntitiesController from "./Campaign_EntitiesController.js";
import Campaign_KpisController from "./Campaign_KpisController.js";


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


    /**
     * create all items of campaign, such as entities and kpis
     * @version 1.0.0
     */
    static async createCampaignItems(params : any) : Promise<void>{
        await Campaign_EntitiesController.createEntitiesFromCampaign(params);
        await Campaign_KpisController.createKpisFromCampaign(params);
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
            await DBConnectionManager.getDefaultDBConnection()?.transaction(async transaction=>{
                res.data = await this.getTableClassModel().create(queryParams, {transaction});
                let params = {campaign:{...queryParams,...res.data.dataValues}, transaction};
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

            if(Utils.hasValue(queryParams.campaign_entities) && Utils.hasValue(queryParams.entity_type_id) && Utils.hasValue(queryParams.id)){
                await DBConnectionManager.getDefaultDBConnection()?.transaction(async transaction=>{
                    await Campaign_Entities.destroy({
                        where: {
                            campaign_id: queryParams.id
                        },
                        transaction
                    });
                    await Campaign_Kpis.destroy({
                        where: {
                            campaign_id: queryParams.id
                        },
                        transaction
                    })

                    queryParams.transaction = transaction;
                    res.data = await this.getTableClassModel().patchData(queryParams);

                    let params = {...queryParams,...res.data, transaction};
                    await CampaignsController.createCampaignItems(params);                                
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
    


    static {
        this.configureDefaultRequestHandlers([
            this.get_entities_type_data,
            this.get_kpis_data,
            this.get_with_sub_datas
        ]);
    }
}
