import { NextFunction, Request, Response } from "express";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import EndPointsController from "../../endpoints/EndPointsController.js";
import Utils from "../../utils/Utils.js";
import { QueryTypes } from "sequelize";


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
     * default RequestHandler method to get registers of table model controller
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            if (queryParams.query) {
                res.data = await this.getTableClassModel().getConnection().query(
                    queryParams.query,{
                        raw:queryParams.raw,
                        type:QueryTypes.SELECT
                    }
                );
            } else {
                if (((this.getTableClassModel() as any).accessLevel || 1) == 2 ) {
                    queryParams.where = queryParams.where || {};
                    queryParams.where.creator_user_id = req.user?.id
                }
                res.data = await this.getTableClassModel().findAll(queryParams);
            }
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    /**
     * default RequestHandler method to put registers of table model controller
     * @requesthandler
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
     * @requesthandler
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
     * @requesthandler
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
    static configureDefaultRequestHandlers(funcs?: Function[]){
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