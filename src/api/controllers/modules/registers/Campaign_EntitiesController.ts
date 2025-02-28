import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_EntitiesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Entities;
    }


    /**
     * create all items of campaign, such as entities and kpis
    * @version 1.0.0
    */
    static async createEntitiesFromCampaign(params : any) : Promise<void>{
        if (Utils.hasValue(params?.campaign?.campaign_entities)) {
            for(let k in params.campaign.campaign_entities) {
                params.campaign.campaign_entities[k].campaign_id = params.campaign.id;
                if (Utils.hasValue(params.campaign.campaign_entities[k].id)) {
                    if (!Utils.hasValue(params.campaign.campaign_entities[k].entity_id)) {
                        params.campaign.campaign_entities[k].entity_id = params.campaign.campaign_entities[k].id;
                        params.campaign.campaign_entities[k].id = undefined;
                        delete params.campaign.campaign_entities[k].id;
                    }                        
                }
                await Campaign_Entities.create(params.campaign.campaign_entities[k],{transaction: params.transaction})
            }
        }
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
