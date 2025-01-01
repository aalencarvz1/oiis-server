import Meas_X_Meas_Origins from "../../../database/models/Meas_X_Meas_Origins.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Meas_X_Meas_OriginsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Meas_X_Meas_Origins;
    }

    static {
        this.configureRequestHandlers();
    }
}
