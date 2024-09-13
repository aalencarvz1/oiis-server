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
const { Items_X_Lots_X_Conteiners } = require("../../../../../database/models/Items_X_Lots_X_Conteiners");
const { Lots } = require("../../../../../database/models/Lots");
const { Conteiners } = require("../../../../../database/models/Conteiners");
const { Measurement_Units } = require("../../../../../database/models/Measurement_Units");
const { Packagings } = require("../../../../../database/models/Packagings");
const { Stock_Entity_Relationship_Types } = require("../../../../../database/models/Stock_Entity_Relationship_Types");
const { Movs_X_Items_Stocks } = require("../../../../../database/models/Movs_X_Items_Stocks");
const { Item_Mov_Amounts } = require("../../../../../database/models/Item_Mov_Amounts");
const { Logistic_Orders_X_Items_Mov_Amt } = require("../../../../../database/models/Logistic_Orders_X_Items_Mov_Amt");
const { Utils } = require("../../../../utils/Utils");
const { Logistic_Orders_X_Movs } = require("../../../../../database/models/Logistic_Orders_X_Movs");
const { Logistic_Orders_Winthor_Integration_Controller } = require("./winthor/Logistic_Orders_Winthor_Integration_Controller");
const { Parameter_Values } = require("../../../../../database/models/Parameter_Values");
const { Parameters } = require("../../../../../database/models/Parameters");
const { Logistic_Orders_X_Movs_X_Receipt_Values } = require("../../../../../database/models/Logistic_Orders_X_Movs_X_Receipt_Values");
const { Financial_Value_Forms } = require("../../../../../database/models/Financial_Value_Forms");
const { Currencies } = require("../../../../../database/models/Currencies");
const { Business_Units } = require("../../../../../database/models/Business_Units");
const { Warehouses } = require("../../../../../database/models/Warehouses");
const { Clients } = require("../../../../../database/models/Clients");
const { Clients_Integration_Controller } = require("../../../registers/people/clients/integrations/Clients_Integration_Controller");
const { Logistic_Orders_X_Dest_Values } = require("../../../../../database/models/Logistic_Orders_X_Dest_Values");
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
            Utils.log(e);
        }
        return result;
    }

    static async saveLog(creator_user_id, idTableRef,idRegisterRef, logs, messages, exceptions){
        try {
            for(let kl in logs || []) {
                let log = await Logistic_Logs.getOrCreate({
                    raw:false,
                    where:{
                        id: logs[kl].IDONSERVER || -1
                    },
                    values:{
                        id:undefined,
                        creator_user_id: creator_user_id,
                        IDTABLEREF: idTableRef,
                        IDREGISTERREF: idRegisterRef,
                        OPERATION: logs[kl].OPERATION,
                        JSONOBJECT: logs[kl].JSONOBJECT,
                        COLUMNNAME: logs[kl].COLUMNNAME,
                        OLDVALUE: logs[kl].OLDVALUE,
                        NEWVALUE: logs[kl].NEWVALUE,
                        latitude: logs[kl].latitude,
                        longitude: logs[kl].longitude
                    }
                });
                if (log.success) {
                    log = log.data;
                    logs[kl].IDONSERVER = log.id;
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

    static async sendlogisticorderdata(req,res) {
        try {
            let loadings = req.body.loadings || [];
            let messages = [];
            let exceptions = [];
            let idsLogOrders = [];
            let lotWhithoutLot = null;
            if (loadings) {
                for(let key in loadings) {
                    let data_origin_id = Logistic_Orders_Integration_Controller.getDataOriginId(loadings[key].data_origin_id);
                    let query = `select min(codfilial) as CODFILIAL from JUMBO.PCPEDC where numcar = ${loadings[key].IDLOADORIGIN}`;
                    let codFilial = await DBConnectionManager.getWinthorDBConnection().query(query,{queryType:Sequelize.QueryTypes.SELECT});
                    if (codFilial) {
                        codFilial = codFilial[0][0].CODFILIAL;
                    } else {
                        codFilial = 1;
                    }

                    let businessUnit = await Business_Units.getModel().findOne({
                        raw:true,
                        where:{
                            id:codFilial
                        }
                    });
                    if (!businessUnit) throw new Error(`business unit not found: ${codFilial}`);
                    let warehouse = await Warehouses.getModel().findOne({
                        raw:true,
                        where:{
                            id:codFilial
                        }
                    });
                    if (!warehouse) throw new Error(`warehouse not found: ${codFilial}`);
                    let company = await Companies.getModel().findOne({
                        raw:true,
                        where:{
                            id:businessUnit.company_id
                        }
                    });
                    if (!company) throw new Error(`company not found: ${businessUnit.company_id}`);
                    

                    let logisticOrder = await Logistic_Orders.getModel().findOne({                        
                        where: {
                            data_origin_id: data_origin_id,
                            id_at_origin:loadings[key].IDLOADORIGIN
                        }
                    });
                    if (!logisticOrder) {
                        logisticOrder = await Logistic_Orders.getModel().create({
                            creator_user_id: req.user.id,
                            data_origin_id: data_origin_id,
                            id_at_origin:loadings[key].IDLOADORIGIN,
                            IDLOGISTICMOVTYPE: Logistic_Mov_Types.DELIVERY,
                            IDIDENTIFIERTYPE: Identifier_Types.CODE,
                            IDENTIFIER: loadings[key].IDLOADORIGIN,
                            IDLOGISTICSTATUS: loadings[key].IDSTATUSENTREGA
                        });
                    } else {
                        if (logisticOrder.IDLOGISTICSTATUS != loadings[key].IDSTATUSENTREGA) {
                            logisticOrder.IDLOGISTICSTATUS = loadings[key].IDSTATUSENTREGA;
                            logisticOrder.updater_user_id = req.user.id;
                            await logisticOrder.save();
                        }
                    }
                    idsLogOrders.push(logisticOrder.id);

                    for(let kn in loadings[key].NOTASFISCAIS || []) {
                        let idOriginMov = Logistic_Orders_Integration_Controller.getDataOriginId(loadings[key].NOTASFISCAIS[kn].data_origin_id);                        
                        let mov = await Movements.getModel().findOne({
                            where:{
                                data_origin_id: idOriginMov,
                                IDBUSINESSUNIT: businessUnit.id,
                                IDTYPEMOV: Movement_Types.OUTPUT,
                                IDIDENTIFIERTYPE: Identifier_Types.CODE,
                                IDENTIFIER: loadings[key].NOTASFISCAIS[kn].IDINVOICEORIGIN,
                            }
                        });
                        Utils.log('FL',mov);
                        if (!mov) {

                            let client = await Clients_Integration_Controller.integrateWinthorPcClientToClient(loadings[key].NOTASFISCAIS[kn].CGC);
                            if (!client) {
                                throw new Error("client is null as return of integration client")
                            } else if (!client.success) {
                                if ((client.message||client?.exception.message||'').indexOf('not found in PCCLIENT') > -1) {
                                    client = await Clients_Integration_Controller.integrateEpClientToClient(loadings[key].NOTASFISCAIS[kn].CGC);
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
                            let idFinancialValueForm = Financial_Value_Forms.getIdByIntegrationId(loadings[key].NOTASFISCAIS[kn].IDFINANCIALCOLLECTIONORIGIN||'');                            

                            try {
                                mov = await Movements.getModel().create({
                                    creator_user_id: req.user.id,
                                    data_origin_id: idOriginMov,
                                    id_at_origin: loadings[key].NOTASFISCAIS[kn].id_at_origin,
                                    IDTYPEMOV: Movement_Types.OUTPUT,
                                    IDIDENTIFIERTYPE: Identifier_Types.CODE,
                                    IDENTIFIER: loadings[key].NOTASFISCAIS[kn].IDINVOICEORIGIN,
                                    company_id: company.id,
                                    IDWAREHOUSE: warehouse.id,
                                    IDBUSINESSUNIT: businessUnit.id,
                                    IDCLIENT: client?.id,
                                    IDFINANCIALVALUEFORM : idFinancialValueForm
                                });
                            } catch (eMov) {
                                if (eMov.name == 'SequelizeUniqueConstraintError' || eMov instanceof SequelizeUniqueConstraintError 
                                    || eMov.message?.toLowerCase().contains('duplicate') || eMov.code == 'ER_DUP_ENTRY' || eMov.errno == 1062
                                ) {
                                    mov = await Movements.getModel().findOne({
                                        where:{
                                            data_origin_id: idOriginMov,
                                            IDBUSINESSUNIT: businessUnit.id,
                                            IDTYPEMOV: Movement_Types.OUTPUT,
                                            IDIDENTIFIERTYPE: Identifier_Types.CODE,
                                            IDENTIFIER: loadings[key].NOTASFISCAIS[kn].IDINVOICEORIGIN,
                                        }
                                    }); 
                                    if (!mov) {
                                        throw eMov;
                                    }
                                } else {
                                    throw eMov;
                                }
                            }

                        } 

                        //logisticOrderXMov
                        let logisticOrderXMov = await Logistic_Orders_X_Movs.getOrCreate({
                            raw:false,
                            where:{
                                data_origin_id: mov.data_origin_id,
                                IDLOGISTICORDER: logisticOrder.id,
                                IDMOV: mov.id                                
                            },
                            values:{
                                creator_user_id: req.user.id,
                                IDLOGISTICSTATUS: loadings[key].NOTASFISCAIS[kn].IDSTATUSENTREGA
                            }
                        });
                        if (logisticOrderXMov.success) {
                            logisticOrderXMov = logisticOrderXMov.data;
                            if (logisticOrderXMov.IDLOGISTICSTATUS != loadings[key].NOTASFISCAIS[kn].IDSTATUSENTREGA) {
                                logisticOrderXMov.IDLOGISTICSTATUS = loadings[key].NOTASFISCAIS[kn].IDSTATUSENTREGA;
                                logisticOrderXMov.updater_user_id = req.user.id;
                                console.log(logisticOrderXMov);
                                await logisticOrderXMov.save();
                            }
                        } else {
                            messages.push(logisticOrderXMov.message);
                            if (logisticOrderXMov.exception) exceptions.push(logisticOrderXMov.exception);
                            continue;
                        }

                        

                        for(let ki in loadings[key].NOTASFISCAIS[kn].ITEMS || []) {

                            //item
                            let item = await Items.getOrCreate({
                                raw:true,
                                where:{
                                    data_origin_id: mov.data_origin_id,
                                    id_at_origin: loadings[key].NOTASFISCAIS[kn].ITEMS[ki].IDITEMORIGEM,   
                                },
                                createMethod: mov.data_origin_id == Data_Origins.AURORA ? Items.integrateByAurora : Items.integrateByWinthor
                            });
                            if (item.success) item = item.data
                            else {
                                messages.push(item.message);
                                if (item.exception) exceptions.push(item.exception);
                                continue;
                            }

                            //stockEntity
                            let stockEntity = await Stock_Entities.getOrCreate({
                                raw:true,
                                where:{
                                    company_id: company.id,
                                    IDBUSINESSUNIT: businessUnit.id,
                                    IDWAREHOUSE: warehouse.id,
                                    IDSUPPLIER: null,
                                    IDCLIENT:null,
                                    IDUSER:null,
                                    IDCOLLABORATOR:null,
                                },
                                values: {
                                    creator_user_id: req.user.id
                                }
                            });
                            if (stockEntity.success) stockEntity = stockEntity.data
                            else {
                                messages.push(stockEntity.message);
                                if (stockEntity.exception) exceptions.push(stockEntity.exception);
                                continue;
                            }

                            let lots = [];
                            if ((loadings[key].NOTASFISCAIS[kn].ITEMS[ki].LOTES ||[]).length > 0) {
                                for(let kl in loadings[key].NOTASFISCAIS[kn].ITEMS[ki].LOTES) {
                                    let lot = await Lots.getOrCreate({
                                        raw:true,
                                        where:{
                                            IDENTIFIER: loadings[key].NOTASFISCAIS[kn].ITEMS[ki].LOTES[kl].IDLOTEORIGEM,
                                            EXPIRATIONDATE: loadings[key].NOTASFISCAIS[kn].ITEMS[ki].LOTES[kl].DTVALIDADE
                                        },
                                        values:{
                                            creator_user_id: req.user.id,
                                            IDIDENTIFIERTYPE: Identifier_Types.IDENTIFIER
                                        }
                                    });
                                    if (lot.success) {
                                        lots.push({
                                            LOT: lot.data,
                                            LOTORIGIN: loadings[key].NOTASFISCAIS[kn].ITEMS[ki].LOTES[kl]
                                        })
                                    }
                                }
                            } else {
                                lotWhithoutLot = lotWhithoutLot || await Lots.getModel().findOne({
                                    raw:true,
                                    where:{
                                        id:Lots.WITHOUT_LOT
                                    }
                                })
                                lots.push({
                                    LOT: lotWhithoutLot,
                                    LOTORIGIN: loadings[key].NOTASFISCAIS[kn].ITEMS[ki] //LOTS CONTAINS SAME FIELDS OF ITEMS
                                })
                            }

                            for(let kl in lots) {
                                //itemXLotXConteiner
                                let itemXLotXConteiner = await Items_X_Lots_X_Conteiners.getOrCreate({
                                    raw:true,
                                    where:{
                                        data_origin_id: item.data_origin_id,
                                        IDITEM: item.id,
                                        IDLOT: lots[kl].LOT.id,
                                        IDCONTEINER: Conteiners.WITHOUT_CONTEINER
                                    },
                                    values: {
                                        creator_user_id: req.user.id,
                                    }
                                });
                                if (itemXLotXConteiner.success) itemXLotXConteiner = itemXLotXConteiner.data
                                else {
                                    messages.push(itemXLotXConteiner.message);
                                    if (itemXLotXConteiner.exception) exceptions.push(itemXLotXConteiner.exception);
                                    continue;
                                }
                            
                                //itemStock
                                let itemStock = await Item_Stocks.getModel().findOne({
                                    raw:true,
                                    where:{
                                        data_origin_id: itemXLotXConteiner.data_origin_id,
                                        IDITEMXLOTXCONTEINER: itemXLotXConteiner.id,
                                        IDSTOCKRELATIONSHIPTYPE: Stock_Entity_Relationship_Types.OWNER,
                                        IDSTOCKENTITY: stockEntity.id,
                                        IDMEASUREMENTUNIT: Measurement_Units[loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE] || Measurement_Units.KG,
                                        IDPACKAGING: Packagings[loadings[key].NOTASFISCAIS[kn].ITEMS[ki].EMBALAGEM] || Packagings.BOX/*,
                                        [Sequelize.Op.and]:[
                                            Sequelize.where(
                                                Sequelize.fn('round',Sequelize.fn('coalesce',Sequelize.col('UNITWEIGHT'),Utils.toNumber(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE == 'KG' || !Utils.hasValue(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN) ? 1 : loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN || 1)),2),
                                                Sequelize.fn('round',Sequelize.literal(Utils.toNumber(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE == 'KG' || !Utils.hasValue(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN) ? 1 : loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN || 1)),2)
                                            )
                                        ]*/
                                    }
                                });
                                if (!itemStock) {
                                    itemStock = await Item_Stocks.getModel().create({
                                        creator_user_id: req.user.id,
                                        data_origin_id: itemXLotXConteiner.data_origin_id,
                                        IDITEMXLOTXCONTEINER: itemXLotXConteiner.id,
                                        IDSTOCKRELATIONSHIPTYPE: Stock_Entity_Relationship_Types.OWNER,
                                        IDSTOCKENTITY: stockEntity.id,
                                        IDMEASUREMENTUNIT: Measurement_Units[loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE] || Measurement_Units.KG,
                                        IDPACKAGING: Packagings[loadings[key].NOTASFISCAIS[kn].ITEMS[ki].EMBALAGEM] || Packagings.BOX/*,
                                        UNITWEIGHT: Utils.toNumber(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE == 'KG' ? 1 : loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN)*/
                                    });
                                    itemStock = itemStock.dataValues;
                                }                                

                                //movXItemStock
                                let movXItemStock = await Movs_X_Items_Stocks.getOrCreate({
                                    raw:true,
                                    where:{
                                        data_origin_id: itemStock.data_origin_id,
                                        IDMOV: mov.id,
                                        IDTYPEMOV: Movement_Types.OUTPUT,
                                        IDITEMSTOCK: itemStock.id
                                    }, 
                                    values:{
                                        creator_user_id: req.user.id,
                                    }
                                });
                                if (movXItemStock.success) movXItemStock = movXItemStock.data
                                else {
                                    messages.push(movXItemStock.message);
                                    if (movXItemStock.exception) exceptions.push(movXItemStock.exception);
                                    continue;
                                }

                                

                                let itemMovAmt = await Item_Mov_Amounts.saveOrCreate({
                                    where:{
                                        data_origin_id: movXItemStock.data_origin_id,
                                        IDMOVXITEMSTOCK: movXItemStock.id,
                                        IDTYPEMOV: Movement_Types.OUTPUT,
                                        IDMEASUREMENTUNIT: itemStock.IDMEASUREMENTUNIT,
                                        IDPACKAGING: itemStock.IDPACKAGING/*,
                                        [Sequelize.Op.and]:[
                                            Sequelize.where(
                                                Sequelize.fn('round',Sequelize.fn('coalesce',Sequelize.col('UNITWEIGHT'),Utils.toNumber(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE == 'KG' || !Utils.hasValue(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN ) ? 1 : loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN  || 1)),2),
                                                Sequelize.fn('round',Sequelize.literal(Utils.toNumber(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE == 'KG' || !Utils.hasValue(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN ) ? 1 : loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN  || 1)),2)
                                            )
                                        ]*/
                                    },
                                    values:{
                                        data_origin_id: movXItemStock.data_origin_id,
                                        IDSTATUSMOV: movXItemStock.IDSTATUSMOV,
                                        EXPECTEDAMT: lots[kl].LOTORIGIN.QT,
                                        MOVIMENTEDAMT: lots[kl].LOTORIGIN.QTENTREGUE,
                                        UNITVALUE: loadings[key].NOTASFISCAIS[kn].ITEMS[ki].VLUN
                                    }
                                });
                                if (itemMovAmt.success) itemMovAmt = itemMovAmt.data
                                else {
                                    messages.push(itemMovAmt.message);
                                    if (itemMovAmt.exception) exceptions.push(itemMovAmt.exception);
                                    continue;
                                }                                
                                
                                let logXItemMovAmt = await Logistic_Orders_X_Items_Mov_Amt.saveOrCreate({
                                    raw:false,
                                    where:{
                                        data_origin_id: itemMovAmt.data_origin_id,
                                        IDLOGISTICORDERXMOV: logisticOrderXMov.id,
                                        IDITEMMOVAMT: itemMovAmt.id,
                                        IDLOGISTICMOVTYPE: logisticOrder.IDLOGISTICMOVTYPE,
                                        IDTYPEMOV: itemMovAmt.IDTYPEMOV,
                                        IDMEASUREMENTUNIT: itemStock.IDMEASUREMENTUNIT,
                                        IDPACKAGING: itemStock.IDPACKAGING/*,
                                        [Sequelize.Op.and]:[
                                            Sequelize.where(
                                                Sequelize.fn('round',Sequelize.fn('coalesce',Sequelize.col('UNITWEIGHT'),Utils.toNumber(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE == 'KG' || !Utils.hasValue(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN) ? 1 : loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN || 1)),2),
                                                Sequelize.fn('round',Sequelize.literal(Utils.toNumber(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE == 'KG' || !Utils.hasValue(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN) ? 1 : loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN || 1)),2)
                                            )
                                        ]  */
                                    },
                                    values:{
                                        IDACTIONSTATUS: logisticOrder.IDACTIONSTATUS,
                                        IDSTATUSMOV: movXItemStock.IDSTATUSMOV,
                                        EXPECTEDAMT: Utils.toNumber(lots[kl].LOTORIGIN.QT || 0),
                                        MOVIMENTEDAMT: Utils.toNumber(lots[kl].LOTORIGIN.QTENTREGUE || 0),
                                        NOTMOVIMENTEDAMT: Utils.toNumber(lots[kl].LOTORIGIN.QTNAOENTREGUE || 0),
                                        RETREATMOVIMENTEDAMT: Utils.toNumber(lots[kl].LOTORIGIN.QTRECOLHIDA || 0),
                                        IDLOGISTICSTATUS: lots[kl].LOTORIGIN.IDSTATUSENTREGA,
                                        IDREASONNOTMOVIMENTEDAMT: lots[kl].LOTORIGIN.IDMOTIVONAOENTREGA,
                                        IDREASONRETREATMOVIMENTEDAMT: lots[kl].LOTORIGIN.IDMOTIVORECOLHIMENTO,
                                        OBSERVATIONSNOTMOVIMENTEDAMT: lots[kl].LOTORIGIN.OBSERVACOESNAOENTREGA,
                                        OBSERVATIONSRETREATMOVIMENTEDAMT: lots[kl].LOTORIGIN.OBSERVACOESRECOLHIMENTO,
                                        PHOTOSNOTMOVIMENTEDAMT: lots[kl].LOTORIGIN.FOTOSNAOENTREGA,
                                        PHOTOSRETREATMOVIMENTEDAMT: lots[kl].LOTORIGIN.FOTOSRECOLHIMENTO,
                                    }
                                });
                                if (!logXItemMovAmt.success) {
                                    messages.push(logXItemMovAmt.message);
                                    if (logXItemMovAmt.exception) exceptions.push(logXItemMovAmt.exception);
                                    continue;
                                }

                                loadings[key].NOTASFISCAIS[kn].ITEMS[ki].IDONSERVER = logXItemMovAmt.data.id;

                                if (loadings[key].NOTASFISCAIS[kn].ITEMS[ki].LOGS) {
                                    await Logistic_Orders_Integration_Controller.saveLog(req.user.id,Logistic_Orders_X_Items_Mov_Amt.id, logXItemMovAmt.data.id, loadings[key].NOTASFISCAIS[kn].ITEMS[ki].LOGS, messages,exceptions);                        
                                }
                                
                            }
                            
                        }

                        for(let kr in loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS || []) {
                            let receivedValue = await Logistic_Orders_X_Movs_X_Receipt_Values.saveOrCreate({
                                where:{
                                    [Sequelize.Op.or]:[{
                                        id: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].IDONSERVER || -1
                                    },{
                                        [Sequelize.Op.and]:[
                                            {
                                                data_origin_id: mov.data_origin_id
                                            },{
                                                IDLOGISTICORDER: logisticOrder.id
                                            },{
                                                IDLOGISTICORDERXMOV: logisticOrderXMov.id
                                            },{
                                                IDFINANCIALVALUEFORM: this.getFinancialValueFormID(loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].IDFINANCIALCOLLECTIONORIGIN)
                                            },{
                                                IDCURRENCYTYPEEXPECTED: Currencies.BRL
                                            },{
                                                ORDERNUM: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].ORDERNUM || 1
                                            },{
                                                IDCURRENCYTYPERECEIVED: Currencies.BRL
                                            }
                                        ]
                                    }]
                                },
                                values:{
                                    id: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].IDONSERVER || undefined,
                                    data_origin_id: mov.data_origin_id,
                                    IDLOGISTICORDER: logisticOrder.id,
                                    IDLOGISTICORDERXMOV: logisticOrderXMov.id,
                                    IDFINANCIALVALUEFORM: this.getFinancialValueFormID(loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].IDFINANCIALCOLLECTIONORIGIN),
                                    IDCURRENCYTYPEEXPECTED: Currencies.BRL,
                                    ORDERNUM: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].ORDERNUM || 1,   
                                    IDCURRENCYTYPERECEIVED: Currencies.BRL,
                                    EXPECTEDVALUE: Utils.toNumber(loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].VLARECEBER || 0),
                                    RECEIVEDVALUE: Utils.toNumber(loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].RECEIPTEDVALUE || 0),
                                    RECEIVED_AT: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].RECEBIDOEM,
                                    CANCELED_AT: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].EXCLUIDOEM
                                }
                            });
                            if (!receivedValue.success) {
                                messages.push(receivedValue.message);
                                if (receivedValue.exception) exceptions.push(receivedValue.exception);
                                continue;
                            }
                            loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].IDONSERVER = receivedValue.data.id;

                            if (loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].LOGS) {
                                await Logistic_Orders_Integration_Controller.saveLog(req.user.id, Logistic_Orders_X_Movs_X_Receipt_Values.id, receivedValue.data.id, loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].LOGS, messages,exceptions);                        
                            }
                        }

                        loadings[key].NOTASFISCAIS[kn].IDONSERVER = logisticOrderXMov.id;

                        if (loadings[key].NOTASFISCAIS[kn].LOGS) {
                            await Logistic_Orders_Integration_Controller.saveLog(req.user.id, Logistic_Orders_X_Movs.id, logisticOrderXMov.id, loadings[key].NOTASFISCAIS[kn].LOGS, messages,exceptions);                        
                        }
                    }

                    for(let kd in loadings[key].DESTINACAOVALORES || []) {

                        let idFinValForm = Financial_Value_Forms.getIdByIntegrationId(loadings[key].DESTINACAOVALORES[kd].IDFINANCIALCOLLECTIONORIGIN || 'D');
                        let idFinValMovType = Financial_Value_Mov_Types.getIdByIntegrationId(loadings[key].DESTINACAOVALORES[kd].FORMA || 'DEPÓSITO');

                        let logDestVal = await Logistic_Orders_X_Dest_Values.getModel().findOne({
                            where:{
                                [Sequelize.Op.or]: [{
                                    id: loadings[key].DESTINACAOVALORES[kd].IDONSERVER || -1
                                },{
                                    [Sequelize.Op.and]:[
                                        {
                                            data_origin_id: Data_Origins.APP_DELIVERY
                                        },{
                                            IDLOGISTICORDER: logisticOrder.id
                                        },{
                                            IDLOGORDFINANCIALVALUEFORM: idFinValForm
                                        },{
                                            IDFINANCIALVALUEMOVTYPEDEST: idFinValMovType
                                        }
                                    ]
                                }]
                            }
                        });

                        if (!logDestVal) {
                            logDestVal = await Logistic_Orders_X_Dest_Values.getModel().create({
                                creator_user_id: req.user.id,
                                data_origin_id: Data_Origins.APP_DELIVERY,
                                IDLOGISTICORDER: logisticOrder.id,
                                IDLOGORDFINANCIALVALUEFORM: idFinValForm,
                                IDFINANCIALVALUEMOVTYPEDEST: idFinValMovType,
                                DESTINATEDVALUE: Utils.toNumber(loadings[key].DESTINACAOVALORES[kd].VLFECHADO || 0),
                                observations: loadings[key].DESTINACAOVALORES[kd].OBSERVACOES
                            });
                        } else {                            
                            logDestVal.DESTINATEDVALUE = Utils.toNumber(loadings[key].DESTINACAOVALORES[kd].VLFECHADO || 0);
                            logDestVal.updater_user_id = req.user.id;
                            await logDestVal.save();
                        }

                        

                        loadings[key].DESTINACAOVALORES[kd].IDONSERVER = logDestVal.id;

                        if (loadings[key].DESTINACAOVALORES[kd].LOGS) {
                            await Logistic_Orders_Integration_Controller.saveLog(req.user.id, Logistic_Orders_X_Dest_Values.id, logDestVal.id, loadings[key].DESTINACAOVALORES[kd].LOGS, messages,exceptions);                        
                        }
                    }

                    loadings[key].IDONSERVER = logisticOrder.id;

                    if (loadings[key].LOGS) {
                        await Logistic_Orders_Integration_Controller.saveLog(req.user.id, Logistic_Orders.id, logisticOrder.id, loadings[key].LOGS, messages,exceptions);                        
                    }
                }
                if (messages.length || exceptions.length) {
                    res.success = false;
                    res.message = messages;
                    res.exception = exceptions;
                    res.sendResponse(501,false);
                } else {
                    res.data = loadings;
                    res.sendResponse(200,true);    
                    try {
                        if (idsLogOrders.length > 0 && Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION)) == true && Utils.toBool(await Parameter_Values.get(Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER)) == true) {
                            await Logistic_Orders_Winthor_Integration_Controller.integrateBoxClosing(idsLogOrders);
                        }   
                    } catch (ex) {
                        Utils.log(ex); //not re-send data to user, separated 'thred'
                    }
                }
            } else {
                throw new Error('missing data');
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