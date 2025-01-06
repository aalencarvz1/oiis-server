import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import { Op, QueryTypes, Sequelize } from "sequelize";
import DBConnectionManager from "../../../../database/DBConnectionManager.js";
import Parameter_Values from "../../../../database/models/Parameter_Values.js";
import Parameters from "../../../../database/models/Parameters.js";
import Logistic_Orders from "../../../../database/models/Logistic_Orders.js";
import Logistic_Status from "../../../../database/models/Logistic_Status.js";
import Data_Origins from "../../../../database/models/Data_Origins.js";
import Logistic_Orders_Movs from "../../../../database/models/Logistic_Orders_Movs.js";
import Movements from "../../../../database/models/Movements.js";
import Logistic_Orders_Items_Mov_Amt from "../../../../database/models/Logistic_Orders_Items_Mov_Amt.js";
import PcNfsaid from "../../../../database/models/winthor/PcNfsaid.js";
import _ from "lodash";

export default class WinthorLogistic_OrdersIntegrationsController extends BaseIntegrationsRegistersController{

    static async getWithWinthorData(params: any) : Promise<any> {
        let result : any = null;
        let queryParams = params.queryParams || {};
        queryParams.raw = true;
        let where : any = [];
        if (params.initDate) {
            where.push(`trunc(c.dtsaida) >= to_date('${params.initDate}','yyyy-mm-dd')`);
        }
        if (params.endDate) {
            where.push(`trunc(c.dtsaida) <= to_date('${params.endDate}','yyyy-mm-dd')`);
        }
        if (params.codfilial) {
            if (Utils.typeOf(params.codfilial) !== 'array') {
                params.codfilial = Utils.toArray(params.codfilial);
            }
            params.codfilial = params.codfilial.map((el: any)=>Utils.hasValue(el)?el:'null');
            where.push(`s.codfilial in (${params.codfilial.join(',')})`);
        }
        if (params.codmotorista) {
            if (Utils.typeOf(params.codmotorista) !== 'array') {
                params.codmotorista = Utils.toArray(params.codmotorista);
            }
            params.codmotorista = params.codmotorista.map((el: any)=>Utils.hasValue(el)?el:'null');
            where.push(`c.codmotorista in (${params.codmotorista.join(',')})`);
        }
        if (params.codveiculo) {
            if (Utils.typeOf(params.codveiculo) !== 'array') {
                params.codveiculo = Utils.toArray(params.codveiculo);
            }
            params.codveiculo = params.codveiculo.map((el: any)=>Utils.hasValue(el)?el:'null');
            where.push(`c.codveiculo in (${params.codveiculo.join(',')})`);
        }
        if (params.identifier) {
            let identifier = Utils.typeOf(params.identifier) == 'array' ? params.identifier : params.identifier.split(',');
            identifier = identifier.map((el: any)=>Utils.hasValue(el)?el:'null');
            where.push(`c.numcar in (${identifier.join(',')})`);
        }
        if (where.length) where = ` where ${where.join(' and ')} `
        else where = ' where 1=2 ';//prevent massive database get
        let query = `
            select
                DTSAIDA as "out_date",
                NUMCAR as "id",
                DESTINO as "destiny",
                CODMOTORISTA as "driver_id",
                MOTORISTA as "driver_name",
                CODVEICULO as "vehicle_id",
                PLACA as "plate",
                COUNT(DISTINCT CGC) AS "deliveries_qty",
                COUNT(DISTINCT NUMTRANSVENDA) AS "invoices_qty",
                sum(nvl("total_weight",0)) AS "total_weight",
                sum(nvl("total_weight",0)) - sum(nvl("total_return_weight",0)) AS "total_liq_weight",
                sum(nvl("total_value",0)) AS "total_value",
                sum(nvl("total_value",0)) - sum(nvl(VLTOTALDEV,0)) AS "total_liq_value",
                COUNT(DISTINCT DNFSARECEBER) AS "invoices_to_delivery_money_qty",
                sum(nvl(DARECEBER,0)) AS "invoices_to_delivery_money_value",
                COUNT(DISTINCT CARTAONFSARECEBER) AS "invoices_to_delivery_card_qty",
                sum(nvl(CARTAOARECEBER,0)) AS "invoices_to_delivery_card_value",
                COUNT(DISTINCT CHEQUENFSARECEBER) AS "invoices_to_delivery_check_qty",
                sum(nvl(CHEQUEARECEBER,0)) AS "invoices_to_delivery_check_value",
                0 AS "invoices_to_delivery_pix_qty",
                0 AS "invoices_to_delivery_pix_value"
            FROM (
                select       
                    c.DTSAIDA,                 
                    c.NUMCAR,                            
                    c.DESTINO,
                    c.codmotorista,
                    e.nome as MOTORISTA,
                    c.codveiculo,
                    v.PLACA,
                    to_number(regexp_replace(s.cgc,'[^0-9]','')) as cgc,
                    '0'||s.numtransvenda AS NUMTRANSVENDA,
                    nvl(m.qt,m.qtcont) * coalesce(m.pesoliq,p.pesoliq,1) as "total_weight",
                    nvl(m.qtdevol,0) * coalesce(m.pesoliq,p.pesoliq,1) as "total_return_weight",
                    nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) as "total_value",
                    nvl(m.qtdevol,0) * nvl(m.punit,m.punitcont) as VLTOTALDEV,
                    case when s.codcob in ('D','DH') then '0'||s.numtransvenda ELSE NULL end as DNFSARECEBER,
                    case when s.codcob in ('D','DH') then nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) ELSE NULL end as DARECEBER,
                    case when s.codcob in ('CCEO','CCO3','CCVM','CCV3','CDEO','CDO3','CDVM','CDV3') then '0'||s.numtransvenda ELSE NULL end as CARTAONFSARECEBER,
                    case when s.codcob in ('CCEO','CCO3','CCVM','CCV3','CDEO','CDO3','CDVM','CDV3') then nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) ELSE NULL end as CARTAOARECEBER,
                    case when s.codcob in ('CH','CHP','CHV') then '0'||s.numtransvenda ELSE NULL end as CHEQUENFSARECEBER,
                    case when s.codcob in ('CH','CHP','CHV') then nvl(m.qt,m.qtcont) * nvl(m.punit,m.punitcont) ELSE NULL end as CHEQUEARECEBER
                from
                    JUMBO.PCCARREG c
                    left outer join JUMBO.PCEMPR e on e.matricula = c.codmotorista
                    left outer join JUMBO.PCVEICUL v on v.codveiculo = c.codveiculo
                    left outer join JUMBO.PCNFSAID s on s.numcar = c.numcar and s.dtcancel is null
                    left outer join JUMBO.PCMOV m on m.numtransvenda = s.numtransvenda and m.dtcancel is null
                    left outer join JUMBO.PCPRODUT p on p.codprod = m.codprod
                ${where}                        
                union all
                select       
                    c.DTSAIDA,                 
                    c.NUMCAR,                            
                    c.DESTINO,
                    c.codmotorista,
                    e.nome as MOTORISTA,
                    c.codveiculo,
                    v.PLACA,
                    to_number(regexp_replace(ps.coddocidentificador,'[^0-9]','')) as cgc,
                    '1'||s.cod as numtransvenda,                                
                    nvl(m.qtsaida,0) * coalesce(m.pesoliqun,1) as total_weight,
                    nvl(m.qtdevolvida,0) * coalesce(m.pesoliqun,1) as total_return_weight,
                    nvl(m.qtsaida,0) * nvl(m.vlun,0) as total_value,
                    nvl(m.qtdevolvida,0) * nvl(m.vlun,0) as VLTOTALDEV,
                    NULL as DNFSARECEBER,
                    NULL as DARECEBER,
                    null as CARTAONFSARECEBER,
                    null as CARTAOARECEBER,
                    NULL as CHEQUENFSARECEBER,
                    NULL as CHEQUEARECEBER
                from
                    JUMBO.PCCARREG c                                
                    join EP.EPUNIFCARGAS u on u.nrcarga = c.numcar
                    join EP.EPUNIFCARGAS u2 on u2.id = u.id and u2.idorigeminfo > 0
                    left outer join JUMBO.PCEMPR e on e.matricula = c.codmotorista
                    left outer join JUMBO.PCVEICUL v on v.codveiculo = c.codveiculo
                    left outer join EP.EPNFSSAIDA s on s.nrcarga = u2.nrcarga and s.codorigeminfo > 0 and s.dtcancel is null
                    left outer join EP.EPCLIENTES cl on cl.cod = s.codcliente
                    left outer join EP.EPPESSOAS ps on ps.cod = cl.codpessoa
                    left outer join EP.EPMOVIMENTACOESSAIDA m on m.codnfsaida = s.cod and m.dtcancel is null
                    left outer join JUMBO.PCPRODUT p on p.codprod = m.codprod
                ${where} 
            )                       
            group by
                DTSAIDA,
                NUMCAR,
                DESTINO,
                CODMOTORISTA,
                MOTORISTA,
                CODVEICULO,                            
                PLACA
            order by
                1

        `;

        result = await DBConnectionManager.getWinthorDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

        if (result.length) {
            let numCars = result.map((el: any)=>el.id);
            query = `
                select
                    l.id,
                    l.identifier,
                    l.logistic_status_id,
                    ls.name as "logistic_status_name"
                from
                    logistic_orders l
                    left outer join logistic_status ls on ls.id = l.logistic_status_id
                where
                    l.identifier in (${numCars.join(',')})
            `;
            let logData : any = await DBConnectionManager.getDefaultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

            if (Utils.hasValue(logData)) {
                logData = _.keyBy(logData,'identifier');
                for(let kj in result) {                                
                    if (logData[result[kj].id.toString()]) {
                        result[kj].logistic_order_id = logData[result[kj].id.toString()].id;
                        result[kj].logistic_status_id = logData[result[kj].id.toString()].logistic_status_id;
                        result[kj].logistic_status_name = logData[result[kj].id.toString()].logistic_status_name;
                    }
                }
            }
        }                    
        return result;
    }


