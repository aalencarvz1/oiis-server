import Commission_Values from "../../../database/models/Commission_Values.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Commission_ValuesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Commission_Values;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
