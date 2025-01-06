import Campaign_Entities from "../../../database/models/Campaign_Entities.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Campaign_EntitiesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaign_Entities;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