    static async integrateBoxClosing(ids: any) : Promise<any> {
        let resultData : any = {
            COBRANCAS_INTEGRADAS: [],
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
                    if (ids.length) {   
                        for(let key in ids) {
                            //Logistic_Orders_Movs.initAssociations();
                            //Logistic_Orders_Items_Mov_Amt.initAssociations();
                            let logOrder : any = await Logistic_Orders.findAll({
                                raw:true,
                                attributes:[
                                    [Sequelize.col(`${Logistic_Orders.tableName}.id_at_origin`), 'id_at_origin'],
                                    [Sequelize.col('logistic_orders_movs.logistic_status_id'), 'logistic_status_id'],
                                    [Sequelize.col('logistic_orders_movs->movements.data_origin_id'), 'data_origin_idNF'],
                                    [Sequelize.col('logistic_orders_movs->movements.id_at_origin'), 'NUMTRANSVENDA'],
                                    [Sequelize.fn('COUNT',Sequelize.col('logistic_orders_movs->logistic_orders_items_mov_amt.id')),'QTITEMS'],
                                    [Sequelize.fn('COUNT',Sequelize.literal(`CASE WHEN \`logistic_orders_movs->logistic_orders_items_mov_amt\`.logistic_status_id = ${Logistic_Status.DELIVERED} THEN 1 ELSE NULL END`)),'QTITEMSFINALIZEDS']
                                ],
                                where:{
                                    [Op.and]:[{
                                        id:ids[key]
                                    },Sequelize.where(Sequelize.literal('`logistic_orders_movs->movements`.data_origin_id'),Sequelize.literal(Data_Origins.WINTHOR.toString()))
                                    ]
                                },
                                include:[{                                
                                    model: Logistic_Orders_Movs,
                                    attributes: [],
                                    include: [{
                                        model: Movements,
                                        attributes:[],
                                        on:Sequelize.where(Sequelize.col(`logistic_orders_movs->movements.id`),Sequelize.col(`${Logistic_Orders_Movs.tableName}.mov_id`))
                                    },{
                                        model: Logistic_Orders_Items_Mov_Amt,
                                        attributes:[],
                                        on:Sequelize.where(Sequelize.col(`logistic_orders_movs->logistic_orders_items_mov_amt.mov_logistic_order_id`),Sequelize.col(`${Logistic_Orders_Movs.tableName}.id`))
                                        
                                    }]
                                }],
                                group:[
                                    Sequelize.col(`${Logistic_Orders.tableName}.id_at_origin`),
                                    Sequelize.col('logistic_orders_movs.logistic_status_id'),
                                    Sequelize.col('logistic_orders_movs->movements.data_origin_id'),
                                    Sequelize.col('logistic_orders_movs->movements.id_at_origin')
                                ]
                            });
                            if (logOrder && logOrder.length) {
                                for(let kl in logOrder) {
                                    if (logOrder[kl].data_origin_idNF == Data_Origins.WINTHOR) {
                                        let wintConnection : Sequelize | null = DBConnectionManager.getWinthorDBConnection();

                                        let nfWint : any = await PcNfsaid.findOne({
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

                                                let preExist : any = await wintConnection?.query(`
                                                    select 
                                                        count(1) as "EXISTS" 
                                                    FROM 
                                                        JUMBO.PCFECHAMENTOMAP 
                                                    where 
                                                        NUMTRANSVENDA = ${nfWint.NUMTRANSVENDA} `,
                                                    {raw:true,type:QueryTypes.SELECT});
                                                preExist = Utils.toBool(preExist[0]?.EXISTS || false);

                                                if (!preExist) {

                                                    await wintConnection?.transaction(async transaction=>{

                                                        //REGISTERS LOCKS
                                                        let pcPrests : any = await wintConnection.query(`
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
                                                            type: QueryTypes.SELECT,
                                                            transaction:transaction
                                                        });

                                                        for(let kp in pcPrests) {
                                                            let nextVal : any = await wintConnection.query('SELECT DFSEQ_PCFECHAMENTOMAP_NUMSEQ.NEXTVAL FROM DUAL', {raw:true,type:QueryTypes.SELECT});
                                                            nextVal = nextVal[0]?.NEXTVAL || 1;

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
                                                                type: QueryTypes.INSERT,
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
                                                            type: QueryTypes.UPDATE,
                                                            transaction: transaction
                                                        });
                                                        resultData.COBRANCAS_INTEGRADAS.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.total_value});    
                                                        return true;
                                                    });
                                                } else {
                                                    resultData.COBRANCAS_INTEGRADAS_ANTERIORMENTE.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.total_value});    
                                                }
                                            } else {
                                                resultData.COBRANCAS_NAO_INTEGRAR.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.total_value});    
                                            }
                                        } else {
                                            if (logOrder[kl].logistic_status_id == Logistic_Status.PARTIAL_RETURNED) 
                                                resultData.NOTAS_DEVOLVIDAS_PARCIALMENTE.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.total_value})
                                            else if (logOrder[kl].logistic_status_id == Logistic_Status.TOTAL_RETURNED) 
                                                resultData.NOTAS_DEVOLVIDAS_TOTALMENTE.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.total_value})    
                                            else if (logOrder[kl].logistic_status_id == Logistic_Status.DELIVERING) 
                                                resultData.NOTAS_EM_ENTREGA.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.total_value})
                                            else
                                                resultData.NOTAS_A_ENTREGAR.push({NUMTRANS:logOrder[kl].NUMTRANSVENDA,NUMNOTA:nfWint.NUMNOTA, CODCLI: nfWint.CODCLI,CODRCA:nfWint.CODUSUR,CLIENTE: nfWint.CLIENTE, CODCOB: nfWint.CODCOB, VALOR: nfWint.total_value});    
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
        } catch(e: any) {
            Utils.logError(e);
            resultData.ERRORS.push(e.message || e);
        }
        return resultData;
    }
}