import PcVeicul from "../../../../../database/models/winthor/PcVeicul.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcVeiculController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcVeicul;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}