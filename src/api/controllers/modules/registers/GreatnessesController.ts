import Greatnesses from "../../../database/models/Greatnesses.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class GreatnessesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Greatnesses;
    }

    static {
        this.configureRequestHandlers();
    }
}
