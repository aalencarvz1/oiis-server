import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import PcSuperv from "../../../../database/models/winthor/PcSuperv.js";

export default class WinthorSupervisorsIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcSuperv[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        return await PcSuperv.findAll(queryParams);
    }         
}