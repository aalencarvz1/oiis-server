import Warehouse_Address_Capacities from "../../../database/models/Warehouse_Address_Capacities.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Warehouse_Address_CapacitiesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Warehouse_Address_Capacities;
    }

    static {
        this.configureRequestHandlers();
    }
}
