import Relationship_Values from "../../../database/models/Relationship_Values.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Relationship_ValuesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Relationship_Values;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
