import { Op, QueryTypes, Sequelize } from "sequelize";
import Business_Units from "../../../../../database/models/Business_Units.js";
import Companies from "../../../../../database/models/Companies.js";
import Identifier_Types from "../../../../../database/models/Identifier_Types.js";
import Modules from "../../../../../database/models/Modules.js";
import People from "../../../../../database/models/People.js";
import Record_Status from "../../../../../database/models/Record_Status.js";
import Relationship_Types from "../../../../../database/models/Relationship_Types.js";
import Relationships from "../../../../../database/models/Relationships.js";
import Warehouses from "../../../../../database/models/Warehouses.js";
import DataSwap from "../../../../data/DataSwap.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import Utils from "../../../../utils/Utils.js";
import PcClient from "../../../../../database/models/winthor/PcClient.js";
import IntegrationsRegistersController from "../IntegrationsRegistersController.js";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";
import NeighborHoods from "../../../../../database/models/NeighborHoods.js";
import Streets from "../../../../../database/models/Streets.js";
import Postal_Codes from "../../../../../database/models/Postal_Codes.js";
import Address_Types from "../../../../../database/models/Address_Types.js";
import Addresses from "../../../../../database/models/Addresses.js";
import People_Addresses from "../../../../../database/models/People_Addresses.js";
import QueryBuilder from "../../../../database/QueryBuilder.js";
import WinthorCitiesIntegrationsController from "./WinthorCitiesIntegrationsController.js";
import _ from "lodash";
import PeopleController from "../../PeopleController.js";

export default class WinthorPeopleIntegrationsController extends IntegrationsRegistersController{

    static getTableClassModel() : any {
        return PcClient;
    }

