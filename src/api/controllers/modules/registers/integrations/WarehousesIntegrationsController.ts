import { NextFunction, Request, Response } from "express";
import EndPointsController from "../../../endpoints/EndPointsController.js";
import WinthorWarehousesIntegrationsController from "./winthor/WinthorWarehousesIntegrationsController.js";



export default class WarehousesIntegrationsController {

    static async integrate(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.setDataSwap(await WinthorWarehousesIntegrationsController.integrateWinthorWarehouses(req.body));
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
        [
            this.integrate,
        ].forEach(el=>EndPointsController.markAsRequestHandler(el));
    }
}