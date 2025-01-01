import States from "../../../database/models/States.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class StatesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return States;
    }

    static {
        this.configureRequestHandlers();
    }
}
