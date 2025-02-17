import { NextFunction, Request, Response } from "express";
import BaseRegistersIntegrationsController from "./BaseRegistersIntegrationsController.js";
import PcCarregController from "./winthor/registers/PcCarregController.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import { QueryTypes } from "sequelize";


export default class DeliveriesIntegrationsController extends BaseRegistersIntegrationsController {

    /**
     * @requesthandler
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get_invoices_with_integrations_datas(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await PcCarregController.getInvoicesWithIntegrationsDatas(req.body);
                    res.sendResponse(200,true);
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    /**
     * @requesthandler
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get_invoice_with_integrations_datas(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await PcCarregController.getInvoiceWithIntegrationsDatas(req.body);
                    res.sendResponse(200,true);
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    /**
     * @requesthandler
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get_items_invoice_with_integrations_datas(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await PcCarregController.getItemsInvoiceWithIntegrationsDatas(req.body);
                    res.sendResponse(200,true);
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    static async get_route(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            if (req.body.id_at_origin) {
                let query = `
                    select
                        date_format(lg.created_at,'%Y-%m-%d %H:%i') as "created_at",
                        MAX(lg.latitude) as "latitude",
                        MAX(lg.longitude) AS "longitude",
                        cast(regexp_replace(p.identifier_doc,'[^0-9]','') as decimal(32)) as "identifier_doc",
                        p.name,
                        p.fantasy,
                        ctr.name as "country",
                        stt.name as "state",
                        ct.name as "city",
                        nb.name as "neighboorhood",
                        st.name as "street",
                        a.number,
                        a.latitude as "client_latitude",
                        a.longitude AS "client_longitude",
                        pc.postal_code,
                        concat(st.name,',',a.number,',',ct.name,' - ',stt.sigla,',',ctr.name) as "googleaddress"
                    from
                        logistic_logs lg 
                        join tables t on LOWER(t.name) = LOWER('logistic_orders_items_mov_amt') and lg.table_ref_id = t.id
                        join logistic_orders_items_mov_amt lxim on lxim.id = lg.record_ref_id
                        join logistic_orders_movs lxm on lxm.id = lxim.mov_logistic_order_id
                        join logistic_orders l on l.id = lxm.logistic_order_id
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
                res.data = await DBConnectionManager.getDefaultDBConnection()?.query(query,{
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

        
    static {
        this.configureDefaultRequestHandlers([
            this.get_invoices_with_integrations_datas,
            this.get_invoice_with_integrations_datas,
            this.get_items_invoice_with_integrations_datas,
            this.get_route
        ]);
    }
}