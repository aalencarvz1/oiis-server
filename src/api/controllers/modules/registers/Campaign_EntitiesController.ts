import { Op } from "sequelize";
import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_EntitiesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Entities;
    }

    static handleFieldsToSave(queryParams: any) : void {

        let keys = Object.keys(queryParams);
        if (Utils.hasValue(queryParams.id)) {
            if (!Utils.hasValue(queryParams.entity_id)) {
                queryParams.entity_id = queryParams.id;
                queryParams.id = undefined;
                delete queryParams.id;
            }                        
        }

        if (Utils.hasValue(queryParams?.conditions)) {
            if (queryParams?.conditions && typeof queryParams.conditions !== 'string') {        
                queryParams.conditions = JSON.stringify(queryParams.conditions);
            } 
        } else if (keys.indexOf("conditions") > -1) {
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
    static async createEntitiesFromCampaign(params : any) : Promise<void>{
        if (Utils.hasValue(params?.campaign?.campaign_entities)) {
            for(let k in params.campaign.campaign_entities) {
                params.campaign.campaign_entities[k].campaign_id = params.campaign.id;                
                this.handleFieldsToSave(params.campaign.campaign_entities[k]);
                await Campaign_Entities.create(params.campaign.campaign_entities[k],{transaction: params.transaction})
            }
        }
    }


    /**
     * path all items of campaign, such as entities and kpis
    * @version 1.0.0
    */
    static async pathEntitiesFromCampaign(params : any) : Promise<void>{
        if (Utils.hasValue(params?.campaign?.campaign_entities)) {
            for(let k in params.campaign.campaign_entities) {
                params.campaign.campaign_entities[k].campaign_id = params.campaign.id;
                
                let where : any = {};
                if (Utils.hasValue(params.campaign.campaign_entities[k].id)) {
                    where.id = params.campaign.campaign_entities[k].id;
                } else {
                    where.entity_id = params.campaign.campaign_entities[k].entity_id;
                    where.alias = params.campaign.campaign_entities[k].alias || null;
                }

                this.handleFieldsToSave(params.campaign.campaign_entities[k]);

                let result = await Campaign_Entities.saveOrCreate({
                    where:where,
                    values:params.campaign.campaign_entities[k],
                    transaction: params.transaction
                });
                if (!result?.success) {
                    result?.throw();
                }
            }
        }
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
