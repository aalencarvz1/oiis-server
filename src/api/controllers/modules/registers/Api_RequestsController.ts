import Api_Requests from "../../../database/models/Api_Requests.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Api_RequestsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Api_Requests;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
