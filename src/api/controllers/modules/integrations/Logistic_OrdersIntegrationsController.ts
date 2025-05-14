import { NextFunction, Request, Response } from "express";
import BaseRegistersIntegrationsController from "./BaseRegistersIntegrationsController.js";
import DataSwap from "../../data/DataSwap.js";
import Utils from "../../utils/Utils.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import { Op, QueryTypes, Sequelize, Transaction } from "sequelize";
import Business_Units from "../../../database/models/Business_Units.js";
import Warehouses from "../../../database/models/Warehouses.js";
import Companies from "../../../database/models/Companies.js";
import Logistic_Orders from "../../../database/models/Logistic_Orders.js";
import Logistic_Mov_Types from "../../../database/models/Logistic_Mov_Types.js";
import Identifier_Types from "../../../database/models/Identifier_Types.js";
import Logistic_Orders_Movs from "../../../database/models/Logistic_Orders_Movs.js";
import Movements from "../../../database/models/Movements.js";
import Financial_Value_Forms from "../../../database/models/Financial_Value_Forms.js";
import Movement_Types from "../../../database/models/Movement_Types.js";
import Logistic_Orders_Items_Mov_Amt from "../../../database/models/Logistic_Orders_Items_Mov_Amt.js";
import Lots from "../../../database/models/Lots.js";
import Logistic_Orders_Movs_Received_Values from "../../../database/models/Logistic_Orders_Movs_Received_Values.js";
import Currencies from "../../../database/models/Currencies.js";
import Financial_Value_Mov_Types from "../../../database/models/Financial_Value_Mov_Types.js";
import Logistic_Orders_Dest_Values from "../../../database/models/Logistic_Orders_Dest_Values.js";
import Data_Origins from "../../../database/models/Data_Origins.js";
import Parameter_Values from "../../../database/models/Parameter_Values.js";
import Parameters from "../../../database/models/Parameters.js";
import Logistic_Logs from "../../../database/models/Logistic_Logs.js";
import Items from "../../../database/models/Items.js";
import Stock_Entities from "../../../database/models/Stock_Entities.js";
import Items_Lots_Containers from "../../../database/models/Items_Lots_Containers.js";
import Containers from "../../../database/models/Containers.js";
import Item_Stocks from "../../../database/models/Item_Stocks.js";
import Stock_Entity_Relationship_Types from "../../../database/models/Stock_Entity_Relationship_Types.js";
import Measurement_Units from "../../../database/models/Measurement_Units.js";
import Packagings from "../../../database/models/Packagings.js";
import Movs_Items_Stocks from "../../../database/models/Movs_Items_Stocks.js";
import Item_Mov_Amounts from "../../../database/models/Item_Mov_Amounts.js";
import AuroraItemsIntegrationsController from "./aurora/AuroraItemsIntegrationsController.js";
import EpClientsIntegrationsController from "./ep/registers/EpClientsIntegrationsController.js";
import PcClientController from "./winthor/registers/PcClientController.js";
import PcProdutController from "./winthor/registers/PcProdutController.js";
import PcCarregController from "./winthor/registers/PcCarregController.js";


export default class Logistic_OrdersIntegrationsController extends BaseRegistersIntegrationsController {


    /**
     * @created 2025-01-04
     * @version 1.0.0
     */
    static getDataOriginId(data_origin_id: number) : number {
        let result = Data_Origins.DEFAULT_ORIGINDATA;
        switch(data_origin_id) {
            case 0:
                result = Data_Origins.WINTHOR;
                break;
            case 1:
                result = Data_Origins.AURORA;
                break;
        }
        return result;
    }

    /**
     * @created 2025-01-04
     * @version 1.0.0
     */
    static getFinancialValueFormID(idOnOrigin?: any) : number {
        let result = Financial_Value_Forms.MONEY;
        idOnOrigin = (idOnOrigin || '').toString().trim().toUpperCase();
        if (idOnOrigin.indexOf('CH') === 0) {
            result = Financial_Value_Forms.CHECK;
        } else if (idOnOrigin.indexOf('CD') === 0 || idOnOrigin.indexOf('CC') === 0 || idOnOrigin.indexOf('CT') === 0 || idOnOrigin.indexOf('CAR') === 0) {
            result = Financial_Value_Forms.CARD;
        } else if (idOnOrigin.indexOf('PIX') === 0 || idOnOrigin.indexOf('PX') === 0) {
            result = Financial_Value_Forms.PIX;
        } else if (idOnOrigin.indexOf('BOLET') > -1 || ['237','104','1299','1399','2399','748'].indexOf(idOnOrigin) > -1) {
            result = Financial_Value_Forms.BOLET;
        }
        return result;
    }

