import Logistic_Reasons from "../../../database/models/Logistic_Reasons.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Logistic_ReasonsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logistic_Reasons;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
