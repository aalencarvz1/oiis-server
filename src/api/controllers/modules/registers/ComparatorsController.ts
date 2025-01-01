import Comparators from "../../../database/models/Comparators.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ComparatorsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Comparators;
    }

    static {
        this.configureRequestHandlers();
    }
}
