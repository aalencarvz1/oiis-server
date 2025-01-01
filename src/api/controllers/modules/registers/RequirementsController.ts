import Requirements from "../../../database/models/Requirements.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class RequirementsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Requirements;
    }

    static {
        this.configureRequestHandlers();
    }
}
