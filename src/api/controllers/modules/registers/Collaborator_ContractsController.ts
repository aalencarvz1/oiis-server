import Collaborator_Contracts from "../../../database/models/Collaborator_Contracts.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Collaborator_ContractsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Collaborator_Contracts;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
