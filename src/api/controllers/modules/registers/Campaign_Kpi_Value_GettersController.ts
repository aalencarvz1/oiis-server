import Campaign_Kpi_Value_Getters from "../../../database/models/Campaign_Kpi_Value_Getters.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_Kpi_Value_GettersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpi_Value_Getters;
    }

    static {
        this.configureRequestHandlers();
    }
}
