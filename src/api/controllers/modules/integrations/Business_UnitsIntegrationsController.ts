import { NextFunction, Request, Response } from "express";
import WinthorBusiness_UnitsIntegrationsController from "./winthor/WinthorBusiness_UnitsIntegrationsController.js";
import BaseIntegrationsController from "./BaseIntegrationsController.js";

export default class Business_UnitsIntegrationsController extends BaseIntegrationsController{

    /**
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await WinthorBusiness_UnitsIntegrationsController.get(req.body);
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
    static async integrate(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.setDataSwap(await WinthorBusiness_UnitsIntegrationsController.integrateWinthorBusinessesUnits(req.body));
                    res.sendResponse();
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
        this.configureDefaultRequestHandlers([this.integrate]);
    }
}