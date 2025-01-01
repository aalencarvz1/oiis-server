import Api_Request_Calls from "../../../database/models/Api_Request_Calls.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Api_Request_CallsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Api_Request_Calls;
    }

    static {
        this.configureRequestHandlers();
    }
}
