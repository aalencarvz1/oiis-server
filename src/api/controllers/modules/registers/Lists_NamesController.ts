import { NextFunction, Request, Response } from "express";
import Lists_Names from "../../../database/models/Lists_Names.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { QueryTypes } from "sequelize";
import Relationships from "../../../database/models/Relationships.js";
import Value_Names from "../../../database/models/Value_Names.js";
import Utils from "../../utils/Utils.js";
import Relationship_Types from "../../../database/models/Relationship_Types.js";
import Ncms from "../../../database/models/Ncms.js";

export default class Lists_NamesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Lists_Names;
    }

    /**
     * RequestHandler method to get registers of table model controller
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async get_from_relationship(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let params = req.body || {};
            let queryParams = params.queryParams || params;
            queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            if (!queryParams.query) {
                let where : any = [];
                if (Utils.hasValue(params.relationship_type_id)) {
                    where.push(`r.relationship_type_id = ${params.relationship_type_id}`);
                }
                where.push(`r.table_1_id = ${Ncms.id}`);
                if (Utils.hasValue(params.record_1_column)) {
                    where.push(`r.record_1_column = ${params.record_1_column}`);
                }
                if (Utils.hasValue(params.record_1_id)) {
                    where.push(`r.record_1_id = ${params.record_1_id}`);
                }
                where.push(`r.table_2_id = ${Lists_Names.id}`);
                if (Utils.hasValue(params.record_2_column)) {
                    where.push(`r.record_2_column = ${params.record_2_column}`);
                }
                //where.push(`r.record_2_id = ${Lists_Names.tableName}.id`);
                if (Utils.hasValue(params.record_2_id)) {
                    where.push(`r.record_2_id = ${params.record_2_id}`);
                }                
                if (Utils.hasValue(params.parent_id)) {
                    where.push(`r.parent_id = ${params.parent_id}`);
                } else if (params.parent_id === null) {
                    where.push(`r.parent_id is null`);
                }

                queryParams.query = `
                    WITH RECURSIVE hierarchy_relationship AS (
	
                        /*initial record(s)*/
                        select 
                            * 
                        from 
                            relationships r
                        where 
                            ${where.join(' and ')}
                        
                        UNION ALL
                        
                        /*recursive part, find parents of previous initial values and recursively*/
                        SELECT 
                            r.*
                        FROM 
                            relationships r
                            JOIN hierarchy_relationship hr ON r.record_1_id = hr.id
                        where
                            r.relationship_type_id = ${Relationship_Types.SUBORDINATED}
                            and r.table_1_id in (${Relationships.id})                            
                    )
                    SELECT 
                        hr.id,
                        hr.table_1_id,
                        hr.record_1_id,
                        l.name
                    FROM 
                        hierarchy_relationship hr
                        join ${Lists_Names.tableName} l on (hr.record_2_id = l.id)

                `;
            } 
            res.data = await this.getTableClassModel().getConnection().query(
                queryParams.query,{
                    raw:queryParams.raw,
                    type:QueryTypes.SELECT
                }
            );
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static {
        this.configureDefaultRequestHandlers([
            this.get_from_relationship
        ]);
    }
}
