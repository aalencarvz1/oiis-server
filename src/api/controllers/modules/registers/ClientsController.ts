import Clients from "../../../database/models/Clients.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ClientsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Clients;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
