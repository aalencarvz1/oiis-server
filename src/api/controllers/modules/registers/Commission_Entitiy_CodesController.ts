import Commission_Entitiy_Codes from "../../../database/models/Commission_Entitiy_Codes.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Commission_Entitiy_CodesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Commission_Entitiy_Codes;
    }

    static {
        this.configureRequestHandlers();
    }
}
