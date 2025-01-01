import Movement_Groups from "../../../database/models/Movement_Groups.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Movement_GroupsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Movement_Groups;
    }

    static {
        this.configureRequestHandlers();
    }
}
