import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import PcEmpr from "../../../../database/models/winthor/PcEmpr.js";

export default class WinthorDriversIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcEmpr[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);        
        return await PcEmpr.findAll(queryParams);
    }         
}