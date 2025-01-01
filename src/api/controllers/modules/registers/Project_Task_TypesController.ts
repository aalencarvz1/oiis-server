import Project_Task_Types from "../../../database/models/Project_Task_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Project_Task_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Project_Task_Types;
    }

    static {
        this.configureRequestHandlers();
    }
}
