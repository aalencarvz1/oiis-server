import Conditions from "../../../database/models/Conditions.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ConditionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Conditions;
    }

    static {
        this.configureRequestHandlers();
    }
}
