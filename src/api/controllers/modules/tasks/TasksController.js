
const { Sequelize, QueryTypes } = require("sequelize");
const { Tasks } = require("../../../database/models/Tasks");
const { TasksStatus } = require("../../../database/models/TasksStatus");
const { TasksXStatusXUsersLogs } = require("../../../database/models/TasksXStatusXUsersLogs");
const { Utils } = require("../../utils/Utils");
const DBConnectionManager = require("../../../database/DBConnectionManager");
const { TasksXStatusXUsers } = require("../../../database/models/TasksXStatusXUsers");
const { DatabaseUtils } = require("../../database/DatabaseUtils");
const { RegistersController } = require("../registers/RegistersController");



/**
 * Class controller to handle wms module
 * @author Alencar
 * @created 2023-29-08
 */
class TasksController extends RegistersController{

    static async getIdsSupsX(pTaskId,pUserId) {
        let result = [];
        try {
            let query = `
                select
                    x.id
                from
                    (select  id,
                            IDSUP,
                            STARTMOMENT
                    from    (select * from tasks
                            order by IDSUP desc, id desc) products_sorted,
                            (select @pv := '${pTaskId}') initialisation
                    where   find_in_set(id, @pv)
                    and     length(@pv := concat(@pv, ',', coalesce(IDSUP,id)))
                    order by
                        IDSUP,ID
                    ) t
                    join ${TasksXStatusXUsers.tableName} x on (
                        x.IDTASK = t.id
                        and x.IDUSER = ${pUserId}
                    )
            `;
            let sups = await DBConnectionManager.getDefaultDBConnection().query(query);
            sups = sups[0] || sups;
            if (sups) {
                result = sups.map(el=>el.id);
                result.pop(); //remove self, return only sups
            }
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }

    static async getIdsSubsX(pTaskId, pUserId) {
        let result = [];
        try {
            let query = `
                select
                    x.id
                from
                    (select  id,
                            IDSUP,
                            STARTMOMENT,
                            @pv
                    from    (select * from tasks
                            order by IDSUP, id) products_sorted,
                            (select @pv := '${pTaskId}') initialisation
                    where   find_in_set(IDSUP, @pv)
                    and     length(@pv := concat(@pv, ',', id))
                    order by
                        IDSUP,ID
                    ) t
                    join ${TasksXStatusXUsers.tableName} x on (
                        x.IDTASK = t.id
                        and x.IDUSER = ${pUserId}
                    )
            `;
            let subs = await DBConnectionManager.getDefaultDBConnection().query(query);
            subs = subs[0] || subs;
            if (subs) {
                result = subs.map(el=>el.id); 
                //result.shift(); //remove self, return only sups //returning without self, not necessary shift
            }
        } catch (e) {
            Utils.log(e);
        }
        return result;
    }

    static async updateSupStatusToRunning(pIdTask,pIdUser,pIdNewStatus) {
        try {
            let idsSups = await TasksController.getIdsSupsX(pIdTask,pIdUser);            
            if (idsSups && idsSups.length > 0) {

                let query = `
                    update
                        ${TasksXStatusXUsers.tableName}
                    set
                        IDSTATUS=${pIdNewStatus},
                        STARTMOMENT=coalesce(STARTMOMENT,current_timestamp),
                        LASTRUN=CASE WHEN ${pIdNewStatus} = 2 THEN current_timestamp else LASTRUN END
                    where
                        id IN (${idsSups.join(',')})
                        AND IDUSER = ${pIdUser}
                        AND IDSTATUS != ${pIdNewStatus}
                `;
                await DBConnectionManager.getDefaultDBConnection().query(query);
            }
        } catch (e) {
            Utils.log(e);
        }
    }    

    static async updateSubStatus(pTaskId,pUserId,pIdNewStatus) {
        try {
            let idsSubs = await TasksController.getIdsSubsX(pTaskId,pUserId);            
            if (idsSubs && idsSubs.length > 0) {                
                let query = `
                    update
                        ${TasksXStatusXUsers.tableName} t1
                        join ${TasksStatus.tableName} ts on ts.id = t1.IDSTATUS
                        join ${TasksStatus.tableName} tsn on tsn.id = ${pIdNewStatus}
                    set
                        t1.IDSTATUS=${pIdNewStatus},
                        t1.ENDMOMENT=CASE WHEN coalesce(tsn.ISCONCLUDED,0) = 1 then current_timestamp else t1.ENDMOMENT end
                    where
                        t1.id IN (${idsSubs.join(',')})
                        and t1.IDUSER = ${pUserId}
                        and coalesce(tsn.ISRUNNING,0) = 0 
                        and (
                            coalesce(ts.ISRUNNING,0) = 1
                            or (
                                1 in (coalesce(tsn.ISCONCLUDED,0),coalesce(tsn.ISCANCELED,0))
                                and 1 not in (coalesce(ts.ISCONCLUDED,0),coalesce(ts.ISCANCELED,0))
                            )
                            or (
                                coalesce(tsn.ISSTOPED,0) = 1
                                and coalesce(ts.ISRUNNING,0) = 1
                            )
                        )                                           
                `;
                await DBConnectionManager.getDefaultDBConnection().query(query);

                if (pIdNewStatus != TasksStatus.RUNNING) {
                    let query = `
                        update
                            ${TasksXStatusXUsers.tableName}
                        set
                            IDSTATUS=${TasksStatus.RUNNING} 
                        where
                            IDUSER = ${pUserId}
                            AND IDSTATUS = ${TasksStatus.STOPED}
                            AND IDTASKCAUSESTATUS in (${idsSubs.join(',')})
                    `;
                    await DBConnectionManager.getDefaultDBConnection().query(query);                    
                }
            }
        } catch (e) {
            Utils.log(e);
        }
    }

    static async stopOthers(pIdTask,pIdX,pIdUser,pIdNewStatus) {
        Utils.log(`INIT ${TasksController.name}.stopOthers`);
        try {            
            let idsSups = await TasksController.getIdsSupsX(pIdTask,pIdUser);            
            let idsSubs = await TasksController.getIdsSubsX(pIdTask,pIdUser);            
            idsSups = idsSups || [];
            idsSubs = idsSubs || [];
            let idsPreserve = idsSups.concat(idsSubs);
            idsPreserve.push(pIdX);
            if (idsPreserve && idsPreserve.length > 0) {
                let query = `
                    update
                        ${TasksXStatusXUsers.tableName}
                    set
                        IDSTATUS=${pIdNewStatus},
                        IDTASKCAUSESTATUS=${pIdTask}
                    where
                        id NOT IN (${idsPreserve.join(',')})
                        AND IDUSER = ${pIdUser}
                        AND IDSTATUS = ${TasksStatus.RUNNING}
                `;
                await DBConnectionManager.getDefaultDBConnection().query(query);
            }
        } catch (e) {
            Utils.log(e);
        }
        Utils.log(`END ${TasksController.name}.stopOthers`);
    }

    static async playOthers(pIdTask,pIdX,pIdUser,pIdNewStatus) {
        Utils.log(`INIT ${TasksController.name}.playOthers`);
        try {
            let idsSups = await TasksController.getIdsSupsX(pIdTask,pIdUser);            
            let idsSubs = await TasksController.getIdsSubsX(pIdTask,pIdUser);            
            idsSups = idsSups || [];
            idsSubs = idsSubs || [];
            let idsPreserve = idsSups.concat(idsSubs);
            idsPreserve.push(pIdX);
            if (idsPreserve && idsPreserve.length > 0) {
                let query = `
                    update
                        ${TasksXStatusXUsers.tableName} t
                    set
                        t.IDSTATUS=${pIdNewStatus}                        
                    where
                        t.id NOT IN (${idsPreserve.join(',')})
                        AND t.IDUSER = ${pIdUser}
                        AND t.IDSTATUS = ${TasksStatus.STOPED}
                        AND t.IDTASKCAUSESTATUS = ${pIdTask}
                `;
                let [result,metadata] = await DBConnectionManager.getDefaultDBConnection().query(query,{queryType:QueryTypes.UPDATE});
                if (metadata.affectedRows > 0 && pIdNewStatus == TasksStatus.RUNNING && idsSups.length > 0) {
                    query = `
                        update
                            ${TasksXStatusXUsers.tableName}
                        set
                            IDSTATUS=${TasksStatus.STOPED}                        
                        where
                            id NOT IN (${idsPreserve.join(',')})
                            AND id IN (${idsSups.join(',')})
                            AND IDUSER = ${pIdUser}
                            AND IDSTATUS = ${TasksStatus.RUNNING}
                    `;
                    await DBConnectionManager.getDefaultDBConnection().query(query,{queryType:QueryTypes.UPDATE});
                }
            }
        } catch (e) {
            Utils.log(e);
        }
        Utils.log(`END ${TasksController.name}.playOthers`);
    }

    static mountQueryParamsToGet(req,queryParams) {
        queryParams = queryParams || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = true;
        queryParams.where = queryParams.where || {};
        queryParams.where.creator_user_id = req.user.id;

        queryParams.attributes = [
            `${Tasks.tableName}.*`,
            Sequelize.literal(`${TasksXStatusXUsers.tableName}.IDSTATUS`),
            Sequelize.literal(`coalesce(${TasksXStatusXUsers.tableName}.ACCUMTIME,0) + CASE WHEN ${TasksXStatusXUsers.tableName}.IDSTATUS = 2 THEN TIMESTAMPDIFF(SECOND,coalesce(${TasksXStatusXUsers.tableName}.LASTRUN,CURRENT_TIMESTAMP),CURRENT_TIMESTAMP) ELSE 0 END AS ACCUMTIME`),
            Sequelize.literal(`
                case 
                    when coalesce(${TasksXStatusXUsers.tableName}.FORECASTSTARTMOMENT,${Tasks.tableName}.FORECASTSTARTMOMENT) < current_timestamp and ${TasksXStatusXUsers.tableName}.IDSTATUS IN (1) THEN 
                        1 
                    when coalesce(${TasksXStatusXUsers.tableName}.FORECASTENDMOMENT,${Tasks.tableName}.FORECASTENDMOMENT) < current_timestamp and ${TasksXStatusXUsers.tableName}.IDSTATUS NOT IN (4,5) then 
                        1 
                    ELSE 0 
                END AS EXPIRED`
            )
        ];
        queryParams.include = [{
            raw:true,
            model:TasksXStatusXUsers.getModel(),
            attributes:[],
            required:true,
            on:{
                [Sequelize.Op.and]:[
                    Sequelize.where(Sequelize.col(`${TasksXStatusXUsers.tableName}.IDTASK`),'=',Sequelize.col(`${Tasks.tableName}.id`)),
                    {IDUSER: req.user.id}
                ]
            }
        }];
        return queryParams;
    }

    static mountQueryToGet(req,queryParams) {
        let query = `
            select 
                ${Tasks.tableName}.*,
                ${TasksXStatusXUsers.tableName}.IDSTATUS,
                coalesce(${TasksXStatusXUsers.tableName}.ACCUMTIME,0) + CASE 
                    WHEN ${TasksXStatusXUsers.tableName}.IDSTATUS = 2 THEN 
                        TIMESTAMPDIFF(SECOND,coalesce(${TasksXStatusXUsers.tableName}.LASTRUN,CURRENT_TIMESTAMP),CURRENT_TIMESTAMP) 
                    ELSE 
                        0 
                END AS ACCUMTIME,                
                case 
                    when coalesce(${TasksXStatusXUsers.tableName}.FORECASTSTARTMOMENT,${Tasks.tableName}.FORECASTSTARTMOMENT) < current_timestamp and ${TasksXStatusXUsers.tableName}.IDSTATUS IN (1) THEN 
                        1 
                    when coalesce(${TasksXStatusXUsers.tableName}.FORECASTENDMOMENT,${Tasks.tableName}.FORECASTENDMOMENT) < current_timestamp and ${TasksXStatusXUsers.tableName}.IDSTATUS NOT IN (4,5) then 
                        1 
                    ELSE 0 
                END AS EXPIRED                
            from 
                ${Tasks.tableName}
                join ${TasksXStatusXUsers.tableName} on (
                    ${TasksXStatusXUsers.tableName}.IDTASK = ${Tasks.tableName}.id
                    and ${TasksXStatusXUsers.tableName}.IDUSER = ${req.user.id}
                )
        `;
        if (Utils.hasValue(queryParams)) {
            if (Utils.hasValue(queryParams.where)) {                
                console.log('where to string antes ',queryParams.where);
                queryParams.where = DatabaseUtils.whereToString(queryParams.where,Tasks);
                console.log('where to string apos ',queryParams.where);
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
                            tx.IDSTATUS,
                            coalesce(tx.ACCUMTIME,0) + CASE WHEN tx.IDSTATUS = 2 THEN TIMESTAMPDIFF(SECOND,coalesce(tx.LASTRUN,CURRENT_TIMESTAMP),CURRENT_TIMESTAMP) ELSE 0 END AS ACCUMTIME,
                            case 
                                when coalesce(tx.FORECASTSTARTMOMENT,t.FORECASTSTARTMOMENT) < current_timestamp and tx.IDSTATUS IN (1) THEN 
                                    1 
                                when coalesce(tx.FORECASTENDMOMENT,t.FORECASTENDMOMENT) < current_timestamp and tx.IDSTATUS NOT IN (4,5) then 
                                    1 
                                ELSE 0 
                            END AS EXPIRED
                        FROM
                            tasks t
                            join TasksXStatusXUsers tx on (
                                tx.idtask = t.id
                                and tx.iduser = ${req.user.id}
                            )
                        ORDER BY 
                            t.IDSUP DESC , 
                            t.id DESC
                        ) t,
                        (SELECT @pv:=(
                            select 
                                group_concat(replace(
                                    case 
                                        when ti.idsup is null then ti.id
                                        else concat(ti.idsup,',',ti.id)
                                    end
                                ,'.',','),',') 
                            from 
                                tasks ti 
                                join tasksxstatusxusers tx on (
                                    tx.idtask = ti.id
                                    and tx.iduser = ${req.user.id}                                    
                                )            
                            where 			
                                ti.name like '%${req.body.search.value}%'
                                ${req.body.search.ids ? `and id in (${req.body.search.ids.join(',')})` : ''}
                        )) initialisation
                    WHERE
                        FIND_IN_SET(id, @pv)
                        AND LENGTH(@pv:=CONCAT(@pv, ',', COALESCE(IDSUP, id)))
                        ${req.body.search.idsup ? `and FIND_IN_SET(${req.body.search.idsup}, @pv)` : ''}                        
                    order by idsup,id                        
                `;
                
                res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
                res.data = res.data[0] || [];
            } else {
                //let queryParams = TasksController.mountQueryParamsToGet(req,req.body.queryParams);            
                //res.data = await Tasks.getModel().findAll(queryParams);  
                console.log(req.body.queryParams);
                let query = this.mountQueryToGet(req,req.body.queryParams);
                res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{queryType:QueryTypes.SELECT,raw:true});
                res.data = res.data[0] || [];
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
                if (key != 'IDSTATUS') taskParams[key] = bodyParams[key]
                else taskXParams[key] = bodyParams[key] || TasksStatus.NOT_STARTED;
            }
            taskParams.creator_user_id = req.user.id;
            taskXParams.creator_user_id = req.user.id;
            taskXParams.IDSTATUS = taskXParams.IDSTATUS || TasksStatus.NOT_STARTED;
            if (taskXParams.IDSTATUS == TasksStatus.RUNNING) {

                if (!Utils.hasValue(taskParams?.STARTMOMENT)) {
                    taskParams.STARTMOMENT = Sequelize.literal('current_timestamp');
                }                
                taskXParams.LASTRUN = taskParams.STARTMOMENT || Sequelize.literal('current_timestamp');
            }
            if (taskXParams.IDSTATUS == TasksStatus.CONCLUDED && !Utils.hasValue(taskParams?.ENDMOMENT)) {
                taskParams.ENDMOMENT = Sequelize.literal('current_timestamp');
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
            taskXParams.IDTASK = task.id;
            taskXParams.IDUSER = req.user.id;

            let taskX = await TasksXStatusXUsers.getModel().create(taskXParams);
            if (taskX.IDSTATUS == TasksStatus.RUNNING) {                
                await TasksController.stopOthers(task.id, taskX.id, taskX.IDUSER, TasksStatus.STOPED);
                await TasksController.updateSupStatusToRunning(task.id, taskX.IDUSER, taskX.IDSTATUS);                
            }     
            //let queryParams = TasksController.mountQueryParamsToGet(req,{where:{id:task.id}});      
            //res.data = await Tasks.getModel().findOne(queryParams);
            let query = this.mountQueryToGet(req,{where:{id:task.id}});
            res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{queryType:QueryTypes.SELECT,raw:true});
            res.data = (res.data[0] || [])[0];
            res.sendResponse(200,true);
        } catch (e) {
            Utils.log(e);
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
                IDSUP:req.body?.idsup
            },{
                where:{
                    id: {
                        [Sequelize.Op.in]:req.body?.ids
                    }
                }
            }); 
            res.sendResponse(200,true);
        } catch (e) {
            Utils.log(e);
            res.sendResponse(517,false,e.message || e,null,e);
        }
    }

        
    static async update(req,res,next) {
        try {
            Utils.log('saving with parameters ',req.body);
            let task = await Tasks.getModel().findOne({
                where:{
                    id: req.body?.id
                }
            });
            let taskX = await TasksXStatusXUsers.getModel().findOne({
                where:{
                    IDTASK: req.body?.id,
                    IDUSER: req.user.id
                }
            });            
            if (task) {
                let taskLogX = {
                    IDTASK: task.id,
                    IDUSER: req.user.id,
                    OPERATION: 'UPDATE'
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
                                if (key == 'IDSTATUS') {
                                    taskLogX.IDOLDSTATUS = taskX[key];
                                    taskLogX.IDNEWSTATUS = req.body[key];
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

                if (taskLogX.IDNEWSTATUS == TasksStatus.CONCLUDED) {
                    if (!Utils.hasValue(req.body?.ENDMOMENT)) {
                        task.ENDMOMENT = Sequelize.literal('current_timestamp');
                        taskX.ENDMOMENT = Sequelize.literal('current_timestamp');
                    }
                }

                if (taskLogX.IDNEWSTATUS == TasksStatus.RUNNING) {
                    taskX.LASTRUN = req.body?.STARTMOMENT ? Sequelize.fn('str_to_date',req.body?.STARTMOMENT,'%Y-%m-%d %H:%i:%s') : Sequelize.literal('current_timestamp');
                    if (!Utils.hasValue(req.body?.STARTMOMENT)) {
                        if (!Utils.hasValue(task.STARTMOMENT)) {
                            task.STARTMOMENT = Sequelize.literal('current_timestamp');
                        }
                        if (!Utils.hasValue(taskX.STARTMOMENT)) {
                            taskX.STARTMOMENT = Sequelize.literal('current_timestamp');
                        }
                    }
                } else {
                    taskX.IDTASKCAUSESTATUS = null;
                }

                await task.save();
                await taskX.save();
                taskLogX.IDTASKXSTATUSXUSER = taskX.id;
                taskLogX = await TasksXStatusXUsersLogs.getModel().create(taskLogX);

                if (taskLogX.IDNEWSTATUS == TasksStatus.RUNNING) {
                    await TasksController.stopOthers(task.id,taskX.id, taskX.IDUSER, TasksStatus.STOPED);
                    await TasksController.updateSupStatusToRunning(task.id,taskX.IDUSER, taskLogX.IDNEWSTATUS);
                } else if (Utils.hasValue(taskLogX.IDNEWSTATUS)) {
                    await TasksController.updateSubStatus(task.id,taskX.IDUSER, taskLogX.IDNEWSTATUS);                          
                    await TasksController.playOthers(task.id,taskX.id, taskX.IDUSER, TasksStatus.RUNNING);
                    //update sups with new status if math rules
                    if (taskLogX.IDNEWSTATUS == TasksStatus.STOPED) {
                        let idSup = task.IDSUP;
                        while(Utils.hasValue(idSup)) {
                            let query = `
                                select
                                    t.id,
                                    t.IDSUP,
                                    tu.id as TUID
                                from
                                    ${Tasks.tableName} t
                                    join ${TasksXStatusXUsers.tableName} tu on (
                                        tu.IDTASK = t.id
                                        and tu.IDUSER = ${req.user.id}
                                        and tu.IDSTATUS = ${taskLogX.IDOLDSTATUS}
                                    )
                                where
                                    t.id = ${idSup}
                                    and not exists (
                                        select
                                            1
                                        from
                                            ${Tasks.tableName} t2
                                            join ${TasksXStatusXUsers.tableName} tu2 on (
                                                tu2.IDTASK = t2.id
                                                and tu2.IDUSER = ${req.user.id}
                                                and tu2.IDSTATUS NOT IN (${taskLogX.IDNEWSTATUS}, ${TasksStatus.CANCELED}, ${TasksStatus.CONCLUDED})
                                            )
                                        where
                                            t2.IDSUP = t.id
                                    )
                            `;
                            let sup = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
                            sup = sup[0] || sup;
                            if (sup && sup.length > 0) {
                                sup = sup[0];
                                Utils.log('sup',sup);
                                query = `
                                    UPDATE
                                        ${TasksXStatusXUsers.name}
                                    set
                                        IDSTATUS = ${taskLogX.IDNEWSTATUS},
                                        IDTASKCAUSESTATUS = ${task.id}
                                    where
                                        id = ${sup.TUID}
                                `;
                                await DBConnectionManager.getDefaultDBConnection().query(query,{queryType:QueryTypes.UPDATE});
                                idSup = sup.IDSUP;
                            } else {
                                break;
                            }
                        }
                    }

                    
                }   

                //let queryParams = TasksController.mountQueryParamsToGet(req,{where:{id:task.id}});      
                //res.data = await Tasks.getModel().findOne(queryParams);
                let query = this.mountQueryToGet(req,{where:{id:task.id}});
                res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{queryType:QueryTypes.SELECT,raw:true});
                res.data = (res.data[0] || [])[0];
                res.sendResponse(200,true);
            } else {
                throw new Error(`task ${req.body?.id} not found`);
            }            
        } catch (e) {
            Utils.log(e);
            res.sendResponse(417,false,e.message || e,null,e);
        }
    }
    static patch = this.update;
}

module.exports = {TasksController}