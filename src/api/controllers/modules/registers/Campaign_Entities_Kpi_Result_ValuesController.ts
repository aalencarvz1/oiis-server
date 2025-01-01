import Campaign_Entities_Kpi_Result_Values from "../../../database/models/Campaign_Entities_Kpi_Result_Values.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_Entities_Kpi_Result_ValuesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Entities_Kpi_Result_Values;
    }

    static {
        this.configureRequestHandlers();
    }
}
