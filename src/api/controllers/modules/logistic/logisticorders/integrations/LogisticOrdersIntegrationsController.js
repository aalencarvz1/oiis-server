const { Sequelize } = require("sequelize");
const DBConnectionManager = require("../../../../../database/DBConnectionManager");
const { ActionsStatus } = require("../../../../../database/models/ActionsStatus");
const { IdentifiersTypes } = require("../../../../../database/models/IdentifiersTypes");
const { ItemsStocks } = require("../../../../../database/models/ItemsStocks");
const { LogisticOrders } = require("../../../../../database/models/LogisticOrders");
const { LogisticMovTypes } = require("../../../../../database/models/LogisticMovTypes");
const { Movements } = require("../../../../../database/models/Movements");
const { MovementsTypes } = require("../../../../../database/models/MovementsTypes");
const { OriginsDatas } = require("../../../../../database/models/OriginsDatas");
const { Companies } = require("../../../../../database/models/Companies");
const { Items } = require("../../../../../database/models/Items");
const { StocksEntities } = require("../../../../../database/models/StocksEntities");
const { ItemsXLotsXConteiners } = require("../../../../../database/models/ItemsXLotsXConteiners");
const { Lots } = require("../../../../../database/models/Lots");
const { Conteiners } = require("../../../../../database/models/Conteiners");
const { MeasurementsUnits } = require("../../../../../database/models/MeasurementsUnits");
const { Packagings } = require("../../../../../database/models/Packagings");
const { StocksEntitiesRelationshipsTypes } = require("../../../../../database/models/StocksEntitiesRelationshipsTypes");
const { MovsXItemsStocks } = require("../../../../../database/models/MovsXItemsStocks");
const { ItemsMovsAmounts } = require("../../../../../database/models/ItemsMovsAmounts");
const { LogisticOrdersXItemsMovAmt } = require("../../../../../database/models/LogisticOrdersXItemsMovAmt");
const { Utils } = require("../../../../utils/Utils");
const { LogisticOrdersXMovs } = require("../../../../../database/models/LogisticOrdersXMovs");
const { LogisticOrdersWinthorIntegrationsController } = require("./winthor/LogisticOrdersWinthorIntegrationsController");
const { ParametersValues } = require("../../../../../database/models/ParametersValues");
const { Parameters } = require("../../../../../database/models/Parameters");
const { LogisticOrdersXMovsXReceiptValues } = require("../../../../../database/models/LogisticOrdersXMovsXReceiptValues");
const { FinancialValueForms } = require("../../../../../database/models/FinancialValueForms");
const { CurrenciesTypes } = require("../../../../../database/models/CurrenciesTypes");
const { BusinessesUnits } = require("../../../../../database/models/BusinessesUnits");
const { Warehouses } = require("../../../../../database/models/Warehouses");
const { Clients } = require("../../../../../database/models/Clients");
const { ClientsIntegrationsController } = require("../../../registers/people/clients/integrations/ClientsIntegrationsController");
const { LogisticOrdersXDestValues } = require("../../../../../database/models/LogisticOrdersXDestValues");
const { FinancialValueMovTypes } = require("../../../../../database/models/FinancialValueMovTypes");
const { LogisticLogs } = require("../../../../../database/models/LogisticLogs");
const { BaseEndPointController } = require("../../../../endpoints/BaseEndPointController");


/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 */
class LogisticOrdersIntegrationsController extends BaseEndPointController{

    static getIdOriginData(idOriginData) {
        let result = OriginsDatas.DEFAULT_ORIGINDATA;
        switch(idOriginData) {
            case 0:
                result = OriginsDatas.WINTHOR;
                break;
            case 1:
                result = OriginsDatas.AURORA;
                break;
        }
        return result;
    }

    static getIdActionStatus(idStatus) {
        let result = ActionsStatus.NOT_STARTED;                    
        switch(idStatus) {
            case 2:
                result = ActionsStatus.RUNNING;
                break;
            case 3:
                result = ActionsStatus.CONCLUDED;
                break;
        }
        return result;
    }    

