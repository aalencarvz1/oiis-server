import Action_Status from "../../../database/models/Action_Status.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Action_StatusController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Action_Status;
    }

    static {
        this.configureRequestHandlers();
    }
}
