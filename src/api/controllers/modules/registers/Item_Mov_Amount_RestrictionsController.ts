import Item_Mov_Amount_Restrictions from "../../../database/models/Item_Mov_Amount_Restrictions.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Item_Mov_Amount_RestrictionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Item_Mov_Amount_Restrictions;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
