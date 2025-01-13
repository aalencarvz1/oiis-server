import PcEmpr from "../../../../../database/models/winthor/PcEmpr.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcEmprController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcEmpr;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}