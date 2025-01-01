import Street_Types from "../../../database/models/Street_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Street_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Street_Types;
    }

    static {
        this.configureRequestHandlers();
    }
}
