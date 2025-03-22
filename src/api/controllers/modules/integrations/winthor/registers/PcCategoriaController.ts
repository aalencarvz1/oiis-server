import PcCategoria from "../../../../../database/models/winthor/PcCategoria.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcCategoriaController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcCategoria;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}