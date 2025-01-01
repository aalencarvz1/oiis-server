import Addresses from "../../../database/models/Addresses.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class AddressesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Addresses;
    }

    static {
        this.configureRequestHandlers();
    }
}
