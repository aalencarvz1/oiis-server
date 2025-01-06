import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import PcFornec from "../../../../database/models/winthor/PcFornec.js";

export default class WinthorSuppliersIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcFornec[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        return await PcFornec.findAll(queryParams);
    }         
}