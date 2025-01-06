import { Op, Sequelize } from "sequelize";
import Companies from "../../../../database/models/Companies.js";
import DataSwap from "../../../data/DataSwap.js";
import Data_Origins from "../../../../database/models/Data_Origins.js";
import Utils from "../../../utils/Utils.js";
import PcClient from "../../../../database/models/winthor/PcClient.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import _ from "lodash";
import WinthorPeopleIntegrationsController from "./WinthorPeopleIntegrationsController.js";
import Clients from "../../../../database/models/Clients.js";
import DBConnectionManager from "../../../../database/DBConnectionManager.js";
import Business_Units from "../../../../database/models/Business_Units.js";
import Warehouses from "../../../../database/models/Warehouses.js";
import Relationships from "../../../../database/models/Relationships.js";
import Record_Status from "../../../../database/models/Record_Status.js";
import Relationship_Types from "../../../../database/models/Relationship_Types.js";
import Modules from "../../../../database/models/Modules.js";
import DatabaseUtils from "../../../database/DatabaseUtils.js";

export default class WinthorClientsIntegrationsController extends BaseIntegrationsRegistersController{

    static async get(params?:any) : Promise<void | PcClient[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        return await PcClient.findAll(queryParams);
    }
    
    static async integrateWinthorPcClientToClient(params: any) : Promise<DataSwap> {           
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

                let people : any = await WinthorPeopleIntegrationsController.integrateWinthorPeople([{
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

    static async integrateWinthorClients(params: any) : Promise<DataSwap> {
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

                        people = await WinthorPeopleIntegrationsController.integrateWinthorPeople([{
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

                        let client : any = await this.integrateWinthorPcClientToClient({
                            winthorClientCNPJ: integrations[key].CGCENT,
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
}