import Measurement_Units from "../../../database/models/Measurement_Units.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Measurement_UnitsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Measurement_Units;
    }

    static {
        this.configureRequestHandlers();
    }
}
