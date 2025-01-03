import { NextFunction, Request, Response } from "express";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import EndPointsController from "../../endpoints/EndPointsController.js";


/**
 * Abstract class to use as registers (table) controller.
 * This class avoid use of arrow functions to correct user of context of this
 * @author Alencar
 * @version 1.0.0
 * @created 2024-12-31
 */
export default abstract class BaseRegistersController {

    static getTableClassModel() : any {
        throw new Error(`abstract method ${this.name}.getTableClassModel not implemented`);
    }

    /**
     * default RequestHandler method to get registers of table model controller
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            res.data = await this.getTableClassModel().findAll(queryParams);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    /**
     * default RequestHandler method to put registers of table model controller
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


    /**
     * default RequestHandler method to patch registers of table model controller
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async patch(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            res.data = await this.getTableClassModel().patchData(queryParams);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    /**
     * default RequestHandler method to patch registers of table model controller
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async delete(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            res.data = await this.getTableClassModel().deleteData(queryParams);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    /**
     * call its on inherited class at static block to configure this methodos as request handlers
     */
    static configureRequestHandlers(){
        [
            this.get,
            this.put,
            this.patch,
            this.delete
        ].forEach(el=>EndPointsController.markAsRequestHandler(el));
    }
}