import Movement_Entity_Relationship_Types from "../../../database/models/Movement_Entity_Relationship_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Movement_Entity_Relationship_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Movement_Entity_Relationship_Types;
    }

    static {
        this.configureRequestHandlers();
    }
}
