import Contract_Types from "../../../database/models/Contract_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Contract_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Contract_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
