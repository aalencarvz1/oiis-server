const { Sequelize } = require("sequelize");
const { PcFilial } = require("../../../../../../database/models/winthor/PcFilial");
const { Utils } = require("../../../../../utils/Utils");
const { PeopleIntegrationsController } = require("../../integrations/PeopleIntegrationsController");
const { CompaniesIntegrationsController } = require("../../companies/integrations/CompaniesIntegrationsController");
const { BusinessesUnits } = require("../../../../../../database/models/BusinessesUnits");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { WarehousesIntegrationsController } = require("../../warehouses/integrations/WarehousesIntegrationsController");
const { DatasRelationships } = require("../../../../../../database/models/DatasRelationships");
const { DataRelationshipTypes } = require("../../../../../../database/models/DataRelationshipTypes");
const { Companies } = require("../../../../../../database/models/Companies");
const { Warehouses } = require("../../../../../../database/models/Warehouses");
const { StatusRegs } = require("../../../../../../database/models/StatusRegs");
const { ClientsIntegrationsController } = require("../../clients/integrations/ClientsIntegrationsController");
const { Clients } = require("../../../../../../database/models/Clients");
const { Modules } = require("../../../../../../database/models/Modules");
const { OriginsDatas } = require("../../../../../../database/models/OriginsDatas");
const { DatabaseUtils } = require("../../../../../database/DatabaseUtils");
const { RegistersController } = require("../../../RegistersController");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-09-05
 */
class BusinessesUnitsIntegrationsController extends RegistersController {

    

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
                        [Sequelize.literal(`(select c.CGCENT from jumbo.pcclient c where c.CODCLI = PCFILIAL.CODCLI)`), 'CGCENT']
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

                        people = await PeopleIntegrationsController.integrateWinthorPeople([{
                            TIPOFJ: 'J',
                            CGCENT: integrations[key].CGCENT
                        }]);
                        if (!people) throw new Error("people is null as return of people integration");
                        if (!people.success) {
                            if (people.exception) throw people.exception
                            else throw new Error(people.message);
                        }
                        people = people?.data[0];

                        company = await CompaniesIntegrationsController.integrateWinthorPcFilialToCompany(integrations[key].CODIGO,transaction);
                        if (!company) throw new Error("company is null as return of integration company"); 
                        businessUnit = await BusinessesUnits.getModel().findOne({
                            where:{
                                ID:integrations[key].CODIGO
                            },
                            transaction: transaction
                        });
                        if (businessUnit) {
                            if (businessUnit.IDPEOPLE != people.ID) businessUnit.IDPEOPLE = people.ID;
                            if (businessUnit.IDCOMPANY != company.ID) businessUnit.IDCOMPANY = company.ID;
                            await businessUnit.save({transaction:transaction});
                        } else {
                            businessUnit = await BusinessesUnits.getModel().create({
                                ID: integrations[key].CODIGO,
                                IDORIGINDATA: OriginsDatas.WINTHOR,
                                IDPEOPLE : people.ID,
                                IDCOMPANY : company.ID
                            },{transaction:transaction});
                        }

                        let warehouse = await WarehousesIntegrationsController.integrateWinthorPcFilialToWarehouse(integrations[key].CODIGO,transaction);
                        if (!warehouse) throw new Error("warehouse is null as return of integration warehouse"); 

                        let client = await ClientsIntegrationsController.integrateWinthorPcClientToClient(integrations[key].CGCENT,transaction);
                        if (!client) {
                            throw new Error("client is null as return of integration client");
                        } else if (!client.success) {
                            if (client.exception) throw client.exception
                            else throw new Error(client.message);                            
                        } else {
                            client = client.data;
                        }


                        //relationships
                        let rel = await DatasRelationships.createIfNotExists({
                            where: {
                                IDSTATUSREG: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : Companies.ID,
                                IDREG1: company.ID,
                                IDTABLE2 : Warehouses.ID,
                                IDREG2: warehouse.ID                            
                            },
                            transaction:transaction
                        });

