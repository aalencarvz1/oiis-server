import { NextFunction, Request, Response } from "express";
import Campaigns from "../../../database/models/Campaigns.js";
import BaseRegistersController from "./BaseRegistersController.js";

export default class CampaignsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Campaigns;
    }
    /**
     * default RequestHandler method to put registers of table model controller
     * @requesthandler
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            res.data = await this.getTableClassModel().createData(queryParams);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    static {
        this.configureDefaultRequestHandlers();
    }
}
