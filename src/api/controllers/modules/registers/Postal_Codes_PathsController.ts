import Postal_Codes_Paths from "../../../database/models/Postal_Codes_Paths.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Postal_Codes_PathsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Postal_Codes_Paths;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
