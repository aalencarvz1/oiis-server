import Item_Status from "../../../database/models/Item_Status.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Item_StatusController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Item_Status;
    }

    static {
        this.configureRequestHandlers();
    }
}