    static async getPeopleByIdentifiersDocs(identifiersDocs: any, options: any) : Promise<any> {
        let result = null;
        try {
            if (identifiersDocs) {
                if (Utils.typeOf(identifiersDocs) != 'array') identifiersDocs = identifiersDocs.toString().split(',');
                let whereIdentifiersDocs = identifiersDocs.map((el: any)=>{
                    let r : any = {};
                    let and = [];
                    if (typeof el == 'object') {
                        if (el.TIPOFJ) {
                            and.push({
                                TIPOFJ : el.TIPOFJ
                            });
                        }
                        if (el.CGCENT) {
                            and.push(Sequelize.where(
                                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                                '=',
                                Sequelize.cast(Sequelize.fn('regexp_replace',el.CGCENT,'[^0-9]',''),'DECIMAL(32)')
                            ));
                        }
                    } else {
                        and.push(Sequelize.where(
                            Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
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
                } else {
                    findParams.attributes = Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`));
                }
                result = await PcClient.findAll(findParams);
            }
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }


    static async getPeopleByIdentifierDocToIntegrate(identifiersDocs: any) : Promise<any> {
        let result = null;
        try {
            result = await WinthorPeopleIntegrationsController.getPeopleByIdentifiersDocs(
                identifiersDocs,{
                    attributes:[
                        [Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),'id'], //for people, use document as id to avoid duplicate registers
                        [Sequelize.literal(`${Data_Origins.WINTHOR}`),'data_origin_id'],
                        ['CODCLI','id_at_origin'],
                        [Sequelize.literal(`case when PCCLIENT.TIPOFJ = 'F' then ${Identifier_Types.CPF} else ${Identifier_Types.CNPJ} end`),'identifier_doc_type_id'],
                        [Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),'identifier_doc'],
                        ['CLIENTE','name'],
                        ['FANTASIA','fantasy'],
                        [Sequelize.fn('coalesce','CODFILIALNF','1'),'CODFILIALNF']
                    ]
                }
            )
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    } 
    
    static async integrateWinthorAddressesPeople(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            params = params || {};
            params.identifiers = params.identifiers || params;
            if (params.identifiers) {
                if (Utils.typeOf(params.identifiers) != 'array') params.identifiers = params.identifiers.toString().split(',');
                let where : any = {
                    [Op.or] : []
                };
                let whereIds = [];
                let whereDocs = [];
                for(let k in params.identifiers) {
                    if (Utils.typeOf(params.identifiers[k]) == 'object') {
                        let doc = params.identifiers[k].identifier_doc || params.identifiers[k].CNPJ || params.identifiers[k].CGC || params.identifiers[k].CGCENT || params.identifiers[k].CPF;
                        let idTpDoc = params.identifiers[k].identifier_doc_type_id || (params.identifiers[k].TIPOFJ == 'F' ? Identifier_Types.CPF : Identifier_Types.CNPJ);
                        whereDocs.push({
                            identifier_doc: doc.toString().replace(/[^\d]/,'')-0,
                            identifier_doc_type_id: idTpDoc
                        });
                    } else {
                        whereIds.push(params.identifiers[k]);
                    }
                }
                if (whereIds.length) {
                    where[Op.or].push({
                        id:{
                            [Op.in]: whereIds
                        }
                    });
                }
                if (whereDocs.length) {
                    where[Op.or].push({
                        [Op.or]: whereDocs
                    })
                }
                 
                    
                let people = await People.findAll({
                    raw:true,
                    where:where
                });
                if (people && people.length) {
                    let winthorIds = people.map(el=>el.id_at_origin);
                    winthorIds = winthorIds.filter(el=>Utils.hasValue(el));
                    if (winthorIds.length) {
                        let query = `
                            SELECT
                                C.CODCLI,
                                C.CODPAIS,
                                C.ESTENT,
                                C.CODCIDADE,                                                        
                                C.CODBAIRROENT,
                                C.BAIRROENT,
                                C.ENDERENT,
                                C.NUMEROENT,
                                C.CEPENT,
                                C.COMPLEMENTOENT,
                                C.latitude,
                                C.longitude,
                                C.TIPOFJ,                            
                                CI.NOMECIDADE,
                                CI.UF AS CIDADE_UF,
                                CI.CODIBGE AS CIDADE_CODIBGE,
                                CI.latitude AS CIDADE_latitude,
                                CI.longitude AS CIDADE_longitude,
                                CI.POPULACAO AS CIDADE_POPULACAO,
                                E.ESTADO,
                                E.CODIBGE AS ESTADO_CODIBGE,
                                E.CODPAIS AS ESTADO_CODPAIS,
                                P.CODPAIS AS PAIS_CODPAIS,
                                P.DESCRICAO AS PAIS_DESCRICAO,
                                B.DESCRICAO AS BAIRRO_DESCRICAO                            
                            FROM
                                JUMBO.PCCLIENT C
                                LEFT OUTER JOIN JUMBO.PCCIDADE CI ON CI.CODCIDADE = C.CODCIDADE
                                LEFT OUTER JOIN JUMBO.PCESTADO E ON E.UF = NVL(CI.UF, C.ESTENT)
                                LEFT OUTER JOIN JUMBO.PCPAIS P ON P.CODPAIS = NVL(E.CODPAIS, C.CODPAIS)
                                LEFT OUTER JOIN JUMBO.PCBAIRRO B ON B.CODBAIRRO = C.CODBAIRROENT
                            WHERE
                                ${QueryBuilder.mountInClause('C.CODCLI',winthorIds)}
                            ORDER BY    
                                C.CODCLI                            
                        `;
                        let winthorRegs : any = await DBConnectionManager.getWinthorDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});
                        if (winthorRegs && winthorRegs.length) {
                            winthorRegs = _.keyBy(winthorRegs,'CODCLI');
                            let city = null;
                            let neighborhoodParams = null;
                            let neighborhood = null;
                            let street = null;
                            let postalCode = null;
                            let address = null;

                            for(let k in people) {
                                if (Utils.hasValue(people[k].id_at_origin) && Utils.hasValue(winthorRegs[people[k].id_at_origin])) {
                                    city = null;                            
                                    neighborhoodParams = null;
                                    neighborhood = null;
                                    street = null;
                                    postalCode = null;
                                    address = null;
                                    if (winthorRegs[people[k].id_at_origin].CODCIDADE) {
                                        city = await WinthorCitiesIntegrationsController.integrateWinthorPcCidadeToCity(winthorRegs[people[k].id_at_origin].CODCIDADE);
                                    }
                                    if (winthorRegs[people[k].id_at_origin].CODBAIRROENT) {
                                        neighborhoodParams = {
                                            raw:true,
                                            where:{
                                                id: winthorRegs[people[k].id_at_origin].CODBAIRROENT
                                            }
                                        }
                                    } else if (winthorRegs[people[k].id_at_origin].BAIRROENT && city) {
                                        neighborhoodParams = {
                                            raw:true,
                                            where:{
                                                city_id: city.id,
                                                name: winthorRegs[people[k].id_at_origin].BAIRROENT
                                            }
                                        }
                                    }
                                    if (neighborhoodParams) {
                                        neighborhood = await NeighborHoods.getOrCreate(neighborhoodParams);
                                        if (neighborhood && neighborhood.success) {
                                            neighborhood = neighborhood.data;
                                        }
                                    }

                                    if (city) {

                                        street = await Streets.getOrCreate({
                                            raw:true,
                                            where:{
                                                city_id: city.id,
                                                name: winthorRegs[people[k].id_at_origin].ENDERENT
                                            }
                                        });
                                        if (street && street.success) {
                                            street = street.data;
                                        }

                                        postalCode = await Postal_Codes.getOrCreate({
                                            raw:true,
                                            where:{
                                                city_id: city.id,
                                                postal_code: winthorRegs[people[k].id_at_origin].CEPENT
                                            },
                                            values:{
                                                address_type_id: people[k].identifier_doc_type_id == Identifier_Types.CPF ? Address_Types.RESIDENTIAL : Address_Types.BUSINESS
                                            }
                                        });
                                        if (postalCode && postalCode.success) {
                                            postalCode = postalCode.data;                                            
                                        }
                                    }

                                    address = await Addresses.getOrCreate({
                                        raw:true,
                                        where:{
                                            neighborhood_id: neighborhood?.id,
                                            street_id: street?.id,
                                            postal_code_id: postalCode?.id,
                                            latitude: (winthorRegs[people[k].id_at_origin].latitude || 0) == 0 ? null : Utils.toNumber(winthorRegs[people[k].id_at_origin].latitude),
                                            longitude: (winthorRegs[people[k].id_at_origin].longitude || 0) == 0 ? null : Utils.toNumber(winthorRegs[people[k].id_at_origin].longitude),
                                            number: winthorRegs[people[k].id_at_origin].NUMEROENT,
                                            complement: winthorRegs[people[k].id_at_origin].COMPLEMENTOENT,
                                        },
                                        values:{
                                            address_type_id: people[k].identifier_doc_type_id == Identifier_Types.CPF ? Address_Types.RESIDENTIAL : Address_Types.BUSINESS
                                        }
                                    });
                                    if (address && address.success) {
                                        address = address.data;
                                        await People_Addresses.getOrCreate({
                                            raw:true,
                                            where:{
                                                people_id : people[k].id,
                                                address_id: address.id,
                                                address_type_id: address.address_type_id
                                            }
                                        });
                                    }                                    
                                }
                            }
                            result.success = true;
                        } else {
                            throw new Error('PCCLIENT registers not found');        
                        }
                    } else {
                        throw new Error('people not found');    
                    }
                } else {
                    throw new Error('params.identifiers not exists in people');    
                }
            } else {
                throw new Error('missing parameter property (params.identifiers)');
            }            
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

    static async integrateWinthorPeople(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            params = params || {};
            params.registersIdentifiersDocs = params.registersIdentifiersDocs || params;
            if (params.registersIdentifiersDocs) {
                let interateRegsParams = {
                    tableClassModel: People,
                    registersIds: params.registersIdentifiersDocs,
                    getIntegratedsByOriginIds: async (registersIdentifiersDocs: any,options?: any) => {
                        let peopleRegsIdentifiers = registersIdentifiersDocs.map((el: any)=>{
                            return {
                                identifier_doc_type_id: el?.TIPOFJ == 'F' ? Identifier_Types.CPF : Identifier_Types.CNPJ,
                                identifier_doc: el?.CGCENT || el
                            }
                        });
                        return await PeopleController.getPeopleByIdentifiersDocs(peopleRegsIdentifiers,options);
                    }, 
                    getBulkDataToCreate: WinthorPeopleIntegrationsController.getPeopleByIdentifierDocToIntegrate,
                    getDataToUpdate: async (row: any) => {
                        return await WinthorPeopleIntegrationsController.getPeopleByIdentifierDocToIntegrate([{
                            TIPOFJ: row.identifier_doc_type_id == Identifier_Types.CPF ? 'F' : 'J',
                            CGCENT: row.identifier_doc
                        }]);
                    }
                }
                result = await WinthorPeopleIntegrationsController.integrateRegisters(interateRegsParams);
                

                //relationships
                if (result.success) {
                    let originalPeople = await WinthorPeopleIntegrationsController.getPeopleByIdentifierDocToIntegrate(params.registersIdentifiersDocs);

                    let peopleDocs = originalPeople.map((el: any)=>{return {identifier_doc: el.id, identifier_doc_type_id: el.identifier_doc_type_id}});

                    let resultIntegrateAddresses = await WinthorPeopleIntegrationsController.integrateWinthorAddressesPeople(peopleDocs);

                    let companies : any = {};
                    let businessesUnits : any = {};
                    let warehouses : any = {};
                    for(let k in originalPeople) {
                        let company = companies[originalPeople[k].CODFILIALNF.toString()] || await Companies.findOne({
                            raw:true,
                            where:{
                                id:originalPeople[k].CODFILIALNF
                            }
                        });
                        let businessUnit = businessesUnits[originalPeople[k].CODFILIALNF.toString()] || await Business_Units.findOne({
                            raw:true,
                            where:{
                                id:originalPeople[k].CODFILIALNF
                            }
                        });
                        let warehouse = warehouses[originalPeople[k].CODFILIALNF.toString()] || await Warehouses.findOne({
                            raw:true,
                            where:{
                                id:originalPeople[k].CODFILIALNF
                            }
                        });
                                    
                        if (company) {
                            await Relationships.createIfNotExists({
                                where: {
                                    status_reg_id: Record_Status.ACTIVE,
                                    relationship_type_id: Relationship_Types.RELATIONSHIP,
                                    table_1_id : Companies.id,
                                    record_1_id: company.id,
                                    table_2_id : People.id,
                                    record_2_id: originalPeople[k].id                            
                                }
                            });
                        }
                        if (businessUnit) {
                            await Relationships.createIfNotExists({
                                where: {
                                    status_reg_id: Record_Status.ACTIVE,
                                    relationship_type_id: Relationship_Types.RELATIONSHIP,
                                    table_1_id : Business_Units.id,
                                    record_1_id: businessUnit.id,
                                    table_2_id : People.id,
                                    record_2_id: originalPeople[k].id                            
                                }
                            });
                        };
                        if(warehouse) {
                            await Relationships.createIfNotExists({
                                where: {
                                    status_reg_id: Record_Status.ACTIVE,
                                    relationship_type_id: Relationship_Types.RELATIONSHIP,
                                    table_1_id : Warehouses.id,
                                    record_1_id: warehouse.id,
                                    table_2_id : People.id,
                                    record_2_id: originalPeople[k].id                            
                                }
                            });
                        }
            
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
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }

    
    
    static {
        this.configureRequestHandlers();
    }
}