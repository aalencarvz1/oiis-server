import Logistic_Mov_Types from "../../../database/models/Logistic_Mov_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Logistic_Mov_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logistic_Mov_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
