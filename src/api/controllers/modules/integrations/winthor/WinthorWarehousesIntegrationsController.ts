import { Sequelize, Transaction } from "sequelize";
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
import DatabaseUtils from "../../../database/DatabaseUtils.js";

export default class WinthorWarehousesIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcFilial[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        return await PcFilial.findAll(queryParams);
    }

    static async integrateWinthorPcFilialToWarehouse(winthorFilialCode?: number,transaction?: Transaction) : Promise<null | Warehouses> {           
        let result = null;
        if (Utils.hasValue(winthorFilialCode)) {
            let pcfilial : any = await PcFilial.findOne({
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
                  
            await DBConnectionManager.getDefaultDBConnection()?.transaction(async (transaction) => {
                let people : any = await WinthorPeopleIntegrationsController.integrateWinthorPeople([{
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
                let company = await WinthorCompaniesIntegrationsController.integrateWinthorPcFilialToCompany(pcfilial.CODIGO,transaction);
                if (!company) throw new Error("company is null as return of integration company"); 
                                
                let warehouse = await Warehouses.findOne({
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
                    warehouse = await Warehouses.create({
                        id: pcfilial.CODIGO,
                        data_origin_id: Data_Origins.WINTHOR,
                        people_id : people.id,
                        company_id : company.id
                    },{transaction:transaction});
                }

                let client : any = await WinthorClientsIntegrationsController.integrateWinthorPcClientToClient({
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

    static async integrateWinthorWarehouses(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || params || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                result.data = [];
                for(let key in identifiers) {
                    result.data.push(await this.integrateWinthorPcFilialToWarehouse(identifiers[key]));
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