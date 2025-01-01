import Report_Visions from "../../../database/models/Report_Visions.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Report_VisionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Report_Visions;
    }

    static {
        this.configureRequestHandlers();
    }
}
