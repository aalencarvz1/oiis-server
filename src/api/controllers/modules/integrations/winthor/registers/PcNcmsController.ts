import Data_Origins from "../../../../../database/models/Data_Origins.js";
import Ncms from "../../../../../database/models/Ncms.js";
import Parameter_Values from "../../../../../database/models/Parameter_Values.js";
import Parameters from "../../../../../database/models/Parameters.js";
import PcNcm from "../../../../../database/models/winthor/PcNcm.js";
import DataSwap from "../../../../data/DataSwap.js";
import Utils from "../../../../utils/Utils.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";

export default class PcNcmController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcNcm;
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
    
    static {
        this.configureDefaultRequestHandlers();
    }
}