const { Sequelize, Op, QueryTypes } = require("sequelize");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { Action_Status } = require("../../../../../../database/models/Action_Status");
const { Data_Origins } = require("../../../../../../database/models/Data_Origins");
const { PcCarreg } = require("../../../../../../database/models/winthor/PcCarreg");
const { PcNfsaid } = require("../../../../../../database/models/winthor/PcNfsaid");
const { PcDocEletronico } = require("../../../../../../database/models/winthor/PcDocEletronico");
const { Utils } = require("../../../../../utils/Utils");
const { Logistic_Orders_X_Items_Mov_Amt } = require("../../../../../../database/models/Logistic_Orders_X_Items_Mov_Amt");
const { Movements } = require("../../../../../../database/models/Movements");
const { Logistic_Orders_X_Movs } = require("../../../../../../database/models/Logistic_Orders_X_Movs");
const { Logistic_Orders } = require("../../../../../../database/models/Logistic_Orders");
const { Logistic_Status } = require("../../../../../../database/models/Logistic_Status");
const { Parameter_Values } = require("../../../../../../database/models/Parameter_Values");
const { PcEmpr } = require("../../../../../../database/models/winthor/PcEmpr");
const { PcVeicul } = require("../../../../../../database/models/winthor/PcVeicul");
const { Parameters } = require("../../../../../../database/models/Parameters");
const { Identifier_Types } = require("../../../../../../database/models/Identifier_Types");
const { Logistic_Mov_Types } = require("../../../../../../database/models/Logistic_Mov_Types");
const { Users } = require("../../../../../../database/models/Users");
const { WinthorIntegrationsRegistersController } = require("../../../../registers/integrations/winthor/WinthorIntegrationsRegistersController");
const { Relationships } = require("../../../../../../database/models/Relationships");
const { Record_Status } = require("../../../../../../database/models/Record_Status");
const { BaseEndPointController } = require("../../../../../endpoints/BaseEndPointController");


/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 */
class Logistic_Orders_Winthor_Integration_Controller extends BaseEndPointController{

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


