import Api_Responses from "../../../database/models/Api_Responses.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Api_ResponsesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Api_Responses;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
