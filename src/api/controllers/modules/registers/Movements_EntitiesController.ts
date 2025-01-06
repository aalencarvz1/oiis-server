import Movements_Entities from "../../../database/models/Movements_Entities.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Movements_EntitiesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Movements_Entities;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
