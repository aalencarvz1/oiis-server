import Item_Stocks from "../../../database/models/Item_Stocks.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Item_StocksController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Item_Stocks;
    }

    static {
        this.configureRequestHandlers();
    }
}
