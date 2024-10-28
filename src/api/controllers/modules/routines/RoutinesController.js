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
                    MODULES.parent_id,
                    MODULES.name,
                    MODULES.icon,
                    MODULES.path,
                    MODULES.numeric_order,
                    MODULES.description,
                    routines.id AS routine_id,
                    routines.parent_id AS routine_sup_id,
                    routines.routine_type_id AS routine_routine_type_id,
                    routines.module_id AS routine_module_id,
                    routines.name AS routine_name,
                    routines.icon AS routine_icon,
                    routines.view_path AS routine_view_path,
                    routines.numeric_order AS routine_order_num,
                    routines.show_in_menu AS routine_show_in_menu,
                    routines.description AS routine_description
                FROM
                    MODULES	                    
                    INNER JOIN USERS ON (
                        USERS.id = ${req.user.id}
                        AND USERS.status_reg_id = ${Record_Status.ACTIVE}
                        AND USERS.deleted_at IS NULL
                    )
                    INNER JOIN access_profiles ON (
                        access_profiles.id = USERS.access_profile_id
                        AND access_profiles.status_reg_id = ${Record_Status.ACTIVE}
                        AND access_profiles.deleted_at IS NULL
                    )
                    INNER JOIN PERMISSIONS ON (
                        PERMISSIONS.status_reg_id = ${Record_Status.ACTIVE}
                        AND PERMISSIONS.deleted_at IS NULL
                        AND COALESCE(PERMISSIONS.access_profile_id,
                            USERS.access_profile_id) = USERS.access_profile_id
                        AND COALESCE(PERMISSIONS.user_id, USERS.id) = USERS.id
                        AND COALESCE(PERMISSIONS.module_id, MODULES.id) = MODULES.id
                        AND PERMISSIONS.allowed_access = 1
                    )
                    LEFT OUTER JOIN (
                        routines
                        INNER JOIN USERS UR ON (
                            UR.id = ${req.user.id}
                            AND UR.status_reg_id = ${Record_Status.ACTIVE}
                            AND UR.deleted_at IS NULL
                        )
                        INNER JOIN access_profiles AR ON (
                            AR.id = UR.access_profile_id
                            AND AR.status_reg_id = ${Record_Status.ACTIVE}
                            AND AR.deleted_at IS NULL
                        )
                        INNER JOIN PERMISSIONS P2 ON (
                            P2.status_reg_id = ${Record_Status.ACTIVE}
                            AND P2.deleted_at IS NULL
                            AND COALESCE(P2.access_profile_id,
                                UR.access_profile_id) = UR.access_profile_id
                            AND COALESCE(P2.user_id, UR.id) = UR.id
                            AND COALESCE(P2.module_id, routines.module_id) = routines.module_id
                            AND COALESCE(P2.routine_id,
                                CASE
                                    WHEN AR.allow_access_to_all_module_routines = 0 THEN - 1
                                    ELSE routines.id
                                END) = routines.id
                            AND P2.allowed_access = 1
                        )
                    ) ON (
                        routines.module_id = MODULES.id
                    )                    
                WHERE
                    (
                        PERMISSIONS.table_id IS NULL
                        OR PERMISSIONS.module_id IS NOT NULL
                    )    
                ORDER BY 
                    COALESCE(MODULES.numeric_order, MODULES.id),
                    COALESCE(routines.numeric_order, routines.id);    
            `;
            res.data = await DBConnectionManager.getDefaultDBConnection().query(query,{raw:true,queryType:QueryTypes.SELECT});
            res.data = res.data[0] || [];
            let nestedModules = {};
            for(let i = 0; i < res.data.length; i++) {                
                nestedModules[res.data[i].id] = nestedModules[res.data[i].id] || res.data[i];
                if (Utils.hasValue(res.data[i].routine_id)) {
                    nestedModules[res.data[i].id].routines = nestedModules[res.data[i].id].routines || {};
                    nestedModules[res.data[i].id].routines[res.data[i].routine_id] = {
                        id: res.data[i].routine_id,
                        parent_id: res.data[i].routine_sup_id,
                        routine_type_id: res.data[i].routine_routine_type_id,
                        module_id: res.data[i].routine_module_id,
                        name: res.data[i].routine_name,
                        icon: res.data[i].routine_icon,
                        view_path: res.data[i].routine_view_path,
                        numeric_order: res.data[i].routine_order_num,
                        show_in_menu: res.data[i].routine_show_in_menu,
                        description: res.data[i].routine_description
                    };
                }
            }

            for(let key in nestedModules) {
                if (Utils.hasValue(nestedModules[key].parent_id)) {
                    if (Utils.hasValue(nestedModules[nestedModules[key].parent_id])) {
                        nestedModules[nestedModules[key].parent_id].subs = nestedModules[nestedModules[key].parent_id]?.subs || {};
                        nestedModules[nestedModules[key].parent_id].subs[key] = nestedModules[key];
                        nestedModules[key].moved = true;                        
                    }
                }
                if (Utils.hasValue(nestedModules[key].routines)) {
                    for(let kr in  nestedModules[key].routines ) {                
                        if (Utils.hasValue(nestedModules[key].routines[kr].parent_id)) {
                            nestedModules[key].routines[nestedModules[key].routines[kr].parent_id].subs = nestedModules[key].routines[nestedModules[key].routines[kr].parent_id].subs || {};
                            nestedModules[key].routines[nestedModules[key].routines[kr].parent_id].subs[kr] = nestedModules[key].routines[kr];
                            nestedModules[key].routines[kr].moved = true;
                        }
                    }
                }
            }

            for(let key in nestedModules) {
                for(let kr in nestedModules[key].routines || []) {
                    if ((nestedModules[key].routines[kr].moved || false) == true) {
                        nestedModules[key].routines[kr] = null;
                        delete nestedModules[key].routines[kr];
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