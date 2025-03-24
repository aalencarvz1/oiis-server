import { NextFunction, Request, Response } from "express";
import BaseRegistersIntegrationsController from "./BaseRegistersIntegrationsController.js";
import PcDicionarioItemController from "./winthor/registers/PcDicionarioItemController.js";


export default class DictionaryIntegrationsController extends BaseRegistersIntegrationsController {

    /**
     * @requesthandler
     * @override
     * @created 2025-03-20
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    PcDicionarioItemController.get(req,res,next);
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