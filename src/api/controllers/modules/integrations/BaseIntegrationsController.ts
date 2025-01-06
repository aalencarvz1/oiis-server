import { NextFunction, Request, Response } from "express";
import BaseRegistersController from "../registers/BaseRegistersController.js";

export default class BaseIntegrationsController extends BaseRegistersController{

    static getTableClassModel() : any {
        return null;
    }    

    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        res.sendResponse(517,false,"no change integration")
    }

    static async path(req: Request, res: Response, next: NextFunction) : Promise<void> {
        res.sendResponse(517,false,"no change integration")
    }

    static async delete(req: Request, res: Response, next: NextFunction) : Promise<void> {
        res.sendResponse(517,false,"no change integration")
    }
    
}