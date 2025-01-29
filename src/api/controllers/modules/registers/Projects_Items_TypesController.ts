import { NextFunction, Request, Response } from "express";
import Projects_Items_Types from "../../../database/models/Projects_Items_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Relationship_Types from "../../../database/models/Relationship_Types.js";
import Utils from "../../utils/Utils.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import { QueryTypes } from "sequelize";

export default class Projects_Items_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Projects_Items_Types;
    }


    
    /**
     * get hierarquized based on project_item_type_id param
     * @requesthandler
     * @created 2025-01-24
     * @version 1.0.0
     */
    static async get_hierarquized(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            let projectItemTypeId = queryParams.project_item_type_id;
            let query = `
                WITH RECURSIVE hierarchy_cte AS (
                    
                    /*initial record(s)*/
                    SELECT 
                        projects_items_types.*, 
                        1 as is_initial
                    FROM 
                        projects_items_types
                    WHERE 
                        id in(
                            SELECT 
                                id
                            FROM
                                ${Projects_Items_Types.tableName}
                            WHERE
                                parent_id ${Utils.hasValue(projectItemTypeId) ? ` = ${projectItemTypeId} ` : ' is null ' }
                                OR EXISTS( 
                                    SELECT 
                                        1
                                    FROM
                                        relationships
                                    WHERE
                                        relationships.relationship_type_id = ${Relationship_Types.SUBORDINATED}
                                        AND relationships.table_1_id = ${Projects_Items_Types.id}
                                        AND relationships.record_1_column = 'id'
                                        AND relationships.record_1_id = projects_items_types.id
                                        AND relationships.table_2_id = ${Projects_Items_Types.id}
                                        AND relationships.record_2_column = 'parent_id'
                                        AND relationships.record_2_id ${Utils.hasValue(projectItemTypeId) ? ` = ${projectItemTypeId} ` : ' is null ' }
                                )
                        )
                    
                    UNION ALL
                    
                    /*recursive part, find parents of previous initial values and recursively*/
                    SELECT 
                        h.*, 
                        0 as is_initial
                    FROM 
                        projects_items_types h
                        INNER JOIN hierarchy_cte cte ON h.id = cte.parent_id
                )
                SELECT 
                    id,
                    parent_id,
                    name,
                    max(is_initial) as is_initial
                FROM 
                    hierarchy_cte 
                group by
                    id,
                    parent_id,
                    name
                order by 
                    coalesce(parent_id,id)
            `;

            res.data = await DBConnectionManager.getDefaultDBConnection()?.query(query,{type: QueryTypes.SELECT});
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }


    /**
     * get directly sub-types
     * @requesthandler
     * @created 2025-01-24
     * @version 1.0.0
     */
    static async get_subtypes(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            let projectItemTypeId = queryParams.project_item_type_id;
            let query = `
                SELECT 
                    *
                FROM
                    ${Projects_Items_Types.tableName}
                WHERE
                    parent_id ${Utils.hasValue(projectItemTypeId) ? ` = ${projectItemTypeId} ` : ' is null ' }
                    OR EXISTS( 
                        SELECT 
                            1
                        FROM
                            relationships
                        WHERE
                            relationships.relationship_type_id = ${Relationship_Types.SUBORDINATED}
                            AND relationships.table_1_id = ${Projects_Items_Types.id}
                            AND relationships.record_1_column = 'id'
                            AND relationships.record_1_id = projects_items_types.id
                            AND relationships.table_2_id = ${Projects_Items_Types.id}
                            AND relationships.record_2_column = 'parent_id'
                            AND relationships.record_2_id ${Utils.hasValue(projectItemTypeId) ? ` = ${projectItemTypeId} ` : ' is null ' }
                    )
                order by 
                    coalesce(parent_id,id)
            `;

            res.data = await DBConnectionManager.getDefaultDBConnection()?.query(query,{type: QueryTypes.SELECT});
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static {
        this.configureDefaultRequestHandlers([
            this.get_hierarquized,
            this.get_subtypes
        ]);
    }
}
