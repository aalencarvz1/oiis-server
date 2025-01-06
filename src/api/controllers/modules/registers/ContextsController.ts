import Contexts from "../../../database/models/Contexts.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ContextsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Contexts;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
