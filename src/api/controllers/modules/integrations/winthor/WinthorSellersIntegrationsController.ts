import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import PcUsuari from "../../../../database/models/winthor/PcUsuari.js";

export default class WinthorSellersIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcUsuari[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        return await PcUsuari.findAll(queryParams);
    }         
}