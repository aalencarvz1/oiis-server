import { NextFunction, Request, Response } from "express";
import BaseRegistersIntegrationsController from "./BaseRegistersIntegrationsController.js";
import PcEstController from "./winthor/registers/PcEstController.js";
import SjdLogAnaliseEntController from "./sjd/registers/SjdLogAnaliseEntController.js";



export default class InputsIntegrationsController extends BaseRegistersIntegrationsController {


    /**
     * @requesthandler    
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get_input_analise(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.setDataSwap(await SjdLogAnaliseEntController.getInputAnalise(req.body));
                    break; 
                default:
                    throw new Error(`origin not expected: ${origin}`);
            }
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }

     /**
     * @requesthandler    
     * @created 2025-01-04
     * @version 1.0.0
     */
     static async get_input_analise_details(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.setDataSwap(await SjdLogAnaliseEntController.getInputAnaliseDetails(req.body));
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
        this.configureDefaultRequestHandlers([
            this.get_input_analise,
            this.get_input_analise_details
        ]);
    }
}