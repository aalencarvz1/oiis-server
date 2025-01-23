import { NextFunction, Request, Response } from "express";
import Projects_Items from "../../../database/models/Projects_Items.js";
import Project_Tasks from "../../../database/models/Project_Tasks.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Project_Task_Types from "../../../database/models/Project_Task_Types.js";
import { Op, Sequelize } from "sequelize";
import Projects_ItemsController from "./Projects_ItemsController.js";
import Record_Status from "../../../database/models/Record_Status.js";
import Users from "../../../database/models/Users.js";
import Data_Origins from "../../../database/models/Data_Origins.js";
import Relationship_Types from "../../../database/models/Relationship_Types.js";
import Requirements from "../../../database/models/Requirements.js";
import Relationships from "../../../database/models/Relationships.js";


export default class Project_TasksController extends BaseRegistersController {

    /**
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static getTableClassModel() : any {
        return Project_Tasks;
    }


    /**
     * get data from requirements and include joins
     * @created 2025-01-01
     * @version 1.0.0
     */
    static async _get(params?: any) : Promise<any[]> {
        let queryParams = params?.queryParams || params || {};
        queryParams = DatabaseUtils.prepareQueryParams( queryParams);
        queryParams.raw = Utils.firstValid([queryParams.raw,true]);
        queryParams.include = queryParams.include || [];
        Projects_ItemsController.includeJoins(queryParams);

        //include requirements join
        queryParams.include.push({
            required:true,
            model: Project_Tasks,
            attributes:[
                Sequelize.literal(`${Project_Tasks.tableName}.id as task_id`),
                Sequelize.literal(`${Project_Tasks.tableName}.task_type_id as task_type_id`)
            ],
            on: Sequelize.where(Sequelize.col(`${Project_Tasks.tableName}.project_item_id`),Sequelize.col(`${Projects_Items.tableName}.id`)),
            include:[{
                model: Project_Task_Types,
                attributes:[
                    Sequelize.literal(`\`${Project_Tasks.tableName}->${Project_Task_Types.tableName}\`.name as task_type_name`)
                ],
                on: Sequelize.where(Sequelize.col(`\`${Project_Tasks.tableName}->${Project_Task_Types.tableName}\`.id`),Sequelize.col(`${Project_Tasks.tableName}.task_type_id`))
            }]
        });

        return await Projects_Items.findAll(queryParams);
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
            let projectItemsQueryParams = {...queryParams};

            //create project item if not has project_item_id
            let projectItem = await Projects_Items.createData(projectItemsQueryParams);

            queryParams.project_item_id = projectItem.id;
            
            //parent_id is used to project_items, not to requirements
            if (Utils.hasValue(queryParams.parent_id)) {
                queryParams.parent_id = undefined;
                delete queryParams.parent_id;
            } 
            
            let result = await Project_Tasks.create(queryParams);
                
            //relationship between task and requirement
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
                    record_2_id: el.requirement_id || el.id,
                }));
        
                await Relationships.bulkCreate(toUpsert,{
                    ignoreDuplicates:true
                })                
            }

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
            let projectItemsQueryParams = {...queryParams};

            //uprete project item if not has project_item_id
            await Projects_Items.updateData(projectItemsQueryParams);
            
            //parent_id is used to project_items, not to requirements
            if (Utils.hasValue(queryParams.parent_id)) {
                queryParams.parent_id = undefined;
                delete queryParams.parent_id;
            } 

            //relationship between task and requirement
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
                    record_1_id: queryParams.task_id,
                    table_2_id: Requirements.id,
                    record_2_column: 'id',
                    record_2_id: el.requirement_id || el.id,
                }));
        
                await Relationships.bulkCreate(toUpsert,{
                    ignoreDuplicates:true
                })  

                await Relationships.destroy({
                    where:{
                        relationship_type_id : Relationship_Types.SUBORDINATED,
                        table_1_id: Project_Tasks.id,
                        record_1_column: 'id',
                        record_1_id: queryParams.task_id,
                        table_2_id: Requirements.id,
                        record_2_column: 'id',
                        record_2_id: {
                            [Op.notIn]: toUpsert.map((el?:any)=>el.record_2_id)
                        }
                    }
                });                                
            }
            let projectItemId = queryParams.id;
            queryParams.id = queryParams.task_id;

            await Project_Tasks.updateData(queryParams);

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

            let records = await this._get(queryParams);
            let projectsIds : any[] = [];
            let tasksIds : any[] = [];
            if (Utils.hasValue(records)) {
                projectsIds = records.map(el=>el.id);
                tasksIds = records.map(el=>el.task_id);
            }

            
            
            await Relationships.destroy({
                where:{
                    relationship_type_id : Relationship_Types.SUBORDINATED,
                    table_1_id: Project_Tasks.id,
                    record_1_column: 'id',
                    record_1_id: {
                        [Op.in]:tasksIds
                    },
                    table_2_id: Requirements.id,
                    record_2_column: 'id'
                }
            });    

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
