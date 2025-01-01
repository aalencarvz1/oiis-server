import Cities from "../../../database/models/Cities.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class CitiesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Cities;
    }

    static {
        this.configureRequestHandlers();
    }
}
