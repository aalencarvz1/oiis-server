import Tables from "../../../database/models/Tables.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class TablesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Tables;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
