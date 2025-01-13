import PcProdut from "../../../../database/models/winthor/PcProdut.js";
import BaseIntegrationsController from "../BaseIntegrationsController.js";

export default class PcProdutController extends BaseIntegrationsController{
    static getTableClassModel() : any {
        return PcProdut;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}