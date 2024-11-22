const { Sequelize } = require("sequelize");
const { PcClient } = require("../../../../../../database/models/winthor/PcClient");
const { PcFilial } = require("../../../../../../database/models/winthor/PcFilial");
const { People_Integration_Controller } = require("../../integrations/People_Integration_Controller");
const { Warehouses } = require("../../../../../../database/models/Warehouses");
const { People } = require("../../../../../../database/models/People");
const { Utils } = require("../../../../../utils/Utils");
const { Data_Origins } = require("../../../../../../database/models/Data_Origins");
const { DatabaseUtils } = require("../../../../../database/DatabaseUtils");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { Companies_Integration_Controller } = require("../../companies/integrations/Companies_Integration_Controller");
const { Clients_Integration_Controller } = require("../../clients/integrations/Clients_Integration_Controller");
const { Relationships } = require("../../../../../../database/models/Relationships");
const { Record_Status } = require("../../../../../../database/models/Record_Status");
const { Relationship_Types } = require("../../../../../../database/models/Relationship_Types");
const { Companies } = require("../../../../../../database/models/Companies");
const { Clients } = require("../../../../../../database/models/Clients");
const { Modules } = require("../../../../../../database/models/Modules");
const { RegistersController } = require("../../../RegistersController");

/**
 * class to handle winthor people integrations
 * @created 2023-09-08
 */
class Warehouses_Integration_Controller extends RegistersController {


    static async integrateWinthorPcFilialToWarehouse(winthorFilialCode,transaction) {           
        let result = null;
        if (Utils.hasValue(winthorFilialCode)) {
            let pcfilial = await PcFilial.getModel().findOne({
                raw : true,
                attributes:[
                    ...Object.keys(PcFilial.fields),
                    [Sequelize.literal(`(select c.CGCENT from JUMBO.PCCLIENT c where c.CODCLI = PCFILIAL.CODCLI)`), 'CGCENT']
                ],
                where:{
                    CODIGO:winthorFilialCode
                }
            });
            if (!pcfilial) throw new Error(`codfilial not found in pcfilial: ${winthorFilialCode}`);
                  
            await DBConnectionManager.getDefaultDBConnection().transaction(async (transaction) => {
                let people = await People_Integration_Controller.integrateWinthorPeople([{
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
                let company = await Companies_Integration_Controller.integrateWinthorPcFilialToCompany(pcfilial.CODIGO,transaction);
                if (!company) throw new Error("company is null as return of integration company"); 
                                
                let warehouse = await Warehouses.getModel().findOne({
                    where:{
                        id:pcfilial.CODIGO
                    },
                    transaction: transaction
                });
                if (warehouse) {
                    if (warehouse.people_id != people.id) warehouse.people_id = people.id;
                    if (warehouse.company_id != company.id) warehouse.company_id = company.id;
                    await warehouse.save({transaction:transaction});
                } else {
                    warehouse = await Warehouses.getModel().create({
                        id: pcfilial.CODIGO,
                        data_origin_id: Data_Origins.WINTHOR,
                        people_id : people.id,
                        company_id : company.id
                    },{transaction:transaction});
                }

                let client = await Clients_Integration_Controller.integrateWinthorPcClientToClient({
                    winthorClientCNPJ:pcfilial.CGCENT,
                    transaction
                });
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
                        relationship_type_id: Relationship_Types.RELATIONSHIP,
                        table_1_id : Companies.id,
                        record_1_id: company.id,
                        table_2_id : Warehouses.id,
                        record_2_id: warehouse.id                            
                    },
                    transaction:transaction
                });
                
                rel = await Relationships.createIfNotExists({
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
                    where:{
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
                    where:{
                        status_reg_id: Record_Status.ACTIVE,
                        relationship_type_id: Relationship_Types.RELATIONSHIP,
                        table_1_id : Companies.id,
                        record_1_id: company.id,
                        table_2_id : Modules.id,
                        record_2_id: Modules.WMS
                    },
                    transaction: transaction
                });

                rel = await Relationships.createIfNotExists({
                    where:{
                        status_reg_id: Record_Status.ACTIVE,
                        relationship_type_id: Relationship_Types.RELATIONSHIP,
                        table_1_id : Warehouses.id,
                        record_1_id: warehouse.id,
                        table_2_id : Modules.id,
                        record_2_id: Modules.WMS
                    },
                    transaction: transaction
                });

                rel = await Relationships.createIfNotExists({
                    where:{
                        status_reg_id: Record_Status.ACTIVE,
                        relationship_type_id: Relationship_Types.RELATIONSHIP,
                        table_1_id : Clients.id,
                        record_1_id: client.id,
                        table_2_id : Modules.id,
                        record_2_id: Modules.WMS
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
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                res.data = [];
                for(let key in identifiers) {
                    res.data.push(await Warehouses_Integration_Controller.integrateWinthorPcFilialToWarehouse(identifiers[key]));
                }
                res.sendResponse(200,true);
            } else {
                throw new Error("not identifiers for integration");
            }

        } catch (e) {
            Utils.logError(e);
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
            let origin = req.body.origin || "";
            switch(arrRoute[level].trim().toLowerCase()) {
                case 'get':                    
                    let queryParams = await DatabaseUtils.prepareQueryParams(req.body.queryParams || {});
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
                            throw new Error(`origin not expected: ${origin}`);
                    }
                    break;
                case 'create':   
                case 'integrate':                                    
                    switch((origin.name || origin).trim().toLowerCase()) {                        
                        case "winthor":
                            await Warehouses_Integration_Controller.integrateWinthorWarehouses(req,res,next);
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
                    switch((origin.name || origin).trim().toLowerCase()) {                        
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
module.exports = {Warehouses_Integration_Controller}