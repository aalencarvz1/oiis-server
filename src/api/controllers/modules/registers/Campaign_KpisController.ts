import Campaign_Kpis from "../../../database/models/Campaign_Kpis.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_KpisController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Kpis;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
