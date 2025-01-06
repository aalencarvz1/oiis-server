import Items from "../../../database/models/Items.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ItemsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Items;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
