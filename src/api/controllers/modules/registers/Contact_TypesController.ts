import Contact_Types from "../../../database/models/Contact_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Contact_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Contact_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
