const { Sequelize, Op, QueryTypes } = require("sequelize");
const DBConnectionManager = require("../../../../../../database/DBConnectionManager");
const { ActionsStatus } = require("../../../../../../database/models/ActionsStatus");
const { OriginsDatas } = require("../../../../../../database/models/OriginsDatas");
const { PcCarreg } = require("../../../../../../database/models/winthor/PcCarreg");
const { PcNfsaid } = require("../../../../../../database/models/winthor/PcNfsaid");
const { PcDocEletronico } = require("../../../../../../database/models/winthor/PcDocEletronico");
const { Utils } = require("../../../../../utils/Utils");
const { LogisticOrdersXItemsMovAmt } = require("../../../../../../database/models/LogisticOrdersXItemsMovAmt");
const { Movements } = require("../../../../../../database/models/Movements");
const { LogisticOrdersXMovs } = require("../../../../../../database/models/LogisticOrdersXMovs");
const { LogisticOrders } = require("../../../../../../database/models/LogisticOrders");
const { LogisticStatus } = require("../../../../../../database/models/LogisticStatus");
const { ParametersValues } = require("../../../../../../database/models/ParametersValues");
const { PcEmpr } = require("../../../../../../database/models/winthor/PcEmpr");
const { PcVeicul } = require("../../../../../../database/models/winthor/PcVeicul");
const { Parameters } = require("../../../../../../database/models/Parameters");
const { IdentifiersTypes } = require("../../../../../../database/models/IdentifiersTypes");
const { LogisticMovTypes } = require("../../../../../../database/models/LogisticMovTypes");
const { Users } = require("../../../../../../database/models/Users");
const { WinthorIntegrationsRegistersController } = require("../../../../registers/integrations/winthor/WinthorIntegrationsRegistersController");
const { DatasRelationships } = require("../../../../../../database/models/DatasRelationships");
const { StatusRegs } = require("../../../../../../database/models/StatusRegs");
const { BaseEndPointController } = require("../../../../../endpoints/BaseEndPointController");


