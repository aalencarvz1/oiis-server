import Stock_Entity_Relationship_Types from "../../../database/models/Stock_Entity_Relationship_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Stock_Entity_Relationship_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Stock_Entity_Relationship_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
