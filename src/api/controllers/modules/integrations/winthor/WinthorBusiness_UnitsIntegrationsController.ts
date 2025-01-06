import { Op, Sequelize } from "sequelize";
import Companies from "../../../../database/models/Companies.js";
import Modules from "../../../../database/models/Modules.js";
import Record_Status from "../../../../database/models/Record_Status.js";
import Relationship_Types from "../../../../database/models/Relationship_Types.js";
import Relationships from "../../../../database/models/Relationships.js";
import Warehouses from "../../../../database/models/Warehouses.js";
import DataSwap from "../../../data/DataSwap.js";
import Data_Origins from "../../../../database/models/Data_Origins.js";
import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import DBConnectionManager from "../../../../database/DBConnectionManager.js";
import _ from "lodash";
import PcFilial from "../../../../database/models/winthor/PcFilial.js";
import WinthorPeopleIntegrationsController from "./WinthorPeopleIntegrationsController.js";
import Clients from "../../../../database/models/Clients.js";
import WinthorCompaniesIntegrationsController from "./WinthorCompaniesIntegrationsController.js";
import WinthorClientsIntegrationsController from "./WinthorClientsIntegrationsController.js";
import Business_Units from "../../../../database/models/Business_Units.js";
import WinthorWarehousesIntegrationsController from "./WinthorWarehousesIntegrationsController.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";

export default class WinthorBusiness_UnitsIntegrationsController extends BaseIntegrationsRegistersController{


    static async get(params?:any) : Promise<void | PcFilial[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        return await PcFilial.findAll(queryParams);
    }
    
    static async integrateWinthorBusinessesUnits(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                identifiers = identifiers.map((el:any)=>Utils.hasValue(el)?el:'null');
                result.data = [];
                let integrations : any = await PcFilial.findAll({
                    raw:true,
                    attributes:[
                        ...Object.keys(PcFilial.fields),
                        [Sequelize.literal(`(select c.CGCENT from JUMBO.PCCLIENT c where c.CODCLI = PCFILIAL.CODCLI)`), 'CGCENT']
                    ],
                    where:{
                        CODIGO : {
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

                        people = await WinthorPeopleIntegrationsController.integrateWinthorPeople([{
                            TIPOFJ: 'J',
                            CGCENT: integrations[key].CGCENT
                        }]);
                        if (!people) throw new Error("people is null as return of people integration");
                        if (!people.success) {
                            if (people.exception) throw people.exception
                            else throw new Error(people.message);
                        }
                        people = people?.data[0];

                        company = await WinthorCompaniesIntegrationsController.integrateWinthorPcFilialToCompany(integrations[key].CODIGO,transaction);
                        if (!company) throw new Error("company is null as return of integration company"); 
                        businessUnit = await Business_Units.findOne({
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
                            businessUnit = await Business_Units.create({
                                id: integrations[key].CODIGO,
                                data_origin_id: Data_Origins.WINTHOR,
                                people_id : people.id,
                                company_id : company.id
                            },{transaction:transaction});
                        }

                        let warehouse = await WinthorWarehousesIntegrationsController.integrateWinthorPcFilialToWarehouse(integrations[key].CODIGO,transaction);
                        if (!warehouse) throw new Error("warehouse is null as return of integration warehouse"); 

                        let client : any = await WinthorClientsIntegrationsController.integrateWinthorPcClientToClient({
                            winthorClientCNPJ:integrations[key].CGCENT,
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
                                table_2_id : Business_Units.id,
                                record_2_id: businessUnit.id                            
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
                                table_1_id : Business_Units.id,
                                record_1_id: businessUnit.id,
                                table_2_id : Warehouses.id,
                                record_2_id: warehouse.id                            
                            },
                            transaction: transaction
                        });

                        rel = await Relationships.createIfNotExists({
                            where:{
                                status_reg_id: Record_Status.ACTIVE,
                                relationship_type_id: Relationship_Types.RELATIONSHIP,
                                table_1_id : Business_Units.id,
                                record_1_id: businessUnit.id,
                                table_2_id : Clients.id,
                                record_2_id: client.id                            
                            },
                            transaction: transaction
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
                                table_1_id : Business_Units.id,
                                record_1_id: businessUnit.id,
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
                        
                        result.data.push(businessUnit.dataValues);
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
}