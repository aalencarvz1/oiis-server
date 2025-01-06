import Campaign_Kpi_Value_Details from "../../../database/models/Campaign_Kpi_Value_Details.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_Kpi_Value_DetailsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpi_Value_Details;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
