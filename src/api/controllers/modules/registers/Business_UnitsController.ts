import Business_Units from "../../../database/models/Business_Units.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Business_UnitsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Business_Units;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
