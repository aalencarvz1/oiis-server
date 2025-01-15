import PcFornec from "../../../../../database/models/winthor/PcFornec.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcFornecController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcFornec;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}