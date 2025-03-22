import PcSecao from "../../../../../database/models/winthor/PcSecao.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcSecaoController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcSecao;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}