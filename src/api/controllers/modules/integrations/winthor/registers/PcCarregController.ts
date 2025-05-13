import { Op, QueryTypes, Sequelize } from "sequelize";
import DBConnectionManager from "../../../../../database/DBConnectionManager.js";
import PcCarreg from "../../../../../database/models/winthor/PcCarreg.js";
import Utils from "../../../../utils/Utils.js";
import WinthorBaseRegistersIntegrationsController from "./WinthorBaseRegistersIntegrationsController.js";
import Parameter_Values from "../../../../../database/models/Parameter_Values.js";
import Parameters from "../../../../../database/models/Parameters.js";
import Logistic_Orders from "../../../../../database/models/Logistic_Orders.js";
import Logistic_Orders_Movs from "../../../../../database/models/Logistic_Orders_Movs.js";
import Movements from "../../../../../database/models/Movements.js";
import Logistic_Orders_Items_Mov_Amt from "../../../../../database/models/Logistic_Orders_Items_Mov_Amt.js";
import Data_Origins from "../../../../../database/models/Data_Origins.js";
import PcNfsaid from "../../../../../database/models/winthor/PcNfsaid.js";
import Logistic_Status from "../../../../../database/models/Logistic_Status.js";
import _ from "lodash";
import DataSwap from "../../../../data/DataSwap.js";
import Relationships from "../../../../../database/models/Relationships.js";
import Users from "../../../../../database/models/Users.js";
import Record_Status from "../../../../../database/models/Record_Status.js";
import PcEmpr from "../../../../../database/models/winthor/PcEmpr.js";
import PcVeicul from "../../../../../database/models/winthor/PcVeicul.js";
import PcDocEletronico from "../../../../../database/models/winthor/PcDocEletronico.js";
import Financial_Value_Forms from "../../../../../database/models/Financial_Value_Forms.js";

