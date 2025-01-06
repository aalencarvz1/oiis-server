import Form_Types from "../../../database/models/Form_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Form_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Form_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
