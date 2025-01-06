import Item_Mov_Units from "../../../database/models/Item_Mov_Units.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Item_Mov_UnitsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Item_Mov_Units;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
