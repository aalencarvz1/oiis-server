import Packs_X_Packs_Origins from "../../../database/models/Packs_X_Packs_Origins.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Packs_X_Packs_OriginsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Packs_X_Packs_Origins;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
