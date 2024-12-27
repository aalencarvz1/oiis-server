const { QueryTypes, Sequelize } = require("sequelize");
const DBConnectionManager = require("../../../database/DBConnectionManager");
const { Project_Tasks } = require("../../../database/models/Project_Tasks");
const { Project_Tasks_Status_Users } = require("../../../database/models/Project_Tasks_Status_Users");
const { DataSwap } = require("../../data/DataSwap");
const { Utils } = require("../../utils/Utils");
const { RegistersController } = require("../registers/RegistersController");
const { Task_Status } = require("../../../database/models/Task_Status");
const { Projects_Items_Types } = require("../../../database/models/Projects_Items_Types");
const { Project_Task_Types } = require("../../../database/models/Project_Task_Types");
const { Projects_Items } = require("../../../database/models/Projects_Items");
const { Project_Item_Origin_Types } = require("../../../database/models/Project_item_Origin_Types");
const { Record_Status } = require("../../../database/models/Record_Status");
const { Data_Origins } = require("../../../database/models/Data_Origins");
const { Relationship_Types } = require("../../../database/models/Relationship_Types");
const { Requirements } = require("../../../database/models/Requirements");
const { Relationships } = require("../../../database/models/Relationships");


/**
 * class to handle project task operations
 * @author Alencar
 * @created 2024-12-26
 * @version 1.0.0
 */
class Project_Task_Controller extends RegistersController{


    /***************************************************************************************************************
    *                                                                                                              *
    *                                            DATA CONTROLLER METHODS                                           *
    *                                                                                                              *
    ***************************************************************************************************************/


