import Project_Tasks_Status_Users from "../../../database/models/Project_Tasks_Status_Users.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Project_Tasks_Status_UsersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Project_Tasks_Status_Users;
    }

    static {
        this.configureRequestHandlers();
    }
}
