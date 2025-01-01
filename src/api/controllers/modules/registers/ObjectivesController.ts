import Objectives from "../../../database/models/Objectives.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ObjectivesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Objectives;
    }

    static {
        this.configureRequestHandlers();
    }
}
