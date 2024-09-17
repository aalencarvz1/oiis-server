const { Sequelize, QueryTypes } = require("sequelize");
const { PcClient } = require("../../../../../../database/models/winthor/PcClient");
const { People_Integration_Controller } = require("../../integrations/People_Integration_Controller");
const { Clients } = require("../../../../../../database/models/Clients");
const { People } = require("../../../../../../database/models/People");
const { Utils } = require("../../../../../utils/Utils");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { Business_Units } = require("../../../../../../database/models/Business_Units");
const { Companies } = require("../../../../../../database/models/Companies");
const { Warehouses } = require("../../../../../../database/models/Warehouses");
const { Relationship_Types } = require("../../../../../../database/models/Relationship_Types");
const { Record_Status } = require("../../../../../../database/models/Record_Status");
const { Relationships } = require("../../../../../../database/models/Relationships");
const { Modules } = require("../../../../../../database/models/Modules");
const { Data_Origins } = require("../../../../../../database/models/Data_Origins");
const { DatabaseUtils } = require("../../../../../database/DatabaseUtils");
const { DataSwap } = require("../../../../../data/DataSwap");
const { EpIntegrationsRegistersController } = require("../../../integrations/ep/EpIntegrationsRegistersController");
const { IntegrationsRegistersController } = require("../../../integrations/IntegrationsRegistersController");
const { Identifier_Types } = require("../../../../../../database/models/Identifier_Types");
const { RegistersController } = require("../../../RegistersController");

