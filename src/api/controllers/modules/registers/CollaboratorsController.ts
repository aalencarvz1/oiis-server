import Collaborators from "../../../database/models/Collaborators.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class CollaboratorsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Collaborators;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
