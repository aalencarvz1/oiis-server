const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const { PcClient } = require("../../../../../database/models/winthor/PcClient");
const { People } = require("../../../../../database/models/People");
const { Identifier_Types } = require("../../../../../database/models/Identifier_Types");
const { DatabaseUtils } = require("../../../../database/DatabaseUtils");
const DBConnectionManager = require("../../../../../database/DBConnectionManager");
const { Companies } = require("../../../../../database/models/Companies");
const { Business_Units } = require("../../../../../database/models/Business_Units");
const { Warehouses } = require("../../../../../database/models/Warehouses");
const { Relationships } = require("../../../../../database/models/Relationships");
const { Record_Status } = require("../../../../../database/models/Record_Status");
const { Relationship_Types } = require("../../../../../database/models/Relationship_Types");
const { Modules } = require("../../../../../database/models/Modules");
const { Utils } = require("../../../../utils/Utils");
const { IntegrationsRegistersController } = require("../../integrations/IntegrationsRegistersController");
const { WinthorIntegrationsRegistersController } = require("../../integrations/winthor/WinthorIntegrationsRegistersController");
const { DataSwap } = require("../../../../data/DataSwap");
const { EpIntegrationsRegistersController } = require("../../integrations/ep/EpIntegrationsRegistersController");
const _ = require('lodash');
const { NeighborHoods } = require("../../../../../database/models/NeighborHoods");
const { Streets } = require("../../../../../database/models/Streets");
const { Postal_Codes } = require("../../../../../database/models/Postal_Codes");
const { Addresses } = require("../../../../../database/models/Addresses");
const { Address_Types } = require("../../../../../database/models/Address_Types");
const { People_Addresses } = require("../../../../../database/models/People_Addresses");
const { RegistersController } = require("../../RegistersController");
const { Cities_Integration_Controller } = require("../../locations/cities/integrations/Cities_Integration_Controller");
const { QueryBuilder } = require("../../../../database/QueryBuilder");



