import Groups from "../../../database/models/Groups.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class GroupsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Groups;
    }

    static {
        this.configureRequestHandlers();
    }
}
