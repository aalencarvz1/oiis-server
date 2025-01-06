import Groups_Items from "../../../database/models/Groups_Items.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Groups_ItemsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Groups_Items;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
