import Campaign_Kpi_Result_Values from "../../../database/models/Campaign_Kpi_Result_Values.js";
import Campaign_Kpis from "../../../database/models/Campaign_Kpis.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Campaign_Kpi_Value_GettersController from "./Campaign_Kpi_Value_GettersController.js";

export default class Campaign_KpisController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpis;
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

     static handleFieldsOfResultToSave(queryParams: any) : void {
        if (queryParams?.campaign_entity_ids && typeof queryParams.campaign_entity_ids != 'string') {
            if (Utils.hasValue(queryParams.campaign_entity_ids)) {
                queryParams.campaign_entity_ids = queryParams.campaign_entity_ids.join(",");
            } else {
                queryParams.campaign_entity_ids = null;
            }                                
        }
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
                this.handleFieldsToSave(params.campaign.campaign_kpis[k]);
                params.campaign.campaign_kpis[k] = {...params.campaign.campaign_kpis[k],...(await Campaign_Kpis.create(params.campaign.campaign_kpis[k],{transaction: params.transaction})).dataValues};
                
                //campaign kpi value getters
                await Campaign_Kpi_Value_GettersController.createKpiGettersFromKpi({kpi:params.campaign.campaign_kpis[k],transaction:params.transaction});

                //campaign kpi result values
                for(let j in params.campaign.campaign_kpis[k].kpi_result_values	||[]) {
                    params.campaign.campaign_kpis[k].kpi_result_values[j].campaign_kpi_id = params.campaign.campaign_kpis[k].id;
                    this.handleFieldsOfResultToSave(params.campaign.campaign_kpis[k].kpi_result_values[j]);
                    await Campaign_Kpi_Result_Values.create(params.campaign.campaign_kpis[k].kpi_result_values[j],{transaction: params.transaction});
                }                
            }
        }
    }



    /**
     * path all items of campaign, such as entities and kpis
     * @version 1.0.0
     */
    static async pathKpisFromCampaign(params : any) : Promise<void>{
        if (Utils.hasValue(params?.campaign?.campaign_kpis)) {

            //campaign kpis
            for(let k in params.campaign.campaign_kpis) {                
                params.campaign.campaign_kpis[k].campaign_id = params.campaign.id;
                this.handleFieldsToSave(params.campaign.campaign_kpis[k]);

                let saveOrCreateResult = await Campaign_Kpis.saveOrCreate({
                    where:{
                        id: params.campaign.campaign_kpis[k].id || null
                    },
                    values:params.campaign.campaign_kpis[k],
                    transaction: params.transaction
                });

                if (saveOrCreateResult.success) {
                    params.campaign.campaign_kpis[k] = {...params.campaign.campaign_kpis[k], ...saveOrCreateResult.data.dataValues || saveOrCreateResult.data};
                    
                    //campaign kpi value getters
                    await Campaign_Kpi_Value_GettersController.pathKpiGettersFromKpi({kpi:params.campaign.campaign_kpis[k],transaction:params.transaction});

                    //campaign kpi result values

                    if (Utils.hasValue(params.campaign.campaign_kpis[k].kpi_result_values_ids_to_exclude)) {                        
                        await Campaign_Kpi_Result_Values.destroy({
                            where: {
                                id: Utils.toArray(params.campaign.campaign_kpis[k].kpi_result_values_ids_to_exclude)?.map(Utils.toNumber)
                            },
                            transaction: params?.transaction
                        });
                    }

                    for(let j in params.campaign.campaign_kpis[k].kpi_result_values	||[]) {
                        params.campaign.campaign_kpis[k].kpi_result_values[j].campaign_kpi_id = params.campaign.campaign_kpis[k].id;
                        this.handleFieldsOfResultToSave(params.campaign.campaign_kpis[k].kpi_result_values[j]);
                        let saveOrCreateResultResult = await Campaign_Kpi_Result_Values.saveOrCreate({
                            where:{
                                id: params.campaign.campaign_kpis[k].kpi_result_values[j].id || null
                            },
                            values:params.campaign.campaign_kpis[k].kpi_result_values[j],
                            transaction: params.transaction
                        });
                        if (!saveOrCreateResultResult.success) {
                            saveOrCreateResultResult.throw();
                        }
                    }  
                    
                } else {
                    saveOrCreateResult.throw();
                }                                          
            }
        }
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
