import Record_Status from "../../../database/models/Record_Status.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Record_StatusController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Record_Status;
    }

    static {
        this.configureRequestHandlers();
    }
}
