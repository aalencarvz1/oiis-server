import Texts from "../../../database/models/Texts.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class TextsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Texts;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
