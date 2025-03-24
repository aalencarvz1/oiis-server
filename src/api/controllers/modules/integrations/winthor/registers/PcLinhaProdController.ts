import PcLinhaProd from "../../../../../database/models/winthor/PcLinhaProd.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcLinhaProdController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcLinhaProd;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}