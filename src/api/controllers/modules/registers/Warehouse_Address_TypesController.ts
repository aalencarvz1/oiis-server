import Warehouse_Address_Types from "../../../database/models/Warehouse_Address_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Warehouse_Address_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Warehouse_Address_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
