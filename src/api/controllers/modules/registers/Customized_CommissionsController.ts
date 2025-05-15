import BaseRegistersController from "./BaseRegistersController.js";
import Customized_Commissions from "../../../database/models/Customized_Commissions.js";


export default class Customized_CommissionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Customized_Commissions;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
