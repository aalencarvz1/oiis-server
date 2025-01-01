import Logistic_Orders_Movs from "../../../database/models/Logistic_Orders_Movs.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Logistic_Orders_MovsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logistic_Orders_Movs;
    }

    static {
        this.configureRequestHandlers();
    }
}