export default class PcCarregController extends WinthorBaseRegistersIntegrationsController{
    static getTableClassModel() : any {
        return PcCarreg;
    }  
    


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
            let identifier = Utils.typeOf(params.identifier) === 'array' ? params.identifier : params.identifier.split(',');
            identifier = identifier.map((el: any)=>Utils.hasValue(el)?el:'null');
            where.push(`c.numcar in (${identifier.join(',')})`);
        }
        where.push(`c.codmotorista not in (0)`);
        where.push(`c.numcar > 2`);
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
            if (Utils.toBool(await Parameter_Values.get(Parameters.HAS_WINTHOR_INTEGRATION)) === true) {            
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


    /**
     * Get delivery data with nested child data (invoice, items, lots, etc)
     * @created 2023-01-12
     */
    static async getCargosDataForDelivery(params: any) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let identifiers = params.identifiers || [];
            identifiers = Utils.toArray(identifiers);            
            if (identifiers.length > 0) {
                for(let k in identifiers) {
                    if ((identifiers[k]||'').toString().match(/[^0-9]/g)?.length ||  isNaN(identifiers[k])) {
                        throw new Error("invalid number");
                    }
                }

                let wherePcCarreg : any = { 
                    [Op.and] : [
                        {
                            NUMCAR:{
                                [Op.in] : identifiers
                            }
                        },
                        {
                            DT_CANCEL:{
                                [Op.is] : null
                            }
                        }
                    ]
                }

                //check relationship PCCARREG (codmotorista) for olny allow download with relationed driver
                let dataRels = await Relationships.findAll({
                    raw:true,
                    where:{
                        table_1_id: Users.id,
                        record_1_id: params.user.id,
                        table_2_id: PcCarreg.id,
                        status_reg_id: Record_Status.ACTIVE
                    }
                });
                if (dataRels && dataRels.length) {
                    let orDataRels = [];
                    for(let kd in dataRels) {
                        let and : any = [];
                        if (dataRels[kd].record_2_id) {

                            and.push({
                                [dataRels[kd].record_2_column||'NUMCAR']:dataRels[kd].record_2_id
                            });
                        }
                        if (dataRels[kd].record_2_conditions) {
                            and.push(Sequelize.literal(dataRels[kd].record_2_conditions));
                        }
                        orDataRels.push({[Op.and]:and});
                    }
                    if (orDataRels.length) {
                        wherePcCarreg[Op.and].push({[Op.or]:orDataRels});
                    }
                }

                //find delivery                
                result.data = await PcCarreg.findAll({
                    raw:true,
                    attributes: [
                        [Sequelize.literal('0'), "data_origin_id"],
                        ['NUMCAR','id_at_origin'],
                        ['DTSAIDA','out_date'],
                        ['CODMOTORISTA','driver_id'],
                        ['CODVEICULO','vehicle_id'],
                        ['TOTPESO','total_weight'],
                        ['VLTOTAL','total_value'],
                        ['NUMNOTAS','invoices_qty'],
                        ['NUMENT','deliveries_qty'],
                        ['DESTINO','destiny'],
                        ['DT_CANCEL','cancel_date'],
                        [Sequelize.col(`${PcEmpr.tableName}.NOME`),'driver_name'],
                        [Sequelize.col(`${PcVeicul.tableName}.PLACA`),'plate']                        
                    ],
                    include:[{
                        model:PcEmpr,
                        attributes:[],
                        on:Sequelize.where(Sequelize.col(`${PcCarreg.tableName}.CODMOTORISTA`), Sequelize.col(`${PcEmpr.tableName}.MATRICULA`))
                    },{
                        model:PcVeicul,
                        attributes:[],
                        on: Sequelize.where(Sequelize.col(`${PcCarreg.tableName}.CODVEICULO`), Sequelize.col(`${PcVeicul.tableName}.CODVEICULO`))
                    }],
                    where:wherePcCarreg
                });
                if (Utils.hasValue(result.data)) {                    

                    for(let key in result.data) {

                        //find invoice client data of this delivery
                        let query = `
                            select 
                                *
                            from
                                (
                                    select
                                        0 as "data_origin_id",
                                        c.CODCLI AS "id_at_origin",
                                        to_number(regexp_replace(c.CGCENT,'[^0-9]','')) as "document",
                                        c.CLIENTE AS "name",
                                        c.FANTASIA as "fantasy",
                                        c.ESTENT AS "state",
                                        c.MUNICENT AS "city",
                                        c.BAIRROENT AS "neighborhood",
                                        c.ENDERENT AS "address",                                        
                                        c.NUMEROENT AS "address_number",                                        
                                        c.TELENT AS "telephone",
                                        c.CODUSUR1 as "seller_1_id",
                                        c.CODUSUR2 as "seller_2_id"
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
                                        cr.numcar = ${result.data[key].id_at_origin}
                                    union 
                                    select
                                        decode(cj.codcli,null,1,0) as "data_origin_id",
                                        nvl(cj.codcli,p.COD) AS "id_at_origin",
                                        to_number(regexp_replace(nvl(cj.cgcent,p.coddocidentificador),'[^0-9]','')) as "document",
                                        nvl(cj.cliente,p.NOMERAZAO) AS "name",
                                        nvl(cj.fantasia,p.FANTASIA) as "fantasy",
                                        nvl(cj.estent,ci.uf) AS "state",
                                        nvl(cj.municent,ci.nome) AS "city",
                                        nvl(cj.bairroent,p.BAIRRO) AS "neighborhood",
                                        nvl(cj.enderent,p.ENDERECO) AS "address", 
                                        nvl(cj.numeroent,P.NUMERO) AS "address_number",
                                        nvl(cj.telent,null) AS "telephone",
                                        nvl(cj.codusur1,c.codvendedor1) as "seller_1_id",
                                        nvl(cj.codusur2,c.codvendedor2) as "seller_2_id"
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
                                        u.id = (select u2.id from EP.EPUNIFCARGAS u2 where u2.NRCARGA = ${result.data[key].id_at_origin})
                                        and u.IDORIGEMINFO = 1
                                )
                            order by
                                1
                        `;
                        result.data[key].clients = await DBConnectionManager.getConsultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

                        if (result.data[key].clients && result.data[key].clients.length) {  
                            
                            //find invoice data on winthor
                            let nfsWinthor : any = await PcNfsaid.findAll({
                                raw:true,
                                attributes:[
                                    [Sequelize.literal('0'),"data_origin_id"],
                                    ['NUMTRANSVENDA','id_at_origin'],
                                    ['NUMNOTA','invoice_number'],
                                    ['DTSAIDA','issue_date'],
                                    ['CODCOB','financial_value_form_id'],
                                    ['CODPLPAG','payment_plan_id'],
                                    ['TOTPESO','total_weight'],
                                    ['VLTOTAL','total_value'],
                                    ['DTCANCEL','cancel_date'],
                                    ['CODCLI','client_id'],
                                    ['CHAVENFE','invoice_key'],
                                    [Sequelize.col(`${PcDocEletronico.tableName}.XMLNFE`),'xml']
                                ],
                                where:{
                                    NUMCAR: result.data[key].id_at_origin,
                                    DTCANCEL: {
                                        [Op.is] : null
                                    }
                                },
                                include:[{
                                    model:PcDocEletronico,
                                    attributes:[],
                                    where:{
                                        MOVIMENTO:'S'
                                    }
                                }],
                                order:[
                                    ['NUMNOTA', 'ASC']
                                ]
                            });                            
                            if (nfsWinthor && nfsWinthor.length > 0) {
                                
                                //find winthor payments
                                query = `
                                    select
                                        s.numtransvenda as "invoice_id",
                                        p.codcob as "financial_value_form_id",
                                        p.prest as "numeric_order",
                                        p.valor as "value",
                                        x.qrcode as "qrcode"
                                    from
                                        pcnfsaid s 
                                        join jumbo.pcprest p on p.numtransvenda = s.numtransvenda
                                        left outer join jumbo.pcpixcobrancadados x on x.numtransvenda = s.numtransvenda and coalesce(x.prest,'1') = p.prest and x.status = 'ATIVA'
                                    where
                                        s.numcar = ${result.data[key].id_at_origin}
                                        and p.dtpag is null
                                        and p.dtdesd is null
                                        and p.dtbaixa is null
                                        and p.codbaixa is null
                                        and coalesce(p.valor,0) > 0
                                    order by
                                        s.numcar,
                                        s.numtransvenda,
                                        p.prest
                                `;
                                let winthorPayments : any = await DBConnectionManager.getWinthorDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

                                //find item invoice data on winthor
                                query = `
                                    select
                                        0 AS "data_origin_id",
                                        m.NUMTRANSVENDA as "invoice_id",
                                        m.CODPROD AS "item_id",
                                        coalesce(m.descricao,p.descricao,'') as "description",
                                        p.CODAUXILIARTRIB AS "gtin_trib_un",
                                        p.CODAUXILIAR AS "gtin_sell_un",
                                        p.CODAUXILIAR2 AS "gtin_master_un",
                                        coalesce(m.unidade,p.unidade,'UN') as "un",
                                        coalesce(p.UNIDADEMASTER,m.embalagem,'CX') as "package",
                                        coalesce(m.qtunitcx,p.qtunitcx,1) as "package_un_qty",
                                        coalesce(m.pesoliq,p.pesoliq,1) as "liq_weight",
                                        sum(coalesce(m.qt,m.qtcont,0)) as "qty",
                                        max(coalesce(m.punit,m.punitcont,0)) as "un_value",
                                        '[' || (SELECT
                                            listagg('{"identifier":"'||l.numlote||'","expirartion_date":"'||l.dtvalidade||'","qty":'||replace(to_char(coalesce(m2.qt,m2.qtcont,0),'999999999990.9999990'),',','.')||'}',',') within group (order by m.numtransvenda,m.codprod)
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
                                        ) || ']' AS "lots"
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
                                        s.numcar = ${result.data[key].id_at_origin}
                                        and s.dtcancel is null     
                                    group by
                                        0,
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
                                let itemsWinthor : any = await DBConnectionManager.getWinthorDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

                                for(let kn in nfsWinthor) {
                                    nfsWinthor[kn].payments = nfsWinthor[kn].payments || [];
                                    nfsWinthor[kn].items = nfsWinthor[kn].items || [];

                                    for(let kp in winthorPayments) {
                                        if (winthorPayments[kp].invoice_id == nfsWinthor[kn].id_at_origin) {
                                            nfsWinthor[kn].payments.push(winthorPayments[kp]);
                                        }
                                    }

                                    for(let ki in itemsWinthor) {
                                        if (typeof itemsWinthor[ki].logs === 'string') {
                                            if (itemsWinthor[ki].logs.trim() === '[]') itemsWinthor[ki].logs = []
                                            else itemsWinthor[ki].logs = JSON.parse(itemsWinthor[ki].logs);
                                        }
                                        if (itemsWinthor[ki].invoice_id == nfsWinthor[kn].id_at_origin) {
                                            nfsWinthor[kn].items.push(itemsWinthor[ki]);
                                        }
                                    }
                                }

                               
                                
                                //attach nfs winthor to cients
                                for(let kc in result.data[key].clients) {
                                    result.data[key].clients[kc].invoices = result.data[key].clients[kc].invoices || [];
                                    for(let kn in nfsWinthor) {
                                        if (nfsWinthor[kn].client_id == result.data[key].clients[kc].id_at_origin) {
                                            result.data[key].clients[kc].invoices.push(nfsWinthor[kn]);
                                        }
                                    }
                                }
                            }

                            //find invoice data on broker (aurora)
                            query = `
                                select
                                    1 AS "data_origin_id",
                                    s.cod as "id_at_origin",
                                    s.NUMNOTAORIGEM AS "invoice_number",
                                    s.DTEMISSAO as "issue_date",
                                    null as "financial_value_form_id",
                                    null as "payment_plan_id",
                                    sum(nvl(ms.qtsaida,0) - nvl(ms.qtdevolvida,0)) as "total_weight",
                                    sum((nvl(ms.qtsaida,0) - nvl(ms.qtdevolvida,0)) * nvl(ms.vlun,0)) as "total_value",
                                    s.DTCANCEL as "cancel_date",
                                    S.CODCLIENTE as "client_id",
                                    s.CHAVENFE as "invoice_key"
                                from
                                    EP.EPNFSSAIDA s
                                    JOIN EP.EPMOVIMENTACOESSAIDA ms on ms.codnfsaida = s.cod
                                where
                                    s.nrcarga = (select u2.nrcarga from EP.EPUNIFCARGAS u2 where u2.idorigeminfo = 1 and u2.id = (select u.id from EP.EPUNIFCARGAS u where u.idorigeminfo = 0 and u.nrcarga = ${result.data[key].id_at_origin}) and u2.idorigeminfo = 1)
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

                            let nfsBroker : any = await DBConnectionManager.getConsultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

                            if (nfsBroker && nfsBroker.length > 0) {                                

                                //find item invoice data on broker (aurora)
                                query = `
                                    select
                                        1 AS "data_origin_id",
                                        m.cod AS "id_at_origin",
                                        m.CODNFSAIDA as "invoice_id",
                                        m.CODPROD AS "item_id",
                                        coalesce(p.descricao,'') as "description",
                                        p.CODAUXILIARTRIB AS "gtin_trib_un",
                                        p.CODAUXILIAR AS "gtin_sell_un",
                                        p.CODAUXILIAR2 AS "gtin_master_un",
                                        coalesce(p.unidade,'UN') as "un",
                                        coalesce(p.UNIDADEMASTER,'CX') as "package",
                                        coalesce(p.qtunitcx,1) as "package_un_qty",
                                        coalesce(p.pesoliq,1) as "liq_weight",
                                        sum(coalesce(m.qtsaida,0)) as "qty", 
                                        max(coalesce(m.vlun,0)) as "un_value",  
                                        '[]' AS "lots"
                                    from
                                        EP.EPNFSSAIDA s
                                        join EP.EPMOVIMENTACOESSAIDA m on (
                                            m.codnfsaida = s.cod
                                            and m.dtcancel is null
                                            and coalesce(m.qtsaida,0) > 0
                                        )
                                        left outer join JUMBO.PCPRODUT p on p.codprod = m.codprod
                                    where
                                        s.nrcarga = (select u2.nrcarga from EP.EPUNIFCARGAS u2 where u2.idorigeminfo = 1 and u2.id = (select u.id from EP.EPUNIFCARGAS u where u.idorigeminfo = 0 and u.nrcarga = ${result.data[key].id_at_origin}))
                                        and s.dtcancel is null     
                                    group by
                                        1,
                                        m.cod,
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
                                let itemsBroker : any = await DBConnectionManager.getConsultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

                                for(let kn in nfsBroker) {
                                    nfsBroker[kn].items = nfsBroker[kn].items || [];
                                    for(let ki in itemsBroker) {
                                        if (typeof itemsBroker[ki].lots === 'string') {
                                            if (itemsBroker[ki].lots.trim() === '[]') itemsBroker[ki].lots = []
                                            else itemsBroker[ki].lots = JSON.parse(itemsBroker[ki].lots);
                                        }
                                        if (itemsBroker[ki].invoice_id == nfsBroker[kn].id_at_origin) {
                                            nfsBroker[kn].items.push(itemsBroker[ki]);
                                        }
                                    }
                                }
                                
                                //attach nfs broker to cients                                                               
                                for(let kc in result.data[key].clients) {
                                    result.data[key].clients[kc].invoices = result.data[key].clients[kc].invoices || [];
                                    for(let kn in nfsBroker) {
                                        if (nfsBroker[kn].client_id == result.data[key].clients[kc].id_at_origin) {
                                            result.data[key].clients[kc].invoices.push(nfsBroker[kn]);
                                        }
                                    }
                                }
                            }
                        }   
                    }
                    result.success = true;
                } else {
                    throw new Error("no data found");
                }
            } else {
                throw new Error("missing data");
            }            
        } catch (e) {
            result.setException(e);
        }
        return result;
    }


    /**
     * 
     * @created 2024-07-16
     * @version 1.0.0
     */
    static async getInvoicesWithIntegrationsDatas(params?:any) : Promise<any> {
        let result : any = null;
        if (params?.id_at_origin) {
            let query = `
                select
                    ${Data_Origins.WINTHOR} as "data_origin_id",
                    'WINTHOR' AS "data_origin_name",
                    s.numtransvenda as "id_at_origin",
                    s.NUMTRANSVENDA ,
                    s.CODCLI as IDCLIENTORIGIN,
                    s.CODCLI,
                    s.NUMNOTA AS identifier,
                    s.NUMNOTA,
                    s.DTSAIDA AS DTEMISSAO,
                    s.CODCOB AS "origin_financial_value_form_id",
                    s.CODPLPAG AS "payment_plan_id",
                    s.TOTPESO as "total_weight",
                    s.VLTOTAL as "total_value",
                    s.CHAVENFE as "invoice_key"
                from
                    JUMBO.PCNFSAID s 
                where
                    s.NUMCAR = ${params.id_at_origin}
                    and s.dtcancel is null                        
                union all
                select
                    ${Data_Origins.AURORA} as data_origin_id,
                    'AURORA' AS ORIGINDATA,
                    s.COD as "id_at_origin",
                    s.COD AS NUMTRANSVENDA,
                    s.CODCLIENTE as IDCLIENTORIGIN,
                    s.CODCLIENTE AS CODCLI,
                    s.NUMNOTAORIGEM AS identifier,
                    s.NUMNOTAORIGEM AS NUMNOTA,
                    s.DTEMISSAO AS DTEMISSAO,
                    null AS origin_financial_value_form_id,
                    null AS payment_plan_id,
                    (select sum(coalesce(ms.qtsaida,0) * coalesce(ms.pesoliqun,1)) from EP.EPMOVIMENTACOESSAIDA ms where ms.CODNFSAIDA = s.COD) as total_weight,
                    (select sum(coalesce(ms.qtsaida,0) * coalesce(ms.vlun,0)) from EP.EPMOVIMENTACOESSAIDA ms where ms.CODNFSAIDA = s.COD) as total_value,
                    s.CHAVENFE as invoice_key
                from
                    EP.EPNFSSAIDA s
                where
                    s.nrcarga in (
                        select 
                            u2.NRCARGA
                        from
                            EP.EPUNIFCARGAS u2
                        where
                            u2.id in (
                                select 
                                    distinct u.id
                                from
                                    EP.EPUNIFCARGAS u
                                where
                                    u.NRCARGA = ${params.id_at_origin}
                                    and u.IDORIGEMINFO = 0 
                            )
                            and u2.IDORIGEMINFO = 1
                    )
                    and s.CODORIGEMINFO = 1
                order by
                    1,4
            `;
            result = await DBConnectionManager.getConsultDBConnection()?.query(query,{
                raw:true,
                type: QueryTypes.SELECT
            }); 

            if (result.length) {
                query = `
                    select
                        m.data_origin_id,
                        m.id_at_origin,
                        lxm.logistic_status_id,
                        ls.name AS LOGISTICSTATUS
                    from
                        Logistic_Orders l
                        join Logistic_Orders_Movs lxm on lxm.logistic_order_id = l.id
                        left outer join Movements m on m.id = lxm.mov_id
                        left outer join Logistic_Status ls on ls.id = lxm.logistic_status_id
                    where
                        l.id_at_origin = ${params.id_at_origin}
                `;
                let dataTemp : any = await DBConnectionManager.getDefaultDBConnection()?.query(query,{
                    raw:true,
                    type: QueryTypes.SELECT
                });
                dataTemp = Utils.arrayToObject(dataTemp,['data_origin_id','id_at_origin']);

                for(let key in result) {
                    result[key].logistic_status_id = ((dataTemp[result[key].data_origin_id.toString()]||{})[result[key].id_at_origin.toString()]||{})[0]?.logistic_status_id;
                    result[key].LOGISTICSTATUS = ((dataTemp[result[key].data_origin_id.toString()]||{})[result[key].id_at_origin.toString()]||{})[0]?.LOGISTICSTATUS;
                }
            }
        } else {
            throw new Error("missing data");
        }

        return result;
    }      


    /**
     * 
     * @created 2024-07-16
     * @version 1.0.0
     */
    static async getInvoiceWithIntegrationsDatas(params?:any) : Promise<any> {
        let result: any = null;
        let queryParams = params.queryParams || {};
        let where = null;
        if (Utils.hasValue(queryParams.where)) {
            queryParams.raw = true;
            queryParams.attributes = ['id'];
            let idsMovs = await Movements.getData(queryParams);
            if (idsMovs && idsMovs.length) {
                idsMovs = idsMovs.map((el: any)=>el.id);
            } else {
                idsMovs = [-1]
            }
            where = ` where lxm.mov_id in (${idsMovs.join(',')}) `
        }
        let query = `
            select
                lxm.*,
                ls.name AS LOGISTICSTATUS,
                o.name as ORIGINDATA,
                m.id_at_origin AS id_at_originMOV,
                m.identifier,
                m.client_id,
                p.name AS CLIENTNAME,
                m.financial_value_form_id,
                rt.name AS FINANCIALVALUEFORM,
                m.seller_id,
                ps.name AS SELLERNAME,
                CASE WHEN max(coalesce(lxim.unmoved_reason_id,-1)) > -1 then max(coalesce(lxim.unmoved_reason_id,-1)) else null end as unmoved_reason_idITEMS,
                CASE WHEN max(coalesce(lxim.unmoved_reason_id,-1)) > -1 then (SELECT lt.name from Logistic_Reasons lt where lt.id = max(coalesce(lxim.unmoved_reason_id,-1))) else null end as REASONNOTMOVIMENTEDAMTITEMS,
                COUNT(ix.item_id) AS QTITEMS,
                COUNT(DISTINCT CASE WHEN lsxi.is_to_delivery = 1 THEN ix.item_id ELSE NULL END) AS QTITEMSTODELIVERY,
                COUNT(DISTINCT CASE WHEN lsxi.is_delivering = 1 THEN ix.item_id ELSE NULL END) AS QTITEMSDELIVERING,
                COUNT(DISTINCT CASE WHEN lsxi.id_delivered = 1 THEN ix.item_id ELSE NULL END) AS QTITEMSDELIVEREDS,
                COUNT(DISTINCT CASE WHEN lsxi.is_partial_returned = 1 THEN ix.item_id ELSE NULL END) AS QTITEMSPARTIALRETURNED,
                COUNT(DISTINCT CASE WHEN lsxi.is_total_returned = 1 THEN ix.item_id ELSE NULL END) AS QTITEMSTOTLARETURNED,
                SUM(
                    (
                        COALESCE(lxim.expected_amt,0) 
                        - COALESCE(lxim.unmoved_qty,0)                                    
                    ) * CASE WHEN coalesce(lxim.measurement_unit_id,im.measurement_unit_id,ist.measurement_unit_id,2) = 2 then 1 else COALESCE(lxim.unit_weight,im.unit_weight,ist.unit_weight,1) end
                ) AS WEIGHT,
                SUM(
                    (
                        COALESCE(lxim.expected_amt,0) - (
                            COALESCE(lxim.moved_amt,0) 
                            + COALESCE(lxim.unmoved_qty,0)
                        )
                    ) * CASE WHEN coalesce(lxim.measurement_unit_id,im.measurement_unit_id,ist.measurement_unit_id,2) = 2 then 1 else COALESCE(lxim.unit_weight,im.unit_weight,ist.unit_weight,1) end
                ) AS WEIGHTTODELIVERY,
                SUM(
                    COALESCE(lxim.moved_amt,0) 
                    * CASE WHEN coalesce(lxim.measurement_unit_id,im.measurement_unit_id,ist.measurement_unit_id,2) = 2 then 1 else COALESCE(lxim.unit_weight,im.unit_weight,ist.unit_weight,1) end
                ) AS WEIGHTDELIVERED,
                SUM(
                    COALESCE(lxim.unmoved_qty,0) 
                    * CASE WHEN coalesce(lxim.measurement_unit_id,im.measurement_unit_id,ist.measurement_unit_id,2) = 2 then 1 else COALESCE(lxim.unit_weight,im.unit_weight,ist.unit_weight,1) end
                ) AS WEIGHTRETURNED,
                SUM(
                    (
                        COALESCE(lxim.expected_amt,0) 
                        - COALESCE(lxim.unmoved_qty,0)                                    
                    ) * coalesce(im.unit_value,0)
                ) AS value,
                SUM(
                    (
                        COALESCE(lxim.expected_amt,0) - (
                            COALESCE(lxim.moved_amt,0) 
                            + COALESCE(lxim.unmoved_qty,0)
                        )
                    ) * coalesce(im.unit_value,0)
                ) AS VALUETODELIVERY,
                SUM(
                    COALESCE(lxim.moved_amt,0) 
                    * coalesce(im.unit_value,0)
                ) AS VALUEDELIVERED,
                SUM(
                    COALESCE(lxim.unmoved_qty,0) 
                    * coalesce(im.unit_value,0)
                ) AS VALUERETURNED,
                SUM(
                    CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.MONEY} THEN
                        (
                            COALESCE(lxim.expected_amt,0) 
                            - COALESCE(lxim.unmoved_qty,0)
                        ) * COALESCE(im.unit_value,0)
                    ELSE 0 END
                ) AS MONEY,
                (SELECT
                    sum(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.MONEY} then coalesce(lxmr.received_value,0) else 0 end)
                FROM
                    Logistic_Orders_Movs_Received_Values lxmr
                WHERE
                    lxmr.mov_logistic_order_id = lxm.id
                    and coalesce(lxmr.received_value,0) > 0
                ) AS MONEYRECEIVED,
                SUM(
                    CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.CARD} THEN
                        (
                            COALESCE(lxim.expected_amt,0) 
                            - COALESCE(lxim.unmoved_qty,0)
                        ) * COALESCE(im.unit_value,0)
                    ELSE 0 END
                ) AS CARD,
                (SELECT
                    sum(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.CARD} then coalesce(lxmr.received_value,0) else 0 end)
                FROM
                    Logistic_Orders_Movs_Received_Values lxmr
                WHERE
                    lxmr.mov_logistic_order_id = lxm.id
                    and coalesce(lxmr.received_value,0) > 0
                ) AS CARDRECEIVED,
                SUM(
                    CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.CHECK} THEN
                        (
                            COALESCE(lxim.expected_amt,0) 
                            - COALESCE(lxim.unmoved_qty,0)
                        ) * COALESCE(im.unit_value,0)
                    ELSE 0 END
                ) AS "CHECK",
                (SELECT
                    sum(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.CHECK} then coalesce(lxmr.received_value,0) else 0 end)
                FROM
                    Logistic_Orders_Movs_Received_Values lxmr
                WHERE
                    lxmr.mov_logistic_order_id = lxm.id
                    and coalesce(lxmr.received_value,0) > 0
                ) AS CHECKRECEIVED,
                SUM(
                    CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.PIX} THEN
                        (
                            COALESCE(lxim.expected_amt,0) 
                            - COALESCE(lxim.unmoved_qty,0)
                        ) * COALESCE(im.unit_value,0)
                    ELSE 0 END
                ) AS PIX,
                (SELECT
                    sum(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.PIX} then coalesce(lxmr.received_value,0) else 0 end)
                FROM
                    Logistic_Orders_Movs_Received_Values lxmr
                WHERE
                    lxmr.mov_logistic_order_id = lxm.id
                    and coalesce(lxmr.received_value,0) > 0
                ) AS PIXRECEIVED
            from
                Logistic_Orders_Movs lxm 
                left outer join Logistic_Status ls on ls.id = lxm.logistic_status_id
                left outer join Movements m on m.id = lxm.mov_id                            
                left outer join Data_Origins o on o.id = m.data_origin_id
                left outer join Clients c on c.id = m.client_id
                left outer join People p on p.id = c.people_id
                left outer join Financial_Value_Forms rt on rt.id = m.financial_value_form_id
                left outer join Collaborators cl on cl.id = m.seller_id
                left outer join People ps on ps.id = cl.people_id
                left outer join movs_items_stocks mxis on mxis.mov_id = m.id
                left outer join item_mov_amounts im on im.mov_item_stock_id = mxis.id
                left outer join item_stocks ist on ist.id = mxis.stock_item_id
                left outer join Items_Lots_Containers ix on ix.id = ist.item_lot_container_id
                left outer join items i on i.id = iX.item_id
                left outer join logistic_orders_items_mov_amt lxim on (
                    lxim.mov_logistic_order_id = lxm.id
                    AND lxim.item_mov_amt_id = im.id
                )
                left outer join Logistic_Status lsxi on lsxi.id = lxim.logistic_status_id
            ${where||''}
            GROUP BY
                ${Object.keys(Logistic_Orders_Movs.fields).map((el: any)=>`lxm.${el}`).join(',')},
                ls.name,
                o.name,
                m.id_at_origin,
                m.identifier,
                m.client_id,
                p.name,
                m.financial_value_form_id,
                rt.name,
                m.seller_id,
                ps.name
        `;
        result = await DBConnectionManager.getDefaultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

        return result;
    }


    /**
     * 
     * @created 2024-07-16
     * @version 1.0.0
     */
    static async getItemsInvoiceWithIntegrationsDatas(params?:any) : Promise<any> {
        let result : any = null;
        let query = null;
        let idsItemsOnOriginData = params.IDITEMONORIGINDATA || [];
        if (idsItemsOnOriginData && Utils.typeOf(idsItemsOnOriginData) != 'array') {
            idsItemsOnOriginData = idsItemsOnOriginData.toString().split(",");
            idsItemsOnOriginData = idsItemsOnOriginData.map((el: any)=>Utils.hasValue(el)?el:'null');
        }
        if (params.data_origin_id == Data_Origins.WINTHOR) {
            query = `
                select                                        
                    m.CODPROD,
                    coalesce(m.descricao,p.descricao,'') as description,
                    p.CODAUXILIARTRIB AS gtin_trib_un,
                    p.CODAUXILIAR AS gtin_sell_un,
                    p.CODAUXILIAR2 AS gtin_master_un,
                    coalesce(m.unidade,p.unidade,'UN') as un,
                    coalesce(p.UNIDADEMASTER,m.embalagem,'CX') as package,
                    coalesce(m.qtunitcx,p.qtunitcx,1) as package_un_qty,
                    coalesce(m.pesoliq,p.pesoliq,1) as liq_weight,
                    sum(coalesce(m.qt,m.qtcont,0)) as QT,
                    max(coalesce(m.punit,m.punitcont,0)) as VLUN,
                    '[' || (SELECT
                        listagg('{"identifier":"'||l.numlote||'","expirartion_date":"'||l.dtvalidade||'","qty":'||replace(to_char(coalesce(m2.qt,m2.qtcont,0)),',','.')||'}',',') within group (order by m.numtransvenda,m.codprod)
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
                    s.NUMTRANSVENDA = ${params.NUMTRANSVENDA}
                    and s.dtcancel is null
                    ${Utils.hasValue(idsItemsOnOriginData) ? ` and m.codprod in (${idsItemsOnOriginData.join(',')}) ` : ''}     
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
        } else if (params.data_origin_id == Data_Origins.AURORA) {
            query = `
                select                                        
                    m.CODPROD,
                    coalesce(ep.descricao,p.descricao,'') as description,
                    p.CODAUXILIARTRIB AS gtin_trib_un,
                    p.CODAUXILIAR AS gtin_sell_un,
                    p.CODAUXILIAR2 AS gtin_master_un,
                    coalesce(u.sigla,p.unidade,'UN') as un,
                    coalesce(p.UNIDADEMASTER,'CX') as package,
                    coalesce(p.qtunitcx,1) as package_un_qty,
                    coalesce(m.pesoliqun,p.pesoliq,1) as liq_weight,
                    sum(coalesce(m.qtsaida,0)) as QT,
                    max(coalesce(m.vlun,0)) as VLUN,
                    '[]' AS LOTS,
                    m.CODNFSAIDA AS NUMTRANSVENDA
                from
                    EP.EPNFSSAIDA s
                    join EP.EPMOVIMENTACOESSAIDA m on (
                        m.codnfsaida = s.cod
                        and m.dtcancel is null
                        and coalesce(m.qtsaida,0) > 0
                    )
                    left outer join EP.EPUNIDADES u on u.COD = m.CODUNIDADE
                    left outer join EP.EPPRODUTOS ep on ep.cod = m.codprod
                    left outer join JUMBO.PCPRODUT p on p.codprod = m.codprod                                
                where
                    s.CODORIGEMINFO = 1
                    AND s.COD = ${params.NUMTRANSVENDA}
                    and s.dtcancel is null     
                    ${Utils.hasValue(idsItemsOnOriginData) ? ` and m.codprod in (${idsItemsOnOriginData.join(',')}) ` : ''}     
                group by
                    m.CODPROD,
                    coalesce(ep.descricao,p.descricao,''),
                    p.CODAUXILIARTRIB,
                    p.CODAUXILIAR,
                    p.CODAUXILIAR2,
                    coalesce(u.sigla,p.unidade,'UN'),
                    coalesce(p.UNIDADEMASTER,'CX'),
                    coalesce(p.qtunitcx,1),
                    coalesce(m.pesoliqun,p.pesoliq,1),
                    coalesce(s.codfilial,1),
                    m.CODNFSAIDA
                having
                    sum(coalesce(m.qtsaida,0)) > 0
                order by
                    m.CODNFSAIDA,1
            `;

        } else {
            throw new Error(`origin data not expected: ${params.data_origin_id}`);
        }
        result = await DBConnectionManager.getConsultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

        query = `
            select
                i.id,
                i.data_origin_id,
                i.id_at_origin,                    
                lxim.logistic_status_id,
                ls.name AS LOGISTICSTATUS,
                lxim.unmoved_reason_id,
                lxim.unmoved_qty_notes,
                lr.name as REASONNOTMOVIMENTEDAMT,
                sum(coalesce(lxim.expected_amt,0)) as expected_amt,
                sum(coalesce(lxim.moved_amt,0)) as moved_amt,
                SUM(
                    (
                        COALESCE(lxim.expected_amt,0) 
                        - COALESCE(lxim.unmoved_qty,0)                                    
                    ) * CASE WHEN coalesce(lxim.measurement_unit_id,im.measurement_unit_id,ist.measurement_unit_id,2) = 2 then 1 else COALESCE(lxim.unit_weight,im.unit_weight,ist.unit_weight,1) end
                ) AS WEIGHT,
                SUM(
                    (
                        COALESCE(lxim.expected_amt,0) - (
                            COALESCE(lxim.moved_amt,0) 
                            + COALESCE(lxim.unmoved_qty,0)
                        )
                    ) * CASE WHEN coalesce(lxim.measurement_unit_id,im.measurement_unit_id,ist.measurement_unit_id,2) = 2 then 1 else COALESCE(lxim.unit_weight,im.unit_weight,ist.unit_weight,1) end
                ) AS WEIGHTTODELIVERY,
                SUM(
                    COALESCE(lxim.moved_amt,0) 
                    * CASE WHEN coalesce(lxim.measurement_unit_id,im.measurement_unit_id,ist.measurement_unit_id,2) = 2 then 1 else COALESCE(lxim.unit_weight,im.unit_weight,ist.unit_weight,1) end
                ) AS WEIGHTDELIVERED,
                SUM(
                    COALESCE(lxim.unmoved_qty,0) 
                    * CASE WHEN coalesce(lxim.measurement_unit_id,im.measurement_unit_id,ist.measurement_unit_id,2) = 2 then 1 else COALESCE(lxim.unit_weight,im.unit_weight,ist.unit_weight,1) end
                ) AS WEIGHTRETURNED,
                SUM(
                    (
                        COALESCE(lxim.expected_amt,0) 
                        - COALESCE(lxim.unmoved_qty,0)                                    
                    ) * coalesce(im.unit_value,0)
                ) AS value,
                SUM(
                    (
                        COALESCE(lxim.expected_amt,0) - (
                            COALESCE(lxim.moved_amt,0) 
                            + COALESCE(lxim.unmoved_qty,0)
                        )
                    ) * coalesce(im.unit_value,0)
                ) AS VALUETODELIVERY,
                SUM(
                    COALESCE(lxim.moved_amt,0) 
                    * coalesce(im.unit_value,0)
                ) AS VALUEDELIVERED,
                SUM(
                    COALESCE(lxim.unmoved_qty,0) 
                    * coalesce(im.unit_value,0)
                ) AS VALUERETURNED
            from
                movements m
                join logistic_orders_movs lxm on lxm.mov_id = m.id
                join movs_items_stocks mxis on mxis.mov_id = m.id
                join item_stocks ist on ist.id = mxis.stock_item_id
                join Items_Lots_Containers ix on ix.id = ist.item_lot_container_id
                join items i on i.id = ix.item_id
                join item_mov_amounts im on im.mov_item_stock_id = mxis.id
                join logistic_orders_items_mov_amt lxim on lxim.mov_logistic_order_id = lxm.id and lxim.item_mov_amt_id = im.id                        
                left outer join logistic_status ls on ls.id = lxim.logistic_status_id
                left outer join logistic_reasons lr on lr.id = lxim.unmoved_reason_id
            where
                m.data_origin_id = ${params.data_origin_id}
                and m.id_at_origin = ${params.NUMTRANSVENDA}
                ${Utils.hasValue(idsItemsOnOriginData) ? ` and i.id_at_origin in (${idsItemsOnOriginData.join(',')}) ` : ''}     
            group by                        
                i.id,
                lxim.logistic_status_id,
                ls.name,
                lxim.unmoved_reason_id,
                lxim.unmoved_qty_notes,
                lr.name
            order by    
                i.id                                
        `;

        let delivereds : any = await DBConnectionManager.getDefaultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});

        if (delivereds && delivereds.length) {
            for(let kd in delivereds) {
                for(let k in result) {
                    if (result[k].CODPROD == delivereds[kd].id_at_origin) {                                    
                        result[k].logistic_status_id = delivereds[kd].logistic_status_id;
                        result[k].LOGISTICSTATUS = delivereds[kd].LOGISTICSTATUS;                                    
                        result[k].QT = result[k].QT || delivereds[kd].expected_amt;
                        result[k].QTENTREGUE = delivereds[kd].moved_amt;
                        result[k].unmoved_reason_id = delivereds[kd].unmoved_reason_id;
                        result[k].REASONNOTMOVIMENTEDAMT = delivereds[kd].REASONNOTMOVIMENTEDAMT;
                        result[k].unmoved_qty_notes = delivereds[kd].unmoved_qty_notes;                                    
                        result[k].WEIGHT = delivereds[kd].WEIGHT;
                        result[k].WEIGHTTODELIVERY = delivereds[kd].WEIGHTTODELIVERY;
                        result[k].WEIGHTDELIVERED = delivereds[kd].WEIGHTDELIVERED;
                        result[k].WEIGHTRETURNED = delivereds[kd].WEIGHTRETURNED;
                        result[k].value = delivereds[kd].value;
                        result[k].VALUETODELIVERY = delivereds[kd].VALUETODELIVERY;
                        result[k].VALUEDELIVERED = delivereds[kd].VALUEDELIVERED;
                        result[k].VALUERETURNED = delivereds[kd].VALUERETURNED;
                        break;
                    }
                }     
            }
        }

        return result;
    }



    static {
        this.configureDefaultRequestHandlers();
    }
}