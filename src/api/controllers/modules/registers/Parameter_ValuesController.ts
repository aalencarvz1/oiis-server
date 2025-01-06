import Parameter_Values from "../../../database/models/Parameter_Values.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Parameter_ValuesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Parameter_Values;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
