import Companies from "../../../database/models/Companies.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class CompaniesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Companies;
    }

    static {
        this.configureRequestHandlers();
    }
}
