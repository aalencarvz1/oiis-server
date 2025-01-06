import Power_Types from "../../../database/models/Power_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Power_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Power_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
