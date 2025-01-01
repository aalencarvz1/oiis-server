import Sql_Objects from "../../../database/models/Sql_Objects.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Sql_ObjectsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Sql_Objects;
    }

    static {
        this.configureRequestHandlers();
    }
}
