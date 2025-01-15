import BaseRegistersIntegrationsController from "../../BaseRegistersIntegrationsController.js";
import SjdEstoque_Origem from "../../../../../database/models/sjd/SjdEstoque_Origem.js";

export default class SjdEstoque_OrigemIntegrationsController extends BaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return SjdEstoque_Origem;
    }  

    static {
        this.configureDefaultRequestHandlers();
    }
}