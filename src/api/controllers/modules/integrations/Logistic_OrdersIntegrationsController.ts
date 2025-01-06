import { NextFunction, Request, Response } from "express";
import BaseIntegrationsController from "./BaseIntegrationsController.js";
import WinthorLogistic_OrdersIntegrationsController from "./winthor/WinthorLogistic_OrdersIntegrationsController.js";


export default class Logistic_OrdersIntegrationsController extends BaseIntegrationsController {

     static async get_with_integration_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await WinthorLogistic_OrdersIntegrationsController.getWithWinthorData(req.body);
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

    static async integrate_box_closing(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await WinthorLogistic_OrdersIntegrationsController.integrateBoxClosing(req.body);
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
        this.configureDefaultRequestHandlers([
            this.get_with_integration_data,
            this.integrate_box_closing
        ]);
    }
}