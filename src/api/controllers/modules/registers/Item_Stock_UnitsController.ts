import Item_Stock_Units from "../../../database/models/Item_Stock_Units.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Item_Stock_UnitsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Item_Stock_Units;
    }

    static {
        this.configureRequestHandlers();
    }
}
