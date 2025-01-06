import Financial_Value_Mov_Types from "../../../database/models/Financial_Value_Mov_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Financial_Value_Mov_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Financial_Value_Mov_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
