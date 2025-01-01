import Logistic_Status from "../../../database/models/Logistic_Status.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Logistic_StatusController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logistic_Status;
    }

    static {
        this.configureRequestHandlers();
    }
}
