import Campaign_Kpi_Value_Getters from "../../../database/models/Campaign_Kpi_Value_Getters.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_Kpi_Value_GettersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpi_Value_Getters;
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
                if (Utils.hasValue(params.kpi.kpi_value_getters[k].conditions) && typeof params.kpi.kpi_value_getters[k].conditions != 'string') {
                    params.kpi.kpi_value_getters[k].conditions = JSON.stringify(params.kpi.kpi_value_getters[k].conditions);
                }
                params.kpi.kpi_value_getters[k] = {...params.kpi.kpi_value_getters[k], ...(await Campaign_Kpi_Value_Getters.create(params.kpi.kpi_value_getters[k],{transaction: params.transaction})).dataValues};
            }
        }
    }


    static {
        this.configureDefaultRequestHandlers();
    }
}
