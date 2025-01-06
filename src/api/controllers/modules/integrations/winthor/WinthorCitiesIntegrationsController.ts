import { Transaction } from "sequelize";
import Cities from "../../../../database/models/Cities.js";
import Utils from "../../../utils/Utils.js";
import PcCidade from "../../../../database/models/winthor/PcCidade.js";
import States from "../../../../database/models/States.js";
import Data_Origins from "../../../../database/models/Data_Origins.js";
import WinthorStatesIntegrationsController from "./WinthorStatesIntegrationsController.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DataSwap from "../../../data/DataSwap.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";

export default class WinthorCitiesIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcCidade[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        return await PcCidade.findAll(queryParams);
    }
    
    static async integrateWinthorPcCidadeToCity(winthorCityCode?: number,transaction?: Transaction) : Promise<Cities> {           
        if (Utils.hasValue(winthorCityCode)) {
            let pccidade : any = await PcCidade.findOne({
                raw : true,
                where:{
                    CODCIDADE:winthorCityCode
                },
            });
            if (!pccidade) throw new Error(`city not found in pccidade: ${winthorCityCode}`);

            let state = await States.findOne({
                raw:true,
                where:{
                    sigla:pccidade.UF
                }
            });

            if (!state) {
                state = await WinthorStatesIntegrationsController.integrateWinthorPcEstadoToState(pccidade.UF);
                if (!state) {
                    throw new Error(`state ${pccidade.UF} not found`);
                }
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
            return city;
        } else {
            throw new Error("winthorCityCode is empty");
        }
    }


    static async integrateWinthorCities(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || params || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                result.data = [];
                for(let key in identifiers) {
                    result.data.push(await this.integrateWinthorPcCidadeToCity(identifiers[key]));
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