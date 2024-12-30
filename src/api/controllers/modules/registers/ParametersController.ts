import { NextFunction, Request, RequestHandler, Response } from "express";
import Parameters from "../../../database/models/Parameters.js";

export default class ParametersController {

    static get : RequestHandler= async(req: Request, res: Response, next: NextFunction) => {
        try {
            let queryParams = req.body.queryParams || req.body;
            queryParams.raw = true;
            res.data = await Parameters.findAll(queryParams);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }

    }

}