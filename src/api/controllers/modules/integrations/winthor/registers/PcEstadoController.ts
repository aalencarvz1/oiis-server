import { Transaction } from "sequelize";
import PcEstado from "../../../../../database/models/winthor/PcEstado.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import States from "../../../../../database/models/States.js";
import Utils from "../../../../utils/Utils.js";
import Countries from "../../../../../database/models/Countries.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import DataSwap from "../../../../data/DataSwap.js";
import PcPaisController from "./PcPaisController.js";

export default class PcEstadoController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcEstado;
    }  

    static async integrate(winthorStateCode?: string,transaction?: Transaction) : Promise<DataSwap> {           
        let result = new DataSwap();
        try {
            if (Utils.hasValue(winthorStateCode)) {
                let pcestado = await PcEstado.findOne({
                    raw : true,
                    where:{
                        UF:winthorStateCode
                    },
                });
                if (!pcestado) throw new Error(`state not found in pcestado: ${winthorStateCode}`);

                let country : any = await Countries.findOne({
                    raw:true,
                    where:{
                        id:pcestado.CODPAIS
                    }
                });

                if (!country) {
                    country = await PcPaisController.integrate(pcestado.CODPAIS);
                    if (!country?.success) {
                        country?.throw();
                    } else {
                        country = country.data;
                    }
                }
                                        
                let queryParams : any = {
                    where: {
                        country_id: country.id,
                        sigla: pcestado.UF
                    }
                };
                if (transaction) queryParams.transaction = transaction;

                let state : any = await States.findOne(queryParams);
                let options : any = {};
                if (transaction) options.transaction = transaction;

                //try preserve winthor code, if unique or primary key viloated, then raise exception here
                if (state) {
                    if (state.name != pcestado.ESTADO) {
                        state.name = pcestado.ESTADO;
                        await state.save(options);                
                    }
                } else {
                    state = await States.create({                    
                        data_origin_id: Data_Origins.WINTHOR,
                        country_id: country.id,
                        name: pcestado.ESTADO,
                        sigla: pcestado.UF
                    },options)
                }
                result.data = state;
                result.success = true;
            } else {
                throw new Error("winthorStateCode is empty");
            }
        } catch(e: any) {
            result.setException(e);
        }
        return result;
    }


    static async integrateMultiples(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || params || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                result.data = [];
                let hasFail = false;
                for(let key in identifiers) {
                    let resultTemp = await this.integrate(identifiers[key]);
                    if (resultTemp.success) {
                        result.data.push(resultTemp.data);
                    } else {
                        hasFail = true;
                        result.setException(resultTemp.exception);
                    }
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