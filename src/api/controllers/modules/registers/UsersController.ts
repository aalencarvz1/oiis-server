import { Sequelize } from "sequelize";
import People from "../../../database/models/People.js";
import Users from "../../../database/models/Users.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import { NextFunction, Request, Response } from "express";

export default class UsersController extends BaseRegistersController {

    /**
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static getTableClassModel() : any {
        return Users;
    }

    /**
     * get data and include joins
     * @created 2025-01-01
     * @version 1.0.0
     */
    static async _get(params: any) : Promise<any[]> {
        params = DatabaseUtils.prepareQueryParams(params);
        params.raw = Utils.firstValid([params.raw,true]);

        params.include = params.include || [];
        params.include.push({
            raw:true,
            model: People,
            attributes:[
                Sequelize.literal(`${People.tableName}.name as name`),
                Sequelize.literal(`${People.tableName}.identifier_doc as identifier_doc`)
            ],
            on: Sequelize.where(Sequelize.col(`${People.tableName}.id`),Sequelize.col(`${Users.tableName}.people_id`))
        });
        
        return await Users.findAll(params);
    }


    /**
     * @requesthandler
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {  
            let queryParams = req.body.queryParams || req.body || {};        
            res.data = await this._get(queryParams);
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
