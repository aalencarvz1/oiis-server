import { NextFunction, Request, Response } from "express";
import BaseIntegrationsController from "./BaseIntegrationsController.js";
import SicrediPixIntegrationsController from "./sicredi/SicrediPixIntegrationsController.js";
import PcPrestController from "./winthor/PcPrestController.js";

export default class PixIntegrationsController extends BaseIntegrationsController {


    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "sicredi":
                    res.setDataSwap(await SicrediPixIntegrationsController.get(req.body));
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

    static async get_all_ware_pix_cobs(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "winthor":
                    res.data = await PcPrestController.getAllWarePixCobs(req.body);
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
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "sicredi":
                case "winthor":
                    res.setDataSwap(await SicrediPixIntegrationsController.create(req.body));
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

    static async delete(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let origin = req.body.origin || "";
            switch((origin.name || origin.label || origin).trim().toLowerCase()) {                        
                case "sicredi":
                case "winthor":
                    res.setDataSwap(await SicrediPixIntegrationsController.delete(req.body));
                    res.sendResponse();
                    break; 
                default:
                    throw new Error(`origin not expected: ${(origin.name || origin.label || origin).trim().toLowerCase()}`);
            }
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }
    
    static {
        this.configureDefaultRequestHandlers([this.get_all_ware_pix_cobs]);
    }
}