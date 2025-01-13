import { NextFunction, Request, Response } from "express";
import BaseIntegrationsController from "./BaseRegistersIntegrationsController.js";
import PcTabDevController from "./winthor/registers/PcTabDevController.js";

export default class Logistic_ReasonsIntegrationsController extends BaseIntegrationsController {

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
                    PcTabDevController.get(req,res,next);
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
                    res.setDataSwap(await PcTabDevController.integrateMultiples(req.body));
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