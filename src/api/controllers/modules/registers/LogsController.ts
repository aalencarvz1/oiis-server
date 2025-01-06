import Logs from "../../../database/models/Logs.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class LogsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logs;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
