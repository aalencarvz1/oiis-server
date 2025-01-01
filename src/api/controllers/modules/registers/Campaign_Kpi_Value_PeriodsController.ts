import Campaign_Kpi_Value_Periods from "../../../database/models/Campaign_Kpi_Value_Periods.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_Kpi_Value_PeriodsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpi_Value_Periods;
    }

    static {
        this.configureRequestHandlers();
    }
}
