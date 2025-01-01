import Maps_Api_Responses from "../../../database/models/Maps_Api_Responses.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Maps_Api_ResponsesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Maps_Api_Responses;
    }

    static {
        this.configureRequestHandlers();
    }
}
