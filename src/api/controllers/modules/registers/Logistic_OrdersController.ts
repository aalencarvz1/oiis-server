import Logistic_Orders from "../../../database/models/Logistic_Orders.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Logistic_OrdersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logistic_Orders;
    }

    static {
        this.configureRequestHandlers();
    }
}
