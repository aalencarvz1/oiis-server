import Projects_Items from "../../../database/models/Projects_Items.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Projects_ItemsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Projects_Items;
    }

    static {
        this.configureRequestHandlers();
    }
}
