import { NextFunction, Request, Response } from "express";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import EndPointsController from "../../endpoints/EndPointsController.js";
import Utils from "../../utils/Utils.js";
import { QueryTypes } from "sequelize";
import DataSwap from "../../data/DataSwap.js";


/**
 * Abstract class to use as registers (table) controller.
 * This class avoid use of arrow functions to correct user of context of this
 * This class provide 4 basic methods to management table class model: get, put, patch and delete.
 * @author Alencar
 * @version 1.0.0
 * @created 2024-12-31
 */
export default abstract class BaseRegistersController {


    /**
     * The class that inherit this must have return a class model wich is principal table class model of controller
     * @abstract
     */
    static getTableClassModel() : any {
        throw new Error(`abstract method ${this.name}.getTableClassModel not implemented`);
    }

    /**
     * default get
     * @created 2025-04-12
     * @version 1.0.0
     */
    static async _get(params?: any) : Promise<any> {        
        let result = null;
        try {
            let queryParams = params?.queryParams || params || {};
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            if (queryParams.query) {
                result = await this.getTableClassModel().getConnection().query(
                    queryParams.query,{
                        raw:queryParams.raw,
                        type:QueryTypes.SELECT
                    }
                );
            } else {
                if (((this.getTableClassModel() as any).accessLevel || 1) === 2 ) {
                    queryParams.where = queryParams.where || {};
                    queryParams.where.creator_user_id = params?.user?.id || null
                }
                result = await this.getTableClassModel().findAll(queryParams);
            }
        } catch (e) {
            console.log(e);
        }
        return result;
    }

    /**
     * default RequestHandler method to get registers of table model controller
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> { // eslint-disable-line @typescript-eslint/no-unused-vars
        try {
            const params = req.body;
            params.user = req.user;
            res.data = await this._get(params);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    /**
     * @created 2025-04-14
     * @version 1.0.0
     */
    static async _put(params: any) : Promise<DataSwap> {
        const result = new DataSwap();
        try {
            const queryParams = params.queryParams || params;            
            result.data = await this.getTableClassModel().createData(queryParams);
            result.success = true;
        } catch (e) {
            result.setException(e);
        }
        return result;
    }



    /**
     * default RequestHandler method to put registers of table model controller
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> { // eslint-disable-line @typescript-eslint/no-unused-vars
        try {
            const params = req.body;
            params.user = req.user;
            res.setDataSwap(await this._put(params));
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }


    /**
     * @created 2025-04-14
     * @version 1.0.0
     */
    static async _patch(params: any) : Promise<DataSwap> {
        const result = new DataSwap();
        try {
            const queryParams = params.queryParams || params;
            result.data = await this.getTableClassModel().patchData(queryParams);
            result.success = true;
        } catch (e: any) {
            result.setException(e);            
        }
        return result;
    }

    /**
     * default RequestHandler method to patch registers of table model controller
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async patch(req: Request, res: Response, next: NextFunction) : Promise<void> { // eslint-disable-line @typescript-eslint/no-unused-vars
        try {
            const params = req.body;
            res.setDataSwap(await this._patch(params));
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }


    /**
     * @created 2025-04-14
     * @version 1.0.0
     */
    static async _delete(params: any) : Promise<DataSwap> {
        const result = new DataSwap();
        try {
            const queryParams = params.queryParams || params;
            result.data = await this.getTableClassModel().deleteData(queryParams);
            result.success = true;
        } catch (e: any) {
            result.setException(e);
        }
        return result;
    }


    /**
     * default RequestHandler method to patch registers of table model controller
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async delete(req: Request, res: Response, next: NextFunction) : Promise<void> { // eslint-disable-line @typescript-eslint/no-unused-vars
        try {
            const params = req.body;
            res.setDataSwap(await this._delete(params));
        } catch (e: any) {
            res.setException(e);
        }
        res.sendResponse();
    }

    /**
     * call its on inherited class at static block to configure this methodos as request handlers
     */
    static configureDefaultRequestHandlers(funcs?: ((req:Request, res: Response, next?: NextFunction)=> Promise<void> | void)[]){
        [
            this.get,
            this.put,
            this.patch,
            this.delete
        ].forEach(el=>EndPointsController.markAsRequestHandler(el));

        if (Utils.hasValue(funcs)) {
            funcs.forEach(el=>EndPointsController.markAsRequestHandler(el));
        }
    }
}