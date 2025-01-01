import Users from "../../../database/models/Users.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class UsersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Users;
    }

    static {
        this.configureRequestHandlers();
    }
}
