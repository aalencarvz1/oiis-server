import Movement_Status from "../../../database/models/Movement_Status.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Movement_StatusController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Movement_Status;
    }

    static {
        this.configureRequestHandlers();
    }
}
