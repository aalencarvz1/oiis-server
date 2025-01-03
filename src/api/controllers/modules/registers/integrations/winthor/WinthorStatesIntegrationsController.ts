import { Transaction } from "sequelize";
import States from "../../../../../database/models/States.js";
import Utils from "../../../../utils/Utils.js";
import PcEstado from "../../../../../database/models/winthor/PcEstado.js";
import Countries from "../../../../../database/models/Countries.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import WinthorCountriesIntegrationsController from "./WinthorCountriesIntegrationsController.js";
import IntegrationsRegistersController from "../IntegrationsRegistersController.js";
import DataSwap from "../../../../data/DataSwap.js";

export default class WinthorStatesIntegrationsController extends IntegrationsRegistersController{

    static getTableClassModel() : any {
        return PcEstado;
    }

    static async integrateWinthorPcEstadoToState(winthorStateCode?: string,transaction?: Transaction) : Promise<States> {           
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
                country = await WinthorCountriesIntegrationsController.integrateWinthorPcPaisToCountry(pcestado.CODPAIS);
                if (!country) {
                    throw new Error(`country ${pcestado.CODPAIS} not found`);
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
            return state;
        } else {
            throw new Error("winthorStateCode is empty");
        }

    }


    static async integrateWinthorStates(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || params || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                result.data = [];
                for(let key in identifiers) {
                    result.data.push(await this.integrateWinthorPcEstadoToState(identifiers[key]));
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


    static {
        this.configureRequestHandlers();
    }
}