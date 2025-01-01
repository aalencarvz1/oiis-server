import Routine_Types from "../../../database/models/Routine_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Routine_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Routine_Types;
    }

    static {
        this.configureRequestHandlers();
    }
}
