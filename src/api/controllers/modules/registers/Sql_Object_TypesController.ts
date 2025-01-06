import Sql_Object_Types from "../../../database/models/Sql_Object_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Sql_Object_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Sql_Object_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
