const { Sequelize } = require("sequelize");
const { PcFilial } = require("../../../../../../database/models/winthor/PcFilial");
const { Utils } = require("../../../../../utils/Utils");
const { People_Integration_Controller } = require("../../integrations/People_Integration_Controller");
const { Companies_Integration_Controller } = require("../../companies/integrations/Companies_Integration_Controller");
const { Business_Units } = require("../../../../../../database/models/Business_Units");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { Warehouses_Integration_Controller } = require("../../warehouses/integrations/Warehouses_Integration_Controller");
const { Relationships } = require("../../../../../../database/models/Relationships");
const { Relationship_Types } = require("../../../../../../database/models/Relationship_Types");
const { Companies } = require("../../../../../../database/models/Companies");
const { Warehouses } = require("../../../../../../database/models/Warehouses");
const { Record_Status } = require("../../../../../../database/models/Record_Status");
const { Clients_Integration_Controller } = require("../../clients/integrations/Clients_Integration_Controller");
const { Clients } = require("../../../../../../database/models/Clients");
const { Modules } = require("../../../../../../database/models/Modules");
const { Data_Origins } = require("../../../../../../database/models/Data_Origins");
const { DatabaseUtils } = require("../../../../../database/DatabaseUtils");
const { RegistersController } = require("../../../RegistersController");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-09-05
 */
class Business_Units_Integration_Controller extends RegistersController {

    

    static async integrateWinthorBusinessesUnits(req,res,next) {
        try {
            let identifiers = req.body.identifiers || []; 
            Utils.log(identifiers,Utils.typeOf(identifiers));
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                identifiers = identifiers.map(el=>Utils.hasValue(el)?el:'null');
                res.data = [];
                let integrations = await PcFilial.getModel().findAll({
                    raw:true,
                    attributes:[
                        ...Object.keys(PcFilial.fields),
                        [Sequelize.literal(`(select c.CGCENT from JUMBO.PCCLIENT c where c.CODCLI = PCFILIAL.CODCLI)`), 'CGCENT']
                    ],
                    where:{
                        CODIGO : {
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
                            TIPOFJ: 'J',
                            CGCENT: integrations[key].CGCENT
                        }]);
                        if (!people) throw new Error("people is null as return of people integration");
                        if (!people.success) {
                            if (people.exception) throw people.exception
                            else throw new Error(people.message);
                        }
                        people = people?.data[0];

                        company = await Companies_Integration_Controller.integrateWinthorPcFilialToCompany(integrations[key].CODIGO,transaction);
                        if (!company) throw new Error("company is null as return of integration company"); 
                        businessUnit = await Business_Units.getModel().findOne({
                            where:{
                                id:integrations[key].CODIGO
                            },
                            transaction: transaction
                        });
                        if (businessUnit) {
                            if (businessUnit.people_id != people.id) businessUnit.people_id = people.id;
                            if (businessUnit.company_id != company.id) businessUnit.company_id = company.id;
                            await businessUnit.save({transaction:transaction});
                        } else {
                            businessUnit = await Business_Units.getModel().create({
                                id: integrations[key].CODIGO,
                                data_origin_id: Data_Origins.WINTHOR,
                                people_id : people.id,
                                company_id : company.id
                            },{transaction:transaction});
                        }

                        let warehouse = await Warehouses_Integration_Controller.integrateWinthorPcFilialToWarehouse(integrations[key].CODIGO,transaction);
                        if (!warehouse) throw new Error("warehouse is null as return of integration warehouse"); 

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
                                IDTABLE2 : Warehouses.id,
                                IDREG2: warehouse.id                            
                            },
                            transaction:transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where: {
                                status_reg_id: Record_Status.ACTIVE,
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Companies.id,
                                IDREG1: company.id,
                                IDTABLE2 : Business_Units.id,
                                IDREG2: businessUnit.id                            
                            },
                            transaction:transaction
                        });

                        rel = await Relationships.createIfNotExists({
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
                            where:{
                                status_reg_id: Record_Status.ACTIVE,
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Business_Units.id,
                                IDREG1: businessUnit.id,
                                IDTABLE2 : Warehouses.id,
                                IDREG2: warehouse.id                            
                            },
                            transaction: transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where:{
                                status_reg_id: Record_Status.ACTIVE,
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Business_Units.id,
                                IDREG1: businessUnit.id,
                                IDTABLE2 : Clients.id,
                                IDREG2: client.id                            
                            },
                            transaction: transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where:{
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
                            where:{
                                status_reg_id: Record_Status.ACTIVE,
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Companies.id,
                                IDREG1: company.id,
                                IDTABLE2 : Modules.id,
                                IDREG2: Modules.WMS
                            },
                            transaction: transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where:{
                                status_reg_id: Record_Status.ACTIVE,
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Business_Units.id,
                                IDREG1: businessUnit.id,
                                IDTABLE2 : Modules.id,
                                IDREG2: Modules.WMS
                            },
                            transaction: transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where:{
                                status_reg_id: Record_Status.ACTIVE,
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Warehouses.id,
                                IDREG1: warehouse.id,
                                IDTABLE2 : Modules.id,
                                IDREG2: Modules.WMS
                            },
                            transaction: transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where:{
                                status_reg_id: Record_Status.ACTIVE,
                                IDRELATIONSHIPTYPE: Relationship_Types.RELATIONSHIP,
                                IDTABLE1 : Clients.id,
                                IDREG1: client.id,
                                IDTABLE2 : Modules.id,
                                IDREG2: Modules.WMS
                            },
                            transaction: transaction
                        });
                        
                        res.data.push(businessUnit.dataValues);
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

    static async get(req,res,next) {
        try {
            let origin = req.body.origin || "";
            let queryParams = DatabaseUtils.prepareQueryParams(req.body.queryParams || {});
            queryParams.raw = true;
            switch((origin.name || origin).trim().toLowerCase()) {
                case "winthor":                            
                    queryParams.where = queryParams.where || {};
                    queryParams.where.CODIGO = {
                        [Sequelize.Op.notIn] : [99]
                    }
                    res.data = await PcFilial.getModel().findAll(queryParams);
                    res.sendResponse(200,true);
                    break; 
                default:
                    throw new Error(`origin not expected: ${(origin.name || origin)}`);
            }
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static async integrate(req,res,next) {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin).trim().toLowerCase()) {
                case "winthor":
                    this.integrateWinthorBusinessesUnits(req,res,next);
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
                            return this.integrateWinthorBusinessesUnits(req,res,next);
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

module.exports = {Business_Units_Integration_Controller}