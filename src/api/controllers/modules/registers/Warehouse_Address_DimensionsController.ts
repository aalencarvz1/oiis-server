import Warehouse_Address_Dimensions from "../../../database/models/Warehouse_Address_Dimensions.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Warehouse_Address_DimensionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Warehouse_Address_Dimensions;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
