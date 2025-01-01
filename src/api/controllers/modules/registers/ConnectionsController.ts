import Connections from "../../../database/models/Connections.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ConnectionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Connections;
    }

    static {
        this.configureRequestHandlers();
    }
}