                        rel = await DatasRelationships.createIfNotExists({
                            where: {
                                IDSTATUSREG: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : Companies.ID,
                                IDREG1: company.ID,
                                IDTABLE2 : BusinessesUnits.ID,
                                IDREG2: businessUnit.ID                            
                            },
                            transaction:transaction
                        });

                        rel = await DatasRelationships.createIfNotExists({
                            where: {
                                IDSTATUSREG: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : Companies.ID,
                                IDREG1: company.ID,
                                IDTABLE2 : Clients.ID,
                                IDREG2: client.ID                            
                            },
                            transaction:transaction
                        });
                        
                        rel = await DatasRelationships.createIfNotExists({
                            where:{
                                IDSTATUSREG: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : BusinessesUnits.ID,
                                IDREG1: businessUnit.ID,
                                IDTABLE2 : Warehouses.ID,
                                IDREG2: warehouse.ID                            
                            },
                            transaction: transaction
                        });

                        rel = await DatasRelationships.createIfNotExists({
                            where:{
                                IDSTATUSREG: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : BusinessesUnits.ID,
                                IDREG1: businessUnit.ID,
                                IDTABLE2 : Clients.ID,
                                IDREG2: client.ID                            
                            },
                            transaction: transaction
                        });

                        rel = await DatasRelationships.createIfNotExists({
                            where:{
                                IDSTATUSREG: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : Warehouses.ID,
                                IDREG1: warehouse.ID,
                                IDTABLE2 : Clients.ID,
                                IDREG2: client.ID                            
                            },
                            transaction: transaction
                        });

                        rel = await DatasRelationships.createIfNotExists({
                            where:{
                                IDSTATUSREG: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : Companies.ID,
                                IDREG1: company.ID,
                                IDTABLE2 : Modules.ID,
                                IDREG2: Modules.WMS
                            },
                            transaction: transaction
                        });

                        rel = await DatasRelationships.createIfNotExists({
                            where:{
                                IDSTATUSREG: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : BusinessesUnits.ID,
                                IDREG1: businessUnit.ID,
                                IDTABLE2 : Modules.ID,
                                IDREG2: Modules.WMS
                            },
                            transaction: transaction
                        });

                        rel = await DatasRelationships.createIfNotExists({
                            where:{
                                IDSTATUSREG: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : Warehouses.ID,
                                IDREG1: warehouse.ID,
                                IDTABLE2 : Modules.ID,
                                IDREG2: Modules.WMS
                            },
                            transaction: transaction
                        });

                        rel = await DatasRelationships.createIfNotExists({
                            where:{
                                IDSTATUSREG: StatusRegs.ACTIVE,
                                IDRELATIONSHIPTYPE: DataRelationshipTypes.RELATIONSHIP,
                                IDTABLE1 : Clients.ID,
                                IDREG1: client.ID,
                                IDTABLE2 : Modules.ID,
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
            switch((origin.NAME || origin).trim().toLowerCase()) {
                case "winthor":                            
                    queryParams.where = queryParams.where || {};
                    queryParams.where.CODIGO = {
                        [Sequelize.Op.notIn] : [99]
                    }
                    res.data = await PcFilial.getModel().findAll(queryParams);
                    res.sendResponse(200,true);
                    break; 
                default:
                    throw new Error(`origin not expected: ${(origin.NAME || origin)}`);
            }
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static async integrate(req,res,next) {
        try {
            let origin = req.body.origin || "";
            switch((origin.NAME || origin).trim().toLowerCase()) {
                case "winthor":
                    this.integrateWinthorBusinessesUnits(req,res,next);
                    break; 
                default:
                    throw new Error(`origin not expected: ${(origin.NAME || origin)}`);
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
                    switch((origin.NAME || origin).trim().toLowerCase()) {                        
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

module.exports = {BusinessesUnitsIntegrationsController}