import NeighborHoods from "../../../database/models/NeighborHoods.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class NeighborHoodsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return NeighborHoods;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
