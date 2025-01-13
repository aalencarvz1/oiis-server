import PcUsuari from "../../../../../database/models/winthor/PcUsuari.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcUsuariController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcUsuari;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}