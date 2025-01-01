import Tasks_Status_Users from "../../../database/models/Tasks_Status_Users.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Tasks_Status_UsersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Tasks_Status_Users;
    }

    static {
        this.configureRequestHandlers();
    }
}
