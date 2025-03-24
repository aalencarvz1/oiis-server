import PcMarca from "../../../../../database/models/winthor/PcMarca.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcMarcaController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcMarca;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}