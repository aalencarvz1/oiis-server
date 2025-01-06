import Movement_Types from "../../../database/models/Movement_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Movement_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Movement_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
