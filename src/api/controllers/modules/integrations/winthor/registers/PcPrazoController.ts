import PcPrazo from "../../../../../database/models/winthor/PcPrazo.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcPrazoController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcPrazo;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}