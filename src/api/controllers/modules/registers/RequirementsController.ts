import { NextFunction, Request, Response } from "express";
import Projects_Items from "../../../database/models/Projects_Items.js";
import Requirements from "../../../database/models/Requirements.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Requirements_Types from "../../../database/models/Requirements_Types.js";
import { Sequelize } from "sequelize";
import Projects_Items_Types from "../../../database/models/Projects_Items_Types.js";
import Project_Item_Origin_Types from "../../../database/models/Project_Item_Origin_Types.js";

export default class RequirementsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Requirements;
    }


    /**
     * get data from requirements and include joins
     * @created 2025-01-01
     * @version 1.0.0
     */
    static async _get(params: any) : Promise<any[]> {
        params = DatabaseUtils.prepareQueryParams(params);
        params.raw = Utils.firstValid([params.raw,true]);

        params.include = params.include || [];
        params.include.push({
            raw:true,
            model: Requirements_Types,
            attributes:[
                Sequelize.literal(`${Requirements_Types.tableName}.name as requirement_type_name`)
            ],
            on: Sequelize.where(Sequelize.col(`${Requirements_Types.tableName}.id`),Sequelize.col(`${Requirements.tableName}.requirement_type_id`))
        });

        params.include.push({
            raw:true,
            model: Projects_Items,
            attributes:[
                Sequelize.literal(`${Projects_Items.tableName}.id as project_item_id`),
                Sequelize.literal(`${Projects_Items.tableName}.project_item_type_id as project_item_type_id`),
                Sequelize.literal(`${Projects_Items.tableName}.project_item_origin_id as project_item_origin_id`),
                Sequelize.literal(`${Projects_Items.tableName}.identifier as identifier`),
                Sequelize.literal(`${Projects_Items.tableName}.name as name`),
                Sequelize.literal(`${Projects_Items.tableName}.description as description`),
                Sequelize.literal(`${Projects_Items.tableName}.notes as notes`)
            ],
            on: Sequelize.where(Sequelize.col(`${Projects_Items.tableName}.id`),Sequelize.col(`${Requirements.tableName}.project_item_id`)),
            include:[{
                raw:true,
                model: Projects_Items_Types,
                attributes:[
                    Sequelize.literal(`\`${Projects_Items.tableName}->${Projects_Items_Types.tableName}\`.\`name\` as project_item_type_name`)
                ],
                on: Sequelize.where(Sequelize.col(`\`${Projects_Items.tableName}->${Projects_Items_Types.tableName}\`.id`),Sequelize.col(`${Projects_Items.tableName}.project_item_type_id`))
            },{
                raw:true,
                model: Project_Item_Origin_Types,
                attributes:[
                    Sequelize.literal(`\`${Projects_Items.tableName}->${Project_Item_Origin_Types.tableName}\`.\`name\` as project_item_origin_name`)
                ],
                on: Sequelize.where(Sequelize.col(`\`${Projects_Items.tableName}->${Project_Item_Origin_Types.tableName}\`.id`),Sequelize.col(`${Projects_Items.tableName}.project_item_origin_id`))
            }]
        });
        return await Requirements.findAll(params);
    }


    static async get(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {          
            res.data = await this._get(req.body);
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams?.values || req.body.values || req.body.queryParams || req.body || {};
            if (!Utils.hasValue(queryParams.project_item_id)) {
                let projectItem : any = null;
                let projectItemParams : any = {...queryParams};
                if (Utils.hasValue(projectItemParams.parent_id)) {
                    projectItemParams.parent_id = null;
                    delete projectItemParams.parent_id;
                }
                if (Utils.hasValue(projectItemParams.project_item_parent_id)) {
                    projectItemParams.parent_id = projectItemParams.project_item_parent_id;        
                } 
                projectItem = await Projects_Items.createData(projectItemParams);
                queryParams.project_item_id = projectItem.id;
            }                  
            
            let result = await Requirements.create(queryParams);
            res.data = await this._get({where:{"id":result.id}});
            res.data = res.data[0] || null;
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static async patch(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params : any = req.body?.queryParams || req.body || {};  
            let projectItemParams : any = {};
            if (params.values) {
                projectItemParams = {...params.values,id:params.values.project_item_id};
            } else {
                projectItemParams = {...params,id:params.project_item_id};
            }
            if (Utils.hasValue(projectItemParams.parent_id)) {
                projectItemParams.parent_id = null;
                delete projectItemParams.parent_id;
            }
            if (Utils.hasValue(projectItemParams.project_item_parent_id)) {
                projectItemParams.parent_id = projectItemParams.project_item_parent_id;        
            } 
            let projectItem = await Projects_Items.updateData(projectItemParams);
            super.patch.bind(this)(req,res,next);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }
        
    static async delete(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            let records = await Requirements.findAll(queryParams);
            let projectsIds : any[] = [];
            if (Utils.hasValue(records)) {
                projectsIds = records.map(el=>el.project_item_id);
            }
            await Requirements.deleteData(queryParams);
            Projects_Items.deleteData({queryParams:{where:{id:projectsIds}}});
            res.success = true;
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }

    }

    static {
        this.configureRequestHandlers();
    }
}
