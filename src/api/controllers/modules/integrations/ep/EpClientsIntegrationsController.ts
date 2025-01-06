import { Op, Sequelize } from "sequelize";
import DataSwap from "../../../data/DataSwap.js";
import Data_Origins from "../../../../database/models/Data_Origins.js";
import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import _ from "lodash";
import Clients from "../../../../database/models/Clients.js";
import Relationships from "../../../../database/models/Relationships.js";
import Record_Status from "../../../../database/models/Record_Status.js";
import Relationship_Types from "../../../../database/models/Relationship_Types.js";
import Modules from "../../../../database/models/Modules.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";
import EpClientes from "../../../../database/models/ep/EpClientes.js";
import EpPessoas from "../../../../database/models/ep/EpPessoas.js";
import Identifier_Types from "../../../../database/models/Identifier_Types.js";
import People from "../../../../database/models/People.js";
import EpPeopleIntegrationsController from "./EpPeopleIntegrationsController.js";

export default class EpClientsIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | EpClientes[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        return await EpClientes.findAll(queryParams);
    }

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
            result = await this.getClientsByIdentifiersDocs(
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
    
    static async integrate(params: any) : Promise<DataSwap> {           
        let result = new DataSwap();
        try {    
            params = params || {};
            if (typeof params != 'object') {
                params = {
                    registersIdentifiersDocs: params
                }
            }
            params.registersIdentifiersDocs = params.registersIdentifiersDocs || params;
            if (Utils.typeOf(params.registersIdentifiersDocs) != 'array') params.registersIdentifiersDocs = params.registersIdentifiersDocs.toString().split(',');
            for (let k in params.registersIdentifiersDocs) {
                if (typeof params.registersIdentifiersDocs[k] != 'object') {
                    params.registersIdentifiersDocs[k] = {
                        CODDOCIDENTIFICADOR : params.registersIdentifiersDocs[k]
                    }
                }
            }
            let peopleParams = {...params};
            let resultPeople = await EpPeopleIntegrationsController.integrate(peopleParams);
            if (resultPeople.success) {
                if (params.registersIdentifiersDocs) {
                    let interateRegsParams = {
                        tableClassModel: Clients,
                        registersIds: params.registersIdentifiersDocs,
                        getIntegratedsByOriginIds: async (registersIdentifiersDocs?: any,options?: any) => {
                            let peopleRegsIdentifiers = registersIdentifiersDocs.map((el: any)=>{
                                let r : any = {};
                                if (typeof el == 'object') {
                                    r = {
                                        identifier_doc_type_id: el?.CODTIPODOCIDENTIFICADOR == 1 && (el.CODDOCIDENTIFICADOR || '').length() <= 11 ? Identifier_Types.CPF : Identifier_Types.CNPJ,
                                        identifier_doc: el.CODDOCIDENTIFICADOR 
                                    };
                                } else {
                                    r.identifier_doc = el;
                                }
                                return r;
                            });
                            let result = await Clients.getClientsByIdentifiersDocs(peopleRegsIdentifiers,options);
                            return result;
                        }, 
                        getBulkDataToCreate: EpClientsIntegrationsController.getClientsByIdentifierDocToIntegrate,
                        getDataToUpdate: async (row: any) => {
                            return await EpClientsIntegrationsController.getClientsByIdentifierDocToIntegrate([{
                                CODTIPODOCIDENTIFICADOR: row.PEOPLE.identifier_doc_type_id == Identifier_Types.CPF ? 1 : 2,
                                CODDOCIDENTIFICADOR: row.PEOPLE.identifier_doc
                            }]);
                        }
                    }
                    result = await this.integrateRegisters(interateRegsParams);

                    //relationships
                    if (result.success) {
                        let originalPeople = await this.getClientsByIdentifierDocToIntegrate(params.registersIdentifiersDocs);
                        for(let k in originalPeople) {
                            await Relationships.createIfNotExists({
                                where: {
                                    status_reg_id: Record_Status.ACTIVE,
                                    relationship_type_id: Relationship_Types.RELATIONSHIP,
                                    table_1_id : People.id,
                                    record_1_id: originalPeople[k].id,
                                    table_2_id : Modules.id,
                                    record_2_id: Modules.WMS
                                }
                            });

                            await Relationships.createIfNotExists({
                                where: {
                                    status_reg_id: Record_Status.ACTIVE,
                                    relationship_type_id: Relationship_Types.RELATIONSHIP,
                                    table_1_id : People.id,
                                    record_1_id: originalPeople[k].id,
                                    table_2_id : Modules.id,
                                    record_2_id: Modules.LOGISTIC
                                }
                            });
                        }
                    }
                } else {
                    throw new Error('missing parameter property (params.registersIdentifiersDocs)');
                } 
            } else {
                result = resultPeople;
            }
        } catch (e) {
            result.setException(e);
        }
        return result;
    }    
}