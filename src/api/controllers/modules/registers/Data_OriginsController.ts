import Data_Origins from "../../../database/models/Data_Origins.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Data_OriginsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Data_Origins;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
