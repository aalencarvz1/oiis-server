import { NextFunction, Request, Response } from "express";
import BaseIntegrationsController from "./BaseIntegrationsController.js";
import WinthorThirdPartyStockIntegrationsController from "./winthor/WinthorThirdPartyStockIntegrationsController.js";
import BaseRegistersController from "../registers/BaseRegistersController.js";
import Produtos_Armazenados_Terceiros from "../../../database/models/winthor/Produtos_Armazenados_Terceiros.js";




export default class ThirdPartyStockIntegrationsController extends BaseIntegrationsController {
    static getTableClassModel() : any {
        return Produtos_Armazenados_Terceiros;
    } 

    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await WinthorThirdPartyStockIntegrationsController.get(req.body);
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

    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        BaseRegistersController.put.bind(this)(req,res,next);
    }

    static async patch(req: Request, res: Response, next: NextFunction) : Promise<void> {
        BaseRegistersController.patch.bind(this)(req,res,next);
    }

    static async delete(req: Request, res: Response, next: NextFunction) : Promise<void> {
        console.log("okxx1'");
        BaseRegistersController.delete.bind(this)(req,res,next);
    }
    
    static {
        this.configureDefaultRequestHandlers();
    }
}