import Container_Type_Dimensions from "../../../database/models/Container_Type_Dimensions.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Container_Type_DimensionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Container_Type_Dimensions;
    }

    static {
        this.configureRequestHandlers();
    }
}
