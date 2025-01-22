import Companies from "../../../database/models/Companies.js";
import BasePeopleRegistersController from "./BasePopleRegistersController.js";

export default class CompaniesController extends BasePeopleRegistersController {
    static getTableClassModel() : any {
        return Companies;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
