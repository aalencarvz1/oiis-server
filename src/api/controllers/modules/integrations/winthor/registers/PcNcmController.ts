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
            if (Utils.hasValue(queryParams.ncm)) {
                let winthorData = await PcNcm.findOne({
                    where:{
                        CODNCM: queryParams.ncm,
                        CODEX: queryParams.exception||null
                    }
                });
                if (!winthorData && (
                    Utils.hasValue(queryParams.exception) && Utils.toBool(await Parameter_Values.get(Parameters.WINTHOR_INTEGRATION_NCM_CONSIDER_EXCEPTION_NULL_IF_NOT_EXISTS)) === true
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
                    let ncmString = queryParams.ncm.toString().padStart(8,'0');
                    let codNcmArr : any = [
                        ncmString.slice(0,2),
                        ncmString.slice(2,4),
                        ncmString.slice(4,6),
                        ncmString.slice(6,7),
                        ncmString.slice(7,8)
                    ];

                    queryParams.position = Utils.hasValue(queryParams.position || codNcmArr[1]) ? (queryParams.position || codNcmArr[1])-0 : null;
                    queryParams.subposition = Utils.hasValue(queryParams.subposition || codNcmArr[2]) ? (queryParams.subposition || codNcmArr[2])-0 : null;
                    queryParams.item = Utils.hasValue(queryParams.item || codNcmArr[3]) ? (queryParams.item || codNcmArr[3])-0 : null;
                    queryParams.subitem = Utils.hasValue(queryParams.subitem || codNcmArr[4]) ? (queryParams.subitem || codNcmArr[4])-0 : null;
                    queryParams.exception = Utils.hasValue(queryParams.exception) ? queryParams.exception-0 : null;
                    queryParams.description = queryParams.description || winthorData.DESCRICAO;
                    queryParams.code = queryParams.code || winthorData.CODNCMEX;
                    queryParams.ncm = queryParams.ncm || winthorData.CODNCM;
                    result.data = await Ncms.getOrCreate({
                        raw:true,
                        where:{
                            chapter: queryParams.chapter,
                            position: queryParams.position,
                            subposition: queryParams.subposition,
                            item: queryParams.item,
                            subitem: queryParams.subitem,
                            exception: queryParams.exception
                        },
                        values:{
                            ...queryParams
                        },
                        transaction:params.transaction
                    })
                    if (Utils.hasValue(result.data)) {                    
                        result.success = true;
                    } else {
                        throw new Error(`winthor ncm ${queryParams.ncm}(ex:${queryParams.exception || 'null'}) not integrated`);
                    }
                } else {
                    throw new Error(`winthor ncm ${queryParams.ncm}(ex:${queryParams.exception || 'null'}) not found`);
                }
            } else {
                throw new Error('missing ncm');
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