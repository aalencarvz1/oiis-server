import Sync_Status from "../../../database/models/Sync_Status.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Sync_StatusController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Sync_Status;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
