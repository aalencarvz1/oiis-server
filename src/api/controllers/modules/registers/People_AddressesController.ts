import People_Addresses from "../../../database/models/People_Addresses.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class People_AddressesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return People_Addresses;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
