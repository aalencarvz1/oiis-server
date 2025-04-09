import { NextFunction, Request, Response } from "express";
import Relationships from "../../../database/models/Relationships.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Utils from "../../utils/Utils.js";
import { Op, QueryTypes } from "sequelize";
import Relationship_Types from "../../../database/models/Relationship_Types.js";

export default class RelationshipsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Relationships;
    }



    /**
     * default RequestHandler method to patch registers of table model controller
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
    static async delete(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;

            if (Utils.hasValue(queryParams.identifiers)) {
                queryParams.identifiers = Utils.toArray(queryParams.identifiers);
                let query = `
                    WITH RECURSIVE hierarchy_relationship AS (
                    
                        /*initial record(s)*/
                        select 
                            * 
                        from 
                            relationships r
                        where 
                            r.id in (${queryParams.identifiers.join(',')})
                        
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
                        hr.id
                    FROM 
                        hierarchy_relationship hr
                `;

                let hierarchy = await this.getTableClassModel().getConnection().query(
                    query,{
                        raw: true,
                        type:QueryTypes.SELECT
                    }
                );

                if (Utils.hasValue(hierarchy)) {
                    query = `
                        delete from ${Relationships.tableName} where id in (${hierarchy.map((el: any)=>el.id).join(',')})
                    `
                    await this.getTableClassModel().getConnection().query(
                        query,{
                            type:QueryTypes.DELETE
                        }
                    );
                }
                res.sendResponse(200,true);
            } else {
                throw new Error("missing identifiers");
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
