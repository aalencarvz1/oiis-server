const { Sequelize } = require("sequelize");
const DBConnectionManager = require("../../../../../database/DBConnectionManager");
const { Action_Status } = require("../../../../../database/models/Action_Status");
const { Identifier_Types } = require("../../../../../database/models/Identifier_Types");
const { Item_Stocks } = require("../../../../../database/models/Item_Stocks");
const { Logistic_Orders } = require("../../../../../database/models/Logistic_Orders");
const { Logistic_Mov_Types } = require("../../../../../database/models/Logistic_Mov_Types");
const { Movements } = require("../../../../../database/models/Movements");
const { Movement_Types } = require("../../../../../database/models/Movement_Types");
const { Data_Origins } = require("../../../../../database/models/Data_Origins");
const { Companies } = require("../../../../../database/models/Companies");
const { Items } = require("../../../../../database/models/Items");
const { Stock_Entities } = require("../../../../../database/models/Stock_Entities");
const { Items_Lots_Containers } = require("../../../../../database/models/Items_Lots_Containers");
const { Lots } = require("../../../../../database/models/Lots");
const { Containers } = require("../../../../../database/models/Containers");
const { Measurement_Units } = require("../../../../../database/models/Measurement_Units");
const { Packagings } = require("../../../../../database/models/Packagings");
const { Stock_Entity_Relationship_Types } = require("../../../../../database/models/Stock_Entity_Relationship_Types");
const { Movs_Items_Stocks } = require("../../../../../database/models/Movs_Items_Stocks");
const { Item_Mov_Amounts } = require("../../../../../database/models/Item_Mov_Amounts");
const { Logistic_Orders_Items_Mov_Amt } = require("../../../../../database/models/Logistic_Orders_Items_Mov_Amt");
const { Utils } = require("../../../../utils/Utils");
const { Logistic_Orders_Movs } = require("../../../../../database/models/Logistic_Orders_Movs");
const { Logistic_Orders_Winthor_Integration_Controller } = require("./winthor/Logistic_Orders_Winthor_Integration_Controller");
const { Parameter_Values } = require("../../../../../database/models/Parameter_Values");
const { Parameters } = require("../../../../../database/models/Parameters");
const { Logistic_Orders_Movs_Received_Values } = require("../../../../../database/models/Logistic_Orders_Movs_Received_Values");
const { Financial_Value_Forms } = require("../../../../../database/models/Financial_Value_Forms");
const { Currencies } = require("../../../../../database/models/Currencies");
const { Business_Units } = require("../../../../../database/models/Business_Units");
const { Warehouses } = require("../../../../../database/models/Warehouses");
const { Clients } = require("../../../../../database/models/Clients");
const { Clients_Integration_Controller } = require("../../../registers/people/clients/integrations/Clients_Integration_Controller");
const { Logistic_Orders_Dest_Values } = require("../../../../../database/models/Logistic_Orders_Dest_Values");
const { Financial_Value_Mov_Types } = require("../../../../../database/models/Financial_Value_Mov_Types");
const { Logistic_Logs } = require("../../../../../database/models/Logistic_Logs");
const { BaseEndPointController } = require("../../../../endpoints/BaseEndPointController");


/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 */
class Logistic_Orders_Integration_Controller extends BaseEndPointController{

