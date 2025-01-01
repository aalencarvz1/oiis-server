import Report_Data_Fount_Items from "../../../database/models/Report_Data_Fount_Items.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Report_Data_Fount_ItemsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Report_Data_Fount_Items;
    }

    static {
        this.configureRequestHandlers();
    }
}
