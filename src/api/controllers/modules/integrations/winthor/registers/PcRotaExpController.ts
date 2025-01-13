import PcRotaExp from "../../../../../database/models/winthor/PcRotaExp.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcRotaExpController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcRotaExp;
    }  
    
    static {
        this.configureDefaultRequestHandlers();
    }
}