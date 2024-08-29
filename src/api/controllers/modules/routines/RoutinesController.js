const { QueryTypes } = require("sequelize");
const { StatusRegs } = require("../../../database/models/StatusRegs");
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
                    MODULES.ID,
                    MODULES.IDSUP,
                    MODULES.NAME,
                    MODULES.ICON,
                    MODULES.PATH,
                    MODULES.ORDERNUM,
                    MODULES.DESCRIPTION,
                    ROUTINES.ID AS ROUTINEID,
                    ROUTINES.IDSUP AS ROUTINEIDSUP,
                    ROUTINES.IDROUTINETYPE AS ROUTINEIDROUTINETYPE,
                    ROUTINES.IDMODULE AS ROUTINEIDMODULE,
                    ROUTINES.NAME AS ROUTINENAME,
                    ROUTINES.ICON AS ROUTINEICON,
                    ROUTINES.VIEWPATH AS ROUTINEVIEWPATH,
                    ROUTINES.ORDERNUM AS ROUTINEORDERNUM,
                    ROUTINES.SHOWINMENU AS ROUTINESHOWINMENU,
                    ROUTINES.DESCRIPTION AS ROUTINEDESCRIPTION
                FROM
                    MODULES	                    
                    INNER JOIN USERS ON (
                        USERS.ID = ${req.user.ID}
                        AND USERS.IDSTATUSREG = ${StatusRegs.ACTIVE}
                        AND USERS.DELETEDAT IS NULL
                    )
                    INNER JOIN ACCESSESPROFILES ON (
                        ACCESSESPROFILES.ID = USERS.IDACCESSPROFILE
                        AND ACCESSESPROFILES.IDSTATUSREG = ${StatusRegs.ACTIVE}
                        AND ACCESSESPROFILES.DELETEDAT IS NULL
                    )
                    INNER JOIN PERMISSIONS ON (
                        PERMISSIONS.IDSTATUSREG = ${StatusRegs.ACTIVE}
                        AND PERMISSIONS.DELETEDAT IS NULL
                        AND COALESCE(PERMISSIONS.IDACCESSPROFILE,
                            USERS.IDACCESSPROFILE) = USERS.IDACCESSPROFILE
                        AND COALESCE(PERMISSIONS.IDUSER, USERS.ID) = USERS.ID
                        AND COALESCE(PERMISSIONS.IDMODULE, MODULES.ID) = MODULES.ID
                        AND PERMISSIONS.ALLOWEDACCESS = 1
                    )
                    LEFT OUTER JOIN (
                        ROUTINES
                        INNER JOIN USERS UR ON (
                            UR.ID = ${req.user.ID}
                            AND UR.IDSTATUSREG = ${StatusRegs.ACTIVE}
                            AND UR.DELETEDAT IS NULL
                        )
                        INNER JOIN ACCESSESPROFILES AR ON (
                            AR.ID = UR.IDACCESSPROFILE
                            AND AR.IDSTATUSREG = ${StatusRegs.ACTIVE}
                            AND AR.DELETEDAT IS NULL
                        )
                        INNER JOIN PERMISSIONS P2 ON (
                            P2.IDSTATUSREG = ${StatusRegs.ACTIVE}
                            AND P2.DELETEDAT IS NULL
                            AND COALESCE(P2.IDACCESSPROFILE,
                                UR.IDACCESSPROFILE) = UR.IDACCESSPROFILE
                            AND COALESCE(P2.IDUSER, UR.ID) = UR.ID
                            AND COALESCE(P2.IDMODULE, ROUTINES.IDMODULE) = ROUTINES.IDMODULE
                            AND COALESCE(P2.IDROUTINE,
                                CASE
                                    WHEN AR.ALLOWACESSALLROUTINESOFMODULE = 0 THEN - 1
                                    ELSE ROUTINES.ID
                                END) = ROUTINES.ID
                            AND P2.ALLOWEDACCESS = 1
                        )
                    ) ON (
                        ROUTINES.IDMODULE = MODULES.ID
                    )                    
                WHERE
                    (
                        PERMISSIONS.IDTABLE IS NULL
                        OR PERMISSIONS.IDMODULE IS NOT NULL
                    )    
                ORDER BY 
                    COALESCE(MODULES.ORDERNUM, MODULES.ID),
                    COALESCE(ROUTINES.ORDERNUM, ROUTINES.ID);    
            `;
            res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
            res.data = res.data[0] || [];
            let nestedModules = {};
            for(let i = 0; i < res.data.length; i++) {                
                nestedModules[res.data[i].ID] = nestedModules[res.data[i].ID] || res.data[i];
                if (Utils.hasValue(res.data[i].ROUTINEID)) {
                    nestedModules[res.data[i].ID].ROUTINES = nestedModules[res.data[i].ID].ROUTINES || {};
                    nestedModules[res.data[i].ID].ROUTINES[res.data[i].ROUTINEID] = {
                        ID: res.data[i].ROUTINEID,
                        IDSUP: res.data[i].ROUTINEIDSUP,
                        IDROUTINETYPE: res.data[i].ROUTINEIDROUTINETYPE,
                        IDMODULE: res.data[i].ROUTINEIDMODULE,
                        NAME: res.data[i].ROUTINENAME,
                        ICON: res.data[i].ROUTINEICON,
                        VIEWPATH: res.data[i].ROUTINEVIEWPATH,
                        ORDERNUM: res.data[i].ROUTINEORDERNUM,
                        SHOWINMENU: res.data[i].ROUTINESHOWINMENU,
                        DESCRIPTION: res.data[i].ROUTINEDESCRIPTION
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