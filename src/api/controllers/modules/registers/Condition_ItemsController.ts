import Condition_Items from "../../../database/models/Condition_Items.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Condition_ItemsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Condition_Items;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
