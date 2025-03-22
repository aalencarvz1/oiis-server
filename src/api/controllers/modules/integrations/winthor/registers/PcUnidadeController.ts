import PcUnidade from "../../../../../database/models/winthor/PcUnidade.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcUnidadeController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcUnidade;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}