import Relationship_Types from "../../../database/models/Relationship_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Relationship_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Relationship_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
