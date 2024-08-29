const { Sequelize } = require("sequelize");
const { PcClient } = require("../../../../../../database/models/winthor/PcClient");
const { PcFilial } = require("../../../../../../database/models/winthor/PcFilial");
const { PeopleIntegrationsController } = require("../../integrations/PeopleIntegrationsController");
const { Warehouses } = require("../../../../../../database/models/Warehouses");
const { People } = require("../../../../../../database/models/People");
const { Utils } = require("../../../../../utils/Utils");
const { OriginsDatas } = require("../../../../../../database/models/OriginsDatas");
const { DatabaseUtils } = require("../../../../../database/DatabaseUtils");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { CompaniesIntegrationsController } = require("../../companies/integrations/CompaniesIntegrationsController");
const { ClientsIntegrationsController } = require("../../clients/integrations/ClientsIntegrationsController");
const { DatasRelationships } = require("../../../../../../database/models/DatasRelationships");
const { StatusRegs } = require("../../../../../../database/models/StatusRegs");
const { DataRelationshipTypes } = require("../../../../../../database/models/DataRelationshipTypes");
const { Companies } = require("../../../../../../database/models/Companies");
const { Clients } = require("../../../../../../database/models/Clients");
const { Modules } = require("../../../../../../database/models/Modules");
const { RegistersController } = require("../../../RegistersController");

/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class WarehousesIntegrationsController extends RegistersController {


    static async integrateWinthorPcFilialToWarehouse(winthorFilialCode,transaction) {           
        let result = null;
        if (Utils.hasValue(winthorFilialCode)) {
            let pcfilial = await PcFilial.getModel().findOne({
                raw : true,
                attributes:[
                    ...Object.keys(PcFilial.fields),
                    [Sequelize.literal(`(select c.CGCENT from jumbo.pcclient c where c.CODCLI = PCFILIAL.CODCLI)`), 'CGCENT']
                ],
                where:{
                    CODIGO:winthorFilialCode
                }
            });
            if (!pcfilial) throw new Error(`codfilial not found in pcfilial: ${winthorFilialCode}`);
                  
            await DBConnectionManager.getDefaultDBConnection().transaction(async (transaction) => {
                let people = await PeopleIntegrationsController.integrateWinthorPeople([{
                    TIPOFJ: 'J',
                    CGCENT: pcfilial.CGCENT
                }]);
                if (!people) throw new Error("people is null as return of people integration");
                if (!people.success) {
                    if (people.exception) throw people.exception
                    else throw new Error(people.message);
                }
                people = people?.data[0];
                if (!people) throw new Error("people is null as return of integration people");
                let company = await CompaniesIntegrationsController.integrateWinthorPcFilialToCompany(pcfilial.CODIGO,transaction);
                if (!company) throw new Error("company is null as return of integration company"); 
                                
                let warehouse = await Warehouses.getModel().findOne({
                    where:{
                        ID:pcfilial.CODIGO
                    },
                    transaction: transaction
                });
                if (warehouse) {
                    if (warehouse.IDPEOPLE != people.ID) warehouse.IDPEOPLE = people.ID;
                    if (warehouse.IDCOMPANY != company.ID) warehouse.IDCOMPANY = company.ID;
                    await warehouse.save({transaction:transaction});
                } else {
                    warehouse = await Warehouses.getModel().create({
                        ID: pcfilial.CODIGO,
                        IDORIGINDATA: OriginsDatas.WINTHOR,
                        IDPEOPLE : people.ID,
                        IDCOMPANY : company.ID
                    },{transaction:transaction});
                }

                let client = await ClientsIntegrationsController.integrateWinthorPcClientToClient(pcfilial.CGCENT,transaction);
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
                        IDTABLE2 : Clients.ID,
                        IDREG2: client.ID                            
                    },
                    transaction:transaction
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
                result = warehouse.dataValues;
                return true;
            });            
        } else {
            throw new Error("winthorFilialCode is empty");
        }
        return result;
    }



    static async integrateWinthorWarehouses(req,res,next) {
        try {
            let identifiers = req.body.identifiers || []; 
            Utils.log(identifiers,Utils.typeOf(identifiers));
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                res.data = [];
                for(let key in identifiers) {
                    res.data.push(await WarehousesIntegrationsController.integrateWinthorPcFilialToWarehouse(identifiers[key]));
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


    /**
     * * Process route as array of levels. ex: /modules/inputs/purchases/forecast/get as ['modules','inputs','purchases','forecast','get']
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} arrRoute 
     * @param {*} level 
     * @created 2023-08-25
     * @deprecated 2024-07-15 use processRequest istead
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
                            throw new Error(`origin not expected: ${origin}`);
                    }
                    break;
                case 'create':   
                case 'integrate':                                    
                    switch((origin.NAME || origin).trim().toLowerCase()) {                        
                        case "winthor":
                            await WarehousesIntegrationsController.integrateWinthorWarehouses(req,res,next);
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
                            return this.integrateWinthorWarehouses(req,res,next);
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
module.exports = {WarehousesIntegrationsController}