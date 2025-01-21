import { NextFunction, Request, Response } from "express";
import BaseIntegrationsController from "./BaseRegistersIntegrationsController.js";
import AuroraPricesIntegrationsController from "./aurora/AuroraPricesIntegrationsController.js";


/**
 * @author Alencar
 * @created 2025-01-08
 * @version 1.0.0
 */
export default class PricesIntegrationsController extends BaseIntegrationsController {


    /**
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async integrate(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "aurora":
                    let params = req.body || req.query || {};
                    res.setDataSwap(await AuroraPricesIntegrationsController.integrate(params));
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }
    
    static {
        this.configureDefaultRequestHandlers([this.integrate]);
    }
}