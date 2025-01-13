import { Op, Transaction } from "sequelize";
import PcTabDev from "../../../../../database/models/winthor/PcTabDev.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import DataSwap from "../../../../data/DataSwap.js";
import Utils from "../../../../utils/Utils.js";
import Logistic_Reasons from "../../../../../database/models/Logistic_Reasons.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";

export default class PcTabDevController extends WinthorBaseRegistersIntegrationsController {
    static getTableClassModel() : any {
        return PcTabDev;
    }

    static async integrate(winthorCode?: any,transaction?: Transaction) : Promise<DataSwap> {   
        let result = new DataSwap();       
        try {
            if (Utils.hasValue(winthorCode)) {
                
                let pcTabDev = await PcTabDev.findOne({
                    raw:true,
                    where:{
                        CODDEVOL: winthorCode
                    }
                });

                if (!pcTabDev) throw new Error(`coddevol not found in PCTABDEV: ${winthorCode}`);           

                let queryParams : any = {
                    where:{
                        id:winthorCode
                    }
                };
                if (transaction) queryParams.transaction = transaction;
                
                let logisticReason : any = await Logistic_Reasons.findOne(queryParams);
                let options : any = {};
                if (transaction) options.transaction = transaction;            

                //preserve winthor code, if violate primary key or unique, raise here
                if (logisticReason) {
                    if (logisticReason.name != pcTabDev.MOTIVO) logisticReason.name = pcTabDev.MOTIVO;
                    if (logisticReason.mov_type_sigla != pcTabDev.TIPO) logisticReason.mov_type_sigla = pcTabDev.TIPO;            
                    await logisticReason.save(options);
                } else {
                    logisticReason = await Logistic_Reasons.create({
                        id: pcTabDev.CODDEVOL,
                        data_origin_id: Data_Origins.WINTHOR,
                        id_at_origin: pcTabDev.CODDEVOL,                    
                        name: pcTabDev.MOTIVO,
                        mov_type_sigla: pcTabDev.TIPO
                    },options);
                }
                result.data = logisticReason;
                result.success = true;
            } else {
                throw new Error("winthorCode is empty");
            }
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }


    static async integrateMultiples(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                identifiers = identifiers.map((el: any)=>Utils.hasValue(el)?el:'null');
                result.data = [];
                let integrations = await PcTabDev.findAll({
                    raw:true,
                    where:{
                        CODDEVOL : {
                            [Op.in] : identifiers
                        }
                    }
                });
                if (!integrations || !integrations?.length) throw new Error(`identifiers not found: ${identifiers.join(',')}`);
                let hasFail = false;
                for(let key in integrations) {
                    await DBConnectionManager.getDefaultDBConnection()?.transaction(async (transaction) => {
                        let integrateResult = await this.integrate(integrations[key].CODDEVOL,transaction);
                        if (integrateResult.success) {
                            result.data.push(integrateResult.data);
                        } else {
                            hasFail = true;
                            result.setException(integrateResult.exception);
                        }
                        
                    });
                }
                result.success = !hasFail;
            } else {
                throw new Error("not identifiers for integration");
            }
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