    static async integrateBoxClosing(ids) {
        let resultData = {
            COBRANCAS_INTEGRADAS:[],
            COBRANCAS_INTEGRADAS_ANTERIORMENTE:[],
            COBRANCAS_NAO_INTEGRAR:[],
            NOTAS_DEVOLVIDAS_PARCIALMENTE:[],
            NOTAS_DEVOLVIDAS_TOTALMENTE:[],
            NOTAS_EM_ENTREGA:[],
            NOTAS_A_ENTREGAR:[],
            ERRORS : []
        }
        try {            
            if (Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION)) == true) {            
                if (Utils.hasValue(ids)) {
                    if (Utils.typeOf(ids) !== 'array') {
                        ids = ids.toString().split(',');
                    }
                    Utils.log('FL',ids);
                    if (ids.length) {   
                        for(let key in ids) {
                            //Logistic_Orders_X_Movs.initAssociations();
                            //Logistic_Orders_X_Items_Mov_Amt.initAssociations();
                            let logOrder = await Logistic_Orders.getModel().findAll({
                                raw:true,
                                attributes:[
                                    Sequelize.col(`${Logistic_Orders.tableName}.id_at_origin`),
                                    [Sequelize.col('logistic_orders_x_movs.logistic_status_id'), 'logistic_status_id'],
                                    [Sequelize.col('logistic_orders_x_movs->MOVEMENTS.data_origin_id'), 'data_origin_idNF'],
                                    [Sequelize.col('logistic_orders_x_movs->MOVEMENTS.id_at_origin'), 'NUMTRANSVENDA'],
                                    [Sequelize.fn('COUNT',Sequelize.col('logistic_orders_x_movs->logistic_orders_x_items_mov_amt.id')),'QTITEMS'],
                                    [Sequelize.fn('COUNT',Sequelize.literal(`CASE WHEN \`logistic_orders_x_movs->logistic_orders_x_items_mov_amt\`.logistic_status_id = ${Logistic_Status.DELIVERED} THEN 1 ELSE NULL END`)),'QTITEMSFINALIZEDS']
                                ],
                                where:{
                                    [Op.and]:[{
                                        id:ids[key]
                                    },Sequelize.where(Sequelize.literal('`logistic_orders_x_movs->MOVEMENTS`.data_origin_id'),Sequelize.literal(Data_Origins.WINTHOR))
                                    ]
                                },
                                include:[{                                
                                    model: Logistic_Orders_X_Movs.getModel(),
                                    attributes: [],
                                    include: [{
                                        model: Movements.getModel(),
                                        attributes:[],
                                        on:Sequelize.where(Sequelize.col(`logistic_orders_x_movs->MOVEMENTS.id`),Sequelize.col(`${Logistic_Orders_X_Movs.tableName}.mov_id`))
                                    },{
                                        model: Logistic_Orders_X_Items_Mov_Amt.getModel(),
                                        attributes:[],
                                        on:Sequelize.where(Sequelize.col(`logistic_orders_x_movs->logistic_orders_x_items_mov_amt.mov_logistic_order_id`),Sequelize.col(`${Logistic_Orders_X_Movs.tableName}.id`))
                                        
                                    }]
                                }],
                                group:[
                                    Sequelize.col(`${Logistic_Orders.tableName}.id_at_origin`),
                                    Sequelize.col('logistic_orders_x_movs.logistic_status_id'),
                                    Sequelize.col('logistic_orders_x_movs->MOVEMENTS.data_origin_id'),
                                    Sequelize.col('logistic_orders_x_movs->MOVEMENTS.id_at_origin')
                                ]
                            });
                            if (logOrder && logOrder.length) {
                                for(let kl in logOrder) {
                                    if (logOrder[kl].data_origin_idNF == Data_Origins.WINTHOR) {
                                        let wintConnection = DBConnectionManager.getWinthorDBConnection();

                                        let nfWint = await PcNfsaid.getModel().findOne({
                                            raw:true,
                                            where:{
                                                NUMTRANSVENDA: logOrder[kl].NUMTRANSVENDA
                                                /*CODCOB:{
                                                    [Op.in]:['748','BNF','BNFT'/*@TODO VER COM LUCIANA SE ENTRA, DEPOIS RASTREAR NA 410 PARA VER SE É O MESMO PROCESSO,'DEP']
                                                }*/
                                            }
                                        });
                                        if (logOrder[kl].logistic_status_id == Logistic_Status.DELIVERED && logOrder[kl].QTITEMS == logOrder[kl].QTITEMSFINALIZEDS) {

                                            if (nfWint && ['748','BNF','BNFT','DEP'].indexOf(nfWint.CODCOB) > -1) {

                                                let preExist = await wintConnection.query(`
                                                    select 
                                                        count(1) as "EXISTS" 
                                                    FROM 
                                                        JUMBO.PCFECHAMENTOMAP 
                                                    where 
                                                        NUMTRANSVENDA = ${nfWint.NUMTRANSVENDA} `,
                                                    {raw:true,queryType:QueryTypes.SELECT});
                                                preExist = Utils.toBool(preExist[0][0].EXISTS || false);

                                                if (!preExist) {

                                                    await wintConnection.transaction(async transaction=>{

                                                        //REGISTERS LOCKS
                                                        let pcPrests = await wintConnection.query(`
                                                            select 
                                                                P.NUMTRANSVENDA,
                                                                P.PREST,
                                                                P.CODFUNCCXMOT,
                                                                P.PRESTTEF, 
                                                                P.DTCXMOT,              
                                                                P.DTCXMOTHHMMSS,               
                                                                P.DTULTALTER,           
                                                                P.CODFUNCULTALTER,        
                                                                P.TIPOOPERACAOTEF   
                                                            from 
                                                                JUMBO.PCPREST P 
                                                            WHERE P.NUMTRANSVENDA = ${logOrder[kl].NUMTRANSVENDA}
                                                                AND P.CODCLI = ${nfWint.CODCLI}
                                                                AND P.CODFILIAL = ${nfWint.CODFILIAL}
                                                                AND P.DTCXMOT IS NULL
                                                                AND P.CODCOB NOT IN (
                                                                    'CANC',
                                                                    'DESD',
                                                                    'DEVP',
                                                                    'DEVT',
                                                                    'ESTR',
                                                                    'JUR',
                                                                    'PEND',
                                                                    'PERD'
                                                                )
                                                            FOR UPDATE 
                                                        `,{
                                                            queryType: QueryTypes.SELECT,
                                                            transaction:transaction
                                                        });
                                                        pcPrests = pcPrests[0];


                                                        for(let kp in pcPrests) {
                                                            let nextVal = await wintConnection.query('SELECT DFSEQ_PCFECHAMENTOMAP_NUMSEQ.NEXTVAL FROM DUAL', {raw:true,queryType:QueryTypes.SELECT});
                                                            nextVal = nextVal[0][0].NEXTVAL;

                                                            await wintConnection.query(`
                                                                INSERT INTO PCFECHAMENTOMAP(                       
                                                                    NUMTRANSVENDA                          
                                                                    , CODCLI                                 
                                                                    , PREST                                  
                                                                    , DUPLIC                                 
                                                                    , NUMCAR                                 
                                                                    , NUMCHECKOUT                            
                                                                    , CODFUNCCHECKOUT                        
                                                                    , VALOR                                  
                                                                    , DTVENC                                 
                                                                    , CODCOB                                 
                                                                    , VPAGO                                  
                                                                    , TXPERM                                 
                                                                    , DTPAG                                  
                                                                    , DTEMISSAO                              
                                                                    , PERDESC                                
                                                                    , CODFILIAL                              
                                                                    , DTVENCORIG                             
                                                                    , CODCOBORIG                             
                                                                    , NSUTEF                                 
                                                                    , PRESTTEF                               
                                                                    , QTPARCELASPOS                          
                                                                    , OBSERVACAOMAP                          
                                                                    , DATA                                   
                                                                    , GERAPARCELAMENTOTEF                    
                                                                    , INFORMADADOSBXCCRED                    
                                                                    , DESDCARTAOFECHCARGA                    
                                                                    , USOUPARCELAMENTOAUTOMATICO             
                                                                    , USOUPARCELAMENTOMANUAL                 
                                                                    , TITCOMNUMCARCAIXA                      
                                                                    , PERMITEVENDAECF402                     
                                                                    , TIPOFECHAMENTO                         
                                                                    , NUMSEQ                                 
                                                                    )                                        
                                                                SELECT                                       
                                                                    PCPREST.NUMTRANSVENDA                  
                                                                    , PCPREST.CODCLI                         
                                                                    , PCPREST.PREST                          
                                                                    , PCPREST.DUPLIC                         
                                                                    , PCPREST.NUMCAR                         
                                                                    , PCPREST.NUMCHECKOUT                    
                                                                    , PCPREST.CODFUNCCHECKOUT                
                                                                    , PCPREST.VALOR                          
                                                                    , PCPREST.DTVENC                         
                                                                    , PCPREST.CODCOB                         
                                                                    , PCPREST.VPAGO                          
                                                                    , PCPREST.TXPERM                         
                                                                    , PCPREST.DTPAG                          
                                                                    , PCPREST.DTEMISSAO                      
                                                                    , PCPREST.PERDESC                        
                                                                    , PCPREST.CODFILIAL                      
                                                                    , PCPREST.DTVENCORIG                     
                                                                    , PCPREST.CODCOBORIG                     
                                                                    , PCPREST.NSUTEF                         
                                                                    , PCPREST.PRESTTEF                       
                                                                    , PCPREST.QTPARCELASPOS                  
                                                                    , 'AcertarOuCancelarTitulo'                         
                                                                    , SYSDATE                                
                                                                    , 'S'
                                                                    , 'S'
                                                                    , 'N'
                                                                    , 'N'
                                                                    , 'N'
                                                                    , 'N'
                                                                    , 'N'
                                                                    , 'Acerto de Carregamento'
                                                                    , ${nextVal}
                                                                FROM PCPREST                                
                                                                WHERE PCPREST.NUMTRANSVENDA = ${nfWint.NUMTRANSVENDA}
                                                                    AND PCPREST.CODCOB NOT IN (
                                                                        'CANC',
                                                                        'DESD',
                                                                        'DEVP',
                                                                        'DEVT',
                                                                        'ESTR',
                                                                        'JUR',
                                                                        'PEND',
                                                                        'PERD'
                                                                    )
                                                                    AND PCPREST.PREST = ${pcPrests[kp].PREST}
                                                            `,{
                                                                queryType: QueryTypes.INSERT,
                                                                transaction: transaction
                                                            });
                                                        }


                                                        await wintConnection.query(`
                                                            UPDATE PCPREST P 
                                                            SET P.CODFUNCCXMOT = 142,
                                                                P.PRESTTEF = P.PREST, 
                                                                P.DTCXMOT = TRUNC(SYSDATE),              
                                                                P.DTCXMOTHHMMSS = SYSDATE,               
                                                                P.DTULTALTER = TRUNC(SYSDATE),           
                                                                P.CODFUNCULTALTER = 142,        
                                                                P.TIPOOPERACAOTEF = 'C'   
                                                            WHERE P.NUMTRANSVENDA = ${logOrder[kl].NUMTRANSVENDA}
                                                            AND P.CODCLI = ${nfWint.CODCLI}
                                                            AND P.CODFILIAL = ${nfWint.CODFILIAL}
                                                            AND P.DTCXMOT IS NULL
                                                            AND P.CODCOB NOT IN (
                                                                'CANC',
                                                                'DESD',
                                                                'DEVP',
                                                                'DEVT',
                                                                'ESTR',
                                                                'JUR',
                                                                'PEND',
                                                                'PERD'
                                                            )
                                                        `,{
                                                            queryType: QueryTypes.UPDATE,
                                                            transaction: transaction
                                                        });
                                                        resultData.COBRANCAS_INTEGRADAS.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.VLTOTAL});    
                                                        return true;
                                                    });
                                                } else {
                                                    resultData.COBRANCAS_INTEGRADAS_ANTERIORMENTE.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.VLTOTAL});    
                                                }
                                            } else {
                                                resultData.COBRANCAS_NAO_INTEGRAR.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.VLTOTAL});    
                                            }
                                        } else {
                                            if (logOrder[kl].logistic_status_id == Logistic_Status.PARTIAL_RETURNED) 
                                                resultData.NOTAS_DEVOLVIDAS_PARCIALMENTE.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.VLTOTAL})
                                            else if (logOrder[kl].logistic_status_id == Logistic_Status.TOTAL_RETURNED) 
                                                resultData.NOTAS_DEVOLVIDAS_TOTALMENTE.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.VLTOTAL})    
                                            else if (logOrder[kl].logistic_status_id == Logistic_Status.RUNNING) 
                                                resultData.NOTAS_EM_ENTREGA.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.VLTOTAL})
                                            else
                                                resultData.NOTAS_A_ENTREGAR.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.VLTOTAL});    
                                        }
                                    }
                                }                            
                            } else {
                                throw new Error(`logistic order ${ids[key]} not found`);            
                            }
                        }                    
                    } else {
                        throw new Error('missing data');    
                    }
                } else {
                    throw new Error('missing data');
                }
            }
        } catch(e) {
            Utils.log(e);
            resultData.ERRORS.push(e.message || e);
        }
        return resultData;
    }

    static async getLogisticsOrdersByNumcars(numcarsWint, raw) {
        let result = null;
        try {
            if (numcarsWint) {
                let where = {
                    data_origin_id : Data_Origins.WINTHOR
                };
                if (Utils.typeOf(numcarsWint) != 'array') numcarsWint = numcarsWint.toString().split(',');
                where.id_at_origin = {
                    [Sequelize.Op.in] : numcarsWint
                }

                result = await Logistic_Orders.getModel().findAll({
                    raw:Utils.firstValid([raw,true]),
                    where: where
                });
            }
        } catch(e) {
            Utils.log(e);
            resultData.ERRORS.push(e.message || e);
        }
        return result;
    }

    static async getOrCreateIntegrateds(numcarsWint) {
        let result = await WinthorIntegrationsRegistersController.integrateRegisters({
            registersIds: numcarsWint,
            tableClassModel: Logistic_Orders, 
            getIntegratedsByOriginIds: Logistic_Orders_Winthor_Integration_Controller.getLogisticsOrdersByNumcars,
            getBulkDataToCreate:(originsIds)=>{
                let result = null;
                if (originsIds) {
                    if (Utils.typeOf(originsIds) != 'array') originsIds = originsIds.toString().split(',');      
                    result = originsIds.map(el=>{
                        return {
                            creator_user_id: Users.SYSTEM,
                            data_origin_id: Data_Origins.WINTHOR,
                            id_at_origin:el,
                            logistic_mov_type_id: Logistic_Mov_Types.DELIVERY,
                            identifier_type_id: Identifier_Types.CODE,
                            identifier: el,
                            logistic_status_id: Logistic_Status.TO_DELIVERY
                        }
                    });
                } 
            }
        });
        return result;
    }

    
    /**
     * Get delivery data with nested child data (invoice, items, lots, etc)
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2023-01-12
     */
    static async getLoadingsDataForDelivery(req,res,next) {
        try {
            let identifiers = req.body.identifiers || [];
            if (typeof identifiers === 'string') identifiers = identifiers.split(',');
            if (identifiers.length > 0) {

                let wherePcCarreg = { 
                    [Sequelize.Op.and] : [
                        {
                            NUMCAR:{
                            [Sequelize.Op.in] : identifiers
                            }
                        },
                        {
                            DT_CANCEL:{
                                [Sequelize.Op.is] : null
                            }
                        }
                    ]
                }

                //check relationship PCCARREG (codmotorista) for olny allow download with relationed driver
                let dataRels = await Relationships.getModel().findAll({
                    raw:true,
                    where:{
                        IDTABLE1: Users.id,
                        IDREG1: req.user.id,
                        IDTABLE2: PcCarreg.id,
                        status_reg_id: Record_Status.ACTIVE
                    }
                });
                if (dataRels && dataRels.length) {
                    let orDataRels = [];
                    for(let kd in dataRels) {
                        let and = [];
                        if (dataRels[kd].IDREG2) {

                            and.push({
                                [dataRels[kd].COLUMNREG2||'NUMCAR']:dataRels[kd].IDREG2
                            });
                        }
                        if (dataRels[kd].CONDICTIONSREG2) {
                            and.push(Sequelize.literal(dataRels[kd].CONDICTIONSREG2));
                        }
                        Utils.log('and',and);
                        orDataRels.push({[Sequelize.Op.and]:and});
                    }
                    if (orDataRels.length) {
                        wherePcCarreg[Sequelize.Op.and].push({[Sequelize.Op.or]:orDataRels});
                    }
                }

                //find delivery                
                //console.log('yyyyyyyyyy antes',PcCarreg.getModel().associations);
                //PcCarreg.initAssociations();
                //console.log('yyyyyyyyyy depois',PcCarreg.getModel().associations);
                res.data = await PcCarreg.getModel().findAll({
                    raw:true,
                    attributes: [
                        Sequelize.literal('0 AS data_origin_id'),
                        ['NUMCAR','IDLOADORIGIN'],
                        'DTSAIDA',
                        ['CODMOTORISTA','IDMOTORISTAORIGEM'],
                        ['CODVEICULO','IDVEICULOORIGEM'],
                        ['TOTPESO','PESOTOTAL'],
                        'VLTOTAL',
                        ['NUMNOTAS','QTNOTAS'],
                        ['NUMENT','QTENTREGAS'],
                        'DESTINO',
                        ['DT_CANCEL','DTCANCEL'],
                        [Sequelize.col(`${PcEmpr.tableName}.NOME`),'NOMEMOTORISTA'],
                        [Sequelize.col(`${PcVeicul.tableName}.PLACA`),'PLACA']                        
                    ],
                    include:[{
                        raw:true,
                        model:PcEmpr.getModel(),
                        attributes:[],
                        on:{
                            [Op.and]: [
                                Sequelize.where(Sequelize.col(`${PcCarreg.tableName}.CODMOTORISTA`), Sequelize.col(`${PcEmpr.tableName}.MATRICULA`))
                            ]
                        }
                    },{
                        raw:true,
                        model:PcVeicul.getModel(),
                        attributes:[],
                        on:{
                            [Op.and]: [
                                Sequelize.where(Sequelize.col(`${PcCarreg.tableName}.CODVEICULO`), Sequelize.col(`${PcVeicul.tableName}.CODVEICULO`))
                            ]
                        }
                    }],
                    where:wherePcCarreg
                });
                if (res.data && res.data.length) {                    

                    for(let key in res.data) {

                        //find invoice data of this delivery
                        let query = `
                            select 
                                *
                            from
                                (
                                    select
                                        0 as data_origin_id,
                                        c.CODCLI AS IDCLIENTORIGIN,
                                        to_number(regexp_replace(c.CGCENT,'[^0-9]','')) as CGC,
                                        c.CLIENTE AS NOME,
                                        c.FANTASIA,
                                        c.ESTENT AS ESTADO,
                                        c.MUNICENT AS CIDADE,
                                        c.BAIRROENT AS BAIRRO,
                                        c.ENDERENT AS ENDERECO,                                        
                                        c.NUMEROENT AS NUMERO,                                        
                                        c.TELENT AS TELEFONE,
                                        c.CODUSUR1 as IDVENDEDOR1ORIGEM,
                                        c.CODUSUR2 as IDVENDEDOR2ORIGEM
                                    from
                                        JUMBO.PCCARREG cr 
                                        join JUMBO.PCNFSAID s on (
                                            s.numcar = cr.numcar
                                            and s.dtcancel is null
                                        )
                                        join JUMBO.PCMOV m on (                                            
                                            m.numtransvenda = s.numtransvenda
                                            and m.dtcancel is null
                                        )
                                        join JUMBO.PCCLIENT c on c.codcli = s.codcli
                                    where
                                        cr.numcar = ${res.data[key].IDLOADORIGIN}
                                    union 
                                    select
                                        decode(cj.codcli,null,1,0) as data_origin_id,
                                        nvl(cj.codcli,p.COD) AS IDCLIENTORIGIN,
                                        to_number(regexp_replace(nvl(cj.cgcent,p.coddocidentificador),'[^0-9]','')) as CGC,
                                        nvl(cj.cliente,p.NOMERAZAO) AS NOME,
                                        nvl(cj.fantasia,p.FANTASIA) AS FANTASIA,
                                        nvl(cj.estent,ci.uf) as ESTADO,
                                        nvl(cj.municent,ci.nome) AS CIDADE,
                                        nvl(cj.bairroent,p.BAIRRO) AS BAIRRO,
                                        nvl(cj.enderent,p.ENDERECO) AS ENDERECO, 
                                        nvl(cj.numeroent,P.NUMERO) AS NUMERO,
                                        nvl(cj.telent,null) AS TELEFONE,
                                        nvl(cj.codusur1,c.codvendedor1) AS IDVENDEDOR1ORIGEM,
                                        nvl(cj.codusur2,c.codvendedor2) AS IDVENDEDOR2ORIGEM
                                    from
                                        EP.EPUNIFCARGAS u 
                                        join EP.EPNFSSAIDA s on (
                                            s.nrcarga = u.nrcarga
                                            and s.dtcancel is null
                                        )
                                        join EP.EPMOVIMENTACOESSAIDA m on (                                            
                                            m.codnfsaida = s.cod
                                            and m.dtcancel is null
                                        )
                                        join EP.EPCLIENTES c on c.cod = s.codcliente
                                        join EP.EPPESSOAS p on p.cod = c.codpessoa
                                        left outer join EP.EPCIDADES ci on ci.cod = p.codcidade
                                        left outer join JUMBO.PCCLIENT cj on cj.codcli = p.cod
                                    where
                                        u.id = (select u2.id from EP.EPUNIFCARGAS u2 where u2.NRCARGA = ${res.data[key].IDLOADORIGIN})
                                        and u.IDORIGEMINFO = 1
                                )
                            order by
                                1
                        `;
                        res.data[key].CLIENTS = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                        res.data[key].CLIENTS = res.data[key].CLIENTS[0] || [];

                        if (res.data[key].CLIENTS && res.data[key].CLIENTS.length) {  
                            
                            //find invoice data on winthor
                            //PcDocEletronico.initAssociations();
                            console.log('yyyyyyy',PcDocEletronico.getModel().associations);
                            let nfsWinthor = await PcNfsaid.getModel().findAll({
                                raw:true,
                                attributes:[
                                    Sequelize.literal('0 as data_origin_id'),
                                    ['NUMTRANSVENDA','id_at_origin'],
                                    ['NUMNOTA','IDINVOICEORIGIN'],
                                    ['DTSAIDA','DTEMISSAO'],
                                    ['CODCOB','IDFINANCIALCOLLECTIONORIGIN'],
                                    ['CODPLPAG','IDPRAZOPAGAMENTOORIGEM'],
                                    ['TOTPESO','PESOTOTAL'],
                                    'VLTOTAL',
                                    'DTCANCEL',
                                    'NUMTRANSVENDA',
                                    ['CODCLI','IDCLIENTORIGIN'],
                                    'CHAVENFE',
                                    [Sequelize.col(`${PcDocEletronico.tableName}.XMLNFE`),'XML']
                                ],
                                where:{
                                    NUMCAR: res.data[key].IDLOADORIGIN,
                                    DTCANCEL: {
                                        [Sequelize.Op.is] : null
                                    }
                                },
                                include:[{
                                    model:PcDocEletronico.getModel(),
                                    attributes:[],
                                    where:{
                                        MOVIMENTO:'S'
                                    }
                                }],
                                order:[
                                    ['NUMNOTA']
                                ]
                            });                            
                            if (nfsWinthor && nfsWinthor.length > 0) {

                                //find item invoice data on winthor
                                query = `
                                    select                                        
                                        m.CODPROD AS IDITEMORIGEM,
                                        coalesce(m.descricao,p.descricao,'') as DESCRICAO,
                                        p.CODAUXILIARTRIB AS GTINUNTRIB,
                                        p.CODAUXILIAR AS GTINUNVENDA,
                                        p.CODAUXILIAR2 AS GTINUNMASTER,
                                        coalesce(m.unidade,p.unidade,'UN') as UNIDADE,
                                        coalesce(p.UNIDADEMASTER,m.embalagem,'CX') as EMBALAGEM,
                                        coalesce(m.qtunitcx,p.qtunitcx,1) as QTUNITEMBALAGEM,
                                        coalesce(m.pesoliq,p.pesoliq,1) as PESOLIQUN,
                                        sum(coalesce(m.qt,m.qtcont,0)) as QT,
                                        max(coalesce(m.punit,m.punitcont,0)) as VLUN,
                                        '[' || (SELECT
                                            listagg('{"IDLOTEORIGEM":"'||l.numlote||'","DTVALIDADE":"'||l.dtvalidade||'","QT":'||replace(to_char(coalesce(m2.qt,m2.qtcont,0),'999999999990.9999990'),',','.')||'}',',') within group (order by m.numtransvenda,m.codprod)
                                        FROM
                                            JUMBO.PCLOTE l 
                                            join JUMBO.PCMOV m2 on (
                                                m2.codprod = l.codprod
                                                and m2.numtransvenda = m.numtransvenda
                                                and m2.codprod = m.codprod
                                                and m2.numlote = l.numlote
                                            )
                                        where 
                                            l.codfilial = coalesce(m.codfilialretira,m.codfilial) 
                                            and l.codprod = m.codprod 
                                        ) || ']' AS LOTS,
                                        m.NUMTRANSVENDA
                                    from
                                        JUMBO.PCNFSAID s
                                        join JUMBO.PCMOV m on (
                                            m.numtransvenda = s.numtransvenda
                                            and m.dtcancel is null
                                            and coalesce(m.qt,m.qtcont) > 0
                                        )
                                        join JUMBO.PCPRODUT p on p.codprod = m.codprod
                                        left outer join JUMBO.PCLOTE l on (
                                            l.codfilial = coalesce(m.codfilialretira,m.codfilial) 
                                            and l.codprod = m.codprod 
                                            and l.numlote = m.numlote
                                        )
                                    where
                                        s.numcar = ${res.data[key].IDLOADORIGIN}
                                        and s.dtcancel is null     
                                    group by
                                        m.CODPROD,
                                        coalesce(m.descricao,p.descricao,''),
                                        p.CODAUXILIARTRIB,
                                        p.CODAUXILIAR,
                                        p.CODAUXILIAR2,
                                        coalesce(m.unidade,p.unidade,'UN'),
                                        coalesce(p.UNIDADEMASTER,m.embalagem,'CX'),
                                        coalesce(m.qtunitcx,p.qtunitcx,1),
                                        coalesce(m.pesoliq,p.pesoliq,1),
                                        coalesce(m.codfilialretira,m.codfilial),
                                        m.NUMTRANSVENDA
                                    having
                                        sum(coalesce(m.qt,m.qtcont,0)) > 0
                                    order by
                                        m.NUMTRANSVENDA,1
                                `;

                                //attach items winthor to nfs winthor
                                let itemsWinthor = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                                itemsWinthor = itemsWinthor[0] || [];
                                for(let kn in nfsWinthor) {
                                    nfsWinthor[kn].ITEMS = nfsWinthor[kn].ITEMS || [];
                                    for(let ki in itemsWinthor) {                                        
                                        if (typeof itemsWinthor[ki].LOTS === 'string') {
                                            if (itemsWinthor[ki].LOTS.trim() == '[]') itemsWinthor[ki].LOTS = []
                                            else itemsWinthor[ki].LOTS = JSON.parse(itemsWinthor[ki].LOTS);
                                        }
                                        if (itemsWinthor[ki].NUMTRANSVENDA == nfsWinthor[kn].NUMTRANSVENDA) {
                                            nfsWinthor[kn].ITEMS.push(itemsWinthor[ki]);
                                        }
                                    }
                                }
                                
                                //attach nfs winthor to cients
                                for(let kc in res.data[key].CLIENTS) {
                                    res.data[key].CLIENTS[kc].NFS = res.data[key].CLIENTS[kc].NFS || [];
                                    for(let kn in nfsWinthor) {
                                        if (nfsWinthor[kn].IDCLIENTORIGIN == res.data[key].CLIENTS[kc].IDCLIENTORIGIN) {
                                            res.data[key].CLIENTS[kc].NFS.push(nfsWinthor[kn]);
                                        }
                                    }
                                }
                            }

                            //find invoice data on broker (aurora)
                            query = `
                                select
                                    1 AS data_origin_id,
                                    s.cod as id_at_origin,
                                    s.NUMNOTAORIGEM AS IDINVOICEORIGIN,
                                    s.DTEMISSAO,
                                    null as IDFINANCIALCOLLECTIONORIGIN,
                                    null as IDPRAZOPAGAMENTOORIGEM,
                                    sum(nvl(ms.qtsaida,0) - nvl(ms.qtdevolvida,0)) as PESOTOTAL,
                                    sum((nvl(ms.qtsaida,0) - nvl(ms.qtdevolvida,0)) * nvl(ms.vlun,0)) as VLTOTAL,
                                    s.DTCANCEL,
                                    S.COD,
                                    S.CODCLIENTE,
                                    s.CHAVENFE
                                from
                                    EP.EPNFSSAIDA s
                                    JOIN EP.EPMOVIMENTACOESSAIDA ms on ms.codnfsaida = s.cod
                                where
                                    s.nrcarga = (select u2.nrcarga from EP.EPUNIFCARGAS u2 where u2.idorigeminfo = 1 and u2.id = (select u.id from EP.EPUNIFCARGAS u where u.idorigeminfo = 0 and u.nrcarga = ${res.data[key].IDLOADORIGIN}) and u2.idorigeminfo = 1)
                                GROUP BY
                                    1,
                                    s.NUMNOTAORIGEM,
                                    s.DTEMISSAO,
                                    null,
                                    s.DTCANCEL,
                                    S.COD,
                                    S.CODCLIENTE,
                                    s.CHAVENFE
                                order by 1,2
                            `;

                            let nfsBroker = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                            nfsBroker = nfsBroker[0] || [];
                            if (nfsBroker && nfsBroker.length > 0) {                                

                                //find item invoice data on broker (aurora)
                                query = `
                                    select
                                        m.CODPROD AS IDITEMORIGEM,
                                        coalesce(p.descricao,'') as DESCRICAO,
                                        p.CODAUXILIARTRIB AS GTINUNTRIB,
                                        p.CODAUXILIAR AS GTINUNVENDA,
                                        p.CODAUXILIAR2 AS GTINUNMASTER,
                                        coalesce(p.unidade,'UN') as UNIDADE,
                                        coalesce(p.UNIDADEMASTER,'CX') as EMBALAGEM,
                                        coalesce(p.qtunitcx,1) as QTUNITEMBALAGEM,
                                        coalesce(p.pesoliq,1) as PESOLIQ,
                                        sum(coalesce(m.qtsaida,0)) as QT, 
                                        max(coalesce(m.vlun,0)) as VLUN,  
                                        '[]' AS LOTS,
                                        m.CODNFSAIDA
                                    from
                                        EP.EPNFSSAIDA s
                                        join EP.EPMOVIMENTACOESSAIDA m on (
                                            m.codnfsaida = s.cod
                                            and m.dtcancel is null
                                            and coalesce(m.qtsaida,0) > 0
                                        )
                                        left outer join JUMBO.PCPRODUT p on p.codprod = m.codprod
                                    where
                                        s.nrcarga = (select u2.nrcarga from EP.EPUNIFCARGAS u2 where u2.idorigeminfo = 1 and u2.id = (select u.id from EP.EPUNIFCARGAS u where u.idorigeminfo = 0 and u.nrcarga = ${res.data[key].IDLOADORIGIN}))
                                        and s.dtcancel is null     
                                    group by
                                        m.CODPROD,
                                        coalesce(p.descricao,''),
                                        p.CODAUXILIARTRIB,
                                        p.CODAUXILIAR,
                                        p.CODAUXILIAR2,
                                        coalesce(p.unidade,'UN'),
                                        coalesce(p.UNIDADEMASTER,'CX'),
                                        coalesce(p.qtunitcx,1),
                                        coalesce(p.pesoliq,1),
                                        m.CODNFSAIDA
                                    having
                                        sum(coalesce(m.qtsaida,0)) > 0
                                    order by
                                        m.CODNFSAIDA,1
                                `;

                                //attach items broker to nfs broker
                                let itemsBroker = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
                                itemsBroker = itemsBroker[0] || [];                                
                                for(let kn in nfsBroker) {
                                    nfsBroker[kn].ITEMS = nfsBroker[kn].ITEMS || [];
                                    for(let ki in itemsBroker) {
                                        if (typeof itemsBroker[ki].LOTS === 'string') {
                                            if (itemsBroker[ki].LOTS.trim() == '[]') itemsBroker[ki].LOTS = []
                                            else itemsBroker[ki].LOTS = JSON.parse(itemsBroker[ki].LOTS);
                                        }
                                        if (itemsBroker[ki].CODNFSAIDA == nfsBroker[kn].COD) {
                                            nfsBroker[kn].ITEMS.push(itemsBroker[ki]);
                                        }
                                    }
                                }
                                
                                //attach nfs broker to cients                                                               
                                for(let kc in res.data[key].CLIENTS) {
                                    res.data[key].CLIENTS[kc].NFS = res.data[key].CLIENTS[kc].NFS || [];
                                    for(let kn in nfsBroker) {
                                        if (nfsBroker[kn].CODCLIENTE == res.data[key].CLIENTS[kc].IDCLIENTORIGIN) {
                                            res.data[key].CLIENTS[kc].NFS.push(nfsBroker[kn]);
                                        }
                                    }
                                }
                            }
                        }   
                    }
                    res.sendResponse(200,true);
                } else {
                    res.sendResponse(501,false,'dados não encontrados');    
                }
            } else {
                res.sendResponse(501,false,'faltam dados');
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
     * @deprecated 2024-07-16 use processRequest instead
     */
    static processPostAsRoute = async(req,res,next,route,arrRoute,level) => {
        try {            
            level++;
            switch(arrRoute[level].trim().toLowerCase()) {
                case 'getloadingsdatafordelivery':
                    await Logistic_Orders_Winthor_Integration_Controller.getLoadingsDataForDelivery(req,res,next);
                    break;
                case 'integrateboxclosing':
                    res.data = await Logistic_Orders_Winthor_Integration_Controller.integrateBoxClosing(req.body.identifiers);
                    res.sendResponse(200,true);
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
    static async processRequest(req,res,next) {
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
                case 'integrateboxclosing':
                    res.data = await this.integrateBoxClosing(req.body.identifiers);
                    return res.sendResponse(200,true);
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

module.exports = {Logistic_Orders_Winthor_Integration_Controller}