import { NextFunction, Request, Response } from "express";
import Logistic_Orders from "../../../database/models/Logistic_Orders.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Utils from "../../utils/Utils.js";
import Financial_Value_Forms from "../../../database/models/Financial_Value_Forms.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import { QueryTypes } from "sequelize";

export default class Logistic_OrdersController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Logistic_Orders;
    }

    /**
     * 
     * @created 2024-05-01
     * @version 1.0.0
     */
    static async get_summary_details(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let where : any = [];
            if (req.body.id) {
                let identifier = Utils.typeOf(req.body.id) == 'array' ? req.body.id : req.body.id.toString().split(',');
                identifier = identifier.map((el : any)=>Utils.hasValue(el)?el:'null');
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
                    ${Object.keys(Logistic_Orders.fields).map((el : any)=>`l.${el}`).join(',')},
                    lsl.name
            `;

            res.data = await DBConnectionManager.getDefaultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});
            res.success = true;
        } catch (e) {
            res.setException(e);
        }
        res.sendResponse();
    }

    static {
        this.configureDefaultRequestHandlers([this.get_summary_details]);
    }
}
