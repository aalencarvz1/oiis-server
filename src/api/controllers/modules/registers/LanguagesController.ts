import Languages from "../../../database/models/Languages.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class LanguagesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Languages;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
