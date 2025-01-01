import Project_Item_Origin_Types from "../../../database/models/Project_Item_Origin_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Project_Item_Origin_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Project_Item_Origin_Types;
    }

    static {
        this.configureRequestHandlers();
    }
}
