import Project_Tasks from "../../../database/models/Project_Tasks.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Project_TasksController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Project_Tasks;
    }

    static {
        this.configureRequestHandlers();
    }
}
