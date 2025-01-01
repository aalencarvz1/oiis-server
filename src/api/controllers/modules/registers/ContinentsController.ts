import Continents from "../../../database/models/Continents.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ContinentsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Continents;
    }

    static {
        this.configureRequestHandlers();
    }
}
