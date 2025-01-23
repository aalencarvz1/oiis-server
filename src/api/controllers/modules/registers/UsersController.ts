import Users from "../../../database/models/Users.js";
import BasePeopleRegistersController from "./BasePopleRegistersController.js";

export default class UsersController extends BasePeopleRegistersController {
    static getTableClassModel() : any {
        return Users;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
