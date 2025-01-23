import Business_Units from "../../../database/models/Business_Units.js";
import BasePeopleRegistersController from "./BasePopleRegistersController.js";

export default class Business_UnitsController extends BasePeopleRegistersController {
    static getTableClassModel() : any {
        return Business_Units;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
