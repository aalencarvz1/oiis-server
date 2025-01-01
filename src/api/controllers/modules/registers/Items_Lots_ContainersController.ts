import Items_Lots_Containers from "../../../database/models/Items_Lots_Containers.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Items_Lots_ContainersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Items_Lots_Containers;
    }

    static {
        this.configureRequestHandlers();
    }
}
