import { QueryTypes, Sequelize } from "sequelize";
import Tasks from "../../../database/models/Tasks.js";
import Tasks_Status_Users from "../../../database/models/Tasks_Status_Users.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "./BaseRegistersController.js";
import { NextFunction, Request, Response } from "express";
import Task_Status from "../../../database/models/Task_Status.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import Tasks_Status_Users_Logs from "../../../database/models/Tasks_Status_Users_Logs.js";

export default class TasksController extends BaseRegistersController {

    /**
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static getTableClassModel() : any {
        return Tasks;
    }

    /**    
     * mount query (default) to get tasks
     * @created 2024-12-31
     * @version 1.0.0
     */
    static mountQueryToGet(req: Request,queryParams?: any) : string {
        let query = `
            select 
                ${Tasks.tableName}.*,
                ${Tasks_Status_Users.tableName}.status_id,
                coalesce(${Tasks_Status_Users.tableName}.accumulated_time,0) + CASE 
                    WHEN ${Tasks_Status_Users.tableName}.status_id = 2 THEN 
                        TIMESTAMPDIFF(SECOND,coalesce(${Tasks_Status_Users.tableName}.last_run,CURRENT_TIMESTAMP),CURRENT_TIMESTAMP) 
                    ELSE 
                        0 
                END AS accumulated_time,                
                case 
                    when coalesce(${Tasks_Status_Users.tableName}.forecast_start_moment,${Tasks.tableName}.forecast_start_moment) < current_timestamp and ${Tasks_Status_Users.tableName}.status_id IN (1) THEN 
                        1 
                    when coalesce(${Tasks_Status_Users.tableName}.forecast_end_moment,${Tasks.tableName}.forecast_end_moment) < current_timestamp and ${Tasks_Status_Users.tableName}.status_id NOT IN (4,5) then 
                        1 
                    ELSE 0 
                END AS expired                
            from 
                ${Tasks.tableName}
                join ${Tasks_Status_Users.tableName} on (
                    ${Tasks_Status_Users.tableName}.task_id = ${Tasks.tableName}.id
                    and ${Tasks_Status_Users.tableName}.user_id = ${req.user.id}
                )
        `;
        if (Utils.hasValue(queryParams)) {
            if (Utils.hasValue(queryParams.where)) {                
                queryParams.where = DatabaseUtils.whereToString(queryParams.where,Tasks);
                if (Utils.hasValue(queryParams.where)) {
                    query += ` where ${queryParams.where}`
                }                
            }
        }
        return query;
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
            model: Tasks_Status_Users,
            attributes:[
                Sequelize.literal(`${Tasks_Status_Users.tableName}.status_id as status_id`)
            ],
            on: Sequelize.where(Sequelize.col(`${Tasks_Status_Users.tableName}.task_id`),Sequelize.col(`${Tasks.tableName}.id`))
        });
        
        return await Tasks.findAll(params);
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


    /**
     * @requesthandler
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async put(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {  
            let bodyParams = req.body || {};
            let taskParams : any = {};
            let taskXParams : any = {};
            for(let key in bodyParams) {                
                if (key != 'status_id') taskParams[key] = bodyParams[key]
                else taskXParams[key] = bodyParams[key] || Task_Status.NOT_STARTED;
            }
            taskParams.creator_user_id = req.user.id;
            taskXParams.creator_user_id = req.user.id;
            taskXParams.status_id = taskXParams.status_id || Task_Status.NOT_STARTED;
            if (taskXParams.status_id == Task_Status.RUNNING) {

                if (!Utils.hasValue(taskParams?.start_at)) {
                    taskParams.start_at = Sequelize.literal('current_timestamp');
                }                
                taskXParams.last_run = taskParams.start_at || Sequelize.literal('current_timestamp');
            }
            if (taskXParams.status_id == Task_Status.CONCLUDED && !Utils.hasValue(taskParams?.end_at)) {
                taskParams.end_at = Sequelize.literal('current_timestamp');
            }

            for(let key in taskParams) {                
                if (key.indexOf('MOMENT') > -1) {
                    if (Utils.hasValue(taskParams[key]) && typeof taskParams[key] == "string") {
                        taskParams[key] = taskParams[key];
                    }
                    taskXParams[key] = taskParams[key];
                }
            }

            let task = await Tasks.create(taskParams);
            taskXParams.task_id = task.id;
            taskXParams.user_id = req.user.id;

            let taskX = await Tasks_Status_Users.create(taskXParams);
            if (taskX.status_id == Task_Status.RUNNING) {                
                //await Task_Controller.stopOthers(task.id, taskX.id, taskX.user_id, Task_Status.STOPPED);
                //await Task_Controller.updateSupStatusToRunning(task.id, taskX.user_id, taskX.status_id);                
            }     
            let query = this.mountQueryToGet(req,{where:{id:task.id}});
            res.data = await DBConnectionManager.getDefaultDBConnection()?.query(query,{type:QueryTypes.SELECT,raw:true});
            res.data = res.data[0] || res.data;
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
            let queryParams = req.body.queryParams || req.body;
            let task : any = await Tasks.patchData(queryParams);
            if (task) {
                task = await Tasks.findOne({
                    where:{
                        id: task.id
                    }
                });
                let taskX : any = await Tasks_Status_Users.findOne({
                    where:{
                        task_id: task.id,
                        user_id: req.user.id
                    }
                });            

                let taskLogX : any = {
                    task_id: task.id,
                    user_id: req.user.id,
                    operation: 'UPDATE'
                };
                for(let key in queryParams.values || queryParams) {
                    if (['id','creator_user_id','created_at'].indexOf(key) == -1) {                        
                        if (typeof task[key] !== "undefined") {
                            if (task[key] != (queryParams.values || queryParams)[key]
                                && (task[key] != null || (task[key] == null && Utils.hasValue((queryParams.values || queryParams)[key])))
                            ) {                                                                                     
                                task[key] = (queryParams.values || queryParams)[key]; 
                                if (key.indexOf("MOMENT") > -1 && Utils.hasValue(task[key]) && typeof task[key] == 'string') {
                                    task[key] = Sequelize.fn('str_to_date',task[key],'%Y-%m-%d %H:%i:%s')//new Date(task[key]);
                                }                                
                            }
                        }

                        if (typeof taskX[key] !== "undefined") {
                            if (taskX[key] != (queryParams.values || queryParams)[key]
                                && (taskX[key] != null || (taskX[key] == null && Utils.hasValue((queryParams.values || queryParams)[key])))
                            ) {         
                                if (key == 'status_id') {
                                    taskLogX.old_status_id = taskX[key];
                                    taskLogX.new_status_id = (queryParams.values || queryParams)[key];
                                }                                                                              
                                taskX[key] = (queryParams.values || queryParams)[key]; 
                                if (key.indexOf("DATE") > -1 && Utils.hasValue(taskX[key]) && typeof taskX[key] == 'string') {
                                    taskX[key] = Sequelize.fn('str_to_date',taskX[key],'%Y-%m-%d %H:%i:%s')//new Date(taskX[key]);
                                }                                
                            }
                        }
                    }
                }
                task.updater_user_id = req.user.id;
                taskX.updater_user_id = req.user.id;

                if (taskLogX.new_status_id == Task_Status.CONCLUDED) {
                    if (!Utils.hasValue((queryParams.values || queryParams)?.end_at)) {
                        task.end_at = Sequelize.literal('current_timestamp');
                        taskX.end_at = Sequelize.literal('current_timestamp');
                    }
                }

                if (taskLogX.new_status_id == Task_Status.RUNNING) {
                    taskX.last_run = (queryParams.values || queryParams)?.start_at ? Sequelize.fn('str_to_date',(queryParams.values || queryParams)?.start_at,'%Y-%m-%d %H:%i:%s') : Sequelize.literal('current_timestamp');
                    if (!Utils.hasValue((queryParams.values || queryParams)?.start_at)) {
                        if (!Utils.hasValue(task.start_at)) {
                            task.start_at = Sequelize.literal('current_timestamp');
                        }
                        if (!Utils.hasValue(taskX.start_at)) {
                            taskX.start_at = Sequelize.literal('current_timestamp');
                        }
                    }
                } else {
                    taskX.triggering_task_id = null;
                }

                await task.save();
                await taskX.save();
                taskLogX.task_status_user_id = taskX.id;
                taskLogX = await Tasks_Status_Users_Logs.create(taskLogX);

                if (taskLogX.new_status_id == Task_Status.RUNNING) {
                    //await Task_Controller.stopOthers(task.id,taskX.id, taskX.user_id, Task_Status.STOPPED);
                    //await Task_Controller.updateSupStatusToRunning(task.id,taskX.user_id, taskLogX.new_status_id);
                } else if (Utils.hasValue(taskLogX.new_status_id)) {
                    //await Task_Controller.updateSubStatus(task.id,taskX.user_id, taskLogX.new_status_id);                          
                    //await Task_Controller.playOthers(task.id,taskX.id, taskX.user_id, Task_Status.RUNNING);
                    //update sups with new status if math rules
                    if (taskLogX.new_status_id == Task_Status.STOPPED) {
                        let idSup = task.parent_id;
                        while(Utils.hasValue(idSup)) {
                            let query = `
                                select
                                    t.id,
                                    t.parent_id,
                                    tu.id as TUID
                                from
                                    ${Tasks.tableName} t
                                    join ${Tasks_Status_Users.tableName} tu on (
                                        tu.task_id = t.id
                                        and tu.user_id = ${req.user.id}
                                        and tu.status_id = ${taskLogX.old_status_id}
                                    )
                                where
                                    t.id = ${idSup}
                                    and not exists (
                                        select
                                            1
                                        from
                                            ${Tasks.tableName} t2
                                            join ${Tasks_Status_Users.tableName} tu2 on (
                                                tu2.task_id = t2.id
                                                and tu2.user_id = ${req.user.id}
                                                and tu2.status_id NOT IN (${taskLogX.new_status_id}, ${Task_Status.CANCELED}, ${Task_Status.CONCLUDED})
                                            )
                                        where
                                            t2.parent_id = t.id
                                    )
                            `;
                            let sup : any = await DBConnectionManager.getDefaultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});
                            if (sup && sup.length > 0) {
                                sup = sup[0];
                                query = `
                                    UPDATE
                                        ${Tasks_Status_Users.name}
                                    set
                                        status_id = ${taskLogX.new_status_id},
                                        triggering_task_id = ${task.id}
                                    where
                                        id = ${sup.TUID}
                                `;
                                await DBConnectionManager.getDefaultDBConnection()?.query(query,{type:QueryTypes.UPDATE});
                                idSup = sup.parent_id;
                            } else {
                                break;
                            }
                        }
                    }

                    
                }   

                let query = this.mountQueryToGet(req,{where:{id:task.id}});
                res.data = await DBConnectionManager.getDefaultDBConnection()?.query(query,{type:QueryTypes.SELECT,raw:true});
                res.data = res.data[0] || res.data;
                res.sendResponse(200,true);
            } else {
                throw new Error(`task not found`);
            } 
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static {
        this.configureDefaultRequestHandlers();
    }
}
