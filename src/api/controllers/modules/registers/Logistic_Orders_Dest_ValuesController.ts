import Logistic_Orders_Dest_Values from "../../../database/models/Logistic_Orders_Dest_Values.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Logistic_Orders_Dest_ValuesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logistic_Orders_Dest_Values;
    }

    static {
        this.configureRequestHandlers();
    }
}
