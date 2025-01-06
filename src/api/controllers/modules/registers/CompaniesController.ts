import { Sequelize } from "sequelize";
import Companies from "../../../database/models/Companies.js";
import People from "../../../database/models/People.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import { NextFunction, Request, Response } from "express";

export default class CompaniesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Companies;
    }

    /**
     * get data from companies and include joins
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
                Sequelize.literal(`${People.tableName}.identifier_doc as identifier_doc`)
            ],
            on: Sequelize.where(Sequelize.col(`${People.tableName}.id`),Sequelize.col(`${Companies.tableName}.people_id`))
        });
        
        return await Companies.findAll(params);
    }


    /**
     * @requesthandler
     * @override
     * @created 2025-01-04
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
