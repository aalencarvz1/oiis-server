import Collaborators_X_Functions from "../../../database/models/Collaborators_X_Functions.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Collaborators_X_FunctionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Collaborators_X_Functions;
    }

    static {
        this.configureRequestHandlers();
    }
}
