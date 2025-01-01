import Movs_Items_Stocks from "../../../database/models/Movs_Items_Stocks.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Movs_Items_StocksController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Movs_Items_Stocks;
    }

    static {
        this.configureRequestHandlers();
    }
}
