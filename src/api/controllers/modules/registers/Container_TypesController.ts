import Container_Types from "../../../database/models/Container_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Container_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Container_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
