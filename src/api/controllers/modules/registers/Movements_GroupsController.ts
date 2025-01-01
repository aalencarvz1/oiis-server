import Movements_Groups from "../../../database/models/Movements_Groups.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Movements_GroupsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Movements_Groups;
    }

    static {
        this.configureRequestHandlers();
    }
}
