import Utils from "../../../utils/Utils.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import DataSwap from "../../../data/DataSwap.js";
import Data_Origins from "../../../../database/models/Data_Origins.js";
import Identifier_Types from "../../../../database/models/Identifier_Types.js";
import Ncms from "../../../../database/models/Ncms.js";
import Items from "../../../../database/models/Items.js";
import DBConnectionManager from "../../../../database/DBConnectionManager.js";
import { QueryTypes } from "sequelize";
import EpProdutos from "../../../../database/models/ep/EpProdutos.js";
import BaseRegistersIntegrationsController from "../BaseRegistersIntegrationsController.js";
import PcNcmController from "../winthor/registers/PcNcmController.js";


export default class AuroraItemsIntegrationsController extends BaseRegistersIntegrationsController{

    static async _get(params?:any) : Promise<void | EpProdutos[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        queryParams.where = queryParams.where || {};
        queryParams.where.codorigeminfo = 1;
        return await EpProdutos.findAll(queryParams);
    }  
    
    
    static async integrate(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params || {};
            let query = `
                select
                * 
                from
                EP.EPPRODUTOS
                where
                codorigeminfo = 1
                and cod = ${queryParams.id_at_origin || queryParams.item_id || queryParams.id || queryParams.CODPROD}
            `;
            let auroraData : any = await DBConnectionManager.getConsultDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});

            if (auroraData && auroraData.length) 
                auroraData = auroraData[0];
            if (!Utils.hasValue(auroraData)) {
                query = `
                select
                    * 
                from
                    EP.EPPRODUTOS
                where
                    cod = ${queryParams.id_at_origin || queryParams.item_id || queryParams.id || queryParams.CODPROD}
                `;
                auroraData = await DBConnectionManager.getConsultDBConnection()?.query(query,{raw:true,type: QueryTypes.SELECT});
                if (auroraData && auroraData.length) 
                    auroraData = auroraData[0];
            }
            if (Utils.hasValue(auroraData)) {
                queryParams.data_origin_id = Data_Origins.AURORA;
                queryParams.id_at_origin = queryParams.id_at_origin || auroraData.COD;
                queryParams.identifier_type_id = queryParams.identifier_type_id || Identifier_Types.CODE;
                queryParams.identifier = queryParams.identifier || auroraData.COD;
                if (!Utils.hasValue(queryParams.ncm_id)) {
                    let ncm = await Ncms.getOrCreate({
                        raw:true,
                        where:{
                            id: 1
                        },
                        values:{
                            chapter:1,
                            code: 1,
                            description: '1'
                        },
                        transaction:params.transaction,
                        createMethod: PcNcmController.integrate
                    });
                    queryParams.ncm_id = ncm.id;
                }
                queryParams.name = queryParams.name || auroraData.DESCRICAO;
                queryParams.description = queryParams.description;
                queryParams.default_expiration_time = queryParams.default_expiration_time || 1;
                result.data = await Items.create(queryParams,{transaction:params.transaction});
                if (result.data) {
                    result.data = result.data.dataValues;
                    result.success = true;
                }
            } else {
                throw new Error(`aurora item ${queryParams.id_at_origin || queryParams.item_id || queryParams.id || queryParams.CODPROD} not found`)
            }
        } catch (e) {
            result.setException(e);
        }
        return result;
    }

}