import Utils from "../../../utils/Utils.js";
import BaseIntegrationsRegistersController from "../BaseIntegrationsRegistersController.js";
import Data_Origins from "../../../../database/models/Data_Origins.js";
import DBConnectionManager from "../../../../database/DBConnectionManager.js";
import { QueryTypes } from "sequelize";
import Movements from "../../../../database/models/Movements.js";
import Financial_Value_Forms from "../../../../database/models/Financial_Value_Forms.js";
import Logistic_Orders_Movs from "../../../../database/models/Logistic_Orders_Movs.js";

export default class WinthorDeliveriesIntegrationsController extends BaseIntegrationsRegistersController{


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
}