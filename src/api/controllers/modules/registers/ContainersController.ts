import Containers from "../../../database/models/Containers.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ContainersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Containers;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
