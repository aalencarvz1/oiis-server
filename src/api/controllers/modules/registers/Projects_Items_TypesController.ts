import Projects_Items_Types from "../../../database/models/Projects_Items_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Projects_Items_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Projects_Items_Types;
    }

    static {
        this.configureRequestHandlers();
    }
}
