import Errors from "../../../database/models/Errors.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ErrorsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Errors;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
