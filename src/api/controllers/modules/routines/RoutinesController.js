const { QueryTypes } = require("sequelize");
const { Record_Status } = require("../../../database/models/Record_Status");
const { Utils } = require("../../utils/Utils");
const DBConnectionManager = require("../../../database/DBConnectionManager");
const { RegistersController } = require("../registers/RegistersController");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @version 1.0.0
 * @created 2023-25-08
 */
class RoutinesController extends RegistersController{



    /**
     * get the user menu({module:{routine:...}}) according user permissions
     * @param {*} req 
     * @returns 
     * @created 2023-08-21
     * @version 1.0.0
     * @updates
     *  2024-07-12 - adjusted query to get all data in one query
     */
    static  get = async(req,res,next) => {
        res.data = null;
        try {
            Utils.log('user',req.user);
            let query = `
                 SELECT 
                    MODULES.id,
                    MODULES.IDSUP,
                    MODULES.name,
                    MODULES.ICON,
                    MODULES.PATH,
                    MODULES.ORDERNUM,
                    MODULES.description,
                    ROUTINES.id AS ROUTINEID,
                    ROUTINES.IDSUP AS ROUTINEIDSUP,
                    ROUTINES.IDROUTINETYPE AS ROUTINEIDROUTINETYPE,
                    ROUTINES.IDMODULE AS ROUTINEIDMODULE,
                    ROUTINES.name AS ROUTINENAME,
                    ROUTINES.ICON AS ROUTINEICON,
                    ROUTINES.VIEWPATH AS ROUTINEVIEWPATH,
                    ROUTINES.ORDERNUM AS ROUTINEORDERNUM,
                    ROUTINES.SHOWINMENU AS ROUTINESHOWINMENU,
                    ROUTINES.description AS ROUTINEDESCRIPTION
                FROM
                    MODULES	                    
                    INNER JOIN USERS ON (
                        USERS.id = ${req.user.id}
                        AND USERS.status_reg_id = ${Record_Status.ACTIVE}
                        AND USERS.deleted_at IS NULL
                    )
                    INNER JOIN access_profiles ON (
                        access_profiles.id = USERS.IDACCESSPROFILE
                        AND access_profiles.status_reg_id = ${Record_Status.ACTIVE}
                        AND access_profiles.deleted_at IS NULL
                    )
                    INNER JOIN PERMISSIONS ON (
                        PERMISSIONS.status_reg_id = ${Record_Status.ACTIVE}
                        AND PERMISSIONS.deleted_at IS NULL
                        AND COALESCE(PERMISSIONS.IDACCESSPROFILE,
                            USERS.IDACCESSPROFILE) = USERS.IDACCESSPROFILE
                        AND COALESCE(PERMISSIONS.IDUSER, USERS.id) = USERS.id
                        AND COALESCE(PERMISSIONS.IDMODULE, MODULES.id) = MODULES.id
                        AND PERMISSIONS.ALLOWEDACCESS = 1
                    )
                    LEFT OUTER JOIN (
                        ROUTINES
                        INNER JOIN USERS UR ON (
                            UR.id = ${req.user.id}
                            AND UR.status_reg_id = ${Record_Status.ACTIVE}
                            AND UR.deleted_at IS NULL
                        )
                        INNER JOIN access_profiles AR ON (
                            AR.id = UR.IDACCESSPROFILE
                            AND AR.status_reg_id = ${Record_Status.ACTIVE}
                            AND AR.deleted_at IS NULL
                        )
                        INNER JOIN PERMISSIONS P2 ON (
                            P2.status_reg_id = ${Record_Status.ACTIVE}
                            AND P2.deleted_at IS NULL
                            AND COALESCE(P2.IDACCESSPROFILE,
                                UR.IDACCESSPROFILE) = UR.IDACCESSPROFILE
                            AND COALESCE(P2.IDUSER, UR.id) = UR.id
                            AND COALESCE(P2.IDMODULE, ROUTINES.IDMODULE) = ROUTINES.IDMODULE
                            AND COALESCE(P2.IDROUTINE,
                                CASE
                                    WHEN AR.allow_access_to_all_module_routines = 0 THEN - 1
                                    ELSE ROUTINES.id
                                END) = ROUTINES.id
                            AND P2.ALLOWEDACCESS = 1
                        )
                    ) ON (
                        ROUTINES.IDMODULE = MODULES.id
                    )                    
                WHERE
                    (
                        PERMISSIONS.IDTABLE IS NULL
                        OR PERMISSIONS.IDMODULE IS NOT NULL
                    )    
                ORDER BY 
                    COALESCE(MODULES.ORDERNUM, MODULES.id),
                    COALESCE(ROUTINES.ORDERNUM, ROUTINES.id);    
            `;
            res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
            res.data = res.data[0] || [];
            let nestedModules = {};
            for(let i = 0; i < res.data.length; i++) {                
                nestedModules[res.data[i].id] = nestedModules[res.data[i].id] || res.data[i];
                if (Utils.hasValue(res.data[i].ROUTINEID)) {
                    nestedModules[res.data[i].id].ROUTINES = nestedModules[res.data[i].id].ROUTINES || {};
                    nestedModules[res.data[i].id].ROUTINES[res.data[i].ROUTINEID] = {
                        id: res.data[i].ROUTINEID,
                        IDSUP: res.data[i].ROUTINEIDSUP,
                        IDROUTINETYPE: res.data[i].ROUTINEIDROUTINETYPE,
                        IDMODULE: res.data[i].ROUTINEIDMODULE,
                        name: res.data[i].ROUTINENAME,
                        ICON: res.data[i].ROUTINEICON,
                        VIEWPATH: res.data[i].ROUTINEVIEWPATH,
                        ORDERNUM: res.data[i].ROUTINEORDERNUM,
                        SHOWINMENU: res.data[i].ROUTINESHOWINMENU,
                        description: res.data[i].ROUTINEDESCRIPTION
                    };
                }
            }

            for(let key in nestedModules) {
                if (Utils.hasValue(nestedModules[key].IDSUP)) {
                    nestedModules[nestedModules[key].IDSUP].SUBS = nestedModules[nestedModules[key].IDSUP]?.SUBS || {};
                    nestedModules[nestedModules[key].IDSUP].SUBS[key] = nestedModules[key];
                    nestedModules[key].moved = true;                        
                }
                if (Utils.hasValue(nestedModules[key].ROUTINES)) {
                    for(let kr in  nestedModules[key].ROUTINES ) {                
                        if (Utils.hasValue(nestedModules[key].ROUTINES[kr].IDSUP)) {
                            nestedModules[key].ROUTINES[nestedModules[key].ROUTINES[kr].IDSUP].SUBS = nestedModules[key].ROUTINES[nestedModules[key].ROUTINES[kr].IDSUP].SUBS || {};
                            nestedModules[key].ROUTINES[nestedModules[key].ROUTINES[kr].IDSUP].SUBS[kr] = nestedModules[key].ROUTINES[kr];
                            nestedModules[key].ROUTINES[kr].moved = true;
                        }
                    }
                }
            }

            for(let key in nestedModules) {
                for(let kr in nestedModules[key].ROUTINES || []) {
                    if ((nestedModules[key].ROUTINES[kr].moved || false) == true) {
                        nestedModules[key].ROUTINES[kr] = null;
                        delete nestedModules[key].ROUTINES[kr];
                    }
                }
                if ((nestedModules[key].moved || false) == true) {
                    nestedModules[key] = null;
                    delete nestedModules[key];
                }
            }
            res.data = nestedModules;
            res.sendResponse(200,true);
        } catch(e) {
            res.setException(e);
            res.sendResponse(517,false);
        } 
    }
}


module.exports = {RoutinesController}