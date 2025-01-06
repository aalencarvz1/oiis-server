import Financial_Value_Localization_Types from "../../../database/models/Financial_Value_Localization_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Financial_Value_Localization_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Financial_Value_Localization_Types;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
