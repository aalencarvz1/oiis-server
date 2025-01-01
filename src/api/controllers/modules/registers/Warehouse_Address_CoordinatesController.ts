import Warehouse_Address_Coordinates from "../../../database/models/Warehouse_Address_Coordinates.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Warehouse_Address_CoordinatesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Warehouse_Address_Coordinates;
    }

    static {
        this.configureRequestHandlers();
    }
}
