import Relationships from "../../../database/models/Relationships.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class RelationshipsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Relationships;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
