import SjdOrigemDeDados from "../../../../../database/models/sjd/SjdOrigemDeDados.js";
import PcDepto from "../../../../../database/models/winthor/PcDepto.js";
import SjdBaseRegistersIntegrationsController from "./SjdBaseRegistersIntegrationsController.js";

export default class SjdOrigemDeDadosController extends SjdBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return SjdOrigemDeDados;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}