import Run_Status from "../../../database/models/Run_Status.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Run_StatusController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Run_Status;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
