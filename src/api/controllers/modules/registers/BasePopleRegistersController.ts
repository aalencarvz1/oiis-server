import { Sequelize } from "sequelize";
import People from "../../../database/models/People.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import { NextFunction, Request, Response } from "express";
import DataSwap from "../../data/DataSwap.js";

export default class BasePeopleRegistersController extends BaseRegistersController {

    /**
     * get data from inherited this and include joins
     * @created 2025-01-01
     * @version 1.0.0
     */
    static async _get(params?: any) : Promise<any[]> {
        let queryParams : any = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        if (params?.includePeople) {
            queryParams.include = queryParams.include || [];
            queryParams.include.push({
                raw:true,
                model: People,
                attributes:[
                    Sequelize.literal(`${People.tableName}.identifier_doc_type_id as identifier_doc_type_id`),
                    Sequelize.literal(`${People.tableName}.identifier_doc as identifier_doc`),
                    Sequelize.literal(`${People.tableName}.name as name`),
                    Sequelize.literal(`${People.tableName}.fantasy as fantasy`),
                    Sequelize.literal(`${People.tableName}.birth_date as birth_date`)                    
                ],
                on: Sequelize.where(Sequelize.col(`${People.tableName}.id`),Sequelize.col(`${this.getTableClassModel().tableName}.people_id`))
            });
        }
        
        return await this.getTableClassModel().findAll(queryParams);
    }

    /**
     * @created 2025-04-30
     * @override
     * @version 1.0.0
     */
    static async _put(params: any,returnRaw: boolean = true, checkPeopleId: boolean = true) : Promise<DataSwap> {
        let result = new DataSwap();
        try {
            let queryParams = params.queryParams || params;            
            result.data = await this.getTableClassModel().createData(queryParams,returnRaw,checkPeopleId);
            result.success = true;
        } catch (e) {
            result.setException(e);
        }
        return result;
    }


    /**
     * @requesthandler
     * @override
     * @created 2025-01-04
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {  
            let params = req.body || {};        
            res.data = await this._get(params);
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
