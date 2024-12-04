
const _ = require('lodash');
const { Logistic_Orders } = require('../../../../../database/models/Logistic_Orders');
const { Sequelize, QueryTypes } = require('sequelize');
const { Data_Origins } = require('../../../../../database/models/Data_Origins');
const DBConnectionManager = require('../../../../../database/DBConnectionManager');
const { Logistic_Orders_Movs } = require('../../../../../database/models/Logistic_Orders_Movs');
const { Utils } = require('../../../../utils/Utils');
const { Movements } = require('../../../../../database/models/Movements');
const { Financial_Value_Forms } = require('../../../../../database/models/Financial_Value_Forms');
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
    static async getSummaryDetails(req,res) {
        let result = null;
        try {
            let where = [];
            if (req.body.id) {
                let identifier = Utils.typeOf(req.body.id) == 'array' ? req.body.id : req.body.id.toString().split(',');
                identifier = identifier.map(el=>Utils.hasValue(el)?el:'null');
                where.push(`l.id in (${identifier.join(',')})`);
            }
            if (where.length) where = ` where ${where.join(' and ')} `            
            else where = ' where 1=2 ';//prevent massive database get
            let query = `
                select
                    l.*,
                    lsl.name AS LOGISTICSTATUS,
                    COUNT(DISTINCT CASE WHEN ls.is_to_delivery = 1 THEN m.client_id ELSE NULL END) AS QTENTREGASAENTREGAR,
                    COUNT(DISTINCT CASE WHEN ls.is_delivering = 1 THEN m.client_id ELSE NULL END) AS QTENTREGASENTREGANDO,
                    COUNT(DISTINCT CASE WHEN ls.id_delivered = 1 THEN m.client_id ELSE NULL END) AS QTENTREGASENTREGUES,
                    COUNT(DISTINCT CASE WHEN ls.is_partial_returned = 1 OR ls.is_total_returned = 1 THEN m.client_id ELSE NULL END) AS QTENTREGASDEVOLVIDAS,
                    COUNT(DISTINCT CASE WHEN ls.is_to_delivery = 1 THEN m.id ELSE NULL END) AS QTNOTASFISCAISAENTREGAR,
                    COUNT(DISTINCT CASE WHEN ls.is_delivering = 1 THEN m.id ELSE NULL END) AS QTNOTASFISCAISENTREGANDO,
                    COUNT(DISTINCT CASE WHEN ls.id_delivered = 1 THEN m.id ELSE NULL END) AS QTNOTASFISCAISENTREGUES,
                    COUNT(DISTINCT CASE WHEN ls.is_partial_returned = 1 OR ls.is_total_returned = 1 THEN m.id ELSE NULL END) AS QTNOTASFISCAISDEVOLVIDAS,
                    SUM((
                            COALESCE(lim.expected_amt,0)   
                            - COALESCE(lim.unmoved_qty,0)                                   
                        ) * CASE WHEN lim.measurement_unit_id = 2 then 1 else COALESCE(lim.unit_weight,1) end
                    ) AS WEIGHT,
                    SUM(
                        (
                            COALESCE(lim.expected_amt,0) - (
                                COALESCE(lim.moved_amt,0) 
                                + COALESCE(lim.unmoved_qty,0)
                            )
                        ) * CASE WHEN lim.measurement_unit_id = 2 then 1 else COALESCE(lim.unit_weight,1) end
                    ) AS WEIGHTTODELIVERY,
                    SUM(
                        COALESCE(lim.moved_amt,0)                                      
                        * CASE WHEN lim.measurement_unit_id = 2 then 1 else COALESCE(lim.unit_weight,1) end
                    ) AS WEIGHTDELIVERED,
                    SUM(
                        COALESCE(lim.unmoved_qty,0)                                      
                        * CASE WHEN lim.measurement_unit_id = 2 then 1 else COALESCE(lim.unit_weight,1) end
                    ) AS WEIGHTRETURNED,  
                    SUM((
                            COALESCE(lim.expected_amt,0)
                            - COALESCE(lim.unmoved_qty,0)
                        ) * COALESCE(ima.unit_value,0)
                    ) AS value,                          
                    SUM(
                        (
                            COALESCE(lim.expected_amt,0) - (
                                COALESCE(lim.moved_amt,0) 
                                + COALESCE(lim.unmoved_qty,0)
                            )
                        ) * COALESCE(ima.unit_value,0)
                    ) AS VALUETODELIVERY,
                    SUM(
                        COALESCE(lim.moved_amt,0)                                      
                        * COALESCE(ima.unit_value,0)
                    ) AS VALUEDELIVERED,
                    SUM(
                        COALESCE(lim.unmoved_qty,0)                                      
                        * COALESCE(ima.unit_value,0)
                    ) AS VALUERETURNED,                            
                    COUNT(DISTINCT CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.MONEY} THEN m.id ELSE NULL END) AS DNFSARECEBER,
                    SUM(
                        CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.MONEY} THEN
                            (
                                COALESCE(lim.expected_amt,0) 
                                - COALESCE(lim.unmoved_qty,0)
                            ) * COALESCE(ima.unit_value,0)
                        ELSE 0 END
                    ) AS DARECEBER,
                    (SELECT
                        COUNT(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.MONEY} then lxm.mov_id else null end)
                    FROM
                        Logistic_Orders_Movs_Received_Values lxmr
                        join Logistic_Orders_Movs lxm on lxm.id = lxmr.mov_logistic_order_id
                    WHERE
                        lxm.logistic_order_id = l.id
                        and coalesce(lxmr.received_value,0) > 0
                    ) AS QTMOVMONEYRECEIVED,
                    (SELECT
                        sum(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.MONEY} then coalesce(lxmr.received_value,0) else 0 end)
                    FROM
                        Logistic_Orders_Movs_Received_Values lxmr
                        join Logistic_Orders_Movs lxm on lxm.id = lxmr.mov_logistic_order_id
                    WHERE
                        lxm.logistic_order_id = l.id
                        and coalesce(lxmr.received_value,0) > 0
                    ) AS MONEYRECEIVED,
                    COUNT(DISTINCT CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.CARD} THEN m.id ELSE NULL END) AS CARTAONFSARECEBER,
                    SUM(
                        CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.CARD} THEN
                            (
                                COALESCE(lim.expected_amt,0) 
                                - COALESCE(lim.unmoved_qty,0)
                            ) * COALESCE(ima.unit_value,0)
                        ELSE 0 END
                    ) AS CARTAOARECEBER,
                    (SELECT
                        COUNT(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.CARD} then lxm.mov_id else null end)
                    FROM
                        Logistic_Orders_Movs_Received_Values lxmr
                        join Logistic_Orders_Movs lxm on lxm.id = lxmr.mov_logistic_order_id
                    WHERE
                        lxm.logistic_order_id = l.id
                        and coalesce(lxmr.received_value,0) > 0
                    ) AS QTMOVCARDRECEIVED,
                    (SELECT
                        sum(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.CARD} then coalesce(lxmr.received_value,0) else 0 end)
                    FROM
                        Logistic_Orders_Movs_Received_Values lxmr
                        join Logistic_Orders_Movs lxm on lxm.id = lxmr.mov_logistic_order_id
                    WHERE
                        lxm.logistic_order_id = l.id
                        and coalesce(lxmr.received_value,0) > 0
                    ) AS CARDRECEIVED,
                    COUNT(DISTINCT CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.CHECK} THEN m.id ELSE NULL END) AS CHEQUENFSARECEBER,
                    SUM(
                        CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.CHECK} THEN
                            (
                                COALESCE(lim.expected_amt,0) 
                                - COALESCE(lim.unmoved_qty,0)
                            ) * COALESCE(ima.unit_value,0)
                        ELSE 0 END
                    ) AS CHEQUEARECEBER,
                    (SELECT
                        COUNT(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.CHECK} then lxm.mov_id else null end)
                    FROM
                        Logistic_Orders_Movs_Received_Values lxmr
                        join Logistic_Orders_Movs lxm on lxm.id = lxmr.mov_logistic_order_id
                    WHERE
                        lxm.logistic_order_id = l.id
                        and coalesce(lxmr.received_value,0) > 0
                    ) AS QTMOVCHECKRECEIVED,
                    (SELECT
                        sum(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.CHECK} then coalesce(lxmr.received_value,0) else 0 end)
                    FROM
                        Logistic_Orders_Movs_Received_Values lxmr
                        join Logistic_Orders_Movs lxm on lxm.id = lxmr.mov_logistic_order_id
                    WHERE
                        lxm.logistic_order_id = l.id
                        and coalesce(lxmr.received_value,0) > 0
                    ) AS CHECKRECEIVED,
                    COUNT(DISTINCT CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.PIX} THEN m.id ELSE NULL END) AS PIXNFSARECEBER,
                    SUM(
                        CASE WHEN m.financial_value_form_id = ${Financial_Value_Forms.PIX} THEN
                            (
                                COALESCE(lim.expected_amt,0) 
                                - COALESCE(lim.unmoved_qty,0)
                            ) * COALESCE(ima.unit_value,0)
                        ELSE 0 END
                    ) AS PIXARECEBER,
                    (SELECT
                        COUNT(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.PIX} then lxm.mov_id else null end)
                    FROM
                        Logistic_Orders_Movs_Received_Values lxmr
                        join Logistic_Orders_Movs lxm on lxm.id = lxmr.mov_logistic_order_id
                    WHERE
                        lxm.logistic_order_id = l.id
                        and coalesce(lxmr.received_value,0) > 0
                    ) AS QTMOVPIXRECEIVED,
                    (SELECT
                        sum(CASE WHEN lxmr.financial_value_form_id = ${Financial_Value_Forms.PIX} then coalesce(lxmr.received_value,0) else 0 end)
                    FROM
                        Logistic_Orders_Movs_Received_Values lxmr
                        join Logistic_Orders_Movs lxm on lxm.id = lxmr.mov_logistic_order_id
                    WHERE
                        lxm.logistic_order_id = l.id
                        and coalesce(lxmr.received_value,0) > 0
                    ) AS PIXRECEIVED
                from
                    Logistic_Orders l
                    LEFT OUTER JOIN logistic_status lsl on lsl.id = l.logistic_status_id
                    LEFT OUTER JOIN logistic_orders_movs lm on lm.logistic_order_id = l.id
                    LEFT OUTER JOIN logistic_status ls on ls.id = lm.logistic_status_id
                    LEFT OUTER JOIN Movements m on m.id = lm.mov_id
                    LEFT OUTER JOIN logistic_orders_items_mov_amt lim on lim.mov_logistic_order_id = lm.id
                    LEFT OUTER JOIN item_mov_amounts ima on ima.id = lim.item_mov_amt_id                            
                ${where || ''}
                group by
                    ${Object.keys(Logistic_Orders.fields).map(el=>`l.${el}`).join(',')},
                    lsl.name
            `;

            res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,type:QueryTypes.SELECT});
            res.success = true;
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
            if (req.body.data_origin_id == Data_Origins.WINTHOR) {
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
            } else if (req.body.data_origin_id == Data_Origins.AURORA) {
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
            res.data = await DBConnectionManager.getConsultDBConnection().query(query,{raw:true,type:Sequelize.QueryTypes.SELECT});

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
                    m.data_origin_id = ${req.body.data_origin_id}
                    and m.id_at_origin = ${req.body.NUMTRANSVENDA}
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

            let delivereds = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,type:Sequelize.QueryTypes.SELECT});

            if (delivereds && delivereds.length) {
                for(let kd in delivereds) {
                    for(let k in res.data) {
                        if (res.data[k].CODPROD == delivereds[kd].id_at_origin) {                                    
                            res.data[k].logistic_status_id = delivereds[kd].logistic_status_id;
                            res.data[k].LOGISTICSTATUS = delivereds[kd].LOGISTICSTATUS;                                    
                            res.data[k].QT = res.data[k].QT || delivereds[kd].expected_amt;
                            res.data[k].QTENTREGUE = delivereds[kd].moved_amt;
                            res.data[k].unmoved_reason_id = delivereds[kd].unmoved_reason_id;
                            res.data[k].REASONNOTMOVIMENTEDAMT = delivereds[kd].REASONNOTMOVIMENTEDAMT;
                            res.data[k].unmoved_qty_notes = delivereds[kd].unmoved_qty_notes;                                    
                            res.data[k].WEIGHT = delivereds[kd].WEIGHT;
                            res.data[k].WEIGHTTODELIVERY = delivereds[kd].WEIGHTTODELIVERY;
                            res.data[k].WEIGHTDELIVERED = delivereds[kd].WEIGHTDELIVERED;
                            res.data[k].WEIGHTRETURNED = delivereds[kd].WEIGHTRETURNED;
                            res.data[k].value = delivereds[kd].value;
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
            Utils.logError(e);
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
                    ${Object.keys(Logistic_Orders_Movs.fields).map(el=>`lxm.${el}`).join(',')},
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
            res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,type:QueryTypes.SELECT});

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
            Utils.logError(e);
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
                        s.NUMCAR = ${req.body.id_at_origin}
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
                    type: QueryTypes.SELECT
                }); 

                if (res.data.length) {
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
                            l.id_at_origin = ${req.body.id_at_origin}
                    `;
                    let dataTemp = await DBConnectionManager.getDefaultDBConnection().query(query,{
                        raw:true,
                        type: QueryTypes.SELECT
                    });
                    dataTemp = Utils.arrayToObject(dataTemp,['data_origin_id','id_at_origin']);

                    for(let key in res.data) {
                        res.data[key].logistic_status_id = ((dataTemp[res.data[key].data_origin_id.toString()]||{})[res.data[key].id_at_origin.toString()]||{})[0]?.logistic_status_id;
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
            res.sendResponse(517,false,e.message || e,null,e);
        }
    }

    static async getRoute(req,res,next){
        try {
            if (req.body.id_at_origin) {
                let query = `
                    select
                        date_format(lg.created_at,'%Y-%m-%d %H:%i') as created_at,
                        MAX(lg.latitude) as latitude,
                        MAX(lg.longitude) AS longitude,
                        cast(regexp_replace(p.identifier_doc,'[^0-9]','') as decimal(32)) as "identifier_doc",
                        p.name,
                        p.fantasy,
                        ctr.name as COUNTRY,
                        stt.name as STATE,
                        ct.name as CITY,
                        nb.name as NEIGHBOORHOOD,
                        st.name as STREET,
                        a.number,
                        a.latitude as CLIENT_latitude,
                        a.longitude AS CLIENT_longitude,
                        pc.postal_code,
                        concat(st.name,',',a.number,',',ct.name,' - ',stt.sigla,',',ctr.name) as GOOGLEADDRESS
                    from
                        logistic_logs lg 
                        join tables t on LOWER(t.name) = LOWER('logistic_orders_items_mov_amt') and lg.table_ref_id = t.id
                        join logistic_orders_items_mov_amt lxim on lxim.id = lg.record_ref_id
                        join logistic_orders_movs lxm on lxm.id = lxim.mov_logistic_order_id
                        join logistic_orders l on l.id = lxm.idlogisticorder
                        join movements m on m.id = lxm.mov_id
                        join clients c on c.id = m.client_id
                        join people p on p.id = c.people_id
                        left outer join people_addresses x on x.people_id = p.id
                        left outer join addresses a on a.id = x.address_id
                        left outer join postal_codes pc on pc.id = a.postal_code_id
                        left outer join neighborhoods nb on nb.id = a.neighborhood_id
                        left outer join streets st on st.id = a.street_id    
                        left outer join cities ct on ct.id = coalesce(st.city_id,nb.city_id,pc.city_id)
                        left outer join states stt on stt.id = ct.state_id
                        left outer join countries ctr on ctr.id = stt.country_id
                    where
                        l.id_at_origin = ${req.body.id_at_origin}
                        AND lg.column_name = 'delivery_status_id'
                        and lg.operation in ('UPDATE','INSERT')
                        and lg.new_value IN (3,4,5)
                    group by
                        date_format(lg.created_at,'%Y-%m-%d %H:%i'),
                        cast(regexp_replace(p.identifier_doc,'[^0-9]','') as decimal(32)),
                        p.name,
                        p.fantasy,
                        ctr.name,
                        stt.name,
                        ct.name,
                        nb.name,
                        st.name,
                        a.number,
                        a.latitude,
                        a.longitude,
                        pc.postal_code,
                        concat(st.name,',',a.number,',',ct.name,' - ',stt.sigla,',',ctr.name)
                    order by
                        date_format(lg.created_at,'%Y-%m-%d %H:%i'),
                        "identifier_doc"
                `;
                res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{
                    raw:true,
                    type: QueryTypes.SELECT
                }); 
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
            Utils.logError(e);
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
                    return DeliveryController.getSummaryDetails(req,res);
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
            Utils.logError(e);
            res.sendResponse(517,false,e.message || e,null,e);
        }
    }


}

module.exports = {DeliveryController}