    static getDataOriginId(data_origin_id) {
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

    static getIdAction_Status(idStatus) {
        let result = Action_Status.NOT_STARTED;                    
        switch(idStatus) {
            case 2:
                result = Action_Status.RUNNING;
                break;
            case 3:
                result = Action_Status.CONCLUDED;
                break;
        }
        return result;
    }    

    static getFinancialValueFormID(idOnOrigin) {
        let result = Financial_Value_Forms.MONEY;
        try {
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
        } catch (e) {
            Utils.logError(e);
        }
        return result;
    }

    static async saveLog(creator_user_id, idTableRef,idRegisterRef, logs, messages, exceptions, transaction){
        try {
            for(let kl in logs || []) {
                let log = await Logistic_Logs.getOrCreate({
                    raw:false,
                    where:{
                        id: logs[kl].server_id || -1
                    },
                    values:{
                        id:undefined,
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
                    },
                    transaction
                });
                if (log.success) {
                    log = log.data;
                    logs[kl].server_id = log.id;
                } else {
                    messages.push(log.message);
                    if (log.exception) exceptions.push(log.exception);
                    continue;
                }
            }
        } catch (e) {
            messages.push(e.message);
            exceptions.push(e);
        }
    }

    static async getOrCreateLotFromOriginLot(req,originLot,transaction) {
        let result = await Lots.getModel().findOne({
            where:{
                [Sequelize.Op.or]: [{
                    id: originLot.server_id || -1,
                },{
                    [Sequelize.Op.and]: [
                        Sequelize.literal(`not exists(select 1 from ${Lots.tableName} t1 where t1.id = ${originLot.server_id || -1})`),
                        {
                            identifier: originLot.identifier||null,
                        },{
                            expiration_date: originLot.expirartion_date||null
                        }
                    ]
                }]
            },
            transaction
        });
        
        if (!Utils.hasValue(result)) {
            result = await Lots.getModel().create({                
                creator_user_id: req.user.id,
                identifier_type_id: Identifier_Types.IDENTIFIER,
                identifier: originLot.identifier||null,
                expiration_date: originLot.expirartion_date||null
            },{
                transaction
            });
        };
        return result;
    }

    static async getOrCreateLogistic_Orders_Items_Mov_AmtFromOriginItem(req, company, businessUnit, warehouse, logisticOrder, logisticOrderXMov, mov,movItem, lot, transaction, messages, exceptions) {
        let item = await Items.getOrCreate({
            raw:true,
            where:{
                data_origin_id: mov.data_origin_id,
                id_at_origin: movItem.item_id,   
            },
            createMethod: mov.data_origin_id == Data_Origins.AURORA ? Items.integrateByAurora : Items.integrateByWinthor,
            transaction
        });
        if (item.success) item = item.data
        else {
            throw item.exception || new Error(item.message);
        }

        //stockEntity
        let stockEntity = await Stock_Entities.getOrCreate({
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
                creator_user_id: req.user.id
            },
            transaction
        });
        if (stockEntity.success) stockEntity = stockEntity.data
        else {
            throw stockEntity.exception || new Error(stockEntity.message);
        }


        let itemXLotXConteiner = await Items_Lots_Containers.getOrCreate({
            raw:true,
            where:{
                data_origin_id: item.data_origin_id,
                item_id: item.id,
                lot_id: lot.id,
                container_id: Containers.WITHOUT_CONTEINER
            },
            values: {
                creator_user_id: req.user.id,
            },
            transaction
        });
        if (itemXLotXConteiner.success) itemXLotXConteiner = itemXLotXConteiner.data
        else {
            throw itemXLotXConteiner.exception || new Error(itemXLotXConteiner.message);
        }
    
        //itemStock
        let itemStock = await Item_Stocks.getModel().findOne({
            raw:true,
            where:{
                data_origin_id: itemXLotXConteiner.data_origin_id,
                item_lot_container_id: itemXLotXConteiner.id,
                stock_relationship_type_id: Stock_Entity_Relationship_Types.OWNER,
                stock_entity_id: stockEntity.id,
                measurement_unit_id: Measurement_Units[movItem.un] || Measurement_Units.KG,
                packaging_id: Packagings[movItem.package] || Packagings.BOX
            },
            transaction
        });
        if (!itemStock) {
            itemStock = await Item_Stocks.getModel().create({
                creator_user_id: req.user.id,
                data_origin_id: itemXLotXConteiner.data_origin_id,
                item_lot_container_id: itemXLotXConteiner.id,
                stock_relationship_type_id: Stock_Entity_Relationship_Types.OWNER,
                stock_entity_id: stockEntity.id,
                measurement_unit_id: Measurement_Units[movItem.un] || Measurement_Units.KG,
                packaging_id: Packagings[movItem.package] || Packagings.BOX
            },{
                transaction
            });
            itemStock = itemStock.dataValues;
        }                                

        //movXItemStock
        let movXItemStock = await Movs_Items_Stocks.getOrCreate({
            raw:true,
            where:{
                data_origin_id: itemStock.data_origin_id,
                mov_id: mov.id,
                type_mov_id: Movement_Types.OUTPUT,
                stock_item_id: itemStock.id
            }, 
            values:{
                creator_user_id: req.user.id,
            },
            transaction
        });
        if (movXItemStock.success) movXItemStock = movXItemStock.data
        else {
            throw movXItemStock.exception || new Error(movXItemStock.message);
        }

        

        let itemMovAmt = await Item_Mov_Amounts.saveOrCreate({
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
        
        let logXItemMovAmt = await Logistic_Orders_Items_Mov_Amt.saveOrCreate({
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
            await Logistic_Orders_Integration_Controller.saveLog(req.user.id,Logistic_Orders_Items_Mov_Amt.id, logXItemMovAmt.data.id, movItem.logs, messages,exceptions,transaction);                        
        }
            
    }

    static async sendlogisticorderdata(req,res) {
        Utils.logi(`${Logistic_Orders_Integration_Controller.name}`,`sendlogisticorderdata`);
        try {
            let cargos = req.body.cargos || [];
            let messages = [];
            let exceptions = [];
            let idsLogOrders = [];
            if (Utils.hasValue(cargos)) {
                await DBConnectionManager.getDefaultDBConnection().transaction(async (transaction) => {
                    for(let key in cargos) {
                        let data_origin_id = Logistic_Orders_Integration_Controller.getDataOriginId(cargos[key].data_origin_id);
                        let query = `select min(codfilial) as CODFILIAL from JUMBO.PCPEDC where numcar = ${cargos[key].id_at_origin}`;
                        let codFilial = await DBConnectionManager.getWinthorDBConnection().query(query,{type:Sequelize.QueryTypes.SELECT});
                        if (Utils.hasValue(codFilial)) {
                            codFilial = codFilial[0].CODFILIAL;
                        } else {
                            codFilial = 1;
                        }

                        let businessUnit = await Business_Units.getModel().findOne({
                            raw:true,
                            where:{
                                id:codFilial
                            },
                            transaction
                        });
                        if (!Utils.hasValue(businessUnit)) throw new Error(`business unit not found: ${codFilial}`);
                        let warehouse = await Warehouses.getModel().findOne({
                            raw:true,
                            where:{
                                id:codFilial
                            },
                            transaction
                        });
                        if (!Utils.hasValue(warehouse)) throw new Error(`warehouse not found: ${codFilial}`);
                        let company = await Companies.getModel().findOne({
                            raw:true,
                            where:{
                                id:businessUnit.company_id
                            },
                            transaction
                        });
                        if (!Utils.hasValue(company)) throw new Error(`company not found: ${businessUnit.company_id}`);
                        

                        
                        let logisticOrder = await Logistic_Orders.getModel().findOne({                        
                            where: {
                                [Sequelize.Op.or]: [{
                                    id:cargos[key].server_id || -1,
                                },{
                                    [Sequelize.Op.and]: [
                                        Sequelize.literal(`not exists(select 1 from ${Logistic_Orders.tableName} l1 where l1.id = ${cargos[key].server_id || -1})`),
                                        {
                                            data_origin_id: data_origin_id
                                        },{
                                            id_at_origin:cargos[key].id_at_origin
                                        }
                                    ]
                                }]
                            },
                            transaction
                        });
                        if (!Utils.hasValue(logisticOrder)) {
                            logisticOrder = await Logistic_Orders.getModel().create({
                                creator_user_id: req.user.id,
                                data_origin_id: data_origin_id,
                                id_at_origin:cargos[key].id_at_origin,
                                logistic_mov_type_id: Logistic_Mov_Types.DELIVERY,
                                identifier_type_id: Identifier_Types.CODE,
                                identifier: cargos[key].id_at_origin,
                                logistic_status_id: cargos[key].delivery_status_id
                            },{
                                transaction
                            });
                        } else {
                            if (logisticOrder.logistic_status_id != cargos[key].delivery_status_id) {
                                logisticOrder.logistic_status_id = cargos[key].delivery_status_id;
                                logisticOrder.updater_user_id = req.user.id;
                                await logisticOrder.save({transaction});
                            }
                        }
                        cargos[key].server_id = logisticOrder.id;
                        idsLogOrders.push(logisticOrder.id);

                        for(let kn in cargos[key].invoices || []) {
                            let idOriginMov = Logistic_Orders_Integration_Controller.getDataOriginId(cargos[key].invoices[kn].data_origin_id);                        

                            //logisticOrderXMov
                            let logisticOrderXMov = await Logistic_Orders_Movs.getModel().findOne({
                                where:{
                                    id:cargos[key].invoices[kn].server_id || -1,                                    
                                },
                                transaction
                            });
                            let mov = null;

                            if (!Utils.hasValue(logisticOrderXMov)) {
                                mov = await Movements.getModel().findOne({
                                    where:{
                                        data_origin_id: idOriginMov,
                                        id_at_origin:cargos[key].invoices[kn].id_at_origin
                                    },
                                    transaction
                                });

                                if (!Utils.hasValue(mov)) {
                                    let client = await Clients_Integration_Controller.integrateWinthorPcClientToClient({
                                        winthorClientId:cargos[key].invoices[kn].client_id_at_origin,
                                        transaction
                                    });
                                    if (!Utils.hasValue(client)) {
                                        throw new Error("client is null as return of integration client")
                                    } else if (!client.success) {
                                        if ((client.message||client?.exception.message||'').indexOf('not found in PCCLIENT') > -1) {
                                            client = await Clients_Integration_Controller.integrateEpClientToClient(cargos[key].invoices[kn].client_document);
                                            if (client && client.success) {
                                                client = client?.data[0];
                                            }
                                        } else {
                                            if (client.exception) throw client.exception
                                            else throw new Error(client.message);                            
                                        }
                                    } else {
                                        client = client.data;
                                    }
                                    let idFinancialValueForm = Financial_Value_Forms.getIdByIntegrationId(cargos[key].invoices[kn].financial_value_form_id||'');                            

                                    try {
                                        mov = await Movements.getModel().create({
                                            creator_user_id: req.user.id,
                                            data_origin_id: idOriginMov,
                                            id_at_origin: cargos[key].invoices[kn].id_at_origin,
                                            type_mov_id: Movement_Types.OUTPUT,
                                            identifier_type_id: Identifier_Types.CODE,
                                            identifier: cargos[key].invoices[kn].invoice_number,
                                            company_id: company.id,
                                            warehouse_id: warehouse.id,
                                            business_unit_id: businessUnit.id,
                                            client_id: client?.id,
                                            financial_value_form_id : idFinancialValueForm,
                                            seller_id: cargos[key].invoices[kn].seller_id
                                        },{
                                            transaction
                                        });
                                    } catch (eMov) {
                                        if (eMov.name == 'SequelizeUniqueConstraintError' || eMov instanceof SequelizeUniqueConstraintError 
                                            || eMov.message?.toLowerCase().contains('duplicate') || eMov.code == 'ER_DUP_ENTRY' || eMov.errno == 1062
                                        ) {
                                            mov = await Movements.getModel().findOne({
                                                where:{
                                                    data_origin_id: idOriginMov,
                                                    id_at_origin:cargos[key].invoices[kn].id_at_origin
                                                },
                                                //transaction possible created by other transaction
                                            }); 
                                            if (!mov) {
                                                throw eMov;
                                            }
                                        } else {
                                            throw eMov;
                                        }
                                    }                                
                                } 

                                logisticOrderXMov = await Logistic_Orders_Movs.getModel().findOne({
                                    where:{
                                        data_origin_id: idOriginMov,
                                        logistic_order_id: logisticOrder.id,
                                        mov_id: mov.id,                                
                                    },
                                    transaction
                                });
                                if (!Utils.hasValue(logisticOrderXMov)) {
                                    logisticOrderXMov = await Logistic_Orders_Movs.getModel().create({
                                        data_origin_id: idOriginMov,
                                        logistic_order_id: logisticOrder.id,
                                        mov_id: mov.id,
                                        creator_user_id: req.user.id,
                                        logistic_status_id: cargos[key].invoices[kn].delivery_status_id
                                    },{
                                        transaction
                                    });
                                } else {
                                    if (logisticOrderXMov.logistic_status_id != cargos[key].invoices[kn].delivery_status_id) {
                                        logisticOrderXMov.logistic_status_id = cargos[key].invoices[kn].delivery_status_id;
                                        logisticOrderXMov.updater_user_id = req.user.id;
                                        await logisticOrderXMov.save({transaction});
                                    }    
                                }
                            } else {                            
                                if (logisticOrderXMov.logistic_status_id != cargos[key].invoices[kn].delivery_status_id) {
                                    logisticOrderXMov.logistic_status_id = cargos[key].invoices[kn].delivery_status_id;
                                    logisticOrderXMov.updater_user_id = req.user.id;
                                    await logisticOrderXMov.save({transaction});
                                }
                                mov = await Movements.getModel().findOne({
                                    where:{
                                        id : logisticOrderXMov.mov_id
                                    },
                                    transaction
                                });
                            }

                            cargos[key].invoices[kn].server_id = logisticOrderXMov.id;

                            

                            for(let ki in cargos[key].invoices[kn].items || []) {
                                let logXItemMovAmt = null;
                                if ((cargos[key].invoices[kn].items[ki].lots ||[]).length > 0) {
                                    for(let kl in cargos[key].invoices[kn].items[ki].lots) {
                                        logXItemMovAmt = await Logistic_Orders_Items_Mov_Amt.getModel().findOne({
                                            where:{
                                                id: cargos[key].invoices[kn].items[ki].lots[kl].server_id||-1
                                            },
                                            transaction
                                        });
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
                                                await Logistic_Orders_Integration_Controller.saveLog(req.user.id,Logistic_Orders_Items_Mov_Amt.id, logXItemMovAmt.id, cargos[key].invoices[kn].items[ki].lots[kl].logs, messages,exceptions,transaction);                        
                                            } else if (Utils.hasValue(cargos[key].invoices[kn].items[ki].logs)) {
                                                await Logistic_Orders_Integration_Controller.saveLog(req.user.id,Logistic_Orders_Items_Mov_Amt.id, logXItemMovAmt.id, cargos[key].invoices[kn].items[ki].logs, messages,exceptions,transaction);                        
                                            }
                                        } else {
                                            let lot = await Logistic_Orders_Integration_Controller.getOrCreateLotFromOriginLot(req,cargos[key].invoices[kn].items[ki].lots[kl],transaction);
                                            logXItemMovAmt = await Logistic_Orders_Integration_Controller.getOrCreateLogistic_Orders_Items_Mov_AmtFromOriginItem(req,company, businessUnit,warehouse,logisticOrder,logisticOrderXMov,mov,cargos[key].invoices[kn].items[ki],lot,transaction, messages, exceptions);
                                        }
                                    } 
                                } else {
                                    logXItemMovAmt = await Logistic_Orders_Items_Mov_Amt.getModel().findOne({
                                        where:{
                                            id: cargos[key].invoices[kn].items[ki].server_id||-1
                                        },
                                        transaction
                                    });
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
                                            await Logistic_Orders_Integration_Controller.saveLog(req.user.id,Logistic_Orders_Items_Mov_Amt.id, logXItemMovAmt.id, cargos[key].invoices[kn].items[ki].logs, messages,exceptions,transaction);
                                        }
                                    } else {
                                        let lot = await Logistic_Orders_Integration_Controller.getOrCreateLotFromOriginLot(req,{server_id:Lots.WITHOUT_LOT},transaction);
                                        logXItemMovAmt = await Logistic_Orders_Integration_Controller.getOrCreateLogistic_Orders_Items_Mov_AmtFromOriginItem(req,company, businessUnit,warehouse,logisticOrder,logisticOrderXMov,mov,cargos[key].invoices[kn].items[ki],lot,transaction, messages, exceptions);
                                    }
                                }                            
                            }

                            for(let kr in cargos[key].invoices[kn].receivments || []) {

                                let receivedValue = await Logistic_Orders_Movs_Received_Values.getModel().findOne({
                                    where:{
                                        [Sequelize.Op.or]: [{
                                            id:cargos[key].invoices[kn].receivments[kr].server_id || -1
                                        },{
                                            [Sequelize.Op.and]: [
                                                Sequelize.literal(`not exists(select 1 from ${Logistic_Orders_Movs_Received_Values.tableName} t1 where t1.id = ${cargos[key].invoices[kn].receivments[kr].server_id || -1})`),
                                                {
                                                    data_origin_id: idOriginMov
                                                },{
                                                    logistic_order_id: logisticOrder.id
                                                },{
                                                    mov_logistic_order_id: logisticOrderXMov.id
                                                },{
                                                    financial_value_form_id: Logistic_Orders_Integration_Controller.getFinancialValueFormID(cargos[key].invoices[kn].receivments[kr].financial_value_form_id)
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
                                    receivedValue = await Logistic_Orders_Movs_Received_Values.getModel().create({                                
                                        data_origin_id: idOriginMov,
                                        logistic_order_id: logisticOrder.id,
                                        mov_logistic_order_id: logisticOrderXMov.id,
                                        financial_value_form_id: Logistic_Orders_Integration_Controller.getFinancialValueFormID(cargos[key].invoices[kn].receivments[kr].financial_value_form_id),
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
                                    receivedValue.financial_value_form_id =  Logistic_Orders_Integration_Controller.getFinancialValueFormID(cargos[key].invoices[kn].receivments[kr].financial_value_form_id);
                                    receivedValue.numeric_order =  cargos[key].invoices[kn].receivments[kr].numeric_order || 1;
                                    receivedValue.expected_value =  Utils.toNumber(cargos[key].invoices[kn].receivments[kr].value_to_receive || 0);
                                    receivedValue.received_value =  Utils.toNumber(cargos[key].invoices[kn].receivments[kr].received_value || 0);
                                    receivedValue.received_at =  cargos[key].invoices[kn].receivments[kr].received_at;
                                    receivedValue.canceled_at =  cargos[key].invoices[kn].receivments[kr].excluded_at;
                                    receivedValue.updater_user_id = req.user.id;
                                    await receivedValue.save({transaction});
                                };
                                cargos[key].invoices[kn].receivments[kr].server_id = receivedValue.id;

                                if (cargos[key].invoices[kn].receivments[kr].logs) {
                                    await Logistic_Orders_Integration_Controller.saveLog(req.user.id, Logistic_Orders_Movs_Received_Values.id, receivedValue.data.id, cargos[key].invoices[kn].receivments[kr].logs, messages,exceptions,transaction);                        
                                }
                            }

                            //cargos[key].invoices[kn].server_id = logisticOrderXMov.id;

                            if (cargos[key].invoices[kn].logs) {
                                await Logistic_Orders_Integration_Controller.saveLog(req.user.id, Logistic_Orders_Movs.id, logisticOrderXMov.id, cargos[key].invoices[kn].logs, messages,exceptions,transaction);                        
                            }
                        }

                        for(let kd in cargos[key].destination_values || []) {

                            let idFinValForm = Financial_Value_Forms.getIdByIntegrationId(cargos[key].destination_values[kd].financial_value_form_id || 'D');
                            let idFinValMovType = Financial_Value_Mov_Types.getIdByIntegrationId(cargos[key].destination_values[kd].send_value_type || 'DEPÓSITO');

                            let logDestVal = await Logistic_Orders_Dest_Values.getModel().findOne({
                                where:{
                                    [Sequelize.Op.or]: [{
                                        id:cargos[key].destination_values[kd].id || -1
                                    },{
                                        [Sequelize.Op.and]: [
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
                                logDestVal = await Logistic_Orders_Dest_Values.getModel().create({
                                    creator_user_id: req.user.id,
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
                                logDestVal.updater_user_id = req.user.id;
                                await logDestVal.save({transaction});
                            }
                            cargos[key].destination_values[kd].server_id = logDestVal.id;

                            if (cargos[key].destination_values[kd].logs) {
                                await Logistic_Orders_Integration_Controller.saveLog(req.user.id, Logistic_Orders_Dest_Values.id, logDestVal.id, cargos[key].destination_values[kd].logs, messages,exceptions,transaction);                        
                            }
                        }

                        if (cargos[key].logs) {
                            await Logistic_Orders_Integration_Controller.saveLog(req.user.id, Logistic_Orders.id, logisticOrder.id, cargos[key].logs, messages,exceptions, transaction);                        
                        }
                    }
                    return true; //if in here, no errors occured, commit transaction
                });
                if (messages.length || exceptions.length) {
                    res.success = false;
                    res.message = messages;
                    res.exception = exceptions;
                    res.sendResponse(501,false);
                } else {
                    res.data = cargos;
                    res.sendResponse(200,true);    
                    try {
                        if (idsLogOrders.length > 0 && Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION)) == true && Utils.toBool(await Parameter_Values.get(Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER)) == true) {
                            await Logistic_Orders_Winthor_Integration_Controller.integrateBoxClosing(idsLogOrders);
                        }   
                    } catch (ex) {
                        Utils.logError(ex); //not re-send data to user, separated 'thred'
                    }
                }
            } else {
                throw new Error('missing data');
            }            
        } catch (e) {
            Utils.logError(e);
            res.sendResponse(501,false,e.message || e,null,e);
        } 
        Utils.logf(`${Logistic_Orders_Integration_Controller.name}`,`sendlogisticorderdata`);
    } 


    /**
     * * Process route as array of levels. ex: /modules/inputs/purchases/forecast/get as ['modules','inputs','purchases','forecast','get']
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} arrRoute 
     * @param {*} level 
     * @created 2023-08-25
     * @deprecated 2024-08-15
     */
    static processPostAsRoute = async(req,res,next,route,arrRoute,level) => {
        try {            
            level++;
            switch(arrRoute[level].trim().toLowerCase()) {
                case 'winthor':
                    await Logistic_Orders_Winthor_Integration_Controller.processPostAsRoute(req,res,next,route,arrRoute,level);
                    break;
                case 'sendlogisticorderdata':
                    await Logistic_Orders_Integration_Controller.sendlogisticorderdata(req,res);
                    break;
                default:
                    throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    break;
            }
        } catch (e) {
            res.sendResponse(404,false,e.message || e,null,e);
        }
    }
}

module.exports = {Logistic_Orders_Integration_Controller}