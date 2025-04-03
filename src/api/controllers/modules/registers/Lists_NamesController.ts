import Lists_Names from "../../../database/models/Lists_Names.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Lists_NamesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Lists_Names;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
