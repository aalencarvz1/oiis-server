import { NextFunction, Request, Response } from "express";
import WinthorPeopleIntegrationsController from "./winthor/WinthorPeopleIntegrationsController.js";
import BaseIntegrationsController from "./BaseIntegrationsController.js";

export default class PeopleIntegrationsController extends BaseIntegrationsController {


    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await WinthorPeopleIntegrationsController.get(req.body);
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

    static async integrate(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.setDataSwap(await WinthorPeopleIntegrationsController.integrateWinthorPeople(req.body));
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
        this.configureDefaultRequestHandlers([this.integrate]);
    }
}