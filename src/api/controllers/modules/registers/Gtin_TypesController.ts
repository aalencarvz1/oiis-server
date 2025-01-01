import Gtin_Types from "../../../database/models/Gtin_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Gtin_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Gtin_Types;
    }

    static {
        this.configureRequestHandlers();
    }
}
