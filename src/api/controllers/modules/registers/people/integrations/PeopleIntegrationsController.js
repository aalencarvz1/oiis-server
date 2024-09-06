const { Sequelize, DataTypes, QueryTypes } = require("sequelize");
const { PcClient } = require("../../../../../database/models/winthor/PcClient");
const { People } = require("../../../../../database/models/People");
const { IdentifiersTypes } = require("../../../../../database/models/IdentifiersTypes");
const { DatabaseUtils } = require("../../../../database/DatabaseUtils");
const DBConnectionManager = require("../../../../../database/DBConnectionManager");
const { Companies } = require("../../../../../database/models/Companies");
const { BusinessesUnits } = require("../../../../../database/models/BusinessesUnits");
const { Warehouses } = require("../../../../../database/models/Warehouses");
const { DatasRelationships } = require("../../../../../database/models/DatasRelationships");
const { StatusRegs } = require("../../../../../database/models/StatusRegs");
const { DataRelationshipTypes } = require("../../../../../database/models/DataRelationshipTypes");
const { Modules } = require("../../../../../database/models/Modules");
const { Utils } = require("../../../../utils/Utils");
const { IntegrationsRegistersController } = require("../../integrations/IntegrationsRegistersController");
const { WinthorIntegrationsRegistersController } = require("../../integrations/winthor/WinthorIntegrationsRegistersController");
const { DataSwap } = require("../../../../data/DataSwap");
const { EpIntegrationsRegistersController } = require("../../integrations/ep/EpIntegrationsRegistersController");
const _ = require('lodash');
const { NeighborHoods } = require("../../../../../database/models/NeighborHoods");
const { Streets } = require("../../../../../database/models/Streets");
const { PostalCodes } = require("../../../../../database/models/PostalCodes");
const { Addresses } = require("../../../../../database/models/Addresses");
const { AddressTypes } = require("../../../../../database/models/AddressTypes");
const { PeopleXAddresses } = require("../../../../../database/models/PeopleXAddresses");
const { RegistersController } = require("../../RegistersController");
const { CitiesIntegrationsController } = require("../../locations/cities/integrations/CitiesIntegrationsController");
const { QueryBuilder } = require("../../../../database/QueryBuilder");



