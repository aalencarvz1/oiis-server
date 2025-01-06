import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import PcVeicul from "../../../../database/models/winthor/PcVeicul.js";

export default class WinthorVehiclesIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcVeicul[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);        
        return await PcVeicul.findAll(queryParams);
    }         
}