import Streets from "../../../database/models/Streets.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class StreetsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Streets;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
