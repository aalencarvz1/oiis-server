import Ncms from "../../../database/models/Ncms.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class NcmsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Ncms;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
