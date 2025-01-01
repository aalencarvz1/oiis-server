import Apis from "../../../database/models/Apis.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ApisController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Apis;
    }

    static {
        this.configureRequestHandlers();
    }
}
