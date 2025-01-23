import { NextFunction, Request, Response } from "express";
import Projects_Items from "../../../database/models/Projects_Items.js";
import Requirements from "../../../database/models/Requirements.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Requirements_Types from "../../../database/models/Requirements_Types.js";
import { QueryTypes, Sequelize } from "sequelize";
import Projects_ItemsController from "./Projects_ItemsController.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";

export default class RequirementsController extends BaseRegistersController {

    /**
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static getTableClassModel() : any {
        return Requirements;
    }


    /**
     * get data from requirements and include joins
     * @created 2025-01-01
     * @version 1.0.0
     */
    static async _get(params?: any) : Promise<any[]> {
        let result : any[any] = [];
        let queryParams : any = params?.queryParams || params || {};
        if (Utils.hasValue(queryParams?.query)) {
            result = await DBConnectionManager.getDefaultDBConnection()?.query(queryParams.query,{type:QueryTypes.SELECT});
        } else {
            queryParams = DatabaseUtils.prepareQueryParams( queryParams);
            queryParams.raw = Utils.firstValid([queryParams.raw,true]);
            queryParams.include = queryParams.include || [];
            Projects_ItemsController.includeJoins(queryParams);

            //include requirements join
            queryParams.include.push({
                required:true,
                model: Requirements,
                attributes:[
                    Sequelize.literal(`${Requirements.tableName}.id as requirement_id`),
                    Sequelize.literal(`${Requirements.tableName}.requirement_type_id as requirement_type_id`)
                ],
                on: Sequelize.where(Sequelize.col(`${Requirements.tableName}.project_item_id`),Sequelize.col(`${Projects_Items.tableName}.id`)),
                include:[{
                    model: Requirements_Types,
                    attributes:[
                        Sequelize.literal(`\`${Requirements.tableName}->${Requirements_Types.tableName}\`.name as requirement_type_name`)
                    ],
                    on: Sequelize.where(Sequelize.col(`\`${Requirements.tableName}->${Requirements_Types.tableName}\`.id`),Sequelize.col(`${Requirements.tableName}.requirement_type_id`))
                }]
            });
            result = await Projects_Items.findAll(queryParams);
        }

        return result;
    }

    /**
     * @requesthandler
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {                      
            res.data = await this._get(req.body);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    /**
     * @requesthandler
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams?.values || req.body.values || req.body.queryParams || req.body || {};
            let projectItemQueryParams = {...queryParams};

            //create project item if not has project_item_id
            let projectItem = await Projects_Items.createData(projectItemQueryParams);

            queryParams.project_item_id = projectItem.id;
            
            //parent_id is used to project_items, not to requirements
            if (Utils.hasValue(queryParams.parent_id)) {
                queryParams.parent_id = undefined;
                delete queryParams.parent_id;
            } 
            
            let result = await Requirements.create(queryParams);

            res.data = await this._get({where:{"id":queryParams.project_item_id}});
            res.data = res.data[0] || null;
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    /**
     * @requesthandler
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async patch(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams?.values || req.body.values || req.body.queryParams || req.body || {};
            let projectItemQueryParams = {...queryParams};

            //uprete project item if not has project_item_id
            await Projects_Items.updateData(projectItemQueryParams);
           
            //parent_id is used to project_items, not to requirements
            if (Utils.hasValue(queryParams.parent_id)) {
                queryParams.parent_id = undefined;
                delete queryParams.parent_id;
            } 
           
            let projectItemId = queryParams.id;
            queryParams.id = queryParams.requirement_id;
            await Requirements.updateData(queryParams);

            res.data = await this._get({where:{"id":projectItemId}});
            res.data = res.data[0] || null;
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }
        
    /**
     * @requesthandler
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async delete(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            let records = await Projects_Items.findAll(queryParams);
            let projectsIds : any[] = [];
            if (Utils.hasValue(records)) {
                projectsIds = records.map(el=>el.id);
            }
            //await Requirements.deleteData(queryParams); //deleteds by foreigns keys - on delete - cascade
            Projects_Items.deleteData({queryParams:{where:{id:projectsIds}}});
            res.success = true;
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