/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 */
class LogisticOrdersWinthorIntegrationsController extends BaseEndPointController{

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
            if (Utils.toBool(await ParametersValues.get(Parameters.INTEGRATE_WINTHOR)) == true) {            
                if (Utils.hasValue(ids)) {
                    if (Utils.typeOf(ids) !== 'array') {
                        ids = ids.toString().split(',');
                    }
                    Utils.log('FL',ids);
                    if (ids.length) {   
                        for(let key in ids) {
                            //LogisticOrdersXMovs.initAssociations();
                            //LogisticOrdersXItemsMovAmt.initAssociations();
                            let logOrder = await LogisticOrders.getModel().findAll({
                                raw:true,
                                attributes:[
                                    Sequelize.col(`${LogisticOrders.name.toUpperCase()}.IDONORIGINDATA`),
                                    [Sequelize.col('LOGISTICORDERSXMOVS.IDLOGISTICSTATUS'), 'IDLOGISTICSTATUS'],
                                    [Sequelize.col('LOGISTICORDERSXMOVS->MOVEMENTS.IDORIGINDATA'), 'IDORIGINDATANF'],
                                    [Sequelize.col('LOGISTICORDERSXMOVS->MOVEMENTS.IDONORIGINDATA'), 'NUMTRANSVENDA'],
                                    [Sequelize.fn('COUNT',Sequelize.col('LOGISTICORDERSXMOVS->LOGISTICORDERSXITEMSMOVAMT.ID')),'QTITEMS'],
                                    [Sequelize.fn('COUNT',Sequelize.literal(`CASE WHEN \`LOGISTICORDERSXMOVS->LOGISTICORDERSXITEMSMOVAMT\`.IDLOGISTICSTATUS = ${LogisticStatus.DELIVERED} THEN 1 ELSE NULL END`)),'QTITEMSFINALIZEDS']
                                ],
                                where:{
                                    [Op.and]:[{
                                        ID:ids[key]
                                    },Sequelize.where(Sequelize.literal('`LOGISTICORDERSXMOVS->MOVEMENTS`.IDORIGINDATA'),Sequelize.literal(OriginsDatas.WINTHOR))
                                    ]
                                },
                                include:[{                                
                                    model: LogisticOrdersXMovs.getModel(),
                                    attributes: [],
                                    include: [{
                                        model: Movements.getModel(),
                                        attributes:[],
                                        on:Sequelize.where(Sequelize.col(`LOGISTICORDERSXMOVS->MOVEMENTS.ID`),Sequelize.col(`${LogisticOrdersXMovs.name.toUpperCase()}.IDMOV`))
                                    },{
                                        model: LogisticOrdersXItemsMovAmt.getModel(),
                                        attributes:[],
                                        on:Sequelize.where(Sequelize.col(`LOGISTICORDERSXMOVS->LOGISTICORDERSXITEMSMOVAMT.IDLOGISTICORDERXMOV`),Sequelize.col(`${LogisticOrdersXMovs.name.toUpperCase()}.ID`))
                                        
                                    }]
                                }],
                                group:[
                                    Sequelize.col(`${LogisticOrders.name.toUpperCase()}.IDONORIGINDATA`),
                                    Sequelize.col('LOGISTICORDERSXMOVS.IDLOGISTICSTATUS'),
                                    Sequelize.col('LOGISTICORDERSXMOVS->MOVEMENTS.IDORIGINDATA'),
                                    Sequelize.col('LOGISTICORDERSXMOVS->MOVEMENTS.IDONORIGINDATA')
                                ]
                            });
                            if (logOrder && logOrder.length) {
                                for(let kl in logOrder) {
                                    if (logOrder[kl].IDORIGINDATANF == OriginsDatas.WINTHOR) {
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
                                        if (logOrder[kl].IDLOGISTICSTATUS == LogisticStatus.DELIVERED && logOrder[kl].QTITEMS == logOrder[kl].QTITEMSFINALIZEDS) {

                                            if (nfWint && ['748','BNF','BNFT','DEP'].indexOf(nfWint.CODCOB) > -1) {

                                                let preExist = await wintConnection.query(`
                                                    select 
                                                        count(1) as "EXISTS" 
                                                    FROM 
                                                        jumbo.PCFECHAMENTOMAP 
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
                                                                jumbo.PCPREST P 
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
                                            if (logOrder[kl].IDLOGISTICSTATUS == LogisticStatus.PARTIAL_RETURNED) 
                                                resultData.NOTAS_DEVOLVIDAS_PARCIALMENTE.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.VLTOTAL})
                                            else if (logOrder[kl].IDLOGISTICSTATUS == LogisticStatus.TOTAL_RETURNED) 
                                                resultData.NOTAS_DEVOLVIDAS_TOTALMENTE.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.VLTOTAL})    
                                            else if (logOrder[kl].IDLOGISTICSTATUS == LogisticStatus.RUNNING) 
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
                    IDORIGINDATA : OriginsDatas.WINTHOR
                };
                if (Utils.typeOf(numcarsWint) != 'array') numcarsWint = numcarsWint.toString().split(',');
                where.IDONORIGINDATA = {
                    [Sequelize.Op.in] : numcarsWint
                }

                result = await LogisticOrders.getModel().findAll({
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
            tableClassModel: LogisticOrders, 
            getIntegratedsByOriginIds: LogisticOrdersWinthorIntegrationsController.getLogisticsOrdersByNumcars,
            getBulkDataToCreate:(originsIds)=>{
                let result = null;
                if (originsIds) {
                    if (Utils.typeOf(originsIds) != 'array') originsIds = originsIds.toString().split(',');      
                    result = originsIds.map(el=>{
                        return {
                            IDUSERCREATE: Users.SYSTEM,
                            IDORIGINDATA: OriginsDatas.WINTHOR,
                            IDONORIGINDATA:el,
                            IDLOGISTICMOVTYPE: LogisticMovTypes.DELIVERY,
                            IDIDENTIFIERTYPE: IdentifiersTypes.CODE,
                            IDENTIFIER: el,
                            IDLOGISTICSTATUS: LogisticStatus.TO_DELIVERY
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

                //check relationship pccarreg (codmotorista) for olny allow download with relationed driver
                let dataRels = await DatasRelationships.getModel().findAll({
                    raw:true,
                    where:{
                        IDTABLE1: Users.ID,
                        IDREG1: req.user.ID,
                        IDTABLE2: PcCarreg.ID,
                        IDSTATUSREG: StatusRegs.ACTIVE
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
                        Sequelize.literal('0 AS IDORIGINDATA'),
                        ['NUMCAR','IDCARREGAMENTOORIGEM'],
                        'DTSAIDA',
                        ['CODMOTORISTA','IDMOTORISTAORIGEM'],
                        ['CODVEICULO','IDVEICULOORIGEM'],
                        ['TOTPESO','PESOTOTAL'],
                        'VLTOTAL',
                        ['NUMNOTAS','QTNOTAS'],
                        ['NUMENT','QTENTREGAS'],
                        'DESTINO',
                        ['DT_CANCEL','DTCANCEL'],
                        [Sequelize.col(`${PcEmpr.name.toUpperCase()}.NOME`),'NOMEMOTORISTA'],
                        [Sequelize.col(`${PcVeicul.name.toUpperCase()}.PLACA`),'PLACA']                        
                    ],
                    include:[{
                        raw:true,
                        model:PcEmpr.getModel(),
                        attributes:[],
                        on:{
                            [Op.and]: [
                                Sequelize.where(Sequelize.col(`${PcCarreg.name.toUpperCase()}.CODMOTORISTA`), Sequelize.col(`${PcEmpr.name.toUpperCase()}.MATRICULA`))
                            ]
                        }
                    },{
                        raw:true,
                        model:PcVeicul.getModel(),
                        attributes:[],
                        on:{
                            [Op.and]: [
                                Sequelize.where(Sequelize.col(`${PcCarreg.name.toUpperCase()}.CODVEICULO`), Sequelize.col(`${PcVeicul.name.toUpperCase()}.CODVEICULO`))
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
                                        0 as IDORIGINDATA,
                                        c.CODCLI AS IDCLIENTEORIGEM,
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
                                        jumbo.pccarreg cr 
                                        join jumbo.pcnfsaid s on (
                                            s.numcar = cr.numcar
                                            and s.dtcancel is null
                                        )
                                        join jumbo.pcmov m on (                                            
                                            m.numtransvenda = s.numtransvenda
                                            and m.dtcancel is null
                                        )
                                        join jumbo.pcclient c on c.codcli = s.codcli
                                    where
                                        cr.numcar = ${res.data[key].IDCARREGAMENTOORIGEM}
                                    union 
                                    select
                                        decode(cj.codcli,null,1,0) as IDORIGINDATA,
                                        nvl(cj.codcli,p.COD) AS IDCLIENTEORIGEM,
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
                                        ep.epunifcargas u 
                                        join ep.epnfssaida s on (
                                            s.nrcarga = u.nrcarga
                                            and s.dtcancel is null
                                        )
                                        join ep.epmovimentacoessaida m on (                                            
                                            m.codnfsaida = s.cod
                                            and m.dtcancel is null
                                        )
                                        join ep.epclientes c on c.cod = s.codcliente
                                        join ep.eppessoas p on p.cod = c.codpessoa
                                        left outer join ep.epcidades ci on ci.cod = p.codcidade
                                        left outer join jumbo.pcclient cj on cj.codcli = p.cod
                                    where
                                        u.ID = (select u2.ID from ep.epunifcargas u2 where u2.NRCARGA = ${res.data[key].IDCARREGAMENTOORIGEM})
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
                                    Sequelize.literal('0 as IDORIGINDATA'),
                                    ['NUMTRANSVENDA','IDONORIGINDATA'],
                                    ['NUMNOTA','IDNOTAFISCALORIGEM'],
                                    ['DTSAIDA','DTEMISSAO'],
                                    ['CODCOB','IDCOBRANCAORIGEM'],
                                    ['CODPLPAG','IDPRAZOPAGAMENTOORIGEM'],
                                    ['TOTPESO','PESOTOTAL'],
                                    'VLTOTAL',
                                    'DTCANCEL',
                                    'NUMTRANSVENDA',
                                    ['CODCLI','IDCLIENTEORIGEM'],
                                    'CHAVENFE',
                                    [Sequelize.col(`${PcDocEletronico.name.toUpperCase()}.XMLNFE`),'XML']
                                ],
                                where:{
                                    NUMCAR: res.data[key].IDCARREGAMENTOORIGEM,
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
                                            jumbo.pclote l 
                                            join jumbo.pcmov m2 on (
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
                                        jumbo.pcnfsaid s
                                        join jumbo.pcmov m on (
                                            m.numtransvenda = s.numtransvenda
                                            and m.dtcancel is null
                                            and coalesce(m.qt,m.qtcont) > 0
                                        )
                                        join jumbo.pcprodut p on p.codprod = m.codprod
                                        left outer join jumbo.pclote l on (
                                            l.codfilial = coalesce(m.codfilialretira,m.codfilial) 
                                            and l.codprod = m.codprod 
                                            and l.numlote = m.numlote
                                        )
                                    where
                                        s.numcar = ${res.data[key].IDCARREGAMENTOORIGEM}
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
                                        if (nfsWinthor[kn].IDCLIENTEORIGEM == res.data[key].CLIENTS[kc].IDCLIENTEORIGEM) {
                                            res.data[key].CLIENTS[kc].NFS.push(nfsWinthor[kn]);
                                        }
                                    }
                                }
                            }

                            //find invoice data on broker (aurora)
                            query = `
                                select
                                    1 AS IDORIGINDATA,
                                    s.cod as IDONORIGINDATA,
                                    s.NUMNOTAORIGEM AS IDNOTAFISCALORIGEM,
                                    s.DTEMISSAO,
                                    null as IDCOBRANCAORIGEM,
                                    null as IDPRAZOPAGAMENTOORIGEM,
                                    sum(nvl(ms.qtsaida,0) - nvl(ms.qtdevolvida,0)) as PESOTOTAL,
                                    sum((nvl(ms.qtsaida,0) - nvl(ms.qtdevolvida,0)) * nvl(ms.vlun,0)) as VLTOTAL,
                                    s.DTCANCEL,
                                    S.COD,
                                    S.CODCLIENTE,
                                    s.CHAVENFE
                                from
                                    ep.epnfssaida s
                                    JOIN EP.EPMOVIMENTACOESSAIDA ms on ms.codnfsaida = s.cod
                                where
                                    s.nrcarga = (select u2.nrcarga from ep.epunifcargas u2 where u2.idorigeminfo = 1 and u2.id = (select u.id from ep.epunifcargas u where u.idorigeminfo = 0 and u.nrcarga = ${res.data[key].IDCARREGAMENTOORIGEM}) and u2.idorigeminfo = 1)
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
                                        ep.epnfssaida s
                                        join ep.epmovimentacoessaida m on (
                                            m.codnfsaida = s.cod
                                            and m.dtcancel is null
                                            and coalesce(m.qtsaida,0) > 0
                                        )
                                        left outer join jumbo.pcprodut p on p.codprod = m.codprod
                                    where
                                        s.nrcarga = (select u2.nrcarga from ep.epunifcargas u2 where u2.idorigeminfo = 1 and u2.id = (select u.id from ep.epunifcargas u where u.idorigeminfo = 0 and u.nrcarga = ${res.data[key].IDCARREGAMENTOORIGEM}))
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
                                        if (nfsBroker[kn].CODCLIENTE == res.data[key].CLIENTS[kc].IDCLIENTEORIGEM) {
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
                    await LogisticOrdersWinthorIntegrationsController.getLoadingsDataForDelivery(req,res,next);
                    break;
                case 'integrateboxclosing':
                    res.data = await LogisticOrdersWinthorIntegrationsController.integrateBoxClosing(req.body.identifiers);
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

module.exports = {LogisticOrdersWinthorIntegrationsController}