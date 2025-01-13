import { Op, Sequelize, Transaction } from "sequelize";
import PcFilial from "../../../../../database/models/winthor/PcFilial.js";
import DataSwap from "../../../../data/DataSwap.js";
import Utils from "../../../../utils/Utils.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";
import Business_Units from "../../../../../database/models/Business_Units.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import Relationships from "../../../../../database/models/Relationships.js";
import Record_Status from "../../../../../database/models/Record_Status.js";
import Relationship_Types from "../../../../../database/models/Relationship_Types.js";
import Companies from "../../../../../database/models/Companies.js";
import Warehouses from "../../../../../database/models/Warehouses.js";
import Clients from "../../../../../database/models/Clients.js";
import Modules from "../../../../../database/models/Modules.js";
import PcClientController from "./PcClientController.js";
import PcClient from "../../../../../database/models/winthor/PcClient.js";

export default class PcFilialController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcFilial;
    }  


    static async integrate(params: any) : Promise<DataSwap> {
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

                        people = await PcClientController.integratePeople([{
                            TIPOFJ: 'J',
                            CGCENT: integrations[key].CGCENT
                        }]);
                        if (!people) throw new Error("people is null as return of people integration");
                        if (!people.success) {
                            if (people.exception) throw people.exception
                            else throw new Error(people.message);
                        }
                        people = people?.data[0];

                        company = await PcFilialController.integrateCompany(integrations[key].CODIGO,transaction);
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

                        let warehouse = await PcFilialController.integrateWarehouse(integrations[key].CODIGO,transaction);
                        if (!warehouse) throw new Error("warehouse is null as return of integration warehouse"); 

                        let client : any = await PcClientController.integrate({
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

    static async integrateCompany(winthorFilialCode?: number,transaction?: Transaction) : Promise<void | Companies> {           
        if (Utils.hasValue(winthorFilialCode)) {
            let pcfilial : any = await PcFilial.findOne({
                raw : true,
                attributes:[
                    ...Object.keys(PcFilial.fields),
                    [Sequelize.literal(`(select c.CGCENT from JUMBO.PCCLIENT c where c.CODCLI = PCFILIAL.CODCLI)`), 'CGCENT']
                ],
                where:{
                    CODIGO:winthorFilialCode
                },
            });
            if (!pcfilial) throw new Error(`codfilial not found in pcfilial: ${winthorFilialCode}`);

            let cgcCompanie = pcfilial.CGCENT.trim().replace(/[^0-9]/g,'')-0
            let radicalCgcCompanie = cgcCompanie + '';
            radicalCgcCompanie = radicalCgcCompanie.substring(0,radicalCgcCompanie.length-6);
            radicalCgcCompanie = radicalCgcCompanie + '0001';

            let pcclientCompany = await PcClient.findOne({
                raw:true,
                //attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                where : {
                    [Op.and] : [
                        Sequelize.where(
                            Sequelize.cast(Sequelize.fn('substr',
                                Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                                0,
                                Sequelize.literal("length(to_number(regexp_replace(CGCENT,'[^0-9]','')))-2")
                            ),'DECIMAL(32)'),
                            '=',
                            Sequelize.cast(Sequelize.fn('regexp_replace',radicalCgcCompanie,'[^0-9]',''),'DECIMAL(32)'),
                        ),
                        Sequelize.literal('DTEXCLUSAO IS NULL')
                    ]
                }
            });

            if (!pcclientCompany) {
                pcclientCompany = await PcClient.findOne({
                    raw:true,
                    //attributes:Object.keys(PcClient.fields).map(el=>Sequelize.col(`${PcClient.tableName}.${el}`)),
                    where : {
                        [Op.and] : [
                            Sequelize.where(
                                Sequelize.cast(Sequelize.fn('substr',
                                    Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGCENT'),'[^0-9]',''),'DECIMAL(32)'),
                                    0,
                                    Sequelize.literal("length(to_number(regexp_replace(CGCENT,'[^0-9]','')))-2")
                                ),'DECIMAL(32)'),
                                '=',
                                Sequelize.cast(Sequelize.fn('regexp_replace',radicalCgcCompanie,'[^0-9]',''),'DECIMAL(32)'),
                            )
                        ]
                    }
                });
            }

            if (!pcclientCompany) throw new Error(`company not foud in pcclient with radical ${radicalCgcCompanie}`);

            let people : any = await PcClientController.integratePeople([{
                TIPOFJ: pcclientCompany.TIPOFJ,
                CGCENT: pcclientCompany.CGCENT
            }]);
            if (!people) throw new Error("people is null as return of people integration");
            if (!people.success) {
                if (people.exception) throw people.exception
                else throw new Error(people.message);
            }
            people = people?.data[0];


            let pcFilialCompany = await PcFilial.findOne({
                raw:true,
                where: Sequelize.where(
                    Sequelize.cast(Sequelize.fn('regexp_replace',Sequelize.col('CGC'),'[^0-9]',''),'DECIMAL(32)'),
                    '=',
                    Sequelize.cast(Sequelize.fn('regexp_replace',pcclientCompany.CGCENT,'[^0-9]',''),'DECIMAL(32)')
                )
            });

            if (!pcFilialCompany) throw new Error(`pcfilial of company with cgc not fount: ${pcclientCompany.CGCENT}`);

            let queryParams : any = {
                where: {
                    people_id: people.id
                }
            };
            if (transaction) queryParams.transaction = transaction;

            let company : any = await Companies.findOne(queryParams);
            if (!Utils.hasValue(company)) {
                queryParams = {
                    where: {
                        id: pcFilialCompany.CODIGO
                    }
                };
                company = await Companies.findOne(queryParams);
            }
            let options : any = {};
            if (transaction) options.transaction = transaction;

            //try preserve winthor code, if unique or primary key viloated, then raise exception here
            if (Utils.hasValue(company)) {
                if (company.id != pcFilialCompany.CODIGO) company.id = pcFilialCompany.CODIGO; 
                if (company.people_id != people.id) company.people_id = people.id;                    
                await company.save(options);                
            } else {
                company = await Companies.create({                    
                    id : pcFilialCompany.CODIGO,
                    data_origin_id: Data_Origins.WINTHOR,
                    people_id: people.id
                },options)
            }
            return company;
        } else {
            throw new Error("winthorFilialCode is empty");
        }

    }

    static async integrateMultiplesCompanies(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || params || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                result.data = [];
                for(let key in identifiers) {
                    result.data.push(await this.integrateCompany(identifiers[key]));
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


    static async integrateWarehouse(winthorFilialCode?: number,transaction?: Transaction) : Promise<null | Warehouses> {           
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
                let people : any = await PcClientController.integratePeople([{
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
                let company = await PcFilialController.integrateCompany(pcfilial.CODIGO,transaction);
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

                let client : any = await PcClientController.integrate({
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

    static async integrateMultiplesWarehouses(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || params || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                result.data = [];
                for(let key in identifiers) {
                    result.data.push(await this.integrateWarehouse(identifiers[key]));
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
    

    static async integrateMultiples(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || params || []; 
            if (Utils.typeOf(identifiers) != 'array') identifiers = identifiers.split(',');                    
            if (identifiers.length > 0) {
                result.data = [];
                for(let key in identifiers) {
                    result.data.push(await this.integrate(identifiers[key]));
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

    static {
        this.configureDefaultRequestHandlers();
    }
}