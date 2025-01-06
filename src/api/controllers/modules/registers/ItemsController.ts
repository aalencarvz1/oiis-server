import { Utils } from "sequelize";
import Data_Origins from "../../../database/models/Data_Origins.js";
import Identifier_Types from "../../../database/models/Identifier_Types.js";
import Items from "../../../database/models/Items.js";
import PcProdut from "../../../database/models/winthor/PcProdut.js";
import DataSwap from "../../data/DataSwap.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class ItemsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Items;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