    /**
     * create a task and its corresponding project_item, also links to requirements according params
     * @param {Object} params 
     * @returns {DataSwap}
     * @created 2024-12-26
     * @version 1.0.0
     */
    static async create_task(params) {
        let result = new DataSwap();
        try {
            params = params || {};  

            //create project_item if not referenced
            if (!Utils.hasValue(params.project_item_id)) {
                let projectItem = null;
                let projectItemParams = {...params};
                if (Utils.hasValue(projectItemParams.parent_id)) {
                    projectItemParams.parent_id = null;
                    delete projectItemParams.parent_id;
                }
                if (Utils.hasValue(projectItemParams.project_item_parent_id)) {
                    projectItemParams.parent_id = projectItemParams.project_item_parent_id;        
                } 
                projectItem = await Projects_Items.createData(projectItemParams);
                params.project_item_id = projectItem.id;
            }
            
            //create the task
            let result = await Project_Tasks.createData(params);

            //create link between task and status user task
            await Project_Tasks_Status_Users.createData({
                task_id: result?.id,
                user_id: params?.user_id
            })

            //bind task to requirement(s)
            if (Utils.hasValue(params.requirements)) {
                let toUpsert = params.requirements.map(el=>({
                    status_reg_id: Record_Status.ACTIVE,
                    creator_user_id : params?.user_id,
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
          
                await Relationships.getModel().bulkCreate(toUpsert,{
                    ignoreDuplicates:true
                })                
            }

            result.data = await this.get_tasks({
                where:{
                    id: result?.id || -1
                }
            })
            result.success = true;
        } catch(e) {
            result.setException(e);            
        }
        return result;
    }
    

    /**
     * mount default params to query (model.findAll) tasks, according params
     * @param {Object} params 
     * @returns {Object}
     * @created 2024-12-26
     * @version 1.0.0
     */
    static mountQueryParams(params) {
        let result = {
            raw:true,
            include:[{
                raw:true,
                required:true,
                model:Project_Task_Types.getModel(),
                attributes:[
                    Sequelize.literal(`${Project_Task_Types.tableName}.\`name\` as task_type_name`)
                ],
                on:Sequelize.where(Sequelize.col(`${Project_Task_Types.tableName}.id`),Sequelize.col(`${Project_Tasks.tableName}.task_type_id`))
            },{                
                raw:true,
                required:true,
                model:Projects_Items.getModel(),
                attributes:[
                    Sequelize.literal(`${Projects_Items.tableName}.parent_id as project_item_parent_id`),
                    Sequelize.literal(`${Projects_Items.tableName}.project_item_type_id as project_item_type_id`),
                    Sequelize.literal(`${Projects_Items.tableName}.project_item_origin_id as project_item_origin_id`),
                    Sequelize.literal(`${Projects_Items.tableName}.identifier as identifier`),
                    Sequelize.literal(`${Projects_Items.tableName}.\`name\` as \`name\``),
                    Sequelize.literal(`${Projects_Items.tableName}.\`description\` as \`description\``),
                    Sequelize.literal(`${Projects_Items.tableName}.notes as notes`)
                ],
                on:[
                    Sequelize.where(Sequelize.col(`${Projects_Items.tableName}.id`),Sequelize.col(`${Project_Tasks.tableName}.project_item_id`)),
                    Sequelize.where(Sequelize.col(`${Projects_Items.tableName}.project_item_type_id`), Sequelize.literal(`${Projects_Items_Types.TASK}`))
                ],
                include:[{                    
                    raw:true,
                    required:true,
                    model:Projects_Items_Types.getModel(),
                    attributes:[
                        Sequelize.literal(`\`${Projects_Items.tableName}->${Projects_Items_Types.tableName}\`.\`name\` as project_item_type_name`),
                    ],
                    on:Sequelize.where(Sequelize.col(`\`${Projects_Items.tableName}->${Projects_Items_Types.tableName}\`.id`),Sequelize.col(`${Projects_Items.tableName}.project_item_type_id`))
                },{                    
                    raw:true,
                    required:false,
                    model: Project_Item_Origin_Types.getModel(),
                    attributes:[
                        Sequelize.literal(`\`${Projects_Items.tableName}->${Project_Item_Origin_Types.tableName}\`.\`name\` as project_item_origin_name`),
                    ],
                    on: Sequelize.where(Sequelize.col(`\`${Projects_Items.tableName}->${Project_Item_Origin_Types.tableName}\`.id`),Sequelize.col(`${Projects_Items.tableName}.project_item_origin_id`))
                }]
            },{
                raw:true,
                required:true,
                model: Project_Tasks_Status_Users.getModel(),
                attributes:[
                    Sequelize.literal(`${Project_Tasks_Status_Users.tableName}.status_id as status_id`),                  
                ],
                on: [
                    Sequelize.where(Sequelize.col(`${Project_Tasks_Status_Users.tableName}.task_id`),Sequelize.col(`${Project_Tasks.tableName}.id`)),
                    Sequelize.where(Sequelize.col(`${Project_Tasks_Status_Users.tableName}.user_id`),Sequelize.literal(params?.user_id || -1))
                ],
                include:[{
                    raw:true,
                    required:false,
                    model: Task_Status.getModel(),
                    attributes:[
                        Sequelize.literal(`\`${Project_Tasks_Status_Users.tableName}->${Task_Status.tableName}\`.\`name\` as status_name`),
                        Sequelize.literal(`\`${Project_Tasks_Status_Users.tableName}->${Task_Status.tableName}\`.is_running as is_running`),
                        Sequelize.literal(`\`${Project_Tasks_Status_Users.tableName}->${Task_Status.tableName}\`.is_stopped as is_stopped`),
                        Sequelize.literal(`\`${Project_Tasks_Status_Users.tableName}->${Task_Status.tableName}\`.is_canceled as is_canceled`),
                        Sequelize.literal(`\`${Project_Tasks_Status_Users.tableName}->${Task_Status.tableName}\`.is_concluded as is_concluded`),
                        Sequelize.literal(`\`${Project_Tasks_Status_Users.tableName}->${Task_Status.tableName}\`.is_visible as is_visible`)
                    ],
                    on: Sequelize.where(Sequelize.col(`\`${Project_Tasks_Status_Users.tableName}->${Task_Status.tableName}\`.id`),Sequelize.col(`${Project_Tasks_Status_Users.tableName}.status_id`))                    
                }]
            }],
            where: params?.where || undefined
        };
        return result;
    }


    /**
     * 
     * @param {Object} params 
     * @returns {DataSwap}
     * @created 2024-12-26
     * @version 1.0.0
     */
    static async get_tasks(params) {
        let result = new DataSwap();
        try {
            let queryParams = this.mountQueryParams(params);
            result.data = await Project_Tasks.getModel().findAll(queryParams);
            result.success = true;
        } catch(e) {
            result.setException(e);            
        }
        return result;
    }

    /**
     * 
     * @param {Object} params 
     * @returns {DataSwap}
     * @created 2024-12-26
     * @version 1.0.0
     */
    static async update_task_status(params) {
        let result = new DataSwap();
        try {
            if (Utils.hasValue(params?.task_id) && Utils.hasValue(params?.user_id)) {
                let query = `
                    select
                        t.*,
                        tu.id as "${Project_Tasks_Status_Users.tableName}_id",
                        tu.status_id,
                        ts.is_running,                        
                        ts.is_stopped,
                        ts.is_canceled,
                        ts.is_concluded
                    from
                        ${Project_Tasks.tableName} t
                        left outer join ${Project_Tasks_Status_Users.tableName} tu on (
                            tu.task_id = t.id
                            and tu.user_id = ${params.user_id}
                        )
                        left outer join ${Task_Status.tableName} ts on ts.id = tu.status_id
                    where
                        t.id = ${params.task_id}
                `;
                let task = await DBConnectionManager.getDefaultDBConnection().query(
                    query,{
                        raw:true,
                        type:QueryTypes.SELECT
                    }
                );
                task = task[0] || null;
                if (Utils.hasValue(task)) {

                    let newTaskStatusId = Task_Status.NOT_STARTED;
                    if (Utils.hasValue(params?.new_task_status_id || params?.new_status_id || params?.task_status_id || params?.status_id)) {
                        newTaskStatusId = params?.new_task_status_id || params?.new_status_id || params?.task_status_id || params?.status_id;
                    } else if (Utils.hasValue(params?.new_task_status || params?.new_status || params?.task_status || params?.status)) {
                        let newTaskStatusName = (params?.new_task_status || params?.new_status || params?.task_status || params?.status || '').trim().toUpperCase();
                        if (Utils.hasValue(Task_Status[newTaskStatusName])) {
                            newTaskStatusId = Task_Status[newTaskStatusName];
                        } else {
                            switch(newTaskStatusName) {
                                case 'RUN':
                                case 'RUNNING':
                                    newTaskStatusId = Task_Status.RUNNING;
                                break;
                                case 'STOP':
                                case 'STOPED':
                                    newTaskStatusId = Task_Status.STOPPED;
                                break;
                                case 'CANCEL':
                                case 'CANCELED':
                                    newTaskStatusId = Task_Status.CANCELED;
                                break;
                                case 'CONCLUDE':
                                case 'CONCLUDED':
                                    newTaskStatusId = Task_Status.CONCLUDED;
                                break;
                            }
                        }
                    }

                    if (Utils.hasValue(task[`${Project_Tasks_Status_Users.tableName}_id`])) {
                        query = `
                            update
                                ${Project_Tasks_Status_Users.tableName}
                            set
                                status_id = ${newTaskStatusId}
                            where
                                id = ${task[`${Project_Tasks_Status_Users.tableName}_id`]}
                        `
                        await DBConnectionManager.getDefaultDBConnection().query(
                            query,{
                                type: QueryTypes.UPDATE
                            }
                        )
                    } else {
                        task = await Project_Tasks_Status_Users.getModel().create({
                            task_id: params.task_id,
                            user_id: params.user_id,
                            status_id: newTaskStatusId
                        });
                    }
                    result.data = {
                        affected_task_ids:[
                            params.task_id
                        ]
                    };
                    result.success = true;
                } else {
                    throw new Error("task not found");
                }
                
            } else {
                throw new Error("missing data");
            }
        } catch(e) {
            result.setException(e);            
        }
        return result;
    }



    


    

    /***************************************************************************************************************
    *                                                                                                              *
    *                                            REQUEST RECEIVER METHODS                                          *
    *                                                                                                              *
    ***************************************************************************************************************/


    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @created 2024-12-26
     * @version 1.0.0
     */
    static async req_create_task(req,res) {
        try {
            let params = req.body;
            params.user_id = req.user.id;
            res.setDataSwap(await this.create_task(params));
        } catch(e) {
            res.setException(e);            
        }
        res.sendResponse();
    }


    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @created 2024-12-26
     * @version 1.0.0
     */
    static async req_get_tasks(req,res) {
        try {
            let params = req.body;
            params.user_id = req.user.id;
            res.setDataSwap(await this.get_tasks(params));
        } catch(e) {
            res.setException(e);            
        }
        res.sendResponse();
    }


    /**
     * 
     * @param {Request} req 
     * @param {Response} res 
     * @created 2024-12-26
     * @version 1.0.0
     */
    static async req_update_task_status(req,res) {
        try {
            let params = req.body;
            params.user_id = req.user.id;
            res.setDataSwap(await this.update_task_status(params));
        } catch(e) {
            res.setException(e);            
        }
        res.sendResponse();
    }




}

module.exports = {Project_Task_Controller}