/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class People_Integration_Controller extends RegistersController{

    static async integrateWinthorAddressesPeople(params) {
        let result = new DataSwap();
        try {
            params = params || {};
            params.identifiers = params.identifiers || params;
            if (params.identifiers) {
                if (Utils.typeOf(params.identifiers) != 'array') params.identifiers = params.identifiers.toString().split(',');
                let where = {
                    [Sequelize.Op.or] : []
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
                    where[Sequelize.Op.or].push({
                        id:{
                            [Sequelize.Op.in]: whereIds
                        }
                    });
                }
                if (whereDocs.length) {
                    where[Sequelize.Op.or].push({
                        [Sequelize.Op.or]: whereDocs
                    })
                }
                 
                    
                let people = await People.getModel().findAll({
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
                        let winthorRegs = await DBConnectionManager.getWinthorDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
                        winthorRegs = winthorRegs[0] || [];
                        if (winthorRegs && winthorRegs.length) {
                            winthorRegs = _.keyBy(winthorRegs,'CODCLI');
                            Utils.log(people,winthorRegs);
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
                                        city = await Cities_Integration_Controller.integrateWinthorPcCidadeToCity(winthorRegs[people[k].id_at_origin].CODCIDADE);
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
                                    Utils.log('neighborhoodParams',neighborhoodParams);
                                    if (neighborhoodParams) {
                                        neighborhood = await NeighborHoods.getModel().getOrCreate(neighborhoodParams);
                                        if (neighborhood && neighborhood.success) {
                                            neighborhood = neighborhood.data;
                                        }
                                        Utils.log('neighborhood',neighborhood);
                                    }

                                    if (city) {

                                        street = await Streets.getModel().getOrCreate({
                                            raw:true,
                                            where:{
                                                city_id: city.id,
                                                name: winthorRegs[people[k].id_at_origin].ENDERENT
                                            }
                                        });
                                        if (street && street.success) {
                                            street = street.data;
                                        }

                                        postalCode = await Postal_Codes.getModel().getOrCreate({
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

                                    address = await Addresses.getModel().getOrCreate({
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
                                        await People_Addresses.getModel().getOrCreate({
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
        } catch (e) {
            Utils.log(e);
            result.setException(e);
        }
        return result;
    }

    /**
     * integrate winthor PCCLIENT register to people register
     * @static
     * @async
     * @created 2023-09-08
     */
    static async integrateWinthorPeople(params) {
        Utils.logi(`${this.name}`,`integrateWinthorPeople`);
        let result = new DataSwap();
        try {
            params = params || {};
            params.registersIdentifiersDocs = params.registersIdentifiersDocs || params;
            if (params.registersIdentifiersDocs) {
                let interateRegsParams = {
                    tableClassModel: People,
                    registersIds: params.registersIdentifiersDocs,
                    getIntegratedsByOriginIds: async (registersIdentifiersDocs,options) => {
                        let peopleRegsIdentifiers = registersIdentifiersDocs.map(el=>{
                            return {
                                identifier_doc_type_id: el?.TIPOFJ == 'F' ? Identifier_Types.CPF : Identifier_Types.CNPJ,
                                identifier_doc: el?.CGCENT || el
                            }
                        });
                        return await People.getPeopleByIdentifiersDocs(peopleRegsIdentifiers,options);
                    }, 
                    getBulkDataToCreate: WinthorIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate.bind(WinthorIntegrationsRegistersController),
                    getDataToUpdate: async (row) => {
                        return await WinthorIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate.bind(WinthorIntegrationsRegistersController)([{
                            TIPOFJ: row.identifier_doc_type_id == Identifier_Types.CPF ? 'F' : 'J',
                            CGCENT: row.identifier_doc
                        }]);
                    }
                }
                result = await IntegrationsRegistersController.integrateRegisters(interateRegsParams);
                

                //relationships
                if (result.success) {
                    let originalPeople = await WinthorIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate.bind(WinthorIntegrationsRegistersController)(params.registersIdentifiersDocs);

                    let peopleDocs = originalPeople.map(el=>{return {identifier_doc: el.id, identifier_doc_type_id: el.identifier_doc_type_id}});

                    let resultIntegrateAddresses = await People_Integration_Controller.integrateWinthorAddressesPeople(peopleDocs);

                    if (!resultIntegrateAddresses.success) {
                        Utils.log(resultIntegrateAddresses.exception || resultIntegrateAddresses.message);
                    } 
                    let companies = {};
                    let businessesUnits = {};
                    let warehouses = {};
                    for(let k in originalPeople) {
                        let company = companies[originalPeople[k].CODFILIALNF.toString()] || await Companies.getModel().findOne({
                            raw:true,
                            where:{
                                id:originalPeople[k].CODFILIALNF
                            }
                        });
                        let businessUnit = businessesUnits[originalPeople[k].CODFILIALNF.toString()] || await Business_Units.getModel().findOne({
                            raw:true,
                            where:{
                                id:originalPeople[k].CODFILIALNF
                            }
                        });
                        let warehouse = warehouses[originalPeople[k].CODFILIALNF.toString()] || await Warehouses.getModel().findOne({
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
        } catch (e) {
            Utils.log(e);
            result.setException(e);
        }
        Utils.logf(`${this.name}`,`integrateWinthorPeople`);
        return result;
    }



    /**
     * integrate ep pople register to people register
     * @static
     * @async
     * @created 2023-09-08
     */
    static async integrateEpPeople(params) {
        let result = new DataSwap();
        try {
            params = params || {};
            params.registersIdentifiersDocs = params.registersIdentifiersDocs || params;
            if (params.registersIdentifiersDocs) {
                let interateRegsParams = {
                    tableClassModel: People,
                    registersIds: params.registersIdentifiersDocs,
                    getIntegratedsByOriginIds: async (registersIdentifiersDocs,options) => {
                        let peopleRegsIdentifiers = registersIdentifiersDocs.map(el=>{
                            return {
                                identifier_doc_type_id: el?.CODTIPODOCIDENTIFICADOR == 1 && (el.CODDOCIDENTIFICADOR || '').length() <= 11 ? Identifier_Types.CPF : Identifier_Types.CNPJ,
                                identifier_doc: el?.CODDOCIDENTIFICADOR || el
                            }
                        });
                        return await People.getPeopleByIdentifiersDocs(peopleRegsIdentifiers,options);
                    }, 
                    getBulkDataToCreate: EpIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate,
                    getDataToUpdate: async (row) => {
                        return await EpIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate([{
                            CODTIPODOCIDENTIFICADOR: row.identifier_doc_type_id == Identifier_Types.CPF ? 1 : 2,
                            CODDOCIDENTIFICADOR: row.identifier_doc
                        }]);
                    }
                }
                result = await IntegrationsRegistersController.integrateRegisters(interateRegsParams);

                //relationships
                if (result.success) {
                    let originalPeople = await EpIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate(params.registersIdentifiersDocs);
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
        } catch (e) {
            Utils.log(e);
            result.setException(e);
        }
        return result;
    }

    /**
     * * Process route as array of levels. ex: /modules/inputs/purchases/forecast/get as ['modules','inputs','purchases','forecast','get']
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} arrRoute 
     * @param {*} level 
     * @created 2023-08-25
     * @deprecated 2024-07-15 use processRequest instead
     */
    static processPostAsRoute = async(req,res,next,route,arrRoute,level) => {
        try {            
            level++;
            //Utils.log(route,level,arrRoute[level]);
            let origin = req.body.origin || "";
            switch(arrRoute[level].trim().toLowerCase()) {
                case 'get':                    
                    let queryParams = await DatabaseUtils.prepareQueryParams(req.body.queryParams || {});
                    queryParams.raw = true;
                    switch((origin.name || origin).trim().toLowerCase()) {
                        case "winthor":                            
                            queryParams.where = queryParams.where || {};                            
                            res.data = await PcClient.getModel().findAll(queryParams);
                            res.sendResponse(200,true);
                            break; 
                        default:
                            throw new Error(`origin not expected: ${origin}`);
                    }
                    break;
                case 'create':          
                case 'integrate':                             
                    switch((origin.name || origin).trim().toLowerCase()) {
                        case "winthor":
                            res.setDataSwap(await People_Integration_Controller.integrateWinthorPeople(req.body));
                            res.sendResponse();
                            break; 
                        default:
                            throw new Error(`origin not expected: ${origin}`);
                    }
                    break;
                case 'addresses':
                    switch((origin.name || origin).trim().toLowerCase()) {
                        case "winthor":
                            res.setDataSwap(await People_Integration_Controller.integrateWinthorAddressesPeople(req.body));
                            res.sendResponse();
                            break; 
                        default:
                            throw new Error(`origin not expected: ${origin}`);
                    }
                    break;
                default:
                    throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    break;
            }
        } catch (e) {
            res.sendResponse(404,false,e.message || e,null,e);
        }
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-07-13
     * @override
     */
    static async processRequest(req,res,next) {
        Utils.logi(`${this.name}`,`processRequest(${req.url})`);
        try {
            let origin = req.body.origin || "";
            let urlPath = req.url;
            urlPath = Utils.getSingleUrlPath(urlPath);
            let arrUrlPath = urlPath.split("/");
            if (!Utils.hasValue(arrUrlPath[0])) {
                arrUrlPath.shift();
            }
            let currentPathIndex = arrUrlPath.indexOf(this.name.trim().toLowerCase());
            console.log('xxxxx',currentPathIndex,arrUrlPath);
            let methodName = arrUrlPath[currentPathIndex+1] || req.method; 
            switch(methodName.trim().toLowerCase()) {
                case 'create':
                case 'integrate':
                    switch((origin.name || origin).trim().toLowerCase()) {                        
                        case "winthor":
                            res.setDataSwap(await this.integrateWinthorPeople(req.body));
                            return res.sendResponse();
                            break; 
                        default:
                            throw new Error(`origin not expected: ${origin}`);
                    }
                    break;
                case 'addresses':
                    switch((origin.name || origin).trim().toLowerCase()) {
                        case "winthor":
                            res.setDataSwap(await this.integrateWinthorAddressesPeople(req.body));
                            res.sendResponse();
                            break; 
                        default:
                            throw new Error(`origin not expected: ${origin}`);
                    }
                    break;
                default:
                    return super.processRequest(req,res,next);
            }            
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
        Utils.logf(`${this.name}`,`processRequest(${req.url})`);
    }

}
module.exports =  {People_Integration_Controller}