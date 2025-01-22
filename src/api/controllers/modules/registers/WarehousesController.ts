import Warehouses from "../../../database/models/Warehouses.js";
import BasePeopleRegistersController from "./BasePopleRegistersController.js";

export default class WarehousesController extends BasePeopleRegistersController {
    static getTableClassModel() : any {
        return Warehouses;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
