import Campaign_Kpi_Arbitrary_Values from "../../../database/models/Campaign_Kpi_Arbitrary_Values.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_Kpi_Arbitrary_ValuesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpi_Arbitrary_Values;
    }

    static {
        this.configureRequestHandlers();
    }
}
