import Address_Types from "../../../database/models/Address_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Address_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Address_Types;
    }

    static {
        this.configureRequestHandlers();
    }
}
