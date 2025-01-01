import Countries from "../../../database/models/Countries.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class CountriesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Countries;
    }

    static {
        this.configureRequestHandlers();
    }
}
