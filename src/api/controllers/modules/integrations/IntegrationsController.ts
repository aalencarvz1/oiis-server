import { NextFunction, Request, Response } from "express";
import EndPointsController from "../../endpoints/EndPointsController.js";
import WinthorIntegrationsController from "./winthor/WinthorIntegrationsController.js";

export default class Integrationscontroller {


    /**
     * @requesthandler    
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    WinthorIntegrationsController.get_data(req,res,next);
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse();
        }        
    }


    static {
        [
            this.get_data
        ].forEach(el=>EndPointsController.markAsRequestHandler(el));
    }
}