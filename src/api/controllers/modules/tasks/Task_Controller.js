
const { Sequelize, QueryTypes } = require("sequelize");
const { Tasks } = require("../../../database/models/Tasks");
const { Task_Status } = require("../../../database/models/Task_Status");
const { Tasks_Status_Users_Logs } = require("../../../database/models/Tasks_Status_Users_Logs");
const { Utils } = require("../../utils/Utils");
const DBConnectionManager = require("../../../database/DBConnectionManager");
const { Tasks_Status_Users } = require("../../../database/models/Tasks_Status_Users");
const { DatabaseUtils } = require("../../database/DatabaseUtils");
const { RegistersController } = require("../registers/RegistersController");



/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 */
class Task_Controller extends RegistersController{

    static async getIdsSupsX(pTaskId,pUserId) {
        let result = [];
        let query = `
            select
                x.id
            from
                (select  id,
                        parent_id,
                        start_at
                from    (select * from tasks
                        order by parent_id desc, id desc) products_sorted,
                        (select @pv := '${pTaskId}') initialisation
                where   find_in_set(id, @pv)
                and     length(@pv := concat(@pv, ',', coalesce(parent_id,id)))
                order by
                    parent_id,ID
                ) t
                join ${Tasks_Status_Users.tableName} x on (
                    x.task_id = t.id
                    and x.user_id = ${pUserId}
                )
        `;
        let sups = await DBConnectionManager.getDefaultDBConnection().query(query);
        sups = sups[0] || sups;
        if (sups) {
            result = sups.map(el=>el.id);
            result.pop(); //remove self, return only sups
        }
        return result;
    }

    static async getIdsSubsX(pTaskId, pUserId) {
        let result = [];
        let query = `
            select
                x.id
            from
                (select  id,
                        parent_id,
                        start_at,
                        @pv
                from    (select * from tasks
                        order by parent_id, id) products_sorted,
                        (select @pv := '${pTaskId}') initialisation
                where   find_in_set(parent_id, @pv)
                and     length(@pv := concat(@pv, ',', id))
                order by
                    parent_id,ID
                ) t
                join ${Tasks_Status_Users.tableName} x on (
                    x.task_id = t.id
                    and x.user_id = ${pUserId}
                )
        `;
        let subs = await DBConnectionManager.getDefaultDBConnection().query(query);
        subs = subs[0] || subs;
        if (subs) {
            result = subs.map(el=>el.id); 
            //result.shift(); //remove self, return only sups //returning without self, not necessary shift
        }
        return result;
    }

    static async updateSupStatusToRunning(pIdTask,pIdUser,pIdNewStatus) {
        let idsSups = await Task_Controller.getIdsSupsX(pIdTask,pIdUser);            
        if (idsSups && idsSups.length > 0) {

            let query = `
                update
                    ${Tasks_Status_Users.tableName}
                set
                    status_id=${pIdNewStatus},
                    start_at=coalesce(start_at,current_timestamp),
                    last_run=CASE WHEN ${pIdNewStatus} = 2 THEN current_timestamp else last_run END
                where
                    id IN (${idsSups.join(',')})
                    AND user_id = ${pIdUser}
                    AND status_id != ${pIdNewStatus}
            `;
            await DBConnectionManager.getDefaultDBConnection().query(query);
        }
    }    

    static async updateSubStatus(pTaskId,pUserId,pIdNewStatus) {
        let idsSubs = await Task_Controller.getIdsSubsX(pTaskId,pUserId);            
        if (idsSubs && idsSubs.length > 0) {                
            let query = `
                update
                    ${Tasks_Status_Users.tableName} t1
                    join ${Task_Status.tableName} ts on ts.id = t1.status_id
                    join ${Task_Status.tableName} tsn on tsn.id = ${pIdNewStatus}
                set
                    t1.status_id=${pIdNewStatus},
                    t1.end_at=CASE WHEN coalesce(tsn.is_concluded,0) = 1 then current_timestamp else t1.end_at end
                where
                    t1.id IN (${idsSubs.join(',')})
                    and t1.user_id = ${pUserId}
                    and coalesce(tsn.is_running,0) = 0 
                    and (
                        coalesce(ts.is_running,0) = 1
                        or (
                            1 in (coalesce(tsn.is_concluded,0),coalesce(tsn.is_canceled,0))
                            and 1 not in (coalesce(ts.is_concluded,0),coalesce(ts.is_canceled,0))
                        )
                        or (
                            coalesce(tsn.is_stopped,0) = 1
                            and coalesce(ts.is_running,0) = 1
                        )
                    )                                           
            `;
            await DBConnectionManager.getDefaultDBConnection().query(query);

            if (pIdNewStatus != Task_Status.RUNNING) {
                let query = `
                    update
                        ${Tasks_Status_Users.tableName}
                    set
                        status_id=${Task_Status.RUNNING} 
                    where
                        user_id = ${pUserId}
                        AND status_id = ${Task_Status.STOPED}
                        AND triggering_task_id in (${idsSubs.join(',')})
                `;
                await DBConnectionManager.getDefaultDBConnection().query(query);                    
            }
        }
    }

