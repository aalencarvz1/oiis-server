import Item_Mov_Xml_Import_Id_Conversions from "../../../database/models/Item_Mov_Xml_Import_Id_Conversions.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class Item_Mov_Xml_Import_Id_ConversionsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Item_Mov_Xml_Import_Id_Conversions;
    }

    static {
        this.configureRequestHandlers();
    }
}
