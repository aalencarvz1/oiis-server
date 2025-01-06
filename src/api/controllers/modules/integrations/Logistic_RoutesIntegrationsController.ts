import { NextFunction, Request, Response } from "express";
import BaseIntegrationsController from "./BaseIntegrationsController.js";
import WinthorLogistic_RoutesIntegrationsController from "./winthor/WinthorLogistic_RoutesIntegrationsController.js";


export default class Logistic_RoutesIntegrationsController extends BaseIntegrationsController {


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
                    res.data = await WinthorLogistic_RoutesIntegrationsController.get(req.body);
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
        this.configureDefaultRequestHandlers();
    }
}