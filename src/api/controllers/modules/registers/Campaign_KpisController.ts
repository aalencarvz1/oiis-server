import Campaign_Kpi_Result_Values from "../../../database/models/Campaign_Kpi_Result_Values.js";
import Campaign_Kpi_Value_Getters from "../../../database/models/Campaign_Kpi_Value_Getters.js";
import Campaign_Kpis from "../../../database/models/Campaign_Kpis.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Campaign_Kpi_Value_GettersController from "./Campaign_Kpi_Value_GettersController.js";

export default class Campaign_KpisController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpis;
    }

    /**
     * create all items of campaign, such as entities and kpis
     * @version 1.0.0
     */
    static async createKpisFromCampaign(params : any) : Promise<void>{
        if (Utils.hasValue(params?.campaign?.campaign_kpis)) {

            //campaign kpis
            for(let k in params.campaign.campaign_kpis) {                
                params.campaign.campaign_kpis[k].campaign_id = params.campaign.id;
                if (Utils.hasValue(params.campaign.campaign_kpis[k].conditions) && typeof params.campaign.campaign_kpis[k].conditions != 'string') {
                    params.campaign.campaign_kpis[k].conditions = JSON.stringify(params.campaign.campaign_kpis[k].conditions);
                }
                params.campaign.campaign_kpis[k] = {...params.campaign.campaign_kpis[k],...(await Campaign_Kpis.create(params.campaign.campaign_kpis[k],{transaction: params.transaction})).dataValues};
                
                //campaign kpi value getters
                await Campaign_Kpi_Value_GettersController.createKpiGettersFromKpi({kpi:params.campaign.campaign_kpis[k],transaction:params.transaction});

                //campaign kpi result values
                for(let j in params.campaign.campaign_kpis[k].kpi_result_values	||[]) {
                    params.campaign.campaign_kpis[k].kpi_result_values[j].campaign_kpi_id = params.campaign.campaign_kpis[k].id;

                    if (params.campaign.campaign_kpis[k].kpi_result_values[j]?.campaign_entity_ids && typeof params.campaign.campaign_kpis[k].kpi_result_values[j].campaign_entity_ids != 'string') {
                        if (Utils.hasValue(params.campaign.campaign_kpis[k].kpi_result_values[j].campaign_entity_ids)) {
                            params.campaign.campaign_kpis[k].kpi_result_values[j].campaign_entity_ids = params.campaign.campaign_kpis[k].kpi_result_values[j].campaign_entity_ids.join(",");
                        } else {
                            params.campaign.campaign_kpis[k].kpi_result_values[j].campaign_entity_ids = null;
                        }                                
                    }

                    await Campaign_Kpi_Result_Values.create(params.campaign.campaign_kpis[k].kpi_result_values[j],{transaction: params.transaction});
                }                
            }
        }
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
