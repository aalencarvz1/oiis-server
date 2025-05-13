import { NextFunction, Request, Response } from "express";
import Record_Status from "../../../database/models/Record_Status.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import { QueryTypes } from "sequelize";
import Utils from "../../utils/Utils.js";
import BaseRegistersController from "../registers/BaseRegistersController.js";
import Routines from "../../../database/models/Routines.js";
import EndPointsController from "../../endpoints/EndPointsController.js";

/**
 * Class controller to handle registers module
 * @author Alencar
 * @version 2.0.0
 * @created 2023-25-08
 * @updates 
 *      - 2024-12-29 migrated do typescript
 */
export default class RoutinesController extends BaseRegistersController {

    /**
     * @override
     * @created 2024-12-31
     * @version 1.0.0
     */
    static getTableClassModel() : any {
         return Routines;
    }

    /**
     * get data from tasks and include joins
     * @requesthandler
     * @created 2025-01-01
     * @version 1.0.0
     */
    static async get_nested(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let result : any = null;
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
                routines.numeric_order AS routine_numeric_order,
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
            result = await DBConnectionManager.getDefaultDBConnection()?.query(query,{raw:true,type:QueryTypes.SELECT});
            let nestedModules : any = {};
            for(let i = 0; i < result.length; i++) {                
                nestedModules[result[i].id] = nestedModules[result[i].id] || result[i];
                if (Utils.hasValue(result[i].routine_id)) {
                    nestedModules[result[i].id].routines = nestedModules[result[i].id].routines || {};
                    nestedModules[result[i].id].routines[result[i].routine_id] = {
                        id: result[i].routine_id,
                        parent_id: result[i].routine_sup_id,
                        routine_type_id: result[i].routine_routine_type_id,
                        module_id: result[i].routine_module_id,
                        name: result[i].routine_name,
                        icon: result[i].routine_icon,
                        view_path: result[i].routine_view_path,
                        numeric_order: result[i].routine_numeric_order,
                        show_in_menu: result[i].routine_show_in_menu,
                        description: result[i].routine_description
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
                    if ((nestedModules[key].routines[kr].moved || false) === true) {
                        nestedModules[key].routines[kr] = null;
                        delete nestedModules[key].routines[kr];
                    }
                }
                if ((nestedModules[key].moved || false) === true) {
                    nestedModules[key] = null;
                    delete nestedModules[key];
                }
            }
            res.data = nestedModules;
            res.sendResponse(200,true);
        } catch(e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        } 
    }

    static {
        this.configureDefaultRequestHandlers([this.get_nested]);
    }
}
