import Translates from "../../../database/models/Translates.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class TranslatesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Translates;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
