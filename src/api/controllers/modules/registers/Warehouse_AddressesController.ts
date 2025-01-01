import Warehouse_Addresses from "../../../database/models/Warehouse_Addresses.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Warehouse_AddressesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Warehouse_Addresses;
    }

    static {
        this.configureRequestHandlers();
    }
}