    static async stopOthers(pIdTask,pIdX,pIdUser,pIdNewStatus) {
        let idsSups = await Task_Controller.getIdsSupsX(pIdTask,pIdUser);            
        let idsSubs = await Task_Controller.getIdsSubsX(pIdTask,pIdUser);            
        idsSups = idsSups || [];
        idsSubs = idsSubs || [];
        let idsPreserve = idsSups.concat(idsSubs);
        idsPreserve.push(pIdX);
        if (idsPreserve && idsPreserve.length > 0) {
            let query = `
                update
                    ${Tasks_Status_Users.tableName}
                set
                    status_id=${pIdNewStatus},
                    triggering_task_id=${pIdTask}
                where
                    id NOT IN (${idsPreserve.join(',')})
                    AND user_id = ${pIdUser}
                    AND status_id = ${Task_Status.RUNNING}
            `;
            await DBConnectionManager.getDefaultDBConnection().query(query);
        }
    }

    static async playOthers(pIdTask,pIdX,pIdUser,pIdNewStatus) {
        let idsSups = await Task_Controller.getIdsSupsX(pIdTask,pIdUser);            
        let idsSubs = await Task_Controller.getIdsSubsX(pIdTask,pIdUser);            
        idsSups = idsSups || [];
        idsSubs = idsSubs || [];
        let idsPreserve = idsSups.concat(idsSubs);
        idsPreserve.push(pIdX);
        if (idsPreserve && idsPreserve.length > 0) {
            let query = `
                update
                    ${Tasks_Status_Users.tableName} t
                set
                    t.status_id=${pIdNewStatus}                        
                where
                    t.id NOT IN (${idsPreserve.join(',')})
                    AND t.user_id = ${pIdUser}
                    AND t.status_id = ${Task_Status.STOPED}
                    AND t.triggering_task_id = ${pIdTask}
            `;
            let [result,metadata] = await DBConnectionManager.getDefaultDBConnection().query(query,{type:QueryTypes.UPDATE});
            if (metadata.affectedRows > 0 && pIdNewStatus == Task_Status.RUNNING && idsSups.length > 0) {
                query = `
                    update
                        ${Tasks_Status_Users.tableName}
                    set
                        status_id=${Task_Status.STOPED}                        
                    where
                        id NOT IN (${idsPreserve.join(',')})
                        AND id IN (${idsSups.join(',')})
                        AND user_id = ${pIdUser}
                        AND status_id = ${Task_Status.RUNNING}
                `;
                await DBConnectionManager.getDefaultDBConnection().query(query,{type:QueryTypes.UPDATE});
            }
        }
    }

    static async mountQueryParamsToGet(req,queryParams) {
        queryParams = queryParams || {};
        queryParams = await DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = true;
        queryParams.where = queryParams.where || {};
        queryParams.where.creator_user_id = req.user.id;

        queryParams.attributes = [
            `${Tasks.tableName}.*`,
            Sequelize.literal(`${Tasks_Status_Users.tableName}.status_id`),
            Sequelize.literal(`coalesce(${Tasks_Status_Users.tableName}.accumulated_time,0) + CASE WHEN ${Tasks_Status_Users.tableName}.status_id = 2 THEN TIMESTAMPDIFF(SECOND,coalesce(${Tasks_Status_Users.tableName}.last_run,CURRENT_TIMESTAMP),CURRENT_TIMESTAMP) ELSE 0 END AS accumulated_time`),
            Sequelize.literal(`
                case 
                    when coalesce(${Tasks_Status_Users.tableName}.forecast_start_moment,${Tasks.tableName}.forecast_start_moment) < current_timestamp and ${Tasks_Status_Users.tableName}.status_id IN (1) THEN 
                        1 
                    when coalesce(${Tasks_Status_Users.tableName}.forecast_end_moment,${Tasks.tableName}.forecast_end_moment) < current_timestamp and ${Tasks_Status_Users.tableName}.status_id NOT IN (4,5) then 
                        1 
                    ELSE 0 
                END AS expired`
            )
        ];
        queryParams.include = [{
            raw:true,
            model:Tasks_Status_Users.getModel(),
            attributes:[],
            required:true,
            on:{
                [Sequelize.Op.and]:[
                    Sequelize.where(Sequelize.col(`${Tasks_Status_Users.tableName}.task_id`),'=',Sequelize.col(`${Tasks.tableName}.id`)),
                    {user_id: req.user.id}
                ]
            }
        }];
        return queryParams;
    }

