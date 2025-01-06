import Permissions from "../../../database/models/Permissions.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class PermissionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Permissions;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
