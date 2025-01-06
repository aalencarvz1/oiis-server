import Campaign_Kpi_Value_Detail_Entities from "../../../database/models/Campaign_Kpi_Value_Detail_Entities.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_Kpi_Value_Detail_EntitiesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpi_Value_Detail_Entities;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
