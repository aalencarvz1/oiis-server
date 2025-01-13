import PcSuperv from "../../../../../database/models/winthor/PcSuperv.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcFornecController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcSuperv;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}