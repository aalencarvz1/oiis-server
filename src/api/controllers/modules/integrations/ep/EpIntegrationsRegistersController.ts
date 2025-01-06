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


    /*************************************************
     * INIT PEOPLE INTEGRATIONS
     *************************************************/    
    static async getPeopleByIdentifiersDocs(identifiersDocs?: any, options?: any): Promise<any> {
        let result = null;
        try {
            if (identifiersDocs) {
                if (Utils.typeOf(identifiersDocs) != 'array') identifiersDocs = identifiersDocs.toString().split(',');
                let whereIdentifiersDocs = identifiersDocs.map((el: any)=>{
                    let r : any = {};
                    let and = [];
                    if (typeof el == 'object') {
                        if (el.CODTIPODOCIDENTIFICADOR) {
                            and.push(Sequelize.where(
                                Sequelize.col(`CODTIPODOCIDENTIFICADOR`),
                                el.CODTIPODOCIDENTIFICADOR
                            ));
                        }
                        if (el.CODDOCIDENTIFICADOR) {
                            and.push(Sequelize.where(
                                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CODDOCIDENTIFICADOR'),'[^0-9]',''),'DECIMAL(32)'),
                                '=',
                                Sequelize.cast(Sequelize.fn('regexp_replace',el.CODDOCIDENTIFICADOR,'[^0-9]',''),'DECIMAL(32)')
                            ));
                        }
                    } else {
                        and.push(Sequelize.where(
                            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CODDOCIDENTIFICADOR'),'[^0-9]',''),'DECIMAL(32)'),
                            '=',
                            Sequelize.cast(Sequelize.fn('regexp_replace',el,'[^0-9]',''),'DECIMAL(32)')
                        ));
                    }
                    r[Op.and] = and;
                    return r;
                });

                let findParams : any = {
                    raw:true,
                    where:{
                        [Op.or]:whereIdentifiersDocs
                    }
                };
                if (options && options?.attributes) {
                    findParams.attributes = options.attributes;
                }
                result = await EpPessoas.findAll(findParams);
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }

    static async getPeopleByIdentifierDocToIntegrate(identifiersDocs?: any) : Promise<any> {
        let result = null;
        try {
            result = await EpIntegrationsRegistersController.getPeopleByIdentifiersDocs(
                identifiersDocs,{
                    attributes:[
                        ['COD','id'],
                        [Sequelize.literal(`${Data_Origins.EP}`),'data_origin_id'],
                        ['COD','id_at_origin'],
                        [Sequelize.literal(`case when EPPESSOAS.CODTIPODOCIDENTIFICADOR = 1 AND LENGTH(EPPESSOAS.CODDOCIDENTIFICADOR) <= 11 then ${Identifier_Types.CPF} else ${Identifier_Types.CNPJ} end`),'identifier_doc_type_id'],
                        [Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CODDOCIDENTIFICADOR'),'[^0-9]',''),'DECIMAL(32)'),'identifier_doc'],
                        ['NOMERAZAO','name'],
                        ['FANTASIA','fantasy']
                    ]
                }
            )
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }     
    /*************************************************
     * END PEOPLE INTEGRATIONS
     *************************************************/    




    /*************************************************
     * INIT CLIENTS INTEGRATIONS
     *************************************************/    
    static async getClientsByIdentifiersDocs(identifiersDocs?: any, options?: any) : Promise<any> {
        let result = null;
        try {
            if (identifiersDocs) {
                if (Utils.typeOf(identifiersDocs) != 'array') identifiersDocs = identifiersDocs.toString().split(',');
                let whereIdentifiersDocs = identifiersDocs.map((el: any)=>{
                    let r : any = {};
                    let and = [];
                    if (typeof el == 'object') {
                        if (el.CODTIPODOCIDENTIFICADOR) {
                            and.push(Sequelize.where(
                                Sequelize.col(`${EpPessoas.tableName}.CODTIPODOCIDENTIFICADOR`),
                                el.CODTIPODOCIDENTIFICADOR
                            ));
                        }
                        if (el.CODDOCIDENTIFICADOR) {
                            and.push(Sequelize.where(
                                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`${EpPessoas.tableName}.CODDOCIDENTIFICADOR`),'[^0-9]',''),'DECIMAL(32)'),
                                '=',
                                Sequelize.cast(Sequelize.fn('regexp_replace',el.CODDOCIDENTIFICADOR,'[^0-9]',''),'DECIMAL(32)')
                            ));
                        }
                    } else {
                        and.push(Sequelize.where(
                            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col(`${EpPessoas.tableName}.CODDOCIDENTIFICADOR`),'[^0-9]',''),'DECIMAL(32)'),
                            '=',
                            Sequelize.cast(Sequelize.fn('regexp_replace',el,'[^0-9]',''),'DECIMAL(32)')
                        ));
                    }
                    r[Op.and] = and;
                    return r;
                });
                //EpClientes.initAssociations();
                let findParams : any = {
                    raw:true,
                    where:{
                        [Op.or]:whereIdentifiersDocs
                    },
                    include:[{
                        raw:true,
                        required:true,
                        model:EpPessoas,
                        attributes:[],
                        on:{
                            [Op.and]: [
                                Sequelize.where(Sequelize.col(`${EpPessoas.tableName}.COD`), Sequelize.col(`${EpClientes.tableName}.CODPESSOA`))
                            ]
                        }
                    }]
                };
                if (options && options?.attributes) {
                    findParams.attributes = options.attributes;
                }
                result = await EpClientes.findAll(findParams);
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }


    static async getClientsByIdentifierDocToIntegrate(identifiersDocs?: any) : Promise<any> {
        let result = null;
        try {
            result = await EpIntegrationsRegistersController.getClientsByIdentifiersDocs(
                identifiersDocs,{
                    attributes:[
                        ['COD','id'],
                        [Sequelize.literal(`${Data_Origins.EP}`),'data_origin_id'],
                        ['CODPESSOA','id_at_origin'],
                        ['CODPESSOA','people_id']
                    ]
                }
            )
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    } 
    /*************************************************
     * END CLIENTS INTEGRATIONS
     *************************************************/ 
    

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