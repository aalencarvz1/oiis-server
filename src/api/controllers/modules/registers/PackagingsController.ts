import Packagings from "../../../database/models/Packagings.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class PackagingsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Packagings;
    }

    static {
        this.configureRequestHandlers();
    }
}
