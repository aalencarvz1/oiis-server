import Logistic_Orders_Movs_Received_Values from "../../../database/models/Logistic_Orders_Movs_Received_Values.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Logistic_Orders_Movs_Received_ValuesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logistic_Orders_Movs_Received_Values;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
