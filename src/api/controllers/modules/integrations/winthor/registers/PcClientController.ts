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
import PcClient from "../../../../../database/models/winthor/PcClient.js";
import DataSwap from "../../../../data/DataSwap.js";
import Utils from "../../../../utils/Utils.js";
import PeopleController from "../../../registers/PeopleController.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import QueryBuilder from "../../../../database/QueryBuilder.js";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";
import NeighborHoods from "../../../../../database/models/NeighborHoods.js";
import Streets from "../../../../../database/models/Streets.js";
import Postal_Codes from "../../../../../database/models/Postal_Codes.js";
import Address_Types from "../../../../../database/models/Address_Types.js";
import Addresses from "../../../../../database/models/Addresses.js";
import People_Addresses from "../../../../../database/models/People_Addresses.js";
import PcCidadeController from "./PcCidadeController.js";
import _ from "lodash";
import Clients from "../../../../../database/models/Clients.js";
import { NextFunction, Request, Response } from "express";
import DatabaseUtils from "../../../../database/DatabaseUtils.js";

export default class PcClientController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcClient;
    }



    /**
     * default RequestHandler method to get registers of table model controller
     * @requesthandler
     * @override
     * @created 2025-01-14
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let bodyParams = req.body;
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;

            queryParams.where = queryParams.where || {};
            if (Utils.hasValue(bodyParams.id)) {
                queryParams.where.CODCLI = bodyParams.id
            }
            if (Utils.hasValue(bodyParams.filial)) {
                queryParams.where.CODFILIALNF = bodyParams.filial
            }
            if (Utils.hasValue(bodyParams.seller)) {
                queryParams.where.CODUSUR1 = bodyParams.seller
            }
            if (Utils.hasValue(bodyParams.state)) {
                queryParams.where.ESTENT = bodyParams.state
            }
            if (Utils.hasValue(bodyParams.city)) {                
                queryParams.where.CODCIDADE = bodyParams.city
            }            
            if (Utils.hasValue(bodyParams.identifier)) {
                bodyParams.identifier = Utils.toArray(bodyParams.identifier);
                queryParams.where[Op.and] = queryParams.where[Op.and] || [];
                queryParams.where[Op.and].push(Sequelize.where(
                    Sequelize.fn(
                        'regexp_replace',
                        Sequelize.col("CGCENT"),
                        "^[0-9]",
                        ""
                    ),
                    "in",
                    bodyParams.identifier.map((el: any)=>el.toString().replace(/[^0-9]/g,''))
                ))
            }
            if (Utils.hasValue(bodyParams.name)) {
                bodyParams.name = Utils.toArray(bodyParams.name);
                queryParams.where[Op.and] = queryParams.where[Op.and] || [];
                let or = [];
                or.push(Sequelize.where(
                    Sequelize.col("CLIENTE"),
                    "like",
                    bodyParams.name.map((el: any)=>el.toString())
                ));
                queryParams.where[Op.and].push({
                    [Op.or]: or
                })
            }
            if (Utils.hasValue(bodyParams.fantasy)) {
                bodyParams.fantasy = Utils.toArray(bodyParams.fantasy);
                queryParams.where[Op.and] = queryParams.where[Op.and] || [];
                let or = [];
                or.push(Sequelize.where(
                    Sequelize.col("FANTASIA"),
                    "like",
                    bodyParams.fantasy.map((el: any)=>el.toString())
                ));
                queryParams.where[Op.and].push({
                    [Op.or]: or
                })
            }
            if (Utils.toBool(Utils.firstValid([bodyParams.onlyWithCoordinates,false]))) {
                queryParams.where[Op.and] = queryParams.where[Op.and] || [];
                queryParams.where.LATITUDE = {[Op.not]: null}
            }
            if (Utils.hasValue(bodyParams.supervisor)) {
                bodyParams.supervisor = Utils.toArray(bodyParams.supervisor);
                queryParams.where[Op.and] = queryParams.where[Op.and] || [];
                queryParams.where[Op.and].push(Sequelize.fn('exists',Sequelize.literal(`select 1 from jumbo.pcsuperv s join jumbo.pcusuari u on u.codsupervisor = s.codsupervisor where u.codusur in("PCCLIENT"."CODUSUR1","PCCLIENT"."CODUSUR2") and s.codsupervisor in (${bodyParams.supervisor.join(',')})`)))
            }

            res.data = await this.getTableClassModel().findAll(queryParams);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    static async getPcClientByIdentifiersDocs(identifiersDocs: any, options: any) : Promise<any> {
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
    
    static async getPcClientByIdentifierDocToIntegrate(identifiersDocs: any) : Promise<any> {
        let result = null;
        try {
            result = await PcClientController.getPcClientByIdentifiersDocs(
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


    static async integratePeopleAddress(params: any) : Promise<DataSwap> {
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
                            let city : any = null;
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
                                        let cityIntegrationResult : DataSwap = await PcCidadeController.integrate(winthorRegs[people[k].id_at_origin].CODCIDADE);
                                        if (cityIntegrationResult?.success) {
                                            city = cityIntegrationResult.data[0] || cityIntegrationResult.data;
                                        } else {
                                            cityIntegrationResult?.throw();
                                        }
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
                                    }

                                    if (city) {

                                        street = await Streets.getOrCreate({
                                            raw:true,
                                            where:{
                                                city_id: city.id,
                                                name: winthorRegs[people[k].id_at_origin].ENDERENT
                                            }
                                        });

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

    static async integratePeople(params: any) : Promise<DataSwap> {
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
                    getBulkDataToCreate: PcClientController.getPcClientByIdentifierDocToIntegrate,
                    getDataToUpdate: async (row: any) => {
                        return await PcClientController.getPcClientByIdentifierDocToIntegrate([{
                            TIPOFJ: row.identifier_doc_type_id == Identifier_Types.CPF ? 'F' : 'J',
                            CGCENT: row.identifier_doc
                        }]);
                    }
                }
                result = await this.defaultIntegrate(interateRegsParams);
                

                //relationships
                if (result.success) {
                    let originalPeople = await PcClientController.getPcClientByIdentifierDocToIntegrate(params.registersIdentifiersDocs);

                    let peopleDocs = originalPeople.map((el: any)=>{return {identifier_doc: el.id, identifier_doc_type_id: el.identifier_doc_type_id}});

                    let resultIntegrateAddresses = await this.integratePeopleAddress(peopleDocs);

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


    static async integrate(params: any) : Promise<DataSwap> {           
        let result = new DataSwap();
        try {    
            let pcClient = null;
            if (Utils.hasValue(params.winthorClientCNPJ) || Utils.hasValue(params.winthorClientId)) {
                pcClient = await PcClient.findOne({
                    raw:true,
                    //attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                    where:{
                        [Op.and]:[
                            Sequelize.where(
                                Utils.hasValue(params.winthorClientId) 
                                    ? Sequelize.col('CODCLI')
                                    : Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                                '=',
                                Utils.hasValue(params.winthorClientId) 
                                    ? Sequelize.literal(params.winthorClientId)
                                    : Sequelize.cast(Sequelize.fn('regexp_replace',params.winthorClientCNPJ,'[^0-9]',''),'DECIMAL(32)')
                            )
                        ],
                        DTEXCLUSAO:{
                            [Op.is]: null
                        }
                    }
                });

                if (!pcClient) {
                    pcClient = await PcClient.findOne({
                        raw:true,
                        //attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                        where:{
                            [Op.and]:[
                                Sequelize.where(
                                    Utils.hasValue(params.winthorClientId) 
                                        ? Sequelize.col('CODCLI')
                                        : Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                                    '=',
                                    Utils.hasValue(params.winthorClientId) 
                                        ? Sequelize.literal(params.winthorClientId)
                                        : Sequelize.cast(Sequelize.fn('regexp_replace',params.winthorClientCNPJ,'[^0-9]',''),'DECIMAL(32)')
                                )
                            ]
                        }
                    });
                }

                if (!pcClient) throw new Error(`cgcent not found in PCCLIENT: ${params.winthorClientCNPJ} ${params.winthorClientId}`);           

                let people : any = await this.integratePeople([{
                    TIPOFJ: pcClient.TIPOFJ,
                    CGCENT: params.winthorClientCNPJ || pcClient.CGCENT
                }]);
                if (!people) throw new Error("people is null as return of people integration");
                if (!people.success) {
                    if (people.exception) throw people.exception
                    else throw new Error(people.message);
                }
                people = people?.data[0];

                let queryParams : any = {};
                if (params.transaction) queryParams.transaction = params.transaction;
                queryParams.where = {
                    people_id: people.id
                }

                let client : any = await Clients.findOne(queryParams);
                if (!client && queryParams.transaction) {
                    let transactionTemp = queryParams.transaction;
                    queryParams.transaction = undefined;
                    delete queryParams.transaction;
                    client = await Clients.findOne(queryParams);
                    queryParams.transaction = transactionTemp;
                }


                let options : any = {};
                if (params.transaction) options.transaction = params.transaction;

                //preserve winthor code, if violate primary key or unique, raise here
                if (client) {
                    if (client.id != pcClient.CODCLI) client.id = pcClient.CODCLI;
                    if (client.people_id != people.id) client.people_id = people.id;
                    await client.save(options);
                } else {
                    client = await Clients.create({
                        id: pcClient.CODCLI,
                        data_origin_id: Data_Origins.WINTHOR,
                        id_at_origin: pcClient.CODCLI,
                        people_id: people.id
                    },options)
                }
                result.data = client;
                result.success = true;
            } else {
                throw new Error("params.winthorClientCNPJ is empty");
            }
        } catch (e) {
            result.setException(e);
        }
        return result;

    }

    static async integrateMultiples(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                identifiers = identifiers.map((el: any)=>Utils.hasValue(el)?el:'null');
                result.data = [];
                let integrations = await PcClient.findAll({
                    raw:true,
                    //attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                    where:{
                        CODCLI : {
                            [Op.in] : identifiers
                        }
                    }
                });
                if (!integrations || !integrations?.length) throw new Error(`identifiers not found: ${identifiers.join(',')}`);
                let people : any = null;
                let company = null;
                let businessUnit = null;
                for(let key in integrations) {

                    await DBConnectionManager.getDefaultDBConnection()?.transaction(async (transaction) => {

                        people = await PcClientController.integratePeople([{
                            TIPOFJ: integrations[key].TIPOFJ,
                            CGCENT: integrations[key].CGCENT
                        }]);
                        if (!people) throw new Error("people is null as return of people integration");
                        if (!people.success) {
                            if (people.exception) throw people.exception
                            else throw new Error(people.message);
                        }
                        people = people?.data[0];
                        company = await Companies.getDefaultCompany();
                        if (!company) throw new Error("company not found"); 
                        businessUnit = await Business_Units.findOne({
                            raw: true,
                            where:{
                                id:integrations[key]?.CODFILIALNF || 1
                            },
                            transaction: transaction
                        });
                        if (!businessUnit) throw new Error(`business unit ${integrations[key]?.CODFILIALNF || 1} not found`);

                        let warehouse = await Warehouses.findOne({
                            raw: true,
                            where:{
                                id:integrations[key]?.CODFILIALNF || 1
                            },
                            transaction: transaction
                        });
                        if (!warehouse) throw new Error(`warehouse ${integrations[key]?.CODFILIALNF || 1} not found`);

                        let client : any = await PcClientController.integrate({
                            winthorClientCNPJ: integrations[key].CGCENT,
                            transaction
                        });
                        if (!client?.success) {
                            client?.throw();
                        } else {
                            client = client.data;
                        }

                        //relationships
                        let rel = await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,                                    
                                relationship_type_id: Relationship_Types.RELATIONSHIP,
                                table_1_id : Companies.id,
                                record_1_id: company.id,
                                table_2_id : Clients.id,
                                record_2_id: client.id                            
                            },
                            transaction:transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,
                                relationship_type_id: Relationship_Types.RELATIONSHIP,
                                table_1_id : Business_Units.id,
                                record_1_id: businessUnit.id,
                                table_2_id : Clients.id,
                                record_2_id: client.id                            
                            },
                            transaction:transaction
                        });
                        
                        rel = await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,
                                relationship_type_id: Relationship_Types.RELATIONSHIP,
                                table_1_id : Warehouses.id,
                                record_1_id: warehouse.id,
                                table_2_id : Clients.id,
                                record_2_id: client.id                            
                            },
                            transaction: transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,
                                relationship_type_id: Relationship_Types.RELATIONSHIP,
                                table_1_id : Clients.id,
                                record_1_id: client.id,
                                table_2_id : Modules.id,
                                record_2_id: Modules.WMS
                            },
                            transaction: transaction
                        });
                                            
                        result.data.push(client.dataValues);
                    });
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


    /**
     * change winthor client to use margin by order 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-10-16
     * @version 1.0.0
     */
    static async change_client_to_margin_by_order(req: Request,res:Response,next: NextFunction) : Promise<void>{
        try {
            let codcli = req.body.codcli;
            if (Utils.hasValue(codcli)) {
                codcli = Utils.toArray(codcli);

                //use transaction over all process
                await DBConnectionManager.getWinthorDBConnection()?.transaction(async (transaction)=>{

                    //select all clientes requesteds
                    let query = `
                        select
                            c.codcli,
                            c.codplpag,
                            p.descricao,
                            coalesce(c.codfilialnf,case when c.codusur1 between 200 and 299 then '2' else '1' end) as codfilialnf,
                            p.numdias,                            
                            coalesce(
                                p2.codplpag,
                                (
                                    select min(p3.codplpag)
                                    from jumbo.pcplpag p3
                                    where p3.descricao like '%MARGEM%'
                                )
                            ) as "new_codplpag"                             
                        from
                            jumbo.pcclient c
                            join jumbo.pcplpag p on p.codplpag = c.codplpag
                            left outer join jumbo.pcplpag p2 on p2.numdias = p.numdias and p2.descricao like '%MARGEM%'
                        where
                            c.codcli in (${codcli.join(',')})
                    `;

                    let clients : any[any] = await DBConnectionManager.getWinthorDBConnection()?.query(query,{type:QueryTypes.SELECT, transaction:transaction});

                    //iterate each client
                    for(let row in clients) {

                        //update client record
                        query = `
                            update 
                                jumbo.pcclient 
                            set 
                                codplpag = ${clients[row].new_codplpag},
                                usadebcredrca = 'N',
                                plpagneg='S'
                            where
                                codcli = ${clients[row].CODCLI}
                        `;
                        await DBConnectionManager.getWinthorDBConnection()?.query(query,{type:QueryTypes.UPDATE, transaction:transaction});

                        //get plans wich client has acess
                        query = `
                            select 
                                *
                            from
                                jumbo.pcplpag p
                            where 
                                p.numdias <= ${clients[row].NUMDIAS}
                                and p.descricao like '%MARGEM%'
                            order by
                                p.numdias
                        `;
                        let plans : any[any] = await DBConnectionManager.getWinthorDBConnection()?.query(query,{type:QueryTypes.SELECT, transaction:transaction});

                        //delete previous records from pcplpagcli (routine 308 winthor)
                        query = `
                            delete 
                            from
                                jumbo.pcplpagcli
                            where
                                codcli=${clients[row].CODCLI}
                        `;
                        await DBConnectionManager.getWinthorDBConnection()?.query(query,{type:QueryTypes.DELETE, transaction:transaction});

                        //iterate each plan client has access
                        for(let rowPlan in plans) {

                            //insert restriction in plan if not exists
                            query = `
                                select 
                                    1
                                from
                                    jumbo.pcplpagrestricao pr
                                where 
                                    pr.tiporestricao = 'CL'
                                    and pr.codplpag = ${plans[rowPlan].CODPLPAG}
                                    and pr.codrestricao = ${clients[row].CODCLI}
                            `;
                            let restriction = await DBConnectionManager.getWinthorDBConnection()?.query(query,{type:QueryTypes.SELECT, transaction:transaction});
                            if (!Utils.hasValue(restriction)) {
                                query = `
                                    insert into jumbo.pcplpagrestricao (
                                        codplpag,
                                        tiporestricao,
                                        codrestricao
                                    ) values (
                                        ${plans[rowPlan].CODPLPAG},
                                        'CL',
                                        ${clients[row].CODCLI}
                                    )
                                `;
                                await DBConnectionManager.getWinthorDBConnection()?.query(query,{type:QueryTypes.INSERT, transaction:transaction});
                            }

                            //insert specific plan wich client has acess (routine 308 winthor)
                            query = `
                                insert into jumbo.pcplpagcli (
                                    codplpag,
                                    codcli
                                ) values (
                                    ${plans[rowPlan].CODPLPAG},
                                    ${clients[row].CODCLI}
                                )
                            `;
                            await DBConnectionManager.getWinthorDBConnection()?.query(query,{type:QueryTypes.INSERT, transaction:transaction});
                        }


                        //delete previous records from pctabprcli
                        query = `
                            delete 
                            from
                                jumbo.pctabprcli
                            where
                                codcli=${clients[row].CODCLI}
                        `;
                        await DBConnectionManager.getWinthorDBConnection()?.query(query,{type:QueryTypes.DELETE, transaction:transaction});

                        //re-insert client price table
                        query = `
                            insert into jumbo.pctabprcli (
                                codcli,
                                codfilialnf,
                                numregiao,
                                dtultalter,
                                codfuncultalter
                            ) values (
                                ${clients[row].CODCLI},
                                ${clients[row].CODFILIALNF},
                                ${clients[row].CODFILIALNF == 2 ? 110 : 101},
                                sysdate,
                                142
                            )
                        `;
                        await DBConnectionManager.getWinthorDBConnection()?.query(query,{type:QueryTypes.INSERT, transaction:transaction});                        
                    }                    

                    res.success = true;
                    return res.success;
                });
            } else {
                throw new Error("missing data");
            }            
        } catch (e) {
            res.setException(e);            
        }
        res.sendResponse();
    }
    
    static {
        this.configureDefaultRequestHandlers([this.change_client_to_margin_by_order]);
    }
}