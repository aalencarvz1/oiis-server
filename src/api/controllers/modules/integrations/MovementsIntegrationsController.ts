import { NextFunction, Request, Response } from "express";
import BaseIntegrationsController from "./BaseRegistersIntegrationsController.js";
import PcEstController from "./winthor/registers/PcEstController.js";



export default class MovementsIntegrationsController extends BaseIntegrationsController {


    /**
     * @requesthandler    
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get_purchase_suggestions(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await PcEstController.getWinthorPurchaseSuggestions(req.body);
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
        this.configureDefaultRequestHandlers([this.get_purchase_suggestions]);
    }
}