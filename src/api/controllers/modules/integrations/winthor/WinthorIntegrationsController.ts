import { NextFunction, Request, Response } from "express";
import EndPointsController from "../../../endpoints/EndPointsController.js";
import Utils from "../../../utils/Utils.js";

export default class WinthorIntegrationsController {

    
    /**
     * @requesthandler    
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let identifier = req.body.identifier;
            if (Utils.hasValue(identifier)) {
                    switch(identifier.toString().toLowerCase().trim()) {
                        case "naturezaproduto": 
                            res.data = [{
                                
                            }]
                        break;
                        default:
                            throw new Error(`not expected identifier: ${identifier}`);
                    }
                    res.success = true;
            } else {
                throw new Error("missing data");
            }           
        } catch (e: any) {
            res.setException(e);            
        }        
        res.sendResponse();
    }


    static {
        [
            this.get_data
        ].forEach(el=>EndPointsController.markAsRequestHandler(el));
    }
}