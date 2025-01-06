import { NextFunction, Request, Response } from "express";
import Projects_Items from "../../../database/models/Projects_Items.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Projects_Items_Types from "../../../database/models/Projects_Items_Types.js";
import { Sequelize } from "sequelize";
import Project_Item_Origin_Types from "../../../database/models/Project_Item_Origin_Types.js";

export default class Projects_ItemsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Projects_Items;
    }

    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;

            queryParams.include = queryParams.include || [];
            queryParams.include.push({
                raw:true,
                model: Projects_Items_Types,
                attributes:[
                    Sequelize.literal(`${Projects_Items_Types.tableName}.name as project_item_type_name`)
                ],
                on: Sequelize.where(Sequelize.col(`${Projects_Items_Types.tableName}.id`),Sequelize.col(`${Projects_Items.tableName}.project_item_type_id`))
            });

            queryParams.include.push({
                raw:true,
                model: Project_Item_Origin_Types,
                attributes:[
                    Sequelize.literal(`${Project_Item_Origin_Types.tableName}.name as project_item_origin_name`)
                ],
                on: Sequelize.where(Sequelize.col(`${Project_Item_Origin_Types.tableName}.id`),Sequelize.col(`${Projects_Items.tableName}.project_item_origin_id`))
            });

            res.data = await Projects_Items.findAll(queryParams);
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