/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class Clients_Integration_Controller extends RegistersController{

    static async integrateWinthorPcClientToClient(winthorCgc,transaction) {    
        let result = new DataSwap();
        try {    
            if (Utils.hasValue(winthorCgc)) {
                
                let pcClient = await PcClient.getModel().findOne({
                    raw:true,
                    attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                    where:{
                        [Sequelize.Op.and]:[
                            Sequelize.where(
                                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                                '=',
                                Sequelize.cast(Sequelize.fn('regexp_replace',winthorCgc,'[^0-9]',''),'DECIMAL(32)')
                            )
                        ],
                        DTEXCLUSAO:{
                            [Sequelize.Op.is]: null
                        }
                    }
                });

                if (!pcClient) {
                    pcClient = await PcClient.getModel().findOne({
                        raw:true,
                        attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                        where:{
                            [Sequelize.Op.and]:[
                                Sequelize.where(
                                    Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                                    '=',
                                    Sequelize.cast(Sequelize.fn('regexp_replace',winthorCgc,'[^0-9]',''),'DECIMAL(32)')
                                )
                            ]
                        }
                    });
                }

                if (!pcClient) throw new Error(`cgcent not found in PCCLIENT: ${winthorCgc}`);           

                let people = await People_Integration_Controller.integrateWinthorPeople([{
                    TIPOFJ: pcClient.TIPOFJ,
                    CGCENT: winthorCgc
                }]);
                if (!people) throw new Error("people is null as return of people integration");
                if (!people.success) {
                    if (people.exception) throw people.exception
                    else throw new Error(people.message);
                }
                people = people?.data[0];

                let queryParams = {};
                if (transaction) queryParams.transaction = transaction;
                queryParams.where = {
                    people_id: people.id
                }

                let client = await Clients.getModel().findOne(queryParams);
                if (!client && queryParams.transaction) {
                    let transactionTemp = queryParams.transaction;
                    queryParams.transaction = undefined;
                    delete queryParams.transaction;
                    client = await Clients.getModel().findOne(queryParams);
                    queryParams.transaction = transactionTemp;
                }


                let options = {};
                if (transaction) options.transaction = transaction;

                //preserve winthor code, if violate primary key or unique, raise here
                if (client) {
                    if (client.id != pcClient.CODCLI) client.id = pcClient.CODCLI;
                    if (client.people_id != people.id) client.people_id = people.id;
                    await client.save(options);
                } else {
                    client = await Clients.getModel().create({
                        id: pcClient.CODCLI,
                        data_origin_id: Data_Origins.WINTHOR,
                        id_at_origin: pcClient.CODCLI,
                        people_id: people.id
                    },options)
                }
                result.data = client;
                result.success = true;
            } else {
                throw new Error("winthorCgc is empty");
            }
        } catch (e) {
            result.setException(e);
        }
        return result;
    }





    static async integrateWinthorClients(req,res,next) {
        try {
            let identifiers = req.body.identifiers || []; 
            Utils.log(identifiers,Utils.typeOf(identifiers));
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                identifiers = identifiers.map(el=>Utils.hasValue(el)?el:'null');
                res.data = [];
                let integrations = await PcClient.getModel().findAll({
                    raw:true,
                    attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                    where:{
                        CODCLI : {
                            [Sequelize.Op.in] : identifiers
                        }
                    }
                });
                if (!integrations || !integrations?.length) throw new Error(`identifiers not found: ${identifiers.join(',')}`);
                let people = null;
                let company = null;
                let businessUnit = null;
                for(let key in integrations) {

                    await DBConnectionManager.getDefaultDBConnection().transaction(async (transaction) => {

                        people = await People_Integration_Controller.integrateWinthorPeople([{
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
                        businessUnit = await Business_Units.getModel().findOne({
                            raw: true,
                            where:{
                                id:integrations[key]?.CODFILIALNF || 1
                            },
                            transaction: transaction
                        });
                        if (!businessUnit) throw new Error(`business unit ${integrations[key]?.CODFILIALNF || 1} not found`);

                        let warehouse = await Warehouses.getModel().findOne({
                            raw: true,
                            where:{
                                id:integrations[key]?.CODFILIALNF || 1
                            },
                            transaction: transaction
                        });
                        if (!warehouse) throw new Error(`warehouse ${integrations[key]?.CODFILIALNF || 1} not found`);

                        let client = await Clients_Integration_Controller.integrateWinthorPcClientToClient(integrations[key].CGCENT,transaction);
                        if (!client) {
                            throw new Error("client is null as return of integration client");
                        } else if (!client.success) {
                            if (client.exception) throw client.exception
                            else throw new Error(client.message);                            
                        } else {
                            client = client.data;
                        }

                        //relationships
                        let rel = await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,                                    
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Companies.id,
                                IDREG1: company.id,
                                IDTABLE2 : Clients.id,
                                IDREG2: client.id                            
                            },
                            transaction:transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Business_Units.id,
                                IDREG1: businessUnit.id,
                                IDTABLE2 : Clients.id,
                                IDREG2: client.id                            
                            },
                            transaction:transaction
                        });
                        
                        rel = await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Warehouses.id,
                                IDREG1: warehouse.id,
                                IDTABLE2 : Clients.id,
                                IDREG2: client.id                            
                            },
                            transaction: transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Clients.id,
                                IDREG1: client.id,
                                IDTABLE2 : Modules.id,
                                IDREG2: Modules.WMS
                            },
                            transaction: transaction
                        });
                                            
                        res.data.push(client.dataValues);
                    });
                }
                res.sendResponse(200,true);
            } else {
                throw new Error("not identifiers for integration");
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(501,false,e.message || e,null,e);
        }

    }


    static async integrateEpClientToClient(params) {    
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
            let resultPeople = await People_Integration_Controller.integrateEpPeople(peopleParams);
            if (resultPeople.success) {
                if (params.registersIdentifiersDocs) {
                    let interateRegsParams = {
                        tableClassModel: Clients,
                        registersIds: params.registersIdentifiersDocs,
                        getIntegratedsByOriginIds: async (registersIdentifiersDocs,options) => {
                            let peopleRegsIdentifiers = registersIdentifiersDocs.map(el=>{
                                let r = {};
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
                        getBulkDataToCreate: EpIntegrationsRegistersController.getClientsByIdentifierDocToIntegrate,
                        getDataToUpdate: async (row) => {
                            return await EpIntegrationsRegistersController.getClientsByIdentifierDocToIntegrate([{
                                CODTIPODOCIDENTIFICADOR: row.PEOPLE.identifier_doc_type_id == Identifier_Types.CPF ? 1 : 2,
                                CODDOCIDENTIFICADOR: row.PEOPLE.identifier_doc
                            }]);
                        }
                    }
                    result = await IntegrationsRegistersController.integrateRegisters(interateRegsParams);

                    //relationships
                    if (result.success) {
                        let originalPeople = await EpIntegrationsRegistersController.getClientsByIdentifierDocToIntegrate(params.registersIdentifiersDocs);
                        for(let k in originalPeople) {
                            await Relationships.createIfNotExists({
                                where: {
                                    status_reg_id: Record_Status.ACTIVE,
                                    IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                    IDTABLE1 : People.id,
                                    IDREG1: originalPeople[k].id,
                                    IDTABLE2 : Modules.id,
                                    IDREG2: Modules.WMS
                                }
                            });

                            await Relationships.createIfNotExists({
                                where: {
                                    status_reg_id: Record_Status.ACTIVE,
                                    IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
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
            } else {
                result = resultPeople;
            }
        } catch (e) {
            result.setException(e);
        }
        return result;
    }

    static async get(req,res,next) {
        try {
            let origin = req.body.origin || ["WINTHOR"];
            let queryParams = DatabaseUtils.prepareQueryParams(req.body.queryParams || {});
            queryParams.raw = true;
            if (Utils.typeOf(origin) != 'array') {
                origin = [origin];
            }
            for(let o in origin) {
                Utils.log(origin[o]);
                switch((origin[o].name || origin[o].name || origin[o].label || origin[o]).trim().toLowerCase()) {
                    case "winthor":                            
                        queryParams.where = queryParams.where || {};

                        DatabaseUtils.mountCondiction(queryParams.where,'CODFILIALNF',req.body.filial || req.body.filiais || req.body.bussinessUnit || req.body.bussinessesUnits || []);
                        DatabaseUtils.mountCondiction(queryParams.where,'CODUSUR1',req.body.rca || req.body.rcas || req.body.seller || req.body.sellers || []);
                        DatabaseUtils.mountCondiction(queryParams.where,'ESTENT',req.body.uf || req.body.ufs || req.body.state || req.body.states || []);
                        DatabaseUtils.mountCondiction(queryParams.where,'CODCIDADE',req.body.cidade || req.body.cidades || req.body.city || req.body.cityes || []);
                        DatabaseUtils.mountCondiction(queryParams.where,'CODCLI',req.body.codcli || req.body.codclis || req.body.id || req.body.ids || []);
                        DatabaseUtils.mountCondiction(queryParams.where,Sequelize.fn('upper',Sequelize.col('CLIENTE')),req.body.cliente || req.body.clientes || req.body.name || req.body.names || [], 'like', 'upper');
                        DatabaseUtils.mountCondiction(queryParams.where,Sequelize.fn('upper',Sequelize.col('FANTASIA')),req.body.fantasia || req.body.fantasias || req.body.fantasy || req.body.fantasies || [], 'like', 'upper');

                        if (req.body.onlyWithCoordinates) {
                            queryParams.where.latitude = {
                                [Sequelize.Op.not] : null
                            }
                            queryParams.where.longitude = {
                                [Sequelize.Op.not] : null
                            }
                        }

                        Utils.log(queryParams);
                        /*bodyParams.supervisor = searchSupervisors;
                        bodyParams.identifier = searchIdentifier;
                        bodyParams.name = searchName;
                        bodyParams.fantasy = searchfantasy;*/

                        res.data = await PcClient.getModel().findAll(queryParams);
                        res.sendResponse(200,true);
                        break; 
                    default:
                        throw new Error(`origin not expected: ${(origin[o].name || origin[o].name || origin[o].label || origin[o])}`);
                }
            }
            //res.sendResponse(200,true);
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }

    }

    static async getloglastupdatedcoordinates(req,res,next) {
        try {
            let origin = req.body.origin || ["WINTHOR"];
            let whereRowids = [];
            let whereRowid = [];
            for(let k in req.body.rowids) {
                whereRowid.push(`'${req.body.rowids[k]}'`);
                if (whereRowid.length >= 999) {
                    whereRowids.push(whereRowid);
                    whereRowid = [];
                }
            }
            if (whereRowid.length) {
                whereRowids.push(whereRowid);
            }
            whereRowids = `(lc1.rowidcampo in (${whereRowids.map(el=>el.join(',')).join(') or lc1.rowidcampo in (')}))`;
            let query = `
                SELECT
                    lc1.rowidcampo,
                    lc1.matriculausuario,
                    lc1.datalog,
                    lc1.nomeaplicacao
                FROM
                    JUMBO.PCLOGCADASTRO lc1
                WHERE
                        lc1.nomeobjeto = 'PCCLIENT'
                    AND lc1.valornew LIKE '%latitude%'
                    AND lc1.nomeaplicacao LIKE '%Ion%'
                    AND lc1.datalog = (
                        SELECT
                            MAX(lc2.datalog) AS datalog
                        FROM
                            JUMBO.PCLOGCADASTRO lc2
                        WHERE
                                lc2.nomeobjeto = lc1.nomeobjeto
                            AND lc2.rowidcampo = lc1.rowidcampo
                            AND lc2.valornew LIKE '%latitude%'
                            AND lc2.nomeaplicacao LIKE '%Ion%'
                    )
                    and ${whereRowids}
                ORDER BY
                    lc1.datalog;
            `;
            let responseData = await DBConnectionManager.getWinthorDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
            res.data = responseData[0] || [];
            res.sendResponse(200,true);
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static integrate(req,res,next) {
        try {
            let origin = req.body.origin || ["WINTHOR"];
            switch((origin.name || origin).trim().toLowerCase()) {
                case "winthor":
                    return this.integrateWinthorClients(req,res,next);
                    break; 
                default:
                    throw new Error(`origin not expected: ${(origin.name || origin)}`);
            }
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
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
    static processRequest(req,res,next) {
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
            let methodName = arrUrlPath[currentPathIndex+1] || req.method; 
            switch(methodName.trim().toLowerCase()) {
                case 'create':
                case 'integrate':
                    switch((origin.name || origin).trim().toLowerCase()) {                        
                        case "winthor":
                            return this.integrateWinthorClients(req,res,next);
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
module.exports = {Clients_Integration_Controller}