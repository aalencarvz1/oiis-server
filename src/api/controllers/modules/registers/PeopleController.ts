import People from "../../../database/models/People.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class PeopleController extends BaseRegistersController {
    static getTableClassModel() : any {
        return People;
    }

    static {
        this.configureRequestHandlers();
    }
}
