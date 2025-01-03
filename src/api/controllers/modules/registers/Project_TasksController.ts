import { NextFunction, Request, Response } from "express";
import Projects_Items from "../../../database/models/Projects_Items.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { Op, Sequelize } from "sequelize";
import Projects_Items_Types from "../../../database/models/Projects_Items_Types.js";
import Project_Item_Origin_Types from "../../../database/models/Project_Item_Origin_Types.js";
import Project_Tasks from "../../../database/models/Project_Tasks.js";
import Project_Task_Types from "../../../database/models/Project_Task_Types.js";
import Record_Status from "../../../database/models/Record_Status.js";
import Users from "../../../database/models/Users.js";
import Data_Origins from "../../../database/models/Data_Origins.js";
import Relationship_Types from "../../../database/models/Relationship_Types.js";
import Requirements from "../../../database/models/Requirements.js";
import Relationships from "../../../database/models/Relationships.js";

export default class Project_TasksController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Project_Tasks;
    }


    /**
     * get data from tasks and include joins
     * @created 2025-01-01
     * @version 1.0.0
     */
    static async _get(params: any) : Promise<any[]> {
        params = DatabaseUtils.prepareQueryParams(params);
        params.raw = Utils.firstValid([params.raw,true]);

        params.include = params.include || [];
        params.include.push({
            raw:true,
            model: Project_Task_Types,
            attributes:[
                Sequelize.literal(`${Project_Task_Types.tableName}.name as task_type_name`)
            ],
            on: Sequelize.where(Sequelize.col(`${Project_Task_Types.tableName}.id`),Sequelize.col(`${Project_Tasks.tableName}.task_type_id`))
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
            on: Sequelize.where(Sequelize.col(`${Projects_Items.tableName}.id`),Sequelize.col(`${Project_Tasks.tableName}.project_item_id`)),
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
        return await Project_Tasks.findAll(params);
    }

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
            
            let result = await Project_Tasks.create(queryParams);

            if (Utils.hasValue(queryParams.requirements)) {
                queryParams.requirements = Utils.toArray(queryParams.requirements);
                let toUpsert = queryParams.requirements.map((el:any)=>({
                status_reg_id: Record_Status.ACTIVE,
                creator_user_id : req?.user?.id || req?.user?.id || Users.SYSTEM,
                created_at: new Date(),
                data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
                is_sys_rec : 0,
                relationship_type_id : Relationship_Types.SUBORDINATED,
                table_1_id: Project_Tasks.id,
                record_1_column: 'id',
                record_1_id: result.id,
                table_2_id: Requirements.id,
                record_2_column: 'id',
                record_2_id: el.id,
                }));
        
                await Relationships.bulkCreate(toUpsert,{
                    ignoreDuplicates:true
                })                
            }

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

            if (Utils.hasValue(params.requirements)) {
                params.requirements = Utils.toArray(params.requirements);
                let toUpsert = params.requirements.map((el:any)=>({
                    status_reg_id: Record_Status.ACTIVE,
                    creator_user_id : req?.user?.id || req?.user?.id || Users.SYSTEM,
                    created_at: new Date(),
                    data_origin_id : Data_Origins.DEFAULT_ORIGINDATA,
                    is_sys_rec : 0,
                    relationship_type_id : Relationship_Types.SUBORDINATED,
                    table_1_id: Project_Tasks.id,
                    record_1_column: 'id',
                    record_1_id: params.id,
                    table_2_id: Requirements.id,
                    record_2_column: 'id',
                    record_2_id: el.id,
                }));
        
                await Relationships.bulkCreate(toUpsert,{
                    ignoreDuplicates:true
                })                
            }

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
            let records = await Project_Tasks.findAll(queryParams);
            let ids : any[] = [];
            let projectsIds : any[] = [];
            if (Utils.hasValue(records)) {
                ids = records.map(el=>el.id);
                projectsIds = records.map(el=>el.project_item_id);
            }


            await Relationships.destroy({
                where:{
                    relationship_type_id : Relationship_Types.SUBORDINATED,
                    table_1_id: Project_Tasks.id,
                    record_1_column: 'id',
                    record_1_id: {
                        [Op.in]: ids
                    },
                    table_2_id: Requirements.id,
                    record_2_column: 'id',
                }
            });
            
            await Project_Tasks.deleteData(queryParams);
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
