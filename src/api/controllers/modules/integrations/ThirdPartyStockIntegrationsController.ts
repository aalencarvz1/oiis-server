import { NextFunction, Request, Response } from "express";
import BaseIntegrationsController from "./BaseRegistersIntegrationsController.js";
import BaseRegistersController from "../registers/BaseRegistersController.js";
import Produtos_Armazenados_Terceiros from "../../../database/models/winthor/Produtos_Armazenados_Terceiros.js";
import Produtos_Armazenados_TerceirosController from "./winthor/registers/Produtos_Armazenados_TerceirosController.js";




export default class ThirdPartyStockIntegrationsController extends BaseIntegrationsController {

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
                    res.data = await Produtos_Armazenados_TerceirosController.getWithJoins(req.body);
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