import Postal_Codes_Streets from "../../../database/models/Postal_Codes_Streets.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Postal_Codes_StreetsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Postal_Codes_Streets;
    }

    static {
        this.configureRequestHandlers();
    }
}
