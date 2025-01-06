import Parameters from "../../../database/models/Parameters.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ParametersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Parameters;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