    static mountQueryToGet(req,queryParams) {
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


    static async get(req,res,next) {
        try {
            if (Utils.hasValue(req.body.search)) {
                if (Utils.hasValue(req.body.search.ids)) {
                    if (Utils.typeOf(req.body.search.ids) !== 'array') {
                        req.body.search.ids = req.body.search.ids.toString().split(',');                        
                    }
                    req.body.search.ids = req.body.search.ids.map(el=>Utils.hasValue(el) ? el : 'null');
                }                
                let query = `
                    SELECT 
                        t.*                        
                    FROM
                        (SELECT 
                            t.*,
                            tx.status_id,
                            coalesce(tx.accumulated_time,0) + CASE WHEN tx.status_id = 2 THEN TIMESTAMPDIFF(SECOND,coalesce(tx.last_run,CURRENT_TIMESTAMP),CURRENT_TIMESTAMP) ELSE 0 END AS accumulated_time,
                            case 
                                when coalesce(tx.forecast_start_moment,t.forecast_start_moment) < current_timestamp and tx.status_id IN (1) THEN 
                                    1 
                                when coalesce(tx.forecast_end_moment,t.forecast_end_moment) < current_timestamp and tx.status_id NOT IN (4,5) then 
                                    1 
                                ELSE 0 
                            END AS expired
                        FROM
                            tasks t
                            join Tasks_Status_Users tx on (
                                tx.task_id = t.id
                                and tx.user_id = ${req.user.id}
                            )
                        ORDER BY 
                            t.parent_id DESC , 
                            t.id DESC
                        ) t,
                        (SELECT @pv:=(
                            select 
                                group_concat(replace(
                                    case 
                                        when ti.parent_id is null then ti.id
                                        else concat(ti.parent_id,',',ti.id)
                                    end
                                ,'.',','),',') 
                            from 
                                tasks ti 
                                join tasks_status_users tx on (
                                    tx.task_id = ti.id
                                    and tx.user_id = ${req.user.id}                                    
                                )            
                            where 			
                                ti.name like '%${req.body.search.value}%'
                                ${req.body.search.ids ? `and id in (${req.body.search.ids.join(',')})` : ''}
                        )) initialisation
                    WHERE
                        FIND_IN_SET(id, @pv)
                        AND LENGTH(@pv:=CONCAT(@pv, ',', COALESCE(parent_id, id)))
                        ${req.body.search.parent_id ? `and FIND_IN_SET(${req.body.search.parent_id}, @pv)` : ''}                        
                    order by parent_id,id                        
                `;
                
                res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,type:QueryTypes.SELECT});
            } else {
                let query = this.mountQueryToGet(req,req.body.queryParams);
                res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{type:QueryTypes.SELECT,raw:true});
            }
            res.sendResponse(200,true);
        } catch (e) {
            res.sendResponse(417,false,e.message || e,null,e);
        }
    }
    
    static async create(req,res,next) {
        try {
            let bodyParams = req.body || {};
            let taskParams = {};
            let taskXParams = {};
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

            let task = await Tasks.getModel().create(taskParams);
            taskXParams.task_id = task.id;
            taskXParams.user_id = req.user.id;

            let taskX = await Tasks_Status_Users.getModel().create(taskXParams);
            if (taskX.status_id == Task_Status.RUNNING) {                
                await Task_Controller.stopOthers(task.id, taskX.id, taskX.user_id, Task_Status.STOPED);
                await Task_Controller.updateSupStatusToRunning(task.id, taskX.user_id, taskX.status_id);                
            }     
            let query = this.mountQueryToGet(req,{where:{id:task.id}});
            res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{type:QueryTypes.SELECT,raw:true});
            res.sendResponse(200,true);
        } catch (e) {
            Utils.logError(e);
            res.sendResponse(417,false,e.message || e,null,e);
        }
    }
    static put = this.create;


    static async delete(req,res,next) {
        try {
            await Tasks.getModel().destroy({
                where:{
                    id: {
                        [Sequelize.Op.in]: req.body.ids || []
                    }
                }
            });  
            res.sendResponse(200,true);
        } catch (e) {
            res.sendResponse(417,false,e.message || e,null,e);
        }
    }

    static async move(req,res,next) {
        try {
            await Tasks.getModel().update({
                parent_id:req.body?.parent_id
            },{
                where:{
                    id: {
                        [Sequelize.Op.in]:req.body?.ids
                    }
                }
            }); 
            res.sendResponse(200,true);
        } catch (e) {
            Utils.logError(e);
            res.sendResponse(517,false,e.message || e,null,e);
        }
    }

        
    static async update(req,res,next) {
        try {
            let task = await Tasks.getModel().findOne({
                where:{
                    id: req.body?.id
                }
            });
            let taskX = await Tasks_Status_Users.getModel().findOne({
                where:{
                    task_id: req.body?.id,
                    user_id: req.user.id
                }
            });            
            if (task) {
                let taskLogX = {
                    task_id: task.id,
                    user_id: req.user.id,
                    operation: 'UPDATE'
                };
                for(let key in req.body) {
                    if (['id','creator_user_id','created_at'].indexOf(key) == -1) {                        
                        if (typeof task[key] !== "undefined") {
                            if (task[key] != req.body[key]
                                && (task[key] != null || (task[key] == null && Utils.hasValue(req.body[key])))
                            ) {                                                                                     
                                task[key] = req.body[key]; 
                                if (key.indexOf("MOMENT") > -1 && Utils.hasValue(task[key]) && typeof task[key] == 'string') {
                                    task[key] = Sequelize.fn('str_to_date',task[key],'%Y-%m-%d %H:%i:%s')//new Date(task[key]);
                                }                                
                            }
                        }

                        if (typeof taskX[key] !== "undefined") {
                            if (taskX[key] != req.body[key]
                                && (taskX[key] != null || (taskX[key] == null && Utils.hasValue(req.body[key])))
                            ) {         
                                if (key == 'status_id') {
                                    taskLogX.old_status_id = taskX[key];
                                    taskLogX.new_status_id = req.body[key];
                                }                                                                              
                                taskX[key] = req.body[key]; 
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
                    if (!Utils.hasValue(req.body?.end_at)) {
                        task.end_at = Sequelize.literal('current_timestamp');
                        taskX.end_at = Sequelize.literal('current_timestamp');
                    }
                }

                if (taskLogX.new_status_id == Task_Status.RUNNING) {
                    taskX.last_run = req.body?.start_at ? Sequelize.fn('str_to_date',req.body?.start_at,'%Y-%m-%d %H:%i:%s') : Sequelize.literal('current_timestamp');
                    if (!Utils.hasValue(req.body?.start_at)) {
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
                taskLogX = await Tasks_Status_Users_Logs.getModel().create(taskLogX);

                if (taskLogX.new_status_id == Task_Status.RUNNING) {
                    await Task_Controller.stopOthers(task.id,taskX.id, taskX.user_id, Task_Status.STOPED);
                    await Task_Controller.updateSupStatusToRunning(task.id,taskX.user_id, taskLogX.new_status_id);
                } else if (Utils.hasValue(taskLogX.new_status_id)) {
                    await Task_Controller.updateSubStatus(task.id,taskX.user_id, taskLogX.new_status_id);                          
                    await Task_Controller.playOthers(task.id,taskX.id, taskX.user_id, Task_Status.RUNNING);
                    //update sups with new status if math rules
                    if (taskLogX.new_status_id == Task_Status.STOPED) {
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
                            let sup = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,type:QueryTypes.SELECT});
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
                                await DBConnectionManager.getDefaultDBConnection().query(query,{type:QueryTypes.UPDATE});
                                idSup = sup.parent_id;
                            } else {
                                break;
                            }
                        }
                    }

                    
                }   

                let query = this.mountQueryToGet(req,{where:{id:task.id}});
                res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{type:QueryTypes.SELECT,raw:true});
                res.sendResponse(200,true);
            } else {
                throw new Error(`task ${req.body?.id} not found`);
            }            
        } catch (e) {
            Utils.logError(e);
            res.sendResponse(417,false,e.message || e,null,e);
        }
    }
    static patch = this.update;
}

module.exports = {Task_Controller}