import { Transaction } from "sequelize";
import PcCidade from "../../../../../database/models/winthor/PcCidade.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import Cities from "../../../../../database/models/Cities.js";
import Utils from "../../../../utils/Utils.js";
import States from "../../../../../database/models/States.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import DataSwap from "../../../../data/DataSwap.js";
import PcEstadoController from "./PcEstadoController.js";

export default class PcCidadeController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcCidade;
    }  


    static async integrate(winthorCityCode?: number,transaction?: Transaction) : Promise<DataSwap> {           
        let result = new DataSwap();
        try {
            if (Utils.hasValue(winthorCityCode)) {
                let pccidade : any = await PcCidade.findOne({
                    raw : true,
                    where:{
                        CODCIDADE:winthorCityCode
                    },
                });
                if (!pccidade) throw new Error(`city not found in pccidade: ${winthorCityCode}`);

                let state : any = await States.findOne({
                    raw:true,
                    where:{
                        sigla:pccidade.UF
                    }
                });

                if (!state) {
                    let stateIntegrateResult = await PcEstadoController.integrate(pccidade.UF);
                    if (!stateIntegrateResult?.success) {
                        stateIntegrateResult?.throw();
                    }
                    state = stateIntegrateResult.data;
                }
                                        
                let queryParams : any = {
                    where: {
                        state_id: state.id,
                        id: winthorCityCode
                    }
                };
                if (transaction) queryParams.transaction = transaction;

                let city : any = await Cities.findOne(queryParams);
                let options : any = {};
                if (transaction) options.transaction = transaction;

                //try preserve winthor code, if unique or primary key viloated, then raise exception here
                if (city) {
                    if (city.name != pccidade.NOMECIDADE) {
                        city.name = pccidade.NOMECIDADE;
                        await city.save(options);                
                    }
                } else {
                    city = await Cities.create({   
                        id:pccidade.CODCIDADE,                 
                        data_origin_id: Data_Origins.WINTHOR,
                        id_at_origin: pccidade.CODCIDADE,
                        state_id: state.id,
                        name: pccidade.NOMECIDADE,
                        population: pccidade.POPULACAO,
                        latitude: pccidade.latitude,
                        longitude: pccidade.longitude
                    },options)
                }
                result.data = city;
                result.success = true;
            } else {
                throw new Error("winthorCityCode is empty");
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