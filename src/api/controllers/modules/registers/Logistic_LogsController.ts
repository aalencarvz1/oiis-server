import Logistic_Logs from "../../../database/models/Logistic_Logs.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Logistic_LogsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logistic_Logs;
    }

    static {
        this.configureRequestHandlers();
    }
}