    /**
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async saveLog(creator_user_id: number, idTableRef: number,idRegisterRef: number, logs: any, messages: any, exceptions: any, transaction?: Transaction) : Promise<void>{
        try {
            for(let kl in logs || []) {
                let log : any = null;
                if (!(Utils.hasValue(logs[kl].server_id) && logs[kl].server_id > 0)) {                    
                    log = await Logistic_Logs.create({
                        creator_user_id: creator_user_id,
                        table_ref_id: idTableRef,
                        record_ref_id: idRegisterRef,
                        operation: logs[kl].operation,
                        json_object: logs[kl].json_object,
                        column_name: logs[kl].column_name,
                        old_value: logs[kl].old_value,
                        new_value: logs[kl].new_value,
                        latitude: logs[kl].latitude,
                        longitude: logs[kl].longitude                        
                    },{
                        transaction
                    });
                }
                if (Utils.hasValue(log)) {
                    logs[kl].server_id = log.id;
                } 
            }
        } catch (e: any) {
            messages.push(e.message);
            exceptions.push(e);
        }
    }

    /**
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async getOrCreateLotFromOriginLot(params: any,originLot: any,transaction?: Transaction) : Promise<any> {
        let result = await Lots.getOrCreate({
            where:{
                [Op.or]: [{
                    id: originLot.server_id || -1,
                },{
                    [Op.and]: [
                        Sequelize.literal(`not exists(select 1 from ${Lots.tableName} t1 where t1.id = ${originLot.server_id || -1})`),
                        {
                            identifier: originLot.identifier||null,
                        },{
                            expiration_date: originLot.expirartion_date||null
                        }
                    ]
                }]
            },
            values:{
                creator_user_id: params.user.id,
                identifier_type_id: Identifier_Types.IDENTIFIER,
                identifier: originLot.identifier||null,
                expiration_date: originLot.expirartion_date||null
            },
            useWhereAsValues: false,
            transaction
        });
        
        return result;
    }


    /**
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async getOrCreateLogistic_Orders_Items_Mov_AmtFromOriginItem(
        params: any, 
        company: any, 
        businessUnit: any, 
        warehouse: any, 
        logisticOrder: any, 
        logisticOrderXMov: any, 
        mov: any,
        movItem: any, 
        lot: any, 
        transaction: any, 
        messages: any, 
        exceptions: any
    ) : Promise<void> {
        let item : any = await Items.getOrCreate({
            raw:true,
            where:{
                data_origin_id: mov.data_origin_id,
                id_at_origin: movItem.item_id,   
            },
            createMethod: mov.data_origin_id == Data_Origins.AURORA ? AuroraItemsIntegrationsController.integrate : PcProdutController.integrate,
            transaction
        });

        //stockEntity
        let stockEntity : any = await Stock_Entities.getOrCreate({
            raw:true,
            where:{
                company_id: company.id,
                business_unit_id: businessUnit.id,
                warehouse_id: warehouse.id,
                supplier_id: null,
                client_id:null,
                user_id:null,
                collaborator_id:null,
            },
            values: {
                creator_user_id: params.user.id
            },
            transaction
        });


        let itemXLotXConteiner : any = await Items_Lots_Containers.getOrCreate({
            raw:true,
            where:{
                data_origin_id: item.data_origin_id,
                item_id: item.id,
                lot_id: lot.id,
                container_id: Containers.WITHOUT_CONTEINER
            },
            values: {
                creator_user_id: params.user.id,
            },
            transaction
        });
    
        //itemStock
        let itemStock : any = await Item_Stocks.getOrCreate({
            raw:true,
            where:{
                data_origin_id: itemXLotXConteiner.data_origin_id,
                item_lot_container_id: itemXLotXConteiner.id,
                stock_relationship_type_id: Stock_Entity_Relationship_Types.OWNER,
                stock_entity_id: stockEntity.id,
                measurement_unit_id: (Measurement_Units as any)[movItem.un] || Measurement_Units.WT,
                packaging_id: (Packagings as any)[movItem.package] || Packagings.BOX
            },
            values:{
                creator_user_id: params.user.id,
            },
            transaction
        });

        //movXItemStock
        let movXItemStock : any = await Movs_Items_Stocks.getOrCreate({
            raw:true,
            where:{
                data_origin_id: itemStock.data_origin_id,
                mov_id: mov.id,
                type_mov_id: Movement_Types.OUTPUT,
                stock_item_id: itemStock.id
            }, 
            values:{
                creator_user_id: params.user.id,
            },
            transaction
        });
        

        let itemMovAmt : any = await Item_Mov_Amounts.saveOrCreate({
            where:{
                data_origin_id: movXItemStock.data_origin_id,
                mov_item_stock_id: movXItemStock.id,
                type_mov_id: Movement_Types.OUTPUT,
                measurement_unit_id: itemStock.measurement_unit_id,
                packaging_id: itemStock.packaging_id
            },
            values:{
                data_origin_id: movXItemStock.data_origin_id,
                status_mov_id: movXItemStock.status_mov_id,
                expected_amt: Utils.firstValid([lot.qty,movItem.qty]),
                moved_amt: Utils.firstValid([lot.delivered_qty,movItem.delivered_qty]),
                unit_value: movItem.un_value
            },
            transaction
        });
        if (itemMovAmt.success) itemMovAmt = itemMovAmt.data
        else {
            throw itemMovAmt.exception || new Error(itemMovAmt.message);
        }                                
        
        let logXItemMovAmt : any = await Logistic_Orders_Items_Mov_Amt.saveOrCreate({
            raw:false,
            where:{
                data_origin_id: itemMovAmt.data_origin_id,
                mov_logistic_order_id: logisticOrderXMov.id,
                item_mov_amt_id: itemMovAmt.id,
                logistic_mov_type_id: logisticOrder.logistic_mov_type_id,
                type_mov_id: itemMovAmt.type_mov_id,
                measurement_unit_id: itemStock.measurement_unit_id,
                packaging_id: itemStock.packaging_id
            },
            values:{
                action_status_id: logisticOrder.action_status_id,
                status_mov_id: movXItemStock.status_mov_id,
                expected_amt: Utils.toNumber(Utils.firstValid([lot.qty,movItem.qty])),
                moved_amt: Utils.toNumber(Utils.firstValid([lot.delivered_qty,movItem.delivered_qty])),
                unmoved_qty: Utils.toNumber(Utils.firstValid([lot.not_delivered_qty,movItem.not_delivered_qty])),
                collected_qty: Utils.toNumber(Utils.firstValid([lot.collected_qty,movItem.collected_qty])),
                logistic_status_id: Utils.firstValid([lot.delivery_status_id,movItem.delivery_status_id]),
                unmoved_reason_id: Utils.firstValid([lot.not_delivered_reason_id,movItem.not_delivered_reason_id]),
                collected_reason_id: Utils.firstValid([lot.collected_reason_id,movItem.collected_reason_id]),
                unmoved_qty_notes: Utils.firstValid([lot.not_delivered_notes,movItem.not_delivered_notes]),
                collected_qty_notes:Utils.firstValid([lot.collected_notes,movItem.collected_notes]),
                unmoved_photos: Utils.firstValid([lot.not_delivered_photos,movItem.not_delivered_photos]),
                collected_photos: Utils.firstValid([lot.collected_photos,movItem.collected_photos]),
            },
            transaction
        });
        if (!logXItemMovAmt.success) {
            throw logXItemMovAmt.exception || new Error(logXItemMovAmt.message);
        }

        movItem.server_id = logXItemMovAmt.data.id;

        if (movItem.logs) {
            await this.saveLog(params.user.id,Logistic_Orders_Items_Mov_Amt.id, logXItemMovAmt.data.id, movItem.logs, messages,exceptions,transaction);                        
        }
            
    }


    /**
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async sendLogisticOrderData(params: any) : Promise<any> {
        let result = new DataSwap();
        try {
            let cargos : any = params?.cargos || [];
            let messages : any = [];
            let exceptions : any = [];
            let idsLogOrders : any = [];
            if (Utils.hasValue(cargos)) {
                await DBConnectionManager.getDefaultDBConnection()?.transaction(async (transaction) => {
                    for(let key in cargos) {
                        let data_origin_id = this.getDataOriginId(cargos[key].data_origin_id);
                        let query = `select min(codfilial) as CODFILIAL from JUMBO.PCPEDC where numcar = ${cargos[key].id_at_origin}`;
                        let codFilial : any = await DBConnectionManager.getWinthorDBConnection()?.query(query,{type:QueryTypes.SELECT});
                        if (Utils.hasValue(codFilial)) {
                            codFilial = codFilial[0].CODFILIAL;
                        } else {
                            codFilial = 1;
                        }

                        let businessUnit = await Business_Units.findOne({
                            raw:true,
                            where:{
                                id:codFilial
                            },
                            //transaction
                        });
                        if (!Utils.hasValue(businessUnit)) throw new Error(`business unit not found: ${codFilial}`);
                        let warehouse = await Warehouses.findOne({
                            raw:true,
                            where:{
                                id:codFilial
                            },
                            //transaction
                        });
                        if (!Utils.hasValue(warehouse)) throw new Error(`warehouse not found: ${codFilial}`);
                        let company = await Companies.findOne({
                            raw:true,
                            where:{
                                id:businessUnit.company_id
                            },
                            //transaction
                        });
                        if (!Utils.hasValue(company)) throw new Error(`company not found: ${businessUnit.company_id}`);
                        

                        
                        let logisticOrder : any = await Logistic_Orders.getOrCreate({                        
                            where: {
                                [Op.or]: [{
                                    id:cargos[key].server_id || -1,
                                },{
                                    [Op.and]: [
                                        Sequelize.literal(`not exists(select 1 from ${Logistic_Orders.tableName} l1 where l1.id = ${cargos[key].server_id || -1})`),
                                        {
                                            data_origin_id: data_origin_id
                                        },{
                                            id_at_origin:cargos[key].id_at_origin
                                        }
                                    ]
                                }]
                            },
                            values: {
                                creator_user_id: params.user.id,
                                data_origin_id: data_origin_id,
                                id_at_origin:cargos[key].id_at_origin,
                                logistic_mov_type_id: Logistic_Mov_Types.DELIVERY,
                                identifier_type_id: Identifier_Types.CODE,
                                identifier: cargos[key].id_at_origin,
                                logistic_status_id: cargos[key].delivery_status_id
                            },
                            useWhereAsValues: false,
                            transaction
                        });
                       
                        
                        if (logisticOrder.logistic_status_id != cargos[key].delivery_status_id) {
                            logisticOrder.logistic_status_id = cargos[key].delivery_status_id;
                            logisticOrder.updater_user_id = params.user.id;
                            await logisticOrder.save({transaction});
                        }
                        
                        cargos[key].server_id = logisticOrder.id;
                        idsLogOrders.push(logisticOrder.id);

                        for(let kn in cargos[key].invoices || []) {
                            let idOriginMov = this.getDataOriginId(cargos[key].invoices[kn].data_origin_id);                        

                            //logisticOrderXMov
                            let logisticOrderXMov : any = null;
                            if (Utils.hasValue(cargos[key].invoices[kn].server_id) && cargos[key].invoices[kn].server_id > 0) {
                                logisticOrderXMov = await Logistic_Orders_Movs.findOneWithTransactionOrNot({
                                    where:{
                                        id:cargos[key].invoices[kn].server_id, 
                                    },
                                    transaction
                                });
                            }
                            
                            let mov = null;

                            if (!Utils.hasValue(logisticOrderXMov)) {
                                mov = await Movements.findOneWithTransactionOrNot({
                                    where:{
                                        data_origin_id: idOriginMov,
                                        id_at_origin:cargos[key].invoices[kn].id_at_origin
                                    },
                                    transaction
                                });

                                if (!Utils.hasValue(mov)) {
                                    let client : any = await PcClientController.integrate({
                                        winthorClientId:cargos[key].invoices[kn].client_id_at_origin,
                                        transaction
                                    });
                                    if (!Utils.hasValue(client)) {
                                        throw new Error("client is null as return of integration client")
                                    } else if (!client.success) {
                                        if ((client.message||client?.exception.message||'').indexOf('not found in PCCLIENT') > -1) {
                                            client = await EpClientsIntegrationsController.integrate(cargos[key].invoices[kn].client_document);
                                            if (client && client.success) {
                                                client = client?.data[0];
                                            }
                                        } else {
                                            client?.throw();                         
                                        }
                                    } else {
                                        client = client.data;
                                    }
                                    let idFinancialValueForm = Financial_Value_Forms.getIdByIntegrationId(cargos[key].invoices[kn].financial_value_form_id||'');                            


                                    mov = await Movements.getOrCreate({
                                        where:{
                                            data_origin_id: idOriginMov,
                                            id_at_origin:cargos[key].invoices[kn].id_at_origin
                                        },
                                        values:{
                                            creator_user_id: params.user.id,
                                            type_mov_id: Movement_Types.OUTPUT,
                                            identifier_type_id: Identifier_Types.CODE,
                                            identifier: cargos[key].invoices[kn].invoice_number,
                                            company_id: company.id,
                                            warehouse_id: warehouse.id,
                                            business_unit_id: businessUnit.id,
                                            client_id: client?.id,
                                            financial_value_form_id : idFinancialValueForm,
                                            seller_id: cargos[key].invoices[kn].seller_id
                                        },
                                        transaction
                                    });
                                                                   
                                } 

                                logisticOrderXMov = await Logistic_Orders_Movs.getOrCreate({
                                    where:{
                                        data_origin_id: idOriginMov,
                                        logistic_order_id: logisticOrder.id,
                                        mov_id: mov.id,                                
                                    },
                                    values:{
                                        creator_user_id: params.user.id,
                                        logistic_status_id: cargos[key].invoices[kn].delivery_status_id
                                    },
                                    transaction
                                });


                               
                                if (logisticOrderXMov.logistic_status_id != cargos[key].invoices[kn].delivery_status_id) {
                                    logisticOrderXMov.logistic_status_id = cargos[key].invoices[kn].delivery_status_id;
                                    logisticOrderXMov.updater_user_id = params.user.id;
                                    await logisticOrderXMov.save({transaction});
                                }    

                            } else {                            
                                if (logisticOrderXMov.logistic_status_id != cargos[key].invoices[kn].delivery_status_id) {
                                    logisticOrderXMov.logistic_status_id = cargos[key].invoices[kn].delivery_status_id;
                                    logisticOrderXMov.updater_user_id = params.user.id;
                                    await logisticOrderXMov.save({transaction});
                                }
                                mov = await Movements.findOneWithTransactionOrNot({
                                    where:{
                                        id : logisticOrderXMov.mov_id
                                    },
                                    transaction
                                });
                            }

                            cargos[key].invoices[kn].server_id = logisticOrderXMov.id;

                            

                            for(let ki in cargos[key].invoices[kn].items || []) {
                                let logXItemMovAmt : any = null;
                                if ((cargos[key].invoices[kn].items[ki].lots ||[]).length > 0) {
                                    for(let kl in cargos[key].invoices[kn].items[ki].lots) {
                                        logXItemMovAmt = null;
                                        if (Utils.hasValue(cargos[key].invoices[kn].items[ki].lots[kl].server_id) && cargos[key].invoices[kn].items[ki].lots[kl].server_id > 0) {
                                            logXItemMovAmt = await Logistic_Orders_Items_Mov_Amt.findOneWithTransactionOrNot({
                                                where:{
                                                    id: cargos[key].invoices[kn].items[ki].lots[kl].server_id
                                                },
                                                transaction
                                            });
                                        }
                                        if (Utils.hasValue(logXItemMovAmt)) {
                                            logXItemMovAmt.action_status_id =  logisticOrder.action_status_id;
                                            logXItemMovAmt.expected_amt =  Utils.toNumber(Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].qty,cargos[key].invoices[kn].items[ki].qty]));
                                            logXItemMovAmt.moved_amt =  Utils.toNumber(Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].delivered_qty,cargos[key].invoices[kn].items[ki].delivered_qty]));
                                            logXItemMovAmt.unmoved_qty =  Utils.toNumber(Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].not_delivered_qty,cargos[key].invoices[kn].items[ki].not_delivered_qty]));
                                            logXItemMovAmt.collected_qty =  Utils.toNumber(Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].collected_qty,cargos[key].invoices[kn].items[ki].collected_qty]));
                                            logXItemMovAmt.logistic_status_id =  Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].delivery_status_id,cargos[key].invoices[kn].items[ki].delivery_status_id]);
                                            logXItemMovAmt.unmoved_reason_id =  Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].not_delivered_reason_id,cargos[key].invoices[kn].items[ki].not_delivered_reason_id]);
                                            logXItemMovAmt.collected_reason_id =  Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].collected_reason_id,cargos[key].invoices[kn].items[ki].collected_reason_id]);
                                            logXItemMovAmt.unmoved_qty_notes =  Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].not_delivered_notes,cargos[key].invoices[kn].items[ki].not_delivered_notes]);
                                            logXItemMovAmt.collected_qty_notes =  Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].collected_notes,cargos[key].invoices[kn].items[ki].collected_notes]);
                                            logXItemMovAmt.unmoved_photos =  Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].not_delivered_photos,cargos[key].invoices[kn].items[ki].not_delivered_photos]);
                                            logXItemMovAmt.collected_photos =  Utils.firstValid([cargos[key].invoices[kn].items[ki].lots[kl].collected_photos,cargos[key].invoices[kn].items[ki].collected_photos]);
                                            await logXItemMovAmt.save({transaction});
                                            if (Utils.hasValue(cargos[key].invoices[kn].items[ki].lots[kl].logs)) {
                                                await this.saveLog(params.user.id,Logistic_Orders_Items_Mov_Amt.id, logXItemMovAmt.id, cargos[key].invoices[kn].items[ki].lots[kl].logs, messages,exceptions,transaction);                        
                                            } else if (Utils.hasValue(cargos[key].invoices[kn].items[ki].logs)) {
                                                await this.saveLog(params.user.id,Logistic_Orders_Items_Mov_Amt.id, logXItemMovAmt.id, cargos[key].invoices[kn].items[ki].logs, messages,exceptions,transaction);                        
                                            }
                                        } else {
                                            let lot = await this.getOrCreateLotFromOriginLot(params,cargos[key].invoices[kn].items[ki].lots[kl],transaction);
                                            logXItemMovAmt = await this.getOrCreateLogistic_Orders_Items_Mov_AmtFromOriginItem(params,company, businessUnit,warehouse,logisticOrder,logisticOrderXMov,mov,cargos[key].invoices[kn].items[ki],lot,transaction, messages, exceptions);
                                        }
                                    } 
                                } else {
                                    if (Utils.hasValue(cargos[key].invoices[kn].items[ki].server_id) && cargos[key].invoices[kn].items[ki].server_id > 0) {
                                        logXItemMovAmt = await Logistic_Orders_Items_Mov_Amt.findOneWithTransactionOrNot({
                                            where:{
                                                id: cargos[key].invoices[kn].items[ki].server_id
                                            },
                                            transaction
                                        });
                                    }
                                    if (Utils.hasValue(logXItemMovAmt)) {
                                        logXItemMovAmt.action_status_id =  logisticOrder.action_status_id;
                                        logXItemMovAmt.expected_amt =  Utils.toNumber(cargos[key].invoices[kn].items[ki].qty || 0);
                                        logXItemMovAmt.moved_amt =  Utils.toNumber(cargos[key].invoices[kn].items[ki].delivered_qty || 0);
                                        logXItemMovAmt.unmoved_qty =  Utils.toNumber(cargos[key].invoices[kn].items[ki].not_delivered_qty || 0);
                                        logXItemMovAmt.collected_qty =  Utils.toNumber(cargos[key].invoices[kn].items[ki].collected_qty || 0);
                                        logXItemMovAmt.logistic_status_id =  cargos[key].invoices[kn].items[ki].delivery_status_id;
                                        logXItemMovAmt.unmoved_reason_id =  cargos[key].invoices[kn].items[ki].not_delivered_reason_id;
                                        logXItemMovAmt.collected_reason_id =  cargos[key].invoices[kn].items[ki].collected_reason_id;
                                        logXItemMovAmt.unmoved_qty_notes =  cargos[key].invoices[kn].items[ki].not_delivered_notes;
                                        logXItemMovAmt.collected_qty_notes =  cargos[key].invoices[kn].items[ki].collected_notes;
                                        logXItemMovAmt.unmoved_photos =  cargos[key].invoices[kn].items[ki].not_delivered_photos;
                                        logXItemMovAmt.collected_photos =  cargos[key].invoices[kn].items[ki].collected_photos;
                                        await logXItemMovAmt.save({transaction});
                                        if (Utils.hasValue(cargos[key].invoices[kn].items[ki].logs)) {
                                            await this.saveLog(params.user.id,Logistic_Orders_Items_Mov_Amt.id, logXItemMovAmt.id, cargos[key].invoices[kn].items[ki].logs, messages,exceptions,transaction);
                                        }
                                    } else {
                                        let lot = await this.getOrCreateLotFromOriginLot(params,{server_id:Lots.WITHOUT_LOT},transaction);
                                        logXItemMovAmt = await this.getOrCreateLogistic_Orders_Items_Mov_AmtFromOriginItem(params,company, businessUnit,warehouse,logisticOrder,logisticOrderXMov,mov,cargos[key].invoices[kn].items[ki],lot,transaction, messages, exceptions);
                                    }
                                }                            
                            }

                            for(let kr in cargos[key].invoices[kn].receivments || []) {

                                let receivedValue : any = await Logistic_Orders_Movs_Received_Values.findOneWithTransactionOrNot({
                                    where:{
                                        [Op.or]: [{
                                            id:cargos[key].invoices[kn].receivments[kr].server_id || -1
                                        },{
                                            [Op.and]: [
                                                Sequelize.literal(`not exists(select 1 from ${Logistic_Orders_Movs_Received_Values.tableName} t1 where t1.id = ${cargos[key].invoices[kn].receivments[kr].server_id || -1})`),
                                                {
                                                    data_origin_id: idOriginMov
                                                },{
                                                    logistic_order_id: logisticOrder.id
                                                },{
                                                    mov_logistic_order_id: logisticOrderXMov.id
                                                },{
                                                    financial_value_form_id: this.getFinancialValueFormID(cargos[key].invoices[kn].receivments[kr].financial_value_form_id)
                                                },{
                                                    expected_currency_id: Currencies.BRL
                                                },{
                                                    numeric_order: cargos[key].invoices[kn].receivments[kr].numeric_order || 1
                                                },{
                                                    received_currency_id: Currencies.BRL
                                                }
                                            ]
                                        }]
                                    },
                                    transaction
                                });
                                if (!Utils.hasValue(receivedValue)) {
                                    receivedValue = await Logistic_Orders_Movs_Received_Values.create({                                
                                        data_origin_id: idOriginMov,
                                        logistic_order_id: logisticOrder.id,
                                        mov_logistic_order_id: logisticOrderXMov.id,
                                        financial_value_form_id: this.getFinancialValueFormID(cargos[key].invoices[kn].receivments[kr].financial_value_form_id),
                                        expected_currency_id: Currencies.BRL,
                                        numeric_order: cargos[key].invoices[kn].receivments[kr].numeric_order || 1,   
                                        received_currency_id: Currencies.BRL,
                                        expected_value: Utils.toNumber(cargos[key].invoices[kn].receivments[kr].value_to_receive || 0),
                                        received_value: Utils.toNumber(cargos[key].invoices[kn].receivments[kr].received_value || 0),
                                        received_at: cargos[key].invoices[kn].receivments[kr].received_at,
                                        canceled_at: cargos[key].invoices[kn].receivments[kr].excluded_at
                                    },{
                                        transaction
                                    });                                
                                } else {
                                    receivedValue.financial_value_form_id =  this.getFinancialValueFormID(cargos[key].invoices[kn].receivments[kr].financial_value_form_id);
                                    receivedValue.numeric_order =  cargos[key].invoices[kn].receivments[kr].numeric_order || 1;
                                    receivedValue.expected_value =  Utils.toNumber(cargos[key].invoices[kn].receivments[kr].value_to_receive || 0);
                                    receivedValue.received_value =  Utils.toNumber(cargos[key].invoices[kn].receivments[kr].received_value || 0);
                                    receivedValue.received_at =  cargos[key].invoices[kn].receivments[kr].received_at;
                                    receivedValue.canceled_at =  cargos[key].invoices[kn].receivments[kr].excluded_at;
                                    receivedValue.updater_user_id = params.user.id;
                                    await receivedValue.save({transaction});
                                };
                                cargos[key].invoices[kn].receivments[kr].server_id = receivedValue.id;

                                if (cargos[key].invoices[kn].receivments[kr].logs) {
                                    await this.saveLog(params.user.id, Logistic_Orders_Movs_Received_Values.id, receivedValue.data.id, cargos[key].invoices[kn].receivments[kr].logs, messages,exceptions,transaction);                        
                                }
                            }

                            //cargos[key].invoices[kn].server_id = logisticOrderXMov.id;

                            if (cargos[key].invoices[kn].logs) {
                                await this.saveLog(params.user.id, Logistic_Orders_Movs.id, logisticOrderXMov.id, cargos[key].invoices[kn].logs, messages,exceptions,transaction);                        
                            }
                        }

                        for(let kd in cargos[key].destination_values || []) {

                            let idFinValForm = Financial_Value_Forms.getIdByIntegrationId(cargos[key].destination_values[kd].financial_value_form_id || 'D');
                            let idFinValMovType = Financial_Value_Mov_Types.getIdByIntegrationId(cargos[key].destination_values[kd].send_value_type || 'DEPÓSITO');

                            let logDestVal : any = await Logistic_Orders_Dest_Values.findOneWithTransactionOrNot({
                                where:{
                                    [Op.or]: [{
                                        id:cargos[key].destination_values[kd].id || -1
                                    },{
                                        [Op.and]: [
                                            Sequelize.literal(`not exists(select 1 from ${Logistic_Orders_Dest_Values.tableName} t1 where t1.id = ${cargos[key].destination_values[kd].id || -1})`),
                                            {
                                                data_origin_id: Data_Origins.APP_DELIVERY
                                            },{
                                                logistic_order_id: logisticOrder.id
                                            },{
                                                logistic_order_financial_value_form_id: idFinValForm
                                            },{
                                                financial_value_mov_type_dest: idFinValMovType
                                            }
                                        ]
                                    }]
                                },
                                transaction
                            });

                            if (!Utils.hasValue(logDestVal)) {
                                logDestVal = await Logistic_Orders_Dest_Values.create({
                                    creator_user_id: params.user.id,
                                    data_origin_id: Data_Origins.APP_DELIVERY,
                                    logistic_order_id: logisticOrder.id,
                                    logistic_order_financial_value_form_id: idFinValForm,
                                    financial_value_mov_type_dest: idFinValMovType,
                                    destinated_value: Utils.toNumber(cargos[key].destination_values[kd].value_closed || 0),
                                    observations: cargos[key].destination_values[kd].notes
                                },{
                                    transaction
                                });                            
                            } else {                            
                                logDestVal.destinated_value = Utils.toNumber(cargos[key].destination_values[kd].value_closed || 0);
                                logDestVal.updater_user_id = params.user.id;
                                await logDestVal.save({transaction});
                            }
                            cargos[key].destination_values[kd].server_id = logDestVal.id;

                            if (cargos[key].destination_values[kd].logs) {
                                await this.saveLog(params.user.id, Logistic_Orders_Dest_Values.id, logDestVal.id, cargos[key].destination_values[kd].logs, messages,exceptions,transaction);                        
                            }
                        }

                        if (cargos[key].logs) {
                            await this.saveLog(params.user.id, Logistic_Orders.id, logisticOrder.id, cargos[key].logs, messages,exceptions, transaction);                        
                        }
                    }
                    return true; //if in here, no errors occured, commit transaction
                });
                if (messages.length || exceptions.length) {
                    result.success = false;
                    result.message = messages;
                    result.exception = exceptions;
                } else {
                    result.data = cargos;
                    result.success = true;
                    try {
                        if (idsLogOrders.length > 0 && Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION)) === true && Utils.toBool(await Parameter_Values.get(Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER)) === true) {
                            // not await
                            PcCarregController.integrateBoxClosing(idsLogOrders);
                        }   
                    } catch (ex) {
                        Utils.logError(ex); //not re-send data to user, separated 'thred'
                    }
                }
            } else {
                throw new Error('missing data');
            }            
        } catch (e: any) {
            result.setException(e);
        } 
        return result;
    } 

    /**
     * @requesthandler
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get_with_integration_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await PcCarregController.getWithWinthorData(req.body);
                    res.sendResponse(200,true);
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    /**
     * @requesthandler
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get_cargos_data_for_delivery(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            let params = req.body || req.query;
            params.user = req.user;
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.setDataSwap(await PcCarregController.getCargosDataForDelivery(params));
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }
    
    /**
     * @requesthandler
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async send_logistic_order_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {            
            let params = req.body || req.query;
            let origin = params.origin || "";
            params.user = req.user;
            res.setDataSwap(await this.sendLogisticOrderData(params));
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }

    /**
     * @requesthandler
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async integrate_box_closing(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await PcCarregController.integrateBoxClosing(req.body.ids);
                    res.sendResponse(200,true);
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    
    
    static {
        this.configureDefaultRequestHandlers([
            this.get_with_integration_data,
            this.get_cargos_data_for_delivery,
            this.send_logistic_order_data,
            this.integrate_box_closing
        ]);
    }
}