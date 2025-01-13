import PcDepto from "../../../../../database/models/winthor/PcDepto.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcDeptoController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcDepto;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}