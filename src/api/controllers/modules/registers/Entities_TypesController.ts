import Entities_Types from "../../../database/models/Entities_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Entities_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Entities_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
