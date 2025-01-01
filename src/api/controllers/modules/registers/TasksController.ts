import Tasks from "../../../database/models/Tasks.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class TasksController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Tasks;
    }

    static {
        this.configureRequestHandlers();
    }
}
