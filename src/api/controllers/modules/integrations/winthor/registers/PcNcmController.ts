import PcNcm from "../../../../../database/models/winthor/PcNcm.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcNcmController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcNcm;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}