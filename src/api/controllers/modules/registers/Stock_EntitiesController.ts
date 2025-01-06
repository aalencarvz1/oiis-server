import Stock_Entities from "../../../database/models/Stock_Entities.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Stock_EntitiesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Stock_Entities;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
