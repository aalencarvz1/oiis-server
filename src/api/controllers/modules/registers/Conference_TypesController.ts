import Conference_Types from "../../../database/models/Conference_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Conference_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Conference_Types;
    }

    static {
        this.configureRequestHandlers();
    }
}
