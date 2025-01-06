import Financial_Value_Forms from "../../../database/models/Financial_Value_Forms.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Financial_Value_FormsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Financial_Value_Forms;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
