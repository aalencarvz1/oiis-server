
const _ = require('lodash');
const { LogisticOrders } = require('../../../../../database/models/LogisticOrders');
const { Sequelize, QueryTypes } = require('sequelize');
const { OriginsDatas } = require('../../../../../database/models/OriginsDatas');
const DBConnectionManager = require('../../../../../database/DBConnectionManager');
const { LogisticOrdersXMovs } = require('../../../../../database/models/LogisticOrdersXMovs');
const { Utils } = require('../../../../utils/Utils');
const { Movements } = require('../../../../../database/models/Movements');
const { FinancialValueForms } = require('../../../../../database/models/FinancialValueForms');
const { RegistersController } = require('../../../registers/RegistersController');

/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 * @version 1.09.0
 */
class DeliveryController extends RegistersController{


    /**
     * 
     * @param {*} pId 
     * @returns 
     * @created 2024-05-01
     * @version 1.0.0
     */
    static async getSummaryDetails(pId) {
        let result = null;
        try {
            let where = [];
            if (pId) {
                let identifier = Utils.typeOf(pId) == 'array' ? pId : pId.toString().split(',');
                identifier = identifier.map(el=>Utils.hasValue(el)?el:'null');
                where.push(`l.id in (${identifier.join(',')})`);
            }
            if (where.length) where = ` where ${where.join(' and ')} `
            else where = ' where 1=2 ';//prevent massive database get
            let query = `
                select
                    l.*,
                    lsl.name AS LOGISTICSTATUS,
                    COUNT(DISTINCT CASE WHEN ls.ISTODELIVERY = 1 THEN m.IDCLIENT ELSE NULL END) AS QTENTREGASAENTREGAR,
                    COUNT(DISTINCT CASE WHEN ls.ISDELIVERING = 1 THEN m.IDCLIENT ELSE NULL END) AS QTENTREGASENTREGANDO,
                    COUNT(DISTINCT CASE WHEN ls.ISDELIVERED = 1 THEN m.IDCLIENT ELSE NULL END) AS QTENTREGASENTREGUES,
                    COUNT(DISTINCT CASE WHEN ls.ISPARTIALRETURNED = 1 OR ls.ISTOTALRETURNED = 1 THEN m.IDCLIENT ELSE NULL END) AS QTENTREGASDEVOLVIDAS,
                    COUNT(DISTINCT CASE WHEN ls.ISTODELIVERY = 1 THEN m.id ELSE NULL END) AS QTNOTASFISCAISAENTREGAR,
                    COUNT(DISTINCT CASE WHEN ls.ISDELIVERING = 1 THEN m.id ELSE NULL END) AS QTNOTASFISCAISENTREGANDO,
                    COUNT(DISTINCT CASE WHEN ls.ISDELIVERED = 1 THEN m.id ELSE NULL END) AS QTNOTASFISCAISENTREGUES,
                    COUNT(DISTINCT CASE WHEN ls.ISPARTIALRETURNED = 1 OR ls.ISTOTALRETURNED = 1 THEN m.id ELSE NULL END) AS QTNOTASFISCAISDEVOLVIDAS,
                    SUM((
                            COALESCE(lim.EXPECTEDAMT,0)   
                            - COALESCE(lim.NOTMOVIMENTEDAMT,0)                                   
                        ) * CASE WHEN lim.IDMEASUREMENTUNIT = 2 then 1 else COALESCE(lim.UNITWEIGHT,1) end
                    ) AS WEIGHT,
                    SUM(
                        (
                            COALESCE(lim.EXPECTEDAMT,0) - (
                                COALESCE(lim.MOVIMENTEDAMT,0) 
                                + COALESCE(lim.NOTMOVIMENTEDAMT,0)
                            )
                        ) * CASE WHEN lim.IDMEASUREMENTUNIT = 2 then 1 else COALESCE(lim.UNITWEIGHT,1) end
                    ) AS WEIGHTTODELIVERY,
                    SUM(
                        COALESCE(lim.MOVIMENTEDAMT,0)                                      
                        * CASE WHEN lim.IDMEASUREMENTUNIT = 2 then 1 else COALESCE(lim.UNITWEIGHT,1) end
                    ) AS WEIGHTDELIVERED,
                    SUM(
                        COALESCE(lim.NOTMOVIMENTEDAMT,0)                                      
                        * CASE WHEN lim.IDMEASUREMENTUNIT = 2 then 1 else COALESCE(lim.UNITWEIGHT,1) end
                    ) AS WEIGHTRETURNED,  
                    SUM((
                            COALESCE(lim.EXPECTEDAMT,0)
                            - COALESCE(lim.NOTMOVIMENTEDAMT,0)
                        ) * COALESCE(ima.UNITVALUE,0)
                    ) AS VALUE,                          
                    SUM(
                        (
                            COALESCE(lim.EXPECTEDAMT,0) - (
                                COALESCE(lim.MOVIMENTEDAMT,0) 
                                + COALESCE(lim.NOTMOVIMENTEDAMT,0)
                            )
                        ) * COALESCE(ima.UNITVALUE,0)
                    ) AS VALUETODELIVERY,
                    SUM(
                        COALESCE(lim.MOVIMENTEDAMT,0)                                      
                        * COALESCE(ima.UNITVALUE,0)
                    ) AS VALUEDELIVERED,
                    SUM(
                        COALESCE(lim.NOTMOVIMENTEDAMT,0)                                      
                        * COALESCE(ima.UNITVALUE,0)
                    ) AS VALUERETURNED,                            
                    COUNT(DISTINCT CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.MONEY} THEN m.id ELSE NULL END) AS DNFSARECEBER,
                    SUM(
                        CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.MONEY} THEN
                            (
                                COALESCE(lim.EXPECTEDAMT,0) 
                                - COALESCE(lim.NOTMOVIMENTEDAMT,0)
                            ) * COALESCE(ima.UNITVALUE,0)
                        ELSE 0 END
                    ) AS DARECEBER,
                    (SELECT
                        COUNT(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.MONEY} then lxm.IDMOV else null end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                        join LogisticOrdersXMovs lxm on lxm.id = lxmr.IDLOGISTICORDERXMOV
                    WHERE
                        lxm.IDLOGISTICORDER = l.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS QTMOVMONEYRECEIVED,
                    (SELECT
                        sum(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.MONEY} then coalesce(lxmr.RECEIVEDVALUE,0) else 0 end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                        join LogisticOrdersXMovs lxm on lxm.id = lxmr.IDLOGISTICORDERXMOV
                    WHERE
                        lxm.IDLOGISTICORDER = l.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS MONEYRECEIVED,
                    COUNT(DISTINCT CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.CARD} THEN m.id ELSE NULL END) AS CARTAONFSARECEBER,
                    SUM(
                        CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.CARD} THEN
                            (
                                COALESCE(lim.EXPECTEDAMT,0) 
                                - COALESCE(lim.NOTMOVIMENTEDAMT,0)
                            ) * COALESCE(ima.UNITVALUE,0)
                        ELSE 0 END
                    ) AS CARTAOARECEBER,
                    (SELECT
                        COUNT(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.CARD} then lxm.IDMOV else null end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                        join LogisticOrdersXMovs lxm on lxm.id = lxmr.IDLOGISTICORDERXMOV
                    WHERE
                        lxm.IDLOGISTICORDER = l.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS QTMOVCARDRECEIVED,
                    (SELECT
                        sum(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.CARD} then coalesce(lxmr.RECEIVEDVALUE,0) else 0 end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                        join LogisticOrdersXMovs lxm on lxm.id = lxmr.IDLOGISTICORDERXMOV
                    WHERE
                        lxm.IDLOGISTICORDER = l.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS CARDRECEIVED,
                    COUNT(DISTINCT CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.CHECK} THEN m.id ELSE NULL END) AS CHEQUENFSARECEBER,
                    SUM(
                        CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.CHECK} THEN
                            (
                                COALESCE(lim.EXPECTEDAMT,0) 
                                - COALESCE(lim.NOTMOVIMENTEDAMT,0)
                            ) * COALESCE(ima.UNITVALUE,0)
                        ELSE 0 END
                    ) AS CHEQUEARECEBER,
                    (SELECT
                        COUNT(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.CHECK} then lxm.IDMOV else null end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                        join LogisticOrdersXMovs lxm on lxm.id = lxmr.IDLOGISTICORDERXMOV
                    WHERE
                        lxm.IDLOGISTICORDER = l.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS QTMOVCHECKRECEIVED,
                    (SELECT
                        sum(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.CHECK} then coalesce(lxmr.RECEIVEDVALUE,0) else 0 end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                        join LogisticOrdersXMovs lxm on lxm.id = lxmr.IDLOGISTICORDERXMOV
                    WHERE
                        lxm.IDLOGISTICORDER = l.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS CHECKRECEIVED,
                    COUNT(DISTINCT CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.PIX} THEN m.id ELSE NULL END) AS PIXNFSARECEBER,
                    SUM(
                        CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.PIX} THEN
                            (
                                COALESCE(lim.EXPECTEDAMT,0) 
                                - COALESCE(lim.NOTMOVIMENTEDAMT,0)
                            ) * COALESCE(ima.UNITVALUE,0)
                        ELSE 0 END
                    ) AS PIXARECEBER,
                    (SELECT
                        COUNT(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.PIX} then lxm.IDMOV else null end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                        join LogisticOrdersXMovs lxm on lxm.id = lxmr.IDLOGISTICORDERXMOV
                    WHERE
                        lxm.IDLOGISTICORDER = l.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS QTMOVPIXRECEIVED,
                    (SELECT
                        sum(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.PIX} then coalesce(lxmr.RECEIVEDVALUE,0) else 0 end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                        join LogisticOrdersXMovs lxm on lxm.id = lxmr.IDLOGISTICORDERXMOV
                    WHERE
                        lxm.IDLOGISTICORDER = l.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS PIXRECEIVED
                from
                    LogisticOrders l
                    LEFT OUTER JOIN logisticstatus lsl on lsl.id = l.IDLOGISTICSTATUS
                    LEFT OUTER JOIN logisticordersxmovs lm on lm.IDLOGISTICORDER = l.id
                    LEFT OUTER JOIN logisticstatus ls on ls.id = lm.IDLOGISTICSTATUS
                    LEFT OUTER JOIN Movements m on m.id = lm.IDMOV
                    LEFT OUTER JOIN logisticordersxitemsmovamt lim on lim.IDLOGISTICORDERXMOV = lm.id
                    LEFT OUTER JOIN itemsmovsamounts ima on ima.id = lim.IDITEMMOVAMT                            
                ${where || ''}
                group by
                    ${Object.keys(LogisticOrders.fields).map(el=>`l.${el}`).join(',')},
                    lsl.name
            `;

            result = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
            result = result[0] || [];
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-07-16
     * @version 1.0.0
     */
    static async getItemsInvoiceWithIntegrationsDatas(req,res,next) {
        try {
            let query = null;
            let idsItemsOnOriginData = req.body.IDITEMONORIGINDATA || [];
            if (idsItemsOnOriginData && Utils.typeOf(idsItemsOnOriginData) != 'array') {
                idsItemsOnOriginData = idsItemsOnOriginData.toString().split(",");
                idsItemsOnOriginData = idsItemsOnOriginData.map(el=>Utils.hasValue(el)?el:'null');
            }
            if (req.body.data_origin_id == OriginsDatas.WINTHOR) {
                query = `
                    select                                        
                        m.CODPROD,
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
                            listagg('{"IDLOTEORIGEM":"'||l.numlote||'","DTVALIDADE":"'||l.dtvalidade||'","QT":'||replace(to_char(coalesce(m2.qt,m2.qtcont,0)),',','.')||'}',',') within group (order by m.numtransvenda,m.codprod)
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
                        s.NUMTRANSVENDA = ${req.body.NUMTRANSVENDA}
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
            } else if (req.body.data_origin_id == OriginsDatas.AURORA) {
                query = `
                    select                                        
                        m.CODPROD,
                        coalesce(ep.descricao,p.descricao,'') as DESCRICAO,
                        p.CODAUXILIARTRIB AS GTINUNTRIB,
                        p.CODAUXILIAR AS GTINUNVENDA,
                        p.CODAUXILIAR2 AS GTINUNMASTER,
                        coalesce(u.sigla,p.unidade,'UN') as UNIDADE,
                        coalesce(p.UNIDADEMASTER,'CX') as EMBALAGEM,
                        coalesce(p.qtunitcx,1) as QTUNITEMBALAGEM,
                        coalesce(m.pesoliqun,p.pesoliq,1) as PESOLIQUN,
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
                        AND s.COD = ${req.body.NUMTRANSVENDA}
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
                throw new Error(`origin data not expected: ${req.body.data_origin_id}`);
            }
            res.data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
            res.data = res.data[0] || [];

            query = `
                select
                    i.id,
                    i.data_origin_id,
                    i.id_at_origin,                    
                    lxim.IDLOGISTICSTATUS,
                    ls.name AS LOGISTICSTATUS,
                    lxim.IDREASONNOTMOVIMENTEDAMT,
                    lxim.OBSERVATIONSNOTMOVIMENTEDAMT,
                    lr.name as REASONNOTMOVIMENTEDAMT,
                    sum(coalesce(lxim.expectedamt,0)) as EXPECTEDAMT,
                    sum(coalesce(lxim.movimentedamt,0)) as MOVIMENTEDAMT,
                    SUM(
                        (
                            COALESCE(lxim.EXPECTEDAMT,0) 
                            - COALESCE(lxim.NOTMOVIMENTEDAMT,0)                                    
                        ) * CASE WHEN coalesce(lxim.IDMEASUREMENTUNIT,im.IDMEASUREMENTUNIT,ist.IDMEASUREMENTUNIT,2) = 2 then 1 else COALESCE(lxim.UNITWEIGHT,im.UNITWEIGHT,ist.UNITWEIGHT,1) end
                    ) AS WEIGHT,
                    SUM(
                        (
                            COALESCE(lxim.EXPECTEDAMT,0) - (
                                COALESCE(lxim.MOVIMENTEDAMT,0) 
                                + COALESCE(lxim.NOTMOVIMENTEDAMT,0)
                            )
                        ) * CASE WHEN coalesce(lxim.IDMEASUREMENTUNIT,im.IDMEASUREMENTUNIT,ist.IDMEASUREMENTUNIT,2) = 2 then 1 else COALESCE(lxim.UNITWEIGHT,im.UNITWEIGHT,ist.UNITWEIGHT,1) end
                    ) AS WEIGHTTODELIVERY,
                    SUM(
                        COALESCE(lxim.MOVIMENTEDAMT,0) 
                        * CASE WHEN coalesce(lxim.IDMEASUREMENTUNIT,im.IDMEASUREMENTUNIT,ist.IDMEASUREMENTUNIT,2) = 2 then 1 else COALESCE(lxim.UNITWEIGHT,im.UNITWEIGHT,ist.UNITWEIGHT,1) end
                    ) AS WEIGHTDELIVERED,
                    SUM(
                        COALESCE(lxim.NOTMOVIMENTEDAMT,0) 
                        * CASE WHEN coalesce(lxim.IDMEASUREMENTUNIT,im.IDMEASUREMENTUNIT,ist.IDMEASUREMENTUNIT,2) = 2 then 1 else COALESCE(lxim.UNITWEIGHT,im.UNITWEIGHT,ist.UNITWEIGHT,1) end
                    ) AS WEIGHTRETURNED,
                    SUM(
                        (
                            COALESCE(lxim.EXPECTEDAMT,0) 
                            - COALESCE(lxim.NOTMOVIMENTEDAMT,0)                                    
                        ) * coalesce(im.UNITVALUE,0)
                    ) AS VALUE,
                    SUM(
                        (
                            COALESCE(lxim.EXPECTEDAMT,0) - (
                                COALESCE(lxim.MOVIMENTEDAMT,0) 
                                + COALESCE(lxim.NOTMOVIMENTEDAMT,0)
                            )
                        ) * coalesce(im.UNITVALUE,0)
                    ) AS VALUETODELIVERY,
                    SUM(
                        COALESCE(lxim.MOVIMENTEDAMT,0) 
                        * coalesce(im.UNITVALUE,0)
                    ) AS VALUEDELIVERED,
                    SUM(
                        COALESCE(lxim.NOTMOVIMENTEDAMT,0) 
                        * coalesce(im.UNITVALUE,0)
                    ) AS VALUERETURNED
                from
                    movements m
                    join logisticordersxmovs lxm on lxm.idmov = m.id
                    join movsxitemsstocks mxis on mxis.idmov = m.id
                    join itemsstocks ist on ist.id = mxis.iditemstock
                    join ItemsXLotsXConteiners ix on ix.id = ist.iditemxlotxconteiner
                    join items i on i.id = ix.iditem
                    join itemsmovsamounts im on im.idmovxitemstock = mxis.id
                    join logisticordersxitemsmovamt lxim on lxim.idlogisticorderxmov = lxm.id and lxim.iditemmovamt = im.id                        
                    left outer join logisticstatus ls on ls.id = lxim.IDLOGISTICSTATUS
                    left outer join logisticreasons lr on lr.id = lxim.IDREASONNOTMOVIMENTEDAMT
                where
                    m.data_origin_id = ${req.body.data_origin_id}
                    and m.id_at_origin = ${req.body.NUMTRANSVENDA}
                    ${Utils.hasValue(idsItemsOnOriginData) ? ` and i.id_at_origin in (${idsItemsOnOriginData.join(',')}) ` : ''}     
                group by                        
                    i.id,
                    lxim.IDLOGISTICSTATUS,
                    ls.name,
                    lxim.IDREASONNOTMOVIMENTEDAMT,
                    lxim.OBSERVATIONSNOTMOVIMENTEDAMT,
                    lr.name
                order by    
                    i.id                                
            `;

            let delivereds = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:Sequelize.QueryTypes.SELECT});
            delivereds = delivereds[0] || [];

            if (delivereds && delivereds.length) {
                for(let kd in delivereds) {
                    for(let k in res.data) {
                        if (res.data[k].CODPROD == delivereds[kd].id_at_origin) {                                    
                            res.data[k].IDLOGISTICSTATUS = delivereds[kd].IDLOGISTICSTATUS;
                            res.data[k].LOGISTICSTATUS = delivereds[kd].LOGISTICSTATUS;                                    
                            res.data[k].QT = res.data[k].QT || delivereds[kd].EXPECTEDAMT;
                            res.data[k].QTENTREGUE = delivereds[kd].MOVIMENTEDAMT;
                            res.data[k].IDREASONNOTMOVIMENTEDAMT = delivereds[kd].IDREASONNOTMOVIMENTEDAMT;
                            res.data[k].REASONNOTMOVIMENTEDAMT = delivereds[kd].REASONNOTMOVIMENTEDAMT;
                            res.data[k].OBSERVATIONSNOTMOVIMENTEDAMT = delivereds[kd].OBSERVATIONSNOTMOVIMENTEDAMT;                                    
                            res.data[k].WEIGHT = delivereds[kd].WEIGHT;
                            res.data[k].WEIGHTTODELIVERY = delivereds[kd].WEIGHTTODELIVERY;
                            res.data[k].WEIGHTDELIVERED = delivereds[kd].WEIGHTDELIVERED;
                            res.data[k].WEIGHTRETURNED = delivereds[kd].WEIGHTRETURNED;
                            res.data[k].VALUE = delivereds[kd].VALUE;
                            res.data[k].VALUETODELIVERY = delivereds[kd].VALUETODELIVERY;
                            res.data[k].VALUEDELIVERED = delivereds[kd].VALUEDELIVERED;
                            res.data[k].VALUERETURNED = delivereds[kd].VALUERETURNED;
                            break;
                        }
                    }     
                }
            }

            res.sendResponse(200,true);
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} route 
     * @param {*} arrRoute 
     * @param {*} level 
     * @deprecated 2024-07-16
     */
    static processPostInvoiceItemsAsRoute(req,res,next,route,arrRoute,level) {
        try {            
            level++;
            switch(arrRoute[level].trim().toLowerCase()) {                
                case 'getwithintegrationsdatas':
                    this.getItemsInvoiceWithIntegrationsDatas(req,res,next);
                    break;
                default:
                    throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    break;
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(404,false,e.message || e,null,e);
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-07-16
     * @version 1.0.0
     */
    static async getInvoiceWithIntegrationsDatas(req,res,next) {
        try {
            let queryParams = req.body.queryParams || {};
            let where = null;
            if (Utils.hasValue(queryParams.where)) {
                queryParams.raw = true;
                queryParams.attributes = ['id'];
                let idsMovs = await Movements.getData(queryParams);
                if (idsMovs && idsMovs.length) {
                    idsMovs = idsMovs.map(el=>el.id);
                } else {
                    idsMovs = [-1]
                }
                where = ` where lxm.idmov in (${idsMovs.join(',')}) `
            }
            let query = `
                select
                    lxm.*,
                    ls.name AS LOGISTICSTATUS,
                    o.name as ORIGINDATA,
                    m.id_at_origin AS id_at_originMOV,
                    m.IDENTIFIER,
                    m.IDCLIENT,
                    p.name AS CLIENTNAME,
                    m.IDFINANCIALVALUEFORM,
                    rt.name AS FINANCIALVALUEFORM,
                    m.IDSELLER,
                    ps.name AS SELLERNAME,
                    CASE WHEN max(coalesce(lxim.IDREASONNOTMOVIMENTEDAMT,-1)) > -1 then max(coalesce(lxim.IDREASONNOTMOVIMENTEDAMT,-1)) else null end as IDREASONNOTMOVIMENTEDAMTITEMS,
                    CASE WHEN max(coalesce(lxim.IDREASONNOTMOVIMENTEDAMT,-1)) > -1 then (SELECT lt.name from LogisticReasons lt where lt.id = max(coalesce(lxim.IDREASONNOTMOVIMENTEDAMT,-1))) else null end as REASONNOTMOVIMENTEDAMTITEMS,
                    COUNT(ix.IDITEM) AS QTITEMS,
                    COUNT(DISTINCT CASE WHEN lsxi.ISTODELIVERY = 1 THEN ix.IDITEM ELSE NULL END) AS QTITEMSTODELIVERY,
                    COUNT(DISTINCT CASE WHEN lsxi.ISDELIVERING = 1 THEN ix.IDITEM ELSE NULL END) AS QTITEMSDELIVERING,
                    COUNT(DISTINCT CASE WHEN lsxi.ISDELIVERED = 1 THEN ix.IDITEM ELSE NULL END) AS QTITEMSDELIVEREDS,
                    COUNT(DISTINCT CASE WHEN lsxi.ISPARTIALRETURNED = 1 THEN ix.IDITEM ELSE NULL END) AS QTITEMSPARTIALRETURNED,
                    COUNT(DISTINCT CASE WHEN lsxi.ISTOTALRETURNED = 1 THEN ix.IDITEM ELSE NULL END) AS QTITEMSTOTLARETURNED,
                    SUM(
                        (
                            COALESCE(lxim.EXPECTEDAMT,0) 
                            - COALESCE(lxim.NOTMOVIMENTEDAMT,0)                                    
                        ) * CASE WHEN coalesce(lxim.IDMEASUREMENTUNIT,im.IDMEASUREMENTUNIT,ist.IDMEASUREMENTUNIT,2) = 2 then 1 else COALESCE(lxim.UNITWEIGHT,im.UNITWEIGHT,ist.UNITWEIGHT,1) end
                    ) AS WEIGHT,
                    SUM(
                        (
                            COALESCE(lxim.EXPECTEDAMT,0) - (
                                COALESCE(lxim.MOVIMENTEDAMT,0) 
                                + COALESCE(lxim.NOTMOVIMENTEDAMT,0)
                            )
                        ) * CASE WHEN coalesce(lxim.IDMEASUREMENTUNIT,im.IDMEASUREMENTUNIT,ist.IDMEASUREMENTUNIT,2) = 2 then 1 else COALESCE(lxim.UNITWEIGHT,im.UNITWEIGHT,ist.UNITWEIGHT,1) end
                    ) AS WEIGHTTODELIVERY,
                    SUM(
                        COALESCE(lxim.MOVIMENTEDAMT,0) 
                        * CASE WHEN coalesce(lxim.IDMEASUREMENTUNIT,im.IDMEASUREMENTUNIT,ist.IDMEASUREMENTUNIT,2) = 2 then 1 else COALESCE(lxim.UNITWEIGHT,im.UNITWEIGHT,ist.UNITWEIGHT,1) end
                    ) AS WEIGHTDELIVERED,
                    SUM(
                        COALESCE(lxim.NOTMOVIMENTEDAMT,0) 
                        * CASE WHEN coalesce(lxim.IDMEASUREMENTUNIT,im.IDMEASUREMENTUNIT,ist.IDMEASUREMENTUNIT,2) = 2 then 1 else COALESCE(lxim.UNITWEIGHT,im.UNITWEIGHT,ist.UNITWEIGHT,1) end
                    ) AS WEIGHTRETURNED,
                    SUM(
                        (
                            COALESCE(lxim.EXPECTEDAMT,0) 
                            - COALESCE(lxim.NOTMOVIMENTEDAMT,0)                                    
                        ) * coalesce(im.UNITVALUE,0)
                    ) AS VALUE,
                    SUM(
                        (
                            COALESCE(lxim.EXPECTEDAMT,0) - (
                                COALESCE(lxim.MOVIMENTEDAMT,0) 
                                + COALESCE(lxim.NOTMOVIMENTEDAMT,0)
                            )
                        ) * coalesce(im.UNITVALUE,0)
                    ) AS VALUETODELIVERY,
                    SUM(
                        COALESCE(lxim.MOVIMENTEDAMT,0) 
                        * coalesce(im.UNITVALUE,0)
                    ) AS VALUEDELIVERED,
                    SUM(
                        COALESCE(lxim.NOTMOVIMENTEDAMT,0) 
                        * coalesce(im.UNITVALUE,0)
                    ) AS VALUERETURNED,
                    SUM(
                        CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.MONEY} THEN
                            (
                                COALESCE(lxim.EXPECTEDAMT,0) 
                                - COALESCE(lxim.NOTMOVIMENTEDAMT,0)
                            ) * COALESCE(im.UNITVALUE,0)
                        ELSE 0 END
                    ) AS MONEY,
                    (SELECT
                        sum(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.MONEY} then coalesce(lxmr.RECEIVEDVALUE,0) else 0 end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                    WHERE
                        lxmr.IDLOGISTICORDERXMOV = lxm.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS MONEYRECEIVED,
                    SUM(
                        CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.CARD} THEN
                            (
                                COALESCE(lxim.EXPECTEDAMT,0) 
                                - COALESCE(lxim.NOTMOVIMENTEDAMT,0)
                            ) * COALESCE(im.UNITVALUE,0)
                        ELSE 0 END
                    ) AS CARD,
                    (SELECT
                        sum(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.CARD} then coalesce(lxmr.RECEIVEDVALUE,0) else 0 end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                    WHERE
                        lxmr.IDLOGISTICORDERXMOV = lxm.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS CARDRECEIVED,
                    SUM(
                        CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.CHECK} THEN
                            (
                                COALESCE(lxim.EXPECTEDAMT,0) 
                                - COALESCE(lxim.NOTMOVIMENTEDAMT,0)
                            ) * COALESCE(im.UNITVALUE,0)
                        ELSE 0 END
                    ) AS "CHECK",
                    (SELECT
                        sum(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.CHECK} then coalesce(lxmr.RECEIVEDVALUE,0) else 0 end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                    WHERE
                        lxmr.IDLOGISTICORDERXMOV = lxm.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS CHECKRECEIVED,
                    SUM(
                        CASE WHEN m.IDFINANCIALVALUEFORM = ${FinancialValueForms.PIX} THEN
                            (
                                COALESCE(lxim.EXPECTEDAMT,0) 
                                - COALESCE(lxim.NOTMOVIMENTEDAMT,0)
                            ) * COALESCE(im.UNITVALUE,0)
                        ELSE 0 END
                    ) AS PIX,
                    (SELECT
                        sum(CASE WHEN lxmr.IDFINANCIALVALUEFORM = ${FinancialValueForms.PIX} then coalesce(lxmr.RECEIVEDVALUE,0) else 0 end)
                    FROM
                        LogisticOrdersXMovsXReceiptValues lxmr
                    WHERE
                        lxmr.IDLOGISTICORDERXMOV = lxm.id
                        and coalesce(lxmr.RECEIVEDVALUE,0) > 0
                    ) AS PIXRECEIVED
                from
                    LogisticOrdersXMovs lxm 
                    left outer join LogisticStatus ls on ls.id = lxm.idlogisticstatus
                    left outer join Movements m on m.id = lxm.idmov                            
                    left outer join OriginsDatas o on o.id = m.data_origin_id
                    left outer join Clients c on c.id = m.idclient
                    left outer join People p on p.id = c.idpeople
                    left outer join FinancialValueForms rt on rt.id = m.IDFINANCIALVALUEFORM
                    left outer join Collaborators cl on cl.id = m.idseller
                    left outer join People ps on ps.id = cl.idpeople
                    left outer join movsxitemsstocks mxis on mxis.IDMOV = m.id
                    left outer join itemsmovsamounts im on im.IDMOVXITEMSTOCK = mxis.id
                    left outer join itemsstocks ist on ist.id = mxis.IDITEMSTOCK
                    left outer join ItemsXLotsXConteiners ix on ix.id = ist.IDITEMXLOTXCONTEINER
                    left outer join items i on i.id = iX.IDITEM
                    left outer join logisticordersxitemsmovamt lxim on (
                        lxim.IDLOGISTICORDERXMOV = lxm.id
                        AND lxim.IDITEMMOVAMT = im.id
                    )
                    left outer join LogisticStatus lsxi on lsxi.id = lxim.IDLOGISTICSTATUS
                ${where||''}
                GROUP BY
                    ${Object.keys(LogisticOrdersXMovs.fields).map(el=>`lxm.${el}`).join(',')},
                    ls.name,
                    o.name,
                    m.id_at_origin,
                    m.IDENTIFIER,
                    m.IDCLIENT,
                    p.name,
                    m.IDFINANCIALVALUEFORM,
                    rt.name,
                    m.IDSELLER,
                    ps.name
            `;
            res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
            res.data = res.data[0] || [];
            res.sendResponse(200,true);
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} route 
     * @param {*} arrRoute 
     * @param {*} level 
     * @deprecated 2024-07-16
     */
    static processPostInvoiceAsRoute = async(req,res,next,route,arrRoute,level) => {
        try {            
            level++;
            switch(arrRoute[level].trim().toLowerCase()) {  
                case 'getwithintegrationsdatas': 
                    this.getInvoiceWithIntegrationsDatas(req,res,next);
                    break;
                case 'items':
                    await DeliveryController.processPostInvoiceItemsAsRoute(req,res,next,route,arrRoute,level);
                    break;
                default:
                    throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    break;
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(404,false,e.message || e,null,e);
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @created 2024-07-16
     * @version 1.0.0
     */
    static async getInvoicesWithIntegrationsDatas(req,res,next) {
        try {
            if (req.body.id_at_origin) {
                let query = `
                    select
                        ${OriginsDatas.WINTHOR} as data_origin_id,
                        'WINTHOR' AS ORIGINDATA,
                        s.numtransvenda as id_at_origin,
                        s.NUMTRANSVENDA,
                        s.CODCLI as IDCLIENTORIGIN,
                        s.CODCLI,
                        s.NUMNOTA AS IDENTIFIER,
                        s.NUMNOTA,
                        s.DTSAIDA AS DTEMISSAO,
                        s.CODCOB AS IDFINANCIALCOLLECTIONORIGIN,
                        s.CODPLPAG AS IDPRAZOPAGAMENTOORIGEM,
                        s.TOTPESO as PESOTOTAL,
                        s.VLTOTAL,
                        s.CHAVENFE
                    from
                        JUMBO.PCNFSAID s 
                    where
                        s.NUMCAR = ${req.body.id_at_origin}
                        and s.dtcancel is null                        
                    union all
                    select
                        ${OriginsDatas.AURORA} as data_origin_id,
                        'AURORA' AS ORIGINDATA,
                        s.COD as id_at_origin,
                        s.COD AS NUMTRANSVENDA,
                        s.CODCLIENTE as IDCLIENTORIGIN,
                        s.CODCLIENTE AS CODCLI,
                        s.NUMNOTAORIGEM AS IDENTIFIER,
                        s.NUMNOTAORIGEM AS NUMNOTA,
                        s.DTEMISSAO AS DTEMISSAO,
                        null AS IDFINANCIALCOLLECTIONORIGIN,
                        null AS IDPRAZOPAGAMENTOORIGEM,
                        (select sum(coalesce(ms.qtsaida,0) * coalesce(ms.pesoliqun,1)) from EP.EPMOVIMENTACOESSAIDA ms where ms.CODNFSAIDA = s.COD) as PESOTOTAL,
                        (select sum(coalesce(ms.qtsaida,0) * coalesce(ms.vlun,0)) from EP.EPMOVIMENTACOESSAIDA ms where ms.CODNFSAIDA = s.COD) as VLTOTAL,
                        s.CHAVENFE
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
                                        u.NRCARGA = ${req.body.id_at_origin}
                                        and u.IDORIGEMINFO = 0 
                                )
                                and u2.IDORIGEMINFO = 1
                        )
                        and s.CODORIGEMINFO = 1
                    order by
                        1,4
                `;
                res.data = await DBConnectionManager.getConsultDBConnection().query(query,{
                    raw:true,
                    queryType: QueryTypes.SELECT
                }); 
                res.data = res.data[0] || [];

                if (res.data.length) {
                    query = `
                        select
                            m.data_origin_id,
                            m.id_at_origin,
                            lxm.IDLOGISTICSTATUS,
                            ls.name AS LOGISTICSTATUS
                        from
                            LogisticOrders l
                            join LogisticOrdersXMovs lxm on lxm.IDLOGISTICORDER = l.id
                            left outer join Movements m on m.id = lxm.IDMOV
                            left outer join LogisticStatus ls on ls.id = lxm.IDLOGISTICSTATUS
                        where
                            l.id_at_origin = ${req.body.id_at_origin}
                    `;
                    let dataTemp = await DBConnectionManager.getDefaultDBConnection().query(query,{
                        raw:true,
                        queryType: QueryTypes.SELECT
                    });
                    dataTemp = Utils.arrayToObject(dataTemp[0] || [],['data_origin_id','id_at_origin']);
                    Utils.log(dataTemp);
                    for(let key in res.data) {
                        res.data[key].IDLOGISTICSTATUS = ((dataTemp[res.data[key].data_origin_id.toString()]||{})[res.data[key].id_at_origin.toString()]||{})[0]?.IDLOGISTICSTATUS;
                        res.data[key].LOGISTICSTATUS = ((dataTemp[res.data[key].data_origin_id.toString()]||{})[res.data[key].id_at_origin.toString()]||{})[0]?.LOGISTICSTATUS;
                    }
                }
                
                res.sendResponse(200,true);
            } else {
                throw new Error("missing data");
            }
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} route 
     * @param {*} arrRoute 
     * @param {*} level 
     * @deprecated 2024-07-16
     */
    static processPostInvoicesAsRoute = async(req,res,next,route,arrRoute,level) => {
        try {            
            level++;            
            switch(arrRoute[level].trim().toLowerCase()) {
                case 'getwithintegrationsdatas':                                        
                    this.getInvoicesWithIntegrationsDatas(req,res,next);
                    break;
                case 'invoice':
                    await DeliveryController.processPostInvoiceAsRoute(req,res,next,route,arrRoute,level);
                    break;
                default:
                    throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    break;
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(517,false,e.message || e,null,e);
        }
    }

    static async getRoute(req,res,next){
        try {
            if (req.body.id_at_origin) {
                let query = `
                    select
                        date_format(lg.created_at,'%Y-%m-%d %H:%i') as created_at,
                        MAX(lg.LATITUDE) as LATITUDE,
                        MAX(lg.LONGITUDE) AS LONGITUDE,
                        cast(regexp_replace(p.IDENTIFIERDOC,'[^0-9]','') as decimal(32)) as "IDENTIFIERDOC",
                        p.name,
                        p.FANTASY,
                        ctr.name as COUNTRY,
                        stt.name as STATE,
                        ct.name as CITY,
                        nb.name as NEIGHBOORHOOD,
                        st.name as STREET,
                        a.NUMBER,
                        a.LATITUDE as CLIENT_LATITUDE,
                        a.LONGITUDE AS CLIENT_LONGITUDE,
                        pc.POSTALCODE,
                        concat(st.name,',',a.number,',',ct.name,' - ',stt.SIGLA,',',ctr.name) as GOOGLEADDRESS
                    from
                        logisticlogs lg 
                        join datatables t on LOWER(t.name) = LOWER('LOGISTICORDERSXITEMSMOVAMT') and lg.IDTABLEREF = t.id
                        join LOGISTICORDERSXITEMSMOVAMT lxim on lxim.id = lg.idregisterref
                        join logisticordersxmovs lxm on lxm.id = lxim.IDLOGISTICORDERXMOV
                        join logisticorders l on l.id = lxm.idlogisticorder
                        join movements m on m.id = lxm.idmov
                        join clients c on c.id = m.idclient
                        join people p on p.id = c.idpeople
                        left outer join peoplexaddresses x on x.IDPEOPLE = p.id
                        left outer join addresses a on a.id = x.idaddress
                        left outer join postalcodes pc on pc.id = a.idpostalcode
                        left outer join neighborhoods nb on nb.id = a.IDNEIGHBORHOOD
                        left outer join streets st on st.id = a.idstreet    
                        left outer join cities ct on ct.id = coalesce(st.IDCITY,nb.idcity,pc.idcity)
                        left outer join states stt on stt.id = ct.idstate
                        left outer join countries ctr on ctr.id = stt.idcountry
                    where
                        l.id_at_origin = ${req.body.id_at_origin}
                        AND lg.COLUMNNAME = 'IDSTATUSENTREGA'
                        and lg.OPERATION in ('UPDATE','INSERT')
                        and lg.NEWVALUE IN (3,4,5)
                    group by
                        date_format(lg.created_at,'%Y-%m-%d %H:%i'),
                        cast(regexp_replace(p.IDENTIFIERDOC,'[^0-9]','') as decimal(32)),
                        p.name,
                        p.FANTASY,
                        ctr.name,
                        stt.name,
                        ct.name,
                        nb.name,
                        st.name,
                        a.number,
                        a.latitude,
                        a.longitude,
                        pc.postalcode,
                        concat(st.name,',',a.number,',',ct.name,' - ',stt.SIGLA,',',ctr.name)
                    order by
                        date_format(lg.created_at,'%Y-%m-%d %H:%i'),
                        "IDENTIFIERDOC"
                `;
                res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{
                    raw:true,
                    queryType: QueryTypes.SELECT
                }); 
                res.data = res.data[0] || [];
                res.success = true;
            } else {
                throw new Error("missing data");
            }
        } catch (e) {
            res.setException(e);
        }
        res.sendResponse();
    }


    /**
     * 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     * @param {*} route 
     * @param {*} arrRoute 
     * @param {*} level 
     * @deprecated 2024-08-18
     */
    static processPostRouteAsRoute = async(req,res,next,route,arrRoute,level) => {
        try {            
            level++;            
            switch(arrRoute[level].trim().toLowerCase()) {
                case 'get':                                        
                    this.getRoute(req,res,next);
                    break;
                case 'invoice':
                    await DeliveryController.processPostInvoiceAsRoute(req,res,next,route,arrRoute,level);
                    break;
                default:
                    throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    break;
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(517,false,e.message || e,null,e);
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
                case 'getsummarydetails':
                    res.data = await DeliveryController.getSummaryDetails(req.body.id);
                    res.sendResponse(200,true);
                    break;
                case 'invoices':                    
                    await DeliveryController.processPostInvoicesAsRoute(req,res,next,route,arrRoute,level);
                    break;
                case 'route':                    
                    await DeliveryController.processPostRouteAsRoute(req,res,next,route,arrRoute,level);
                    break;
                default:
                    throw new Error(`resource level not expected: ${arrRoute[level]} of ${route}`);
                    break;
            }
        } catch (e) {
            Utils.log(e);
            res.sendResponse(517,false,e.message || e,null,e);
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
                case 'getsummarydetails':
                    res.data = await DeliveryController.getSummaryDetails(req.body.id);
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

module.exports = {DeliveryController}