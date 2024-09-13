
const { Sequelize, QueryTypes } = require("sequelize");
const { Tasks } = require("../../../database/models/Tasks");
const { Task_Status } = require("../../../database/models/Task_Status");
const { Tasks_X_Status_X_Users_Logs } = require("../../../database/models/Tasks_X_Status_X_Users_Logs");
const { Utils } = require("../../utils/Utils");
const DBConnectionManager = require("../../../database/DBConnectionManager");
const { Tasks_X_Status_X_Users } = require("../../../database/models/Tasks_X_Status_X_Users");
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
                    join ${Tasks_X_Status_X_Users.tableName} x on (
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
                    join ${Tasks_X_Status_X_Users.tableName} x on (
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
            let idsSups = await Task_Controller.getIdsSupsX(pIdTask,pIdUser);            
            if (idsSups && idsSups.length > 0) {

                let query = `
                    update
                        ${Tasks_X_Status_X_Users.tableName}
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
            let idsSubs = await Task_Controller.getIdsSubsX(pTaskId,pUserId);            
            if (idsSubs && idsSubs.length > 0) {                
                let query = `
                    update
                        ${Tasks_X_Status_X_Users.tableName} t1
                        join ${Task_Status.tableName} ts on ts.id = t1.IDSTATUS
                        join ${Task_Status.tableName} tsn on tsn.id = ${pIdNewStatus}
                    set
                        t1.IDSTATUS=${pIdNewStatus},
                        t1.ENDMOMENT=CASE WHEN coalesce(tsn.is_concluded,0) = 1 then current_timestamp else t1.ENDMOMENT end
                    where
                        t1.id IN (${idsSubs.join(',')})
                        and t1.IDUSER = ${pUserId}
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
                            ${Tasks_X_Status_X_Users.tableName}
                        set
                            IDSTATUS=${Task_Status.RUNNING} 
                        where
                            IDUSER = ${pUserId}
                            AND IDSTATUS = ${Task_Status.STOPED}
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
        Utils.log(`INIT ${Task_Controller.name}.stopOthers`);
        try {            
            let idsSups = await Task_Controller.getIdsSupsX(pIdTask,pIdUser);            
            let idsSubs = await Task_Controller.getIdsSubsX(pIdTask,pIdUser);            
            idsSups = idsSups || [];
            idsSubs = idsSubs || [];
            let idsPreserve = idsSups.concat(idsSubs);
            idsPreserve.push(pIdX);
            if (idsPreserve && idsPreserve.length > 0) {
                let query = `
                    update
                        ${Tasks_X_Status_X_Users.tableName}
                    set
                        IDSTATUS=${pIdNewStatus},
                        IDTASKCAUSESTATUS=${pIdTask}
                    where
                        id NOT IN (${idsPreserve.join(',')})
                        AND IDUSER = ${pIdUser}
                        AND IDSTATUS = ${Task_Status.RUNNING}
                `;
                await DBConnectionManager.getDefaultDBConnection().query(query);
            }
        } catch (e) {
            Utils.log(e);
        }
        Utils.log(`END ${Task_Controller.name}.stopOthers`);
    }

    static async playOthers(pIdTask,pIdX,pIdUser,pIdNewStatus) {
        Utils.log(`INIT ${Task_Controller.name}.playOthers`);
        try {
            let idsSups = await Task_Controller.getIdsSupsX(pIdTask,pIdUser);            
            let idsSubs = await Task_Controller.getIdsSubsX(pIdTask,pIdUser);            
            idsSups = idsSups || [];
            idsSubs = idsSubs || [];
            let idsPreserve = idsSups.concat(idsSubs);
            idsPreserve.push(pIdX);
            if (idsPreserve && idsPreserve.length > 0) {
                let query = `
                    update
                        ${Tasks_X_Status_X_Users.tableName} t
                    set
                        t.IDSTATUS=${pIdNewStatus}                        
                    where
                        t.id NOT IN (${idsPreserve.join(',')})
                        AND t.IDUSER = ${pIdUser}
                        AND t.IDSTATUS = ${Task_Status.STOPED}
                        AND t.IDTASKCAUSESTATUS = ${pIdTask}
                `;
                let [result,metadata] = await DBConnectionManager.getDefaultDBConnection().query(query,{queryType:QueryTypes.UPDATE});
                if (metadata.affectedRows > 0 && pIdNewStatus == Task_Status.RUNNING && idsSups.length > 0) {
                    query = `
                        update
                            ${Tasks_X_Status_X_Users.tableName}
                        set
                            IDSTATUS=${Task_Status.STOPED}                        
                        where
                            id NOT IN (${idsPreserve.join(',')})
                            AND id IN (${idsSups.join(',')})
                            AND IDUSER = ${pIdUser}
                            AND IDSTATUS = ${Task_Status.RUNNING}
                    `;
                    await DBConnectionManager.getDefaultDBConnection().query(query,{queryType:QueryTypes.UPDATE});
                }
            }
        } catch (e) {
            Utils.log(e);
        }
        Utils.log(`END ${Task_Controller.name}.playOthers`);
    }

    static mountQueryParamsToGet(req,queryParams) {
        queryParams = queryParams || {};
        queryParams = DatabaseUtils.prepareQueryParams(queryParams);
        queryParams.raw = true;
        queryParams.where = queryParams.where || {};
        queryParams.where.creator_user_id = req.user.id;

        queryParams.attributes = [
            `${Tasks.tableName}.*`,
            Sequelize.literal(`${Tasks_X_Status_X_Users.tableName}.IDSTATUS`),
            Sequelize.literal(`coalesce(${Tasks_X_Status_X_Users.tableName}.ACCUMTIME,0) + CASE WHEN ${Tasks_X_Status_X_Users.tableName}.IDSTATUS = 2 THEN TIMESTAMPDIFF(SECOND,coalesce(${Tasks_X_Status_X_Users.tableName}.LASTRUN,CURRENT_TIMESTAMP),CURRENT_TIMESTAMP) ELSE 0 END AS ACCUMTIME`),
            Sequelize.literal(`
                case 
                    when coalesce(${Tasks_X_Status_X_Users.tableName}.FORECASTSTARTMOMENT,${Tasks.tableName}.FORECASTSTARTMOMENT) < current_timestamp and ${Tasks_X_Status_X_Users.tableName}.IDSTATUS IN (1) THEN 
                        1 
                    when coalesce(${Tasks_X_Status_X_Users.tableName}.FORECASTENDMOMENT,${Tasks.tableName}.FORECASTENDMOMENT) < current_timestamp and ${Tasks_X_Status_X_Users.tableName}.IDSTATUS NOT IN (4,5) then 
                        1 
                    ELSE 0 
                END AS EXPIRED`
            )
        ];
        queryParams.include = [{
            raw:true,
            model:Tasks_X_Status_X_Users.getModel(),
            attributes:[],
            required:true,
            on:{
                [Sequelize.Op.and]:[
                    Sequelize.where(Sequelize.col(`${Tasks_X_Status_X_Users.tableName}.IDTASK`),'=',Sequelize.col(`${Tasks.tableName}.id`)),
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
                ${Tasks_X_Status_X_Users.tableName}.IDSTATUS,
                coalesce(${Tasks_X_Status_X_Users.tableName}.ACCUMTIME,0) + CASE 
                    WHEN ${Tasks_X_Status_X_Users.tableName}.IDSTATUS = 2 THEN 
                        TIMESTAMPDIFF(SECOND,coalesce(${Tasks_X_Status_X_Users.tableName}.LASTRUN,CURRENT_TIMESTAMP),CURRENT_TIMESTAMP) 
                    ELSE 
                        0 
                END AS ACCUMTIME,                
                case 
                    when coalesce(${Tasks_X_Status_X_Users.tableName}.FORECASTSTARTMOMENT,${Tasks.tableName}.FORECASTSTARTMOMENT) < current_timestamp and ${Tasks_X_Status_X_Users.tableName}.IDSTATUS IN (1) THEN 
                        1 
                    when coalesce(${Tasks_X_Status_X_Users.tableName}.FORECASTENDMOMENT,${Tasks.tableName}.FORECASTENDMOMENT) < current_timestamp and ${Tasks_X_Status_X_Users.tableName}.IDSTATUS NOT IN (4,5) then 
                        1 
                    ELSE 0 
                END AS EXPIRED                
            from 
                ${Tasks.tableName}
                join ${Tasks_X_Status_X_Users.tableName} on (
                    ${Tasks_X_Status_X_Users.tableName}.IDTASK = ${Tasks.tableName}.id
                    and ${Tasks_X_Status_X_Users.tableName}.IDUSER = ${req.user.id}
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
                            join Tasks_X_Status_X_Users tx on (
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
                                join tasks_x_status_x_users tx on (
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
                //let queryParams = Task_Controller.mountQueryParamsToGet(req,req.body.queryParams);            
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
                else taskXParams[key] = bodyParams[key] || Task_Status.NOT_STARTED;
            }
            taskParams.creator_user_id = req.user.id;
            taskXParams.creator_user_id = req.user.id;
            taskXParams.IDSTATUS = taskXParams.IDSTATUS || Task_Status.NOT_STARTED;
            if (taskXParams.IDSTATUS == Task_Status.RUNNING) {

                if (!Utils.hasValue(taskParams?.STARTMOMENT)) {
                    taskParams.STARTMOMENT = Sequelize.literal('current_timestamp');
                }                
                taskXParams.LASTRUN = taskParams.STARTMOMENT || Sequelize.literal('current_timestamp');
            }
            if (taskXParams.IDSTATUS == Task_Status.CONCLUDED && !Utils.hasValue(taskParams?.ENDMOMENT)) {
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

            let taskX = await Tasks_X_Status_X_Users.getModel().create(taskXParams);
            if (taskX.IDSTATUS == Task_Status.RUNNING) {                
                await Task_Controller.stopOthers(task.id, taskX.id, taskX.IDUSER, Task_Status.STOPED);
                await Task_Controller.updateSupStatusToRunning(task.id, taskX.IDUSER, taskX.IDSTATUS);                
            }     
            //let queryParams = Task_Controller.mountQueryParamsToGet(req,{where:{id:task.id}});      
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
            let taskX = await Tasks_X_Status_X_Users.getModel().findOne({
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

                if (taskLogX.IDNEWSTATUS == Task_Status.CONCLUDED) {
                    if (!Utils.hasValue(req.body?.ENDMOMENT)) {
                        task.ENDMOMENT = Sequelize.literal('current_timestamp');
                        taskX.ENDMOMENT = Sequelize.literal('current_timestamp');
                    }
                }

                if (taskLogX.IDNEWSTATUS == Task_Status.RUNNING) {
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
                taskLogX = await Tasks_X_Status_X_Users_Logs.getModel().create(taskLogX);

                if (taskLogX.IDNEWSTATUS == Task_Status.RUNNING) {
                    await Task_Controller.stopOthers(task.id,taskX.id, taskX.IDUSER, Task_Status.STOPED);
                    await Task_Controller.updateSupStatusToRunning(task.id,taskX.IDUSER, taskLogX.IDNEWSTATUS);
                } else if (Utils.hasValue(taskLogX.IDNEWSTATUS)) {
                    await Task_Controller.updateSubStatus(task.id,taskX.IDUSER, taskLogX.IDNEWSTATUS);                          
                    await Task_Controller.playOthers(task.id,taskX.id, taskX.IDUSER, Task_Status.RUNNING);
                    //update sups with new status if math rules
                    if (taskLogX.IDNEWSTATUS == Task_Status.STOPED) {
                        let idSup = task.IDSUP;
                        while(Utils.hasValue(idSup)) {
                            let query = `
                                select
                                    t.id,
                                    t.IDSUP,
                                    tu.id as TUID
                                from
                                    ${Tasks.tableName} t
                                    join ${Tasks_X_Status_X_Users.tableName} tu on (
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
                                            join ${Tasks_X_Status_X_Users.tableName} tu2 on (
                                                tu2.IDTASK = t2.id
                                                and tu2.IDUSER = ${req.user.id}
                                                and tu2.IDSTATUS NOT IN (${taskLogX.IDNEWSTATUS}, ${Task_Status.CANCELED}, ${Task_Status.CONCLUDED})
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
                                        ${Tasks_X_Status_X_Users.name}
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

                //let queryParams = Task_Controller.mountQueryParamsToGet(req,{where:{id:task.id}});      
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

module.exports = {Task_Controller}