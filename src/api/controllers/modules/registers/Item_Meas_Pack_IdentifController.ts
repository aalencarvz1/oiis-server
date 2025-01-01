import Item_Meas_Pack_Identif from "../../../database/models/Item_Meas_Pack_Identif.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Item_Meas_Pack_IdentifController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Item_Meas_Pack_Identif;
    }

    static {
        this.configureRequestHandlers();
    }
}
