import { NextFunction, Request, Response } from "express";
import BaseIntegrationsController from "./BaseIntegrationsController.js";
import WinthorDeliveriesIntegrationsController from "./winthor/WinthorDeliveriesIntegrationsController.js";


export default class DeliveriesIntegrationsController extends BaseIntegrationsController {


    static async get_invoices_with_integrations_datas(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await WinthorDeliveriesIntegrationsController.getInvoicesWithIntegrationsDatas(req.body);
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

    static async get_invoice_with_integrations_datas(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await WinthorDeliveriesIntegrationsController.getInvoiceWithIntegrationsDatas(req.body);
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

    static async get_items_invoice_with_integrations_datas(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await WinthorDeliveriesIntegrationsController.getItemsInvoiceWithIntegrationsDatas(req.body);
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

    
    
    static {
        this.configureDefaultRequestHandlers([
            this.get_invoices_with_integrations_datas,
            this.get_invoice_with_integrations_datas,
            this.get_items_invoice_with_integrations_datas
        ]);
    }
}