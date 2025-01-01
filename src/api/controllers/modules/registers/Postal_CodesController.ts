import Postal_Codes from "../../../database/models/Postal_Codes.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Postal_CodesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Postal_Codes;
    }

    static {
        this.configureRequestHandlers();
    }
}
