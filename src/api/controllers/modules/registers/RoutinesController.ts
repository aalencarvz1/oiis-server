import Routines from "../../../database/models/Routines.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class RoutinesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Routines;
    }

    static {
        this.configureRequestHandlers();
    }
}
