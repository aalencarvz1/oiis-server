import Integration_Rules from "../../../database/models/Integration_Rules.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Integration_RulesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Integration_Rules;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
