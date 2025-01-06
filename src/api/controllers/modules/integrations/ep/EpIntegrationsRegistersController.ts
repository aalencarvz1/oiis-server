import { Op, Sequelize } from "sequelize";
import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import EpPessoas from "../../../../database/models/ep/EpPessoas.js";
import Data_Origins from "../../../../database/models/Data_Origins.js";
import Identifier_Types from "../../../../database/models/Identifier_Types.js";
import EpClientes from "../../../../database/models/ep/EpClientes.js";
import Access_Profiles from "../../../../database/models/Access_Profiles.js";
import Relationships from "../../../../database/models/Relationships.js";
import Relationship_Types from "../../../../database/models/Relationship_Types.js";
import Users from "../../../../database/models/Users.js";
import EpTrabalhadores from "../../../../database/models/ep/EpTrabalhadores.js";
import EpVendedores from "../../../../database/models/ep/EpVendedores.js";

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-25-08
 */
export default class EpIntegrationsRegistersController extends BaseIntegrationsRegistersController{

    static async getSellersIds(params?: any) : Promise<any> {
        let result : any = null;
        if (params?.user.access_profile_id == Access_Profiles.SUPERVISOR) {
            let dataRel = await Relationships.findAll({
                raw:true,
                where:{
                    relationship_type_id: [Relationship_Types.EP_ID],
                    table_1_id: Users.id,
                    record_1_id: params.user.id,
                    table_2_id: EpTrabalhadores.id
                }
            });
            if (dataRel && dataRel.length) {
                dataRel = dataRel.map((el: any)=>el.record_2_id);
                let sellers = await EpVendedores.findAll({
                    raw:true,
                    attributes:[
                        [Sequelize.col(`${EpVendedores.tableName}.COD`),'COD']
                    ],
                    include:[{
                        required:true,
                        model:EpTrabalhadores,
                        attributes:[],
                        on:[
                            Sequelize.where(Sequelize.col(`${EpTrabalhadores.tableName}.COD`),Sequelize.col(`${EpVendedores.tableName}.CODTRABALHADOR`)),
                            Sequelize.where(Sequelize.col(`${EpTrabalhadores.tableName}.CODSUP`),'in',dataRel),
                        ]
                    }],
                    where:{
                        CONTABILIZARVENDAS:1
                    }
                });
                if (sellers && sellers.length) {
                    result = sellers.map((el: any)=>el.COD).join(',');
                }
            }
        } else {
            let dataRel = await Relationships.findAll({
                raw:true,
                where:{
                    relationship_type_id: [Relationship_Types.EP_ID],
                    table_1_id: Users.id,
                    record_1_id: params?.user.id ,
                    table_2_id: EpVendedores.id
                }
            });
            if (Utils.hasValue(dataRel)) {
                result = dataRel.map((el: any)=>el.record_2_id).join(',');
            }
        }

        if (Utils.hasValue(params?.sellers_ids || params?.body?.seller_ids)) {
            if (Utils.hasValue(result)) {                
                let seller_ids : any = Utils.toArray(params?.sellers_ids || params?.body?.seller_ids);
                let resultTemp : any = Utils.toArray(result);
                seller_ids = seller_ids.filter((el: any)=>resultTemp.indexOf(el) > -1);
                result = seller_ids.join(',');                
            } else {
                result = Utils.toArray(params?.sellers_ids || params?.body?.seller_ids)?.join(',');
            }
        }
        if (!Utils.hasValue(result)) {         
            result = `select ev.cod from EP.EPVENDEDORES ev`;
        }
        return result;
    }
}