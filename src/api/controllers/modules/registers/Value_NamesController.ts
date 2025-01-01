import Value_Names from "../../../database/models/Value_Names.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Value_NamesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Value_Names;
    }

    static {
        this.configureRequestHandlers();
    }
}
