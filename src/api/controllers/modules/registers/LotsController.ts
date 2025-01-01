import Lots from "../../../database/models/Lots.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class LotsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Lots;
    }

    static {
        this.configureRequestHandlers();
    }
}
