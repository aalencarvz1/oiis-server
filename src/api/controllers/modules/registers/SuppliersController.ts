import Suppliers from "../../../database/models/Suppliers.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class SuppliersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Suppliers;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
