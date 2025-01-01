import Logistic_Orders_Items_Mov_Amt from "../../../database/models/Logistic_Orders_Items_Mov_Amt.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Logistic_Orders_Items_Mov_AmtController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logistic_Orders_Items_Mov_Amt;
    }

    static {
        this.configureRequestHandlers();
    }
}
