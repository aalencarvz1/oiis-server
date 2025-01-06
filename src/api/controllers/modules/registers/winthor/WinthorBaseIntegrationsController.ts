import { NextFunction, Request, Response } from "express";
import BaseRegistersController from "../BaseRegistersController.js";


/**
 * base class handler of winthor table class model integrations
 * @created 2025-01-04
 * @version 1.0.0
 */
export default class WinthorBaseIntegrationsController extends BaseRegistersController{
    
    /**
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static getTableClassModel() : any {
        return null;
    }    


    /**
     * Integration request methods handlers, by default, not can change origin information, only get
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        res.sendResponse(517,false,"no change integration")
    }

    /**
     * Integration request methods handlers, by default, not can change origin information, only get
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async path(req: Request, res: Response, next: NextFunction) : Promise<void> {
        res.sendResponse(517,false,"no change integration")
    }

    /**
     * Integration request methods handlers, by default, not can change origin information, only get
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async delete(req: Request, res: Response, next: NextFunction) : Promise<void> {
        res.sendResponse(517,false,"no change integration")
    }
    
}