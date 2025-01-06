import Requirements_Types from "../../../database/models/Requirements_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Requirements_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Requirements_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