/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class PeopleIntegrationsController extends RegistersController{

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
                        let doc = params.identifiers[k].IDENTIFIERDOC || params.identifiers[k].CNPJ || params.identifiers[k].CGC || params.identifiers[k].CGCENT || params.identifiers[k].CPF;
                        let idTpDoc = params.identifiers[k].IDIDENTIFIERDOCTYPE || (params.identifiers[k].TIPOFJ == 'F' ? IdentifiersTypes.CPF : IdentifiersTypes.CNPJ);
                        whereDocs.push({
                            IDENTIFIERDOC: doc.toString().replace(/[^\d]/,'')-0,
                            IDIDENTIFIERDOCTYPE: idTpDoc
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
                                C.LATITUDE,
                                C.LONGITUDE,
                                C.TIPOFJ,                            
                                CI.NOMECIDADE,
                                CI.UF AS CIDADE_UF,
                                CI.CODIBGE AS CIDADE_CODIBGE,
                                CI.LATITUDE AS CIDADE_LATITUDE,
                                CI.LONGITUDE AS CIDADE_LONGITUDE,
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
                                        city = await CitiesIntegrationsController.integrateWinthorPcCidadeToCity(winthorRegs[people[k].id_at_origin].CODCIDADE);
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
                                                IDCITY: city.id,
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
                                                IDCITY: city.id,
                                                name: winthorRegs[people[k].id_at_origin].ENDERENT
                                            }
                                        });
                                        if (street && street.success) {
                                            street = street.data;
                                        }

                                        postalCode = await PostalCodes.getModel().getOrCreate({
                                            raw:true,
                                            where:{
                                                IDCITY: city.id,
                                                POSTALCODE: winthorRegs[people[k].id_at_origin].CEPENT
                                            },
                                            values:{
                                                IDADDRESSTYPE: people[k].IDIDENTIFIERDOCTYPE == IdentifiersTypes.CPF ? AddressTypes.RESIDENTIAL : AddressTypes.BUSINESS
                                            }
                                        });
                                        if (postalCode && postalCode.success) {
                                            postalCode = postalCode.data;                                            
                                        }
                                    }

                                    address = await Addresses.getModel().getOrCreate({
                                        raw:true,
                                        where:{
                                            IDNEIGHBORHOOD: neighborhood?.id,
                                            IDSTREET: street?.id,
                                            IDPOSTALCODE: postalCode?.id,
                                            LATITUDE: (winthorRegs[people[k].id_at_origin].LATITUDE || 0) == 0 ? null : Utils.toNumber(winthorRegs[people[k].id_at_origin].LATITUDE),
                                            LONGITUDE: (winthorRegs[people[k].id_at_origin].LONGITUDE || 0) == 0 ? null : Utils.toNumber(winthorRegs[people[k].id_at_origin].LONGITUDE),
                                            NUMBER: winthorRegs[people[k].id_at_origin].NUMEROENT,
                                            COMPLEMENT: winthorRegs[people[k].id_at_origin].COMPLEMENTOENT,
                                        },
                                        values:{
                                            IDADDRESSTYPE: people[k].IDIDENTIFIERDOCTYPE == IdentifiersTypes.CPF ? AddressTypes.RESIDENTIAL : AddressTypes.BUSINESS
                                        }
                                    });
                                    if (address && address.success) {
                                        address = address.data;
                                        await PeopleXAddresses.getModel().getOrCreate({
                                            raw:true,
                                            where:{
                                                IDPEOPLE : people[k].id,
                                                IDADDRESS: address.id,
                                                IDADDRESSTYPE: address.IDADDRESSTYPE
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
                                IDIDENTIFIERDOCTYPE: el?.TIPOFJ == 'F' ? IdentifiersTypes.CPF : IdentifiersTypes.CNPJ,
                                IDENTIFIERDOC: el?.CGCENT || el
                            }
                        });
                        return await People.getPeopleByIdentifiersDocs(peopleRegsIdentifiers,options);
                    }, 
                    getBulkDataToCreate: WinthorIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate.bind(WinthorIntegrationsRegistersController),
                    getDataToUpdate: async (row) => {
                        return await WinthorIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate.bind(WinthorIntegrationsRegistersController)([{
                            TIPOFJ: row.IDIDENTIFIERDOCTYPE == IdentifiersTypes.CPF ? 'F' : 'J',
                            CGCENT: row.IDENTIFIERDOC
                        }]);
                    }
                }
                result = await IntegrationsRegistersController.integrateRegisters(interateRegsParams);
                

                //relationships
                if (result.success) {
                    let originalPeople = await WinthorIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate.bind(WinthorIntegrationsRegistersController)(params.registersIdentifiersDocs);

                    let peopleDocs = originalPeople.map(el=>{return {IDENTIFIERDOC: el.id, IDIDENTIFIERDOCTYPE: el.IDIDENTIFIERDOCTYPE}});

                    let resultIntegrateAddresses = await PeopleIntegrationsController.integrateWinthorAddressesPeople(peopleDocs);

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
                        let businessUnit = businessesUnits[originalPeople[k].CODFILIALNF.toString()] || await BusinessesUnits.getModel().findOne({
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
                            await DatasRelationships.createIfNotExists({
                                where: {
                                    status_reg_id: StatusRegs.ACTIVE,
                                    IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                    IDTABLE1 : Companies.id,
                                    IDREG1: company.id,
                                    IDTABLE2 : People.id,
                                    IDREG2: originalPeople[k].id                            
                                }
                            });
                        }
                        if (businessUnit) {
                            await DatasRelationships.createIfNotExists({
                                where: {
                                    status_reg_id: StatusRegs.ACTIVE,
                                    IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                    IDTABLE1 : BusinessesUnits.id,
                                    IDREG1: businessUnit.id,
                                    IDTABLE2 : People.id,
                                    IDREG2: originalPeople[k].id                            
                                }
                            });
                        };
                        if(warehouse) {
                            await DatasRelationships.createIfNotExists({
                                where: {
                                    status_reg_id: StatusRegs.ACTIVE,
                                    IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                    IDTABLE1 : Warehouses.id,
                                    IDREG1: warehouse.id,
                                    IDTABLE2 : People.id,
                                    IDREG2: originalPeople[k].id                            
                                }
                            });
                        }
            
                        await DatasRelationships.createIfNotExists({
                            where: {
                                status_reg_id: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : People.id,
                                IDREG1: originalPeople[k].id,
                                IDTABLE2 : Modules.id,
                                IDREG2: Modules.WMS
                            }
                        });

                        await DatasRelationships.createIfNotExists({
                            where: {
                                status_reg_id: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : People.id,
                                IDREG1: originalPeople[k].id,
                                IDTABLE2 : Modules.id,
                                IDREG2: Modules.LOGISTIC
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
                                IDIDENTIFIERDOCTYPE: el?.CODTIPODOCIDENTIFICADOR == 1 && (el.CODDOCIDENTIFICADOR || '').length() <= 11 ? IdentifiersTypes.CPF : IdentifiersTypes.CNPJ,
                                IDENTIFIERDOC: el?.CODDOCIDENTIFICADOR || el
                            }
                        });
                        return await People.getPeopleByIdentifiersDocs(peopleRegsIdentifiers,options);
                    }, 
                    getBulkDataToCreate: EpIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate,
                    getDataToUpdate: async (row) => {
                        return await EpIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate([{
                            CODTIPODOCIDENTIFICADOR: row.IDIDENTIFIERDOCTYPE == IdentifiersTypes.CPF ? 1 : 2,
                            CODDOCIDENTIFICADOR: row.IDENTIFIERDOC
                        }]);
                    }
                }
                result = await IntegrationsRegistersController.integrateRegisters(interateRegsParams);

                //relationships
                if (result.success) {
                    let originalPeople = await EpIntegrationsRegistersController.getPeopleByIdentifierDocToIntegrate(params.registersIdentifiersDocs);
                    for(let k in originalPeople) {
                        await DatasRelationships.createIfNotExists({
                            where: {
                                status_reg_id: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : People.id,
                                IDREG1: originalPeople[k].id,
                                IDTABLE2 : Modules.id,
                                IDREG2: Modules.WMS
                            }
                        });

                        await DatasRelationships.createIfNotExists({
                            where: {
                                status_reg_id: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : People.id,
                                IDREG1: originalPeople[k].id,
                                IDTABLE2 : Modules.id,
                                IDREG2: Modules.LOGISTIC
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
                    let queryParams = DatabaseUtils.prepareQueryParams(req.body.queryParams || {});
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
                            res.setDataSwap(await PeopleIntegrationsController.integrateWinthorPeople(req.body));
                            res.sendResponse();
                            break; 
                        default:
                            throw new Error(`origin not expected: ${origin}`);
                    }
                    break;
                case 'addresses':
                    switch((origin.name || origin).trim().toLowerCase()) {
                        case "winthor":
                            res.setDataSwap(await PeopleIntegrationsController.integrateWinthorAddressesPeople(req.body));
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
module.exports =  {PeopleIntegrationsController}