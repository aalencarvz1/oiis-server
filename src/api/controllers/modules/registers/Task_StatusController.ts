import Task_Status from "../../../database/models/Task_Status.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Task_StatusController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Task_Status;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
