import Container_Type_Capacities from "../../../database/models/Container_Type_Capacities.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Container_Type_CapacitiesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Container_Type_Capacities;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
