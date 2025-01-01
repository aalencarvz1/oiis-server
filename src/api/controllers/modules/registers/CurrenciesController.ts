import Currencies from "../../../database/models/Currencies.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class CurrenciesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Currencies;
    }

    static {
        this.configureRequestHandlers();
    }
}
