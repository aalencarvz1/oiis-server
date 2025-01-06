import Identifier_Types from "../../../database/models/Identifier_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Identifier_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Identifier_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
