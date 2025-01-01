import Routine_Contents from "../../../database/models/Routine_Contents.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Routine_ContentsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Routine_Contents;
    }

    static {
        this.configureRequestHandlers();
    }
}
