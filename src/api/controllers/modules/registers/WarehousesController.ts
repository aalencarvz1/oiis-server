import Warehouses from "../../../database/models/Warehouses.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class WarehousesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Warehouses;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
