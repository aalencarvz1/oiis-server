import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import PcNcm from "../../../../database/models/winthor/PcNcm.js";
import DataSwap from "../../../data/DataSwap.js";
import Parameter_Values from "../../../../database/models/Parameter_Values.js";
import Parameters from "../../../../database/models/Parameters.js";
import Data_Origins from "../../../../database/models/Data_Origins.js";
import Ncms from "../../../../database/models/Ncms.js";

export default class WinthorNcmsIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcNcm[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);        
        return await PcNcm.findAll(queryParams);
    }    
    
    
    static async integrate(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params || {};
            let winthorData = await PcNcm.findOne({
                where:{
                    CODNCM: queryParams.ncm,
                    CODEX: queryParams.exception||null
                }
            });
            if (!winthorData && (
                Utils.hasValue(queryParams.exception) && Utils.toBool(await Parameter_Values.get(Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS)) == true
            )) { 
                winthorData = await PcNcm.findOne({
                    where:{
                        CODNCM: queryParams.ncm,
                        CODEX: null
                    },
                    transaction:params.transaction
                });
            }
            if (winthorData) {
                queryParams.data_origin_id = Data_Origins.WINTHOR;
                queryParams.chapter = queryParams.chapter || winthorData.CAPITULO;
                queryParams.description = queryParams.description || winthorData.DESCRICAO;
                result.data = await Ncms.create(queryParams,{transaction:params.transaction});
                if (result.data) {
                    result.data = result.data.dataValues;
                    result.success = true;
                }
            } else {
                throw new Error(`winthor ncm ${queryParams.ncm}(ex:${queryParams.exception || 'null'}) not found`);
            }
        } catch (e) {
            result.setException(e);
        }
        return result;
    }
}