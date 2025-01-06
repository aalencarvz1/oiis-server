import Schemas from "../../../database/models/Schemas.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class SchemasController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Schemas;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
