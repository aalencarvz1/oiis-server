import Movements from "../../../database/models/Movements.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class MovementsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Movements;
    }

    static {
        this.configureRequestHandlers();
    }
}
