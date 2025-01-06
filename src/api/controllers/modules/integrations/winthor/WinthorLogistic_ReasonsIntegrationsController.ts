import { Op, Transaction } from "sequelize";
import Countries from "../../../../database/models/Countries.js";
import Utils from "../../../utils/Utils.js";
import Data_Origins from "../../../../database/models/Data_Origins.js";
import DataSwap from "../../../data/DataSwap.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import PcTabDev from "../../../../database/models/winthor/PcTabDev.js";
import DBConnectionManager from "../../../../database/DBConnectionManager.js";
import Logistic_Reasons from "../../../../database/models/Logistic_Reasons.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";

export default class WinthorLogistic_ReasonsIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcTabDev[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        return await PcTabDev.findAll(queryParams);
    }
    
    static async integrateWinthorPcTabDevToLogisticReason(winthorCode?: any,transaction?: Transaction) : Promise<void | Countries> {           
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
            return logisticReason;
        } else {
            throw new Error("winthorCode is empty");
        }

    }


    static async integrateWinthorLogisticReasons(params: any) : Promise<DataSwap> {
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
                for(let key in integrations) {
                    await DBConnectionManager.getDefaultDBConnection()?.transaction(async (transaction) => {
                        let item = await this.integrateWinthorPcTabDevToLogisticReason(integrations[key].CODDEVOL,transaction);
                        if (!item) throw new Error("logistic reason is null as return of integration logistic reason");                     
                        result.data.push(item.dataValues);
                    });
                }
                result.success = true;
            } else {
                throw new Error("not identifiers for integration");
            }
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

}