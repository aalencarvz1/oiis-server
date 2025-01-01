import Tasks_Status_Users_Logs from "../../../database/models/Tasks_Status_Users_Logs.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Tasks_Status_Users_LogsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Tasks_Status_Users_Logs;
    }

    static {
        this.configureRequestHandlers();
    }
}
