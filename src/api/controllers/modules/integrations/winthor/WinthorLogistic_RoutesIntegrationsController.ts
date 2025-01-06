import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import PcRotaExp from "../../../../database/models/winthor/PcRotaExp.js";

export default class WinthorLogistic_RoutesIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcRotaExp[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        return await PcRotaExp.findAll(queryParams);
    }         
}