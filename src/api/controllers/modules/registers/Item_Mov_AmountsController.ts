import Item_Mov_Amounts from "../../../database/models/Item_Mov_Amounts.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Item_Mov_AmountsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Item_Mov_Amounts;
    }

    static {
        this.configureRequestHandlers();
    }
}
