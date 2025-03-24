import PcRotuloItem from "../../../../../database/models/winthor/PcRotuloItem.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcRotuloItemController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcRotuloItem;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}