import Commission_Items from "../../../database/models/Commission_Items.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Commission_ItemsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Commission_Items;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
