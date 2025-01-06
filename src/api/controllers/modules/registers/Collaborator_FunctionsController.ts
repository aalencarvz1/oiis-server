import Collaborator_Functions from "../../../database/models/Collaborator_Functions.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Collaborator_FunctionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Collaborator_Functions;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
