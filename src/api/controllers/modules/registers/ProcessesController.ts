import Processes from "../../../database/models/Processes.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ProcessesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Processes;
    }

    static {
        this.configureRequestHandlers();
    }
}
