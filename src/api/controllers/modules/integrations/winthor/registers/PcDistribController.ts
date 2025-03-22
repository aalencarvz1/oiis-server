import PcDistrib from "../../../../../database/models/winthor/PcDistrib.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcDistribController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcDistrib;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}