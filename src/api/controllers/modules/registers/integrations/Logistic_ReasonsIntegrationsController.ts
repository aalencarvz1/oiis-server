import { NextFunction, Request, Response } from "express";
import EndPointsController from "../../../endpoints/EndPointsController.js";
import WinthorLogistic_ReasonsIntegrationsController from "./winthor/WinthorLogistic_ReasonsIntegrationsController.js";

export default class Logistic_ReasonsIntegrationsController {

    static async integrate(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.setDataSwap(await WinthorLogistic_ReasonsIntegrationsController.integrateWinthorLogisticReasons(req.body));
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