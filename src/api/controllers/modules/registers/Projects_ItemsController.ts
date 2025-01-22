import { NextFunction, Request, Response } from "express";
import Projects_Items from "../../../database/models/Projects_Items.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Projects_Items_Types from "../../../database/models/Projects_Items_Types.js";
import { Sequelize } from "sequelize";
import Project_Item_Origin_Types from "../../../database/models/Project_Item_Origin_Types.js";
import EndPointsController from "../../endpoints/EndPointsController.js";

export default class Projects_ItemsController extends BaseRegistersController {

    /**
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static getTableClassModel() : any {
        return Projects_Items;
    }


    /**
     * include defaulut Project_Items foreign keys joins
     * @created 2025-01-22
     * @version 1.0.0
     */
    static includeJoins(queryParams: any) : void {
        queryParams.include = queryParams.include || [];
        queryParams.include.push({
            required:true,
            model: Projects_Items_Types,
            attributes:[
                Sequelize.literal(`${Projects_Items_Types.tableName}.name as project_item_type_name`)
            ],
            on: Sequelize.where(Sequelize.col(`${Projects_Items_Types.tableName}.id`),Sequelize.col(`${Projects_Items.tableName}.project_item_type_id`))
        });

        queryParams.include.push({
            required:true,
            model: Project_Item_Origin_Types,
            attributes:[
                Sequelize.literal(`${Project_Item_Origin_Types.tableName}.name as project_item_origin_name`)
            ],
            on: Sequelize.where(Sequelize.col(`${Project_Item_Origin_Types.tableName}.id`),Sequelize.col(`${Projects_Items.tableName}.project_item_origin_id`))
        });
    }


    /**
     * @requesthandler
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            this.includeJoins(queryParams);
            res.data = await Projects_Items.findAll(queryParams);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    /**
     * @requesthandler
     * @override
     * @created 2025-01-17
     * @version 1.0.0
     */
    static async get_next_identifier(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            queryParams.attributes = [
                Sequelize.literal(`max(coalesce(identifier,0)) as identifier`)
            ]
            res.data = await Projects_Items.findAll(queryParams);
            res.data = (res.data[0]?.identifier || 0)-0+1;
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static {
        this.configureDefaultRequestHandlers([
            this.get_next_identifier
        ]);
    }
}
