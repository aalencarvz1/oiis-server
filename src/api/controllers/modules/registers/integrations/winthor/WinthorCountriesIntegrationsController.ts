import { Transaction } from "sequelize";
import Countries from "../../../../../database/models/Countries.js";
import Utils from "../../../../utils/Utils.js";
import PcPais from "../../../../../database/models/winthor/PcPais.js";
import Continents from "../../../../../database/models/Continents.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import DataSwap from "../../../../data/DataSwap.js";
import IntegrationsRegistersController from "../IntegrationsRegistersController.js";

export default class WinthorCountriesIntegrationsController extends IntegrationsRegistersController{

    static getTableClassModel() : any {
        return PcPais;
    }


    static async integrateWinthorPcPaisToCountry(winthorCountryCode?: number,transaction?: Transaction) : Promise<void | Countries> {           
        if (Utils.hasValue(winthorCountryCode)) {
            let pcpais = await PcPais.findOne({
                raw : true,
                where:{
                    CODPAIS:winthorCountryCode
                },
            });
            if (!pcpais) throw new Error(`country not found in pcpais: ${winthorCountryCode}`);

            let continent = await Continents.findOne({
                raw:true,
                where:{
                    id:Continents.SOUTH_AMERICA
                }
            });

            if (!continent) {
                continent = await Continents.create({
                    id: Continents.SOUTH_AMERICA,
                    sigla: 'AL',
                    name: 'SOUTH AMERICA'
                });
            }
                                       
            let queryParams : any = {
                where: {
                    continent_id: continent.id,
                    id: winthorCountryCode
                }
            };
            if (transaction) queryParams.transaction = transaction;

            let country : any = await Countries.findOne(queryParams);
            let options : any = {};
            if (transaction) options.transaction = transaction;

            //try preserve winthor code, if unique or primary key viloated, then raise exception here
            if (country) {
                if (country.name != pcpais.DESCRICAO) {
                    country.name = pcpais.DESCRICAO;
                    await country.save(options);                
                }
            } else {
                country = await Countries.create({                    
                    id : winthorCountryCode,
                    data_origin_id: Data_Origins.WINTHOR,
                    continent_id: continent.id,
                    name: pcpais.DESCRICAO,
                    sigla: pcpais.DESCRICAO.substring(0,2)
                },options)
            }
            return country;
        } else {
            throw new Error("winthorCountryCode is empty");
        }

    }


    static async integrateWinthorCountries(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || params || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                result.data = [];
                for(let key in identifiers) {
                    result.data.push(await this.integrateWinthorPcPaisToCountry(identifiers[key]));
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