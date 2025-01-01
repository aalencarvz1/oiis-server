import { NextFunction, Request, Response } from "express";
import DatabaseUtils from "../../database/DatabaseUtils.js";

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

    static async get(req: Request, res: Response, next: NextFunction) {
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

    static async put(req: Request, res: Response, next: NextFunction) {
        try {
            let queryParams = req.body.queryParams || req.body;
            res.data = await this.getTableClassModel().createData(queryParams);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static async patch(req: Request, res: Response, next: NextFunction) {
        try {
            let queryParams = req.body.queryParams || req.body;
            res.data = await this.getTableClassModel().patchData(queryParams);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static async delete(req: Request, res: Response, next: NextFunction) {
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
        console.log('configuring request handlers of ',this.name);
        [
            this.get,
            this.put,
            this.patch,
            this.delete
        ].forEach(el=>Object.defineProperty(el, "__isRequestHandler", {
            value: true,
            writable: false,
            configurable: false,
            enumerable: false, // Mantém a propriedade oculta em loops
        }));
    }
}