import Sql_Processes from "../../../database/models/Sql_Processes.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Sql_ProcessesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Sql_Processes;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
