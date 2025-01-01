import Report_Data_Founts from "../../../database/models/Report_Data_Founts.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Report_Data_FountsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Report_Data_Founts;
    }

    static {
        this.configureRequestHandlers();
    }
}
