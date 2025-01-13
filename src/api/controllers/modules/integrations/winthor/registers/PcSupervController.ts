import PcSuperv from "../../../../../database/models/winthor/PcSuperv.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcSupervController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcSuperv;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}