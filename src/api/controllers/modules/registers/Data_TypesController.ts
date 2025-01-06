import Data_Types from "../../../database/models/Data_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Data_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Data_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
