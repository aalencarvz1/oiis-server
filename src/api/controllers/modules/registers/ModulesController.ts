import Modules from "../../../database/models/Modules.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ModulesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Modules;
    }

    static {
        this.configureRequestHandlers();
    }
}
