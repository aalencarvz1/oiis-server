import { NextFunction, Request, Response } from "express";
import BaseIntegrationsController from "./BaseIntegrationsController.js";
import WinthorMovementsIntegrationsController from "./winthor/WinthorMovementsIntegrationsController.js";



export default class MovementsIntegrationsController extends BaseIntegrationsController {


    static async getPurchaseSuggestions(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await WinthorMovementsIntegrationsController.getWinthorPurchaseSuggestions(req.body);
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
        this.configureDefaultRequestHandlers([this.getPurchaseSuggestions]);
    }
}