    static getFinancialValueFormID(idOnOrigin) {
        let result = FinancialValueForms.MONEY;
        try {
            idOnOrigin = (idOnOrigin || '').toString().trim().toUpperCase();
            if (idOnOrigin.indexOf('CH') === 0) {
                result = FinancialValueForms.CHECK;
            } else if (idOnOrigin.indexOf('CD') === 0 || idOnOrigin.indexOf('CC') === 0 || idOnOrigin.indexOf('CT') === 0 || idOnOrigin.indexOf('CAR') === 0) {
                result = FinancialValueForms.CARD;
            } else if (idOnOrigin.indexOf('PIX') === 0 || idOnOrigin.indexOf('PX') === 0) {
                result = FinancialValueForms.PIX;
            } else if (idOnOrigin.indexOf('BOLET') > -1 || ['237','104','1299','1399','2399','748'].indexOf(idOnOrigin) > -1) {
                result = FinancialValueForms.BOLET;
            }
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }

    static async saveLog(idUserCreate, idTableRef,idRegisterRef, logs, messages, exceptions){
        try {
            for(let kl in logs || []) {
                let log = await LogisticLogs.getOrCreate({
                    raw:false,
                    where:{
                        ID: logs[kl].IDONSERVER || -1
                    },
                    values:{
                        ID:undefined,
                        IDUSERCREATE: idUserCreate,
                        IDTABLEREF: idTableRef,
                        IDREGISTERREF: idRegisterRef,
                        OPERATION: logs[kl].OPERATION,
                        JSONOBJECT: logs[kl].JSONOBJECT,
                        COLUMNNAME: logs[kl].COLUMNNAME,
                        OLDVALUE: logs[kl].OLDVALUE,
                        NEWVALUE: logs[kl].NEWVALUE,
                        LATITUDE: logs[kl].LATITUDE,
                        LONGITUDE: logs[kl].LONGITUDE
                    }
                });
                if (log.success) {
                    log = log.data;
                    logs[kl].IDONSERVER = log.ID;
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
                    let idOriginData = LogisticOrdersIntegrationsController.getIdOriginData(loadings[key].IDORIGINDATA);
                    let query = `select min(codfilial) as CODFILIAL from jumbo.pcpedc where numcar = ${loadings[key].IDCARREGAMENTOORIGEM}`;
                    let codFilial = await DBConnectionManager.getWinthorDBConnection().query(query,{queryType:Sequelize.QueryTypes.SELECT});
                    if (codFilial) {
                        codFilial = codFilial[0][0].CODFILIAL;
                    } else {
                        codFilial = 1;
                    }

                    let businessUnit = await BusinessesUnits.getModel().findOne({
                        raw:true,
                        where:{
                            ID:codFilial
                        }
                    });
                    if (!businessUnit) throw new Error(`business unit not found: ${codFilial}`);
                    let warehouse = await Warehouses.getModel().findOne({
                        raw:true,
                        where:{
                            ID:codFilial
                        }
                    });
                    if (!warehouse) throw new Error(`warehouse not found: ${codFilial}`);
                    let company = await Companies.getModel().findOne({
                        raw:true,
                        where:{
                            ID:businessUnit.IDCOMPANY
                        }
                    });
                    if (!company) throw new Error(`company not found: ${businessUnit.IDCOMPANY}`);
                    

                    let logisticOrder = await LogisticOrders.getModel().findOne({                        
                        where: {
                            IDORIGINDATA: idOriginData,
                            IDONORIGINDATA:loadings[key].IDCARREGAMENTOORIGEM
                        }
                    });
                    if (!logisticOrder) {
                        logisticOrder = await LogisticOrders.getModel().create({
                            IDUSERCREATE: req.user.ID,
                            IDORIGINDATA: idOriginData,
                            IDONORIGINDATA:loadings[key].IDCARREGAMENTOORIGEM,
                            IDLOGISTICMOVTYPE: LogisticMovTypes.DELIVERY,
                            IDIDENTIFIERTYPE: IdentifiersTypes.CODE,
                            IDENTIFIER: loadings[key].IDCARREGAMENTOORIGEM,
                            IDLOGISTICSTATUS: loadings[key].IDSTATUSENTREGA
                        });
                    } else {
                        if (logisticOrder.IDLOGISTICSTATUS != loadings[key].IDSTATUSENTREGA) {
                            logisticOrder.IDLOGISTICSTATUS = loadings[key].IDSTATUSENTREGA;
                            logisticOrder.IDUSERUPDATE = req.user.ID;
                            await logisticOrder.save();
                        }
                    }
                    idsLogOrders.push(logisticOrder.ID);

                    for(let kn in loadings[key].NOTASFISCAIS || []) {
                        let idOriginMov = LogisticOrdersIntegrationsController.getIdOriginData(loadings[key].NOTASFISCAIS[kn].IDORIGINDATA);                        
                        let mov = await Movements.getModel().findOne({
                            where:{
                                IDORIGINDATA: idOriginMov,
                                IDBUSINESSUNIT: businessUnit.ID,
                                IDTYPEMOV: MovementsTypes.OUTPUT,
                                IDIDENTIFIERTYPE: IdentifiersTypes.CODE,
                                IDENTIFIER: loadings[key].NOTASFISCAIS[kn].IDNOTAFISCALORIGEM,
                            }
                        });
                        Utils.log('FL',mov);
                        if (!mov) {

                            let client = await ClientsIntegrationsController.integrateWinthorPcClientToClient(loadings[key].NOTASFISCAIS[kn].CGC);
                            if (!client) {
                                throw new Error("client is null as return of integration client")
                            } else if (!client.success) {
                                if ((client.message||client?.exception.message||'').indexOf('not found in pcclient') > -1) {
                                    client = await ClientsIntegrationsController.integrateEpClientToClient(loadings[key].NOTASFISCAIS[kn].CGC);
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
                            let idFinancialValueForm = FinancialValueForms.getIdByIntegrationId(loadings[key].NOTASFISCAIS[kn].IDCOBRANCAORIGEM||'');                            

                            try {
                                mov = await Movements.getModel().create({
                                    IDUSERCREATE: req.user.ID,
                                    IDORIGINDATA: idOriginMov,
                                    IDONORIGINDATA: loadings[key].NOTASFISCAIS[kn].IDONORIGINDATA,
                                    IDTYPEMOV: MovementsTypes.OUTPUT,
                                    IDIDENTIFIERTYPE: IdentifiersTypes.CODE,
                                    IDENTIFIER: loadings[key].NOTASFISCAIS[kn].IDNOTAFISCALORIGEM,
                                    IDCOMPANY: company.ID,
                                    IDWAREHOUSE: warehouse.ID,
                                    IDBUSINESSUNIT: businessUnit.ID,
                                    IDCLIENT: client?.ID,
                                    IDFINANCIALVALUEFORM : idFinancialValueForm
                                });
                            } catch (eMov) {
                                if (eMov.name == 'SequelizeUniqueConstraintError' || eMov instanceof SequelizeUniqueConstraintError 
                                    || eMov.message?.toLowerCase().contains('duplicate') || eMov.code == 'ER_DUP_ENTRY' || eMov.errno == 1062
                                ) {
                                    mov = await Movements.getModel().findOne({
                                        where:{
                                            IDORIGINDATA: idOriginMov,
                                            IDBUSINESSUNIT: businessUnit.ID,
                                            IDTYPEMOV: MovementsTypes.OUTPUT,
                                            IDIDENTIFIERTYPE: IdentifiersTypes.CODE,
                                            IDENTIFIER: loadings[key].NOTASFISCAIS[kn].IDNOTAFISCALORIGEM,
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
                        let logisticOrderXMov = await LogisticOrdersXMovs.getOrCreate({
                            raw:false,
                            where:{
                                IDORIGINDATA: mov.IDORIGINDATA,
                                IDLOGISTICORDER: logisticOrder.ID,
                                IDMOV: mov.ID                                
                            },
                            values:{
                                IDUSERCREATE: req.user.ID,
                                IDLOGISTICSTATUS: loadings[key].NOTASFISCAIS[kn].IDSTATUSENTREGA
                            }
                        });
                        if (logisticOrderXMov.success) {
                            logisticOrderXMov = logisticOrderXMov.data;
                            if (logisticOrderXMov.IDLOGISTICSTATUS != loadings[key].NOTASFISCAIS[kn].IDSTATUSENTREGA) {
                                logisticOrderXMov.IDLOGISTICSTATUS = loadings[key].NOTASFISCAIS[kn].IDSTATUSENTREGA;
                                logisticOrderXMov.IDUSERUPDATE = req.user.ID;
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
                                    IDORIGINDATA: mov.IDORIGINDATA,
                                    IDONORIGINDATA: loadings[key].NOTASFISCAIS[kn].ITEMS[ki].IDITEMORIGEM,   
                                },
                                createMethod: mov.IDORIGINDATA == OriginsDatas.AURORA ? Items.integrateByAurora : Items.integrateByWinthor
                            });
                            if (item.success) item = item.data
                            else {
                                messages.push(item.message);
                                if (item.exception) exceptions.push(item.exception);
                                continue;
                            }

                            //stockEntity
                            let stockEntity = await StocksEntities.getOrCreate({
                                raw:true,
                                where:{
                                    IDCOMPANY: company.ID,
                                    IDBUSINESSUNIT: businessUnit.ID,
                                    IDWAREHOUSE: warehouse.ID,
                                    IDSUPPLIER: null,
                                    IDCLIENT:null,
                                    IDUSER:null,
                                    IDCOLLABORATOR:null,
                                },
                                values: {
                                    IDUSERCREATE: req.user.ID
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
                                            IDUSERCREATE: req.user.ID,
                                            IDIDENTIFIERTYPE: IdentifiersTypes.IDENTIFIER
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
                                        ID:Lots.WITHOUT_LOT
                                    }
                                })
                                lots.push({
                                    LOT: lotWhithoutLot,
                                    LOTORIGIN: loadings[key].NOTASFISCAIS[kn].ITEMS[ki] //LOTS CONTAINS SAME FIELDS OF ITEMS
                                })
                            }

                            for(let kl in lots) {
                                //itemXLotXConteiner
                                let itemXLotXConteiner = await ItemsXLotsXConteiners.getOrCreate({
                                    raw:true,
                                    where:{
                                        IDORIGINDATA: item.IDORIGINDATA,
                                        IDITEM: item.ID,
                                        IDLOT: lots[kl].LOT.ID,
                                        IDCONTEINER: Conteiners.WITHOUT_CONTEINER
                                    },
                                    values: {
                                        IDUSERCREATE: req.user.ID,
                                    }
                                });
                                if (itemXLotXConteiner.success) itemXLotXConteiner = itemXLotXConteiner.data
                                else {
                                    messages.push(itemXLotXConteiner.message);
                                    if (itemXLotXConteiner.exception) exceptions.push(itemXLotXConteiner.exception);
                                    continue;
                                }
                            
                                //itemStock
                                let itemStock = await ItemsStocks.getModel().findOne({
                                    raw:true,
                                    where:{
                                        IDORIGINDATA: itemXLotXConteiner.IDORIGINDATA,
                                        IDITEMXLOTXCONTEINER: itemXLotXConteiner.ID,
                                        IDSTOCKRELATIONSHIPTYPE: StocksEntitiesRelationshipsTypes.OWNER,
                                        IDSTOCKENTITY: stockEntity.ID,
                                        IDMEASUREMENTUNIT: MeasurementsUnits[loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE] || MeasurementsUnits.KG,
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
                                    itemStock = await ItemsStocks.getModel().create({
                                        IDUSERCREATE: req.user.ID,
                                        IDORIGINDATA: itemXLotXConteiner.IDORIGINDATA,
                                        IDITEMXLOTXCONTEINER: itemXLotXConteiner.ID,
                                        IDSTOCKRELATIONSHIPTYPE: StocksEntitiesRelationshipsTypes.OWNER,
                                        IDSTOCKENTITY: stockEntity.ID,
                                        IDMEASUREMENTUNIT: MeasurementsUnits[loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE] || MeasurementsUnits.KG,
                                        IDPACKAGING: Packagings[loadings[key].NOTASFISCAIS[kn].ITEMS[ki].EMBALAGEM] || Packagings.BOX/*,
                                        UNITWEIGHT: Utils.toNumber(loadings[key].NOTASFISCAIS[kn].ITEMS[ki].UNIDADE == 'KG' ? 1 : loadings[key].NOTASFISCAIS[kn].ITEMS[ki].PESOLIQUN)*/
                                    });
                                    itemStock = itemStock.dataValues;
                                }                                

                                //movXItemStock
                                let movXItemStock = await MovsXItemsStocks.getOrCreate({
                                    raw:true,
                                    where:{
                                        IDORIGINDATA: itemStock.IDORIGINDATA,
                                        IDMOV: mov.ID,
                                        IDTYPEMOV: MovementsTypes.OUTPUT,
                                        IDITEMSTOCK: itemStock.ID
                                    }, 
                                    values:{
                                        IDUSERCREATE: req.user.ID,
                                    }
                                });
                                if (movXItemStock.success) movXItemStock = movXItemStock.data
                                else {
                                    messages.push(movXItemStock.message);
                                    if (movXItemStock.exception) exceptions.push(movXItemStock.exception);
                                    continue;
                                }

                                

                                let itemMovAmt = await ItemsMovsAmounts.saveOrCreate({
                                    where:{
                                        IDORIGINDATA: movXItemStock.IDORIGINDATA,
                                        IDMOVXITEMSTOCK: movXItemStock.ID,
                                        IDTYPEMOV: MovementsTypes.OUTPUT,
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
                                        IDORIGINDATA: movXItemStock.IDORIGINDATA,
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
                                
                                let logXItemMovAmt = await LogisticOrdersXItemsMovAmt.saveOrCreate({
                                    raw:false,
                                    where:{
                                        IDORIGINDATA: itemMovAmt.IDORIGINDATA,
                                        IDLOGISTICORDERXMOV: logisticOrderXMov.ID,
                                        IDITEMMOVAMT: itemMovAmt.ID,
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

                                loadings[key].NOTASFISCAIS[kn].ITEMS[ki].IDONSERVER = logXItemMovAmt.data.ID;

                                if (loadings[key].NOTASFISCAIS[kn].ITEMS[ki].LOGS) {
                                    await LogisticOrdersIntegrationsController.saveLog(req.user.ID,LogisticOrdersXItemsMovAmt.ID, logXItemMovAmt.data.ID, loadings[key].NOTASFISCAIS[kn].ITEMS[ki].LOGS, messages,exceptions);                        
                                }
                                
                            }
                            
                        }

                        for(let kr in loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS || []) {
                            let receivedValue = await LogisticOrdersXMovsXReceiptValues.saveOrCreate({
                                where:{
                                    [Sequelize.Op.or]:[{
                                        ID: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].IDONSERVER || -1
                                    },{
                                        [Sequelize.Op.and]:[
                                            {
                                                IDORIGINDATA: mov.IDORIGINDATA
                                            },{
                                                IDLOGISTICORDER: logisticOrder.ID
                                            },{
                                                IDLOGISTICORDERXMOV: logisticOrderXMov.ID
                                            },{
                                                IDFINANCIALVALUEFORM: this.getFinancialValueFormID(loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].IDCOBRANCAORIGEM)
                                            },{
                                                IDCURRENCYTYPEEXPECTED: CurrenciesTypes.BRL
                                            },{
                                                ORDERNUM: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].ORDERNUM || 1
                                            },{
                                                IDCURRENCYTYPERECEIVED: CurrenciesTypes.BRL
                                            }
                                        ]
                                    }]
                                },
                                values:{
                                    ID: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].IDONSERVER || undefined,
                                    IDORIGINDATA: mov.IDORIGINDATA,
                                    IDLOGISTICORDER: logisticOrder.ID,
                                    IDLOGISTICORDERXMOV: logisticOrderXMov.ID,
                                    IDFINANCIALVALUEFORM: this.getFinancialValueFormID(loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].IDCOBRANCAORIGEM),
                                    IDCURRENCYTYPEEXPECTED: CurrenciesTypes.BRL,
                                    ORDERNUM: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].ORDERNUM || 1,   
                                    IDCURRENCYTYPERECEIVED: CurrenciesTypes.BRL,
                                    EXPECTEDVALUE: Utils.toNumber(loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].VLARECEBER || 0),
                                    RECEIVEDVALUE: Utils.toNumber(loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].VLRECEBIDO || 0),
                                    RECEIVED_AT: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].RECEBIDOEM,
                                    CANCELED_AT: loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].EXCLUIDOEM
                                }
                            });
                            if (!receivedValue.success) {
                                messages.push(receivedValue.message);
                                if (receivedValue.exception) exceptions.push(receivedValue.exception);
                                continue;
                            }
                            loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].IDONSERVER = receivedValue.data.ID;

                            if (loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].LOGS) {
                                await LogisticOrdersIntegrationsController.saveLog(req.user.ID, LogisticOrdersXMovsXReceiptValues.ID, receivedValue.data.ID, loadings[key].NOTASFISCAIS[kn].RECEBIMENTOS[kr].LOGS, messages,exceptions);                        
                            }
                        }

                        loadings[key].NOTASFISCAIS[kn].IDONSERVER = logisticOrderXMov.ID;

                        if (loadings[key].NOTASFISCAIS[kn].LOGS) {
                            await LogisticOrdersIntegrationsController.saveLog(req.user.ID, LogisticOrdersXMovs.ID, logisticOrderXMov.ID, loadings[key].NOTASFISCAIS[kn].LOGS, messages,exceptions);                        
                        }
                    }

                    for(let kd in loadings[key].DESTINACAOVALORES || []) {

                        let idFinValForm = FinancialValueForms.getIdByIntegrationId(loadings[key].DESTINACAOVALORES[kd].IDCOBRANCAORIGEM || 'D');
                        let idFinValMovType = FinancialValueMovTypes.getIdByIntegrationId(loadings[key].DESTINACAOVALORES[kd].FORMA || 'DEPÓSITO');

                        let logDestVal = await LogisticOrdersXDestValues.getModel().findOne({
                            where:{
                                [Sequelize.Op.or]: [{
                                    ID: loadings[key].DESTINACAOVALORES[kd].IDONSERVER || -1
                                },{
                                    [Sequelize.Op.and]:[
                                        {
                                            IDORIGINDATA: OriginsDatas.APP_DELIVERY
                                        },{
                                            IDLOGISTICORDER: logisticOrder.ID
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
                            logDestVal = await LogisticOrdersXDestValues.getModel().create({
                                IDUSERCREATE: req.user.ID,
                                IDORIGINDATA: OriginsDatas.APP_DELIVERY,
                                IDLOGISTICORDER: logisticOrder.ID,
                                IDLOGORDFINANCIALVALUEFORM: idFinValForm,
                                IDFINANCIALVALUEMOVTYPEDEST: idFinValMovType,
                                DESTINATEDVALUE: Utils.toNumber(loadings[key].DESTINACAOVALORES[kd].VLFECHADO || 0),
                                OBSERVATIONS: loadings[key].DESTINACAOVALORES[kd].OBSERVACOES
                            });
                        } else {                            
                            logDestVal.DESTINATEDVALUE = Utils.toNumber(loadings[key].DESTINACAOVALORES[kd].VLFECHADO || 0);
                            logDestVal.IDUSERUPDATE = req.user.ID;
                            await logDestVal.save();
                        }

                        

                        loadings[key].DESTINACAOVALORES[kd].IDONSERVER = logDestVal.ID;

                        if (loadings[key].DESTINACAOVALORES[kd].LOGS) {
                            await LogisticOrdersIntegrationsController.saveLog(req.user.ID, LogisticOrdersXDestValues.ID, logDestVal.ID, loadings[key].DESTINACAOVALORES[kd].LOGS, messages,exceptions);                        
                        }
                    }

                    loadings[key].IDONSERVER = logisticOrder.ID;

                    if (loadings[key].LOGS) {
                        await LogisticOrdersIntegrationsController.saveLog(req.user.ID, LogisticOrders.ID, logisticOrder.ID, loadings[key].LOGS, messages,exceptions);                        
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
                        if (idsLogOrders.length > 0 && Utils.toBool(await ParametersValues.get(Parameters.HAS_WINTHOR_INTEGRATION)) == true && Utils.toBool(await ParametersValues.get(Parameters.LOGISTIC_INTEGRATE_AUTOMATIC_CLOSE_BOX_DRIVER)) == true) {
                            await LogisticOrdersWinthorIntegrationsController.integrateBoxClosing(idsLogOrders);
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
                    await LogisticOrdersWinthorIntegrationsController.processPostAsRoute(req,res,next,route,arrRoute,level);
                    break;
                case 'sendlogisticorderdata':
                    await LogisticOrdersIntegrationsController.sendlogisticorderdata(req,res);
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

module.exports = {LogisticOrdersIntegrationsController}