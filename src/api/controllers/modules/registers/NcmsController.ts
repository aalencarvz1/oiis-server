import { NextFunction, Request, Response } from "express";
import Ncms from "../../../database/models/Ncms.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { QueryTypes } from "sequelize";
import Relationship_Types from "../../../database/models/Relationship_Types.js";
import Utils from "../../utils/Utils.js";
import Relationships from "../../../database/models/Relationships.js";
import Lists_Names from "../../../database/models/Lists_Names.js";

export default class NcmsController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Ncms;
    }

    
     /**
     * default RequestHandler method to get registers of table model controller
     * @requesthandler
     * @created 2024-12-31
     * @version 1.0.0
     */
     static async get_category_product_name_relationeds(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            let queryParams = req.body.queryParams || req.body;
            //queryParams = DatabaseUtils.prepareQueryParams(queryParams);
            queryParams.raw = true;
            if (!queryParams.query) {
                console.log('queryParams',queryParams);
                queryParams.CODNCMEX = queryParams.CODNCMEX.split('.');
                let ncmString = queryParams.CODNCMEX[0].toString().padStart(8,'0');
                let codNcmArr : any = [
                    ncmString.slice(0,2),
                    ncmString.slice(2,4),
                    ncmString.slice(4,6),
                    ncmString.slice(6,7),
                    ncmString.slice(7,8)
                ];

                queryParams.query = `
                    WITH RECURSIVE hierarchy_relationship AS (
                        
                        /*initial record(s)*/
                        select 
                            r.* 
                        from 
                            ${Relationships.tableName} r
                            join ${Ncms.tableName} n on (				
                                r.record_1_id = n.id
                                and n.chapter = ${codNcmArr[0]}
                                and (
                                    (                                    
                                        n.position = ${codNcmArr[1]}
                                        and n.subposition = ${codNcmArr[2]}
                                        and n.item = ${codNcmArr[3]}
                                        and n.subitem = ${codNcmArr[4]}
                                        and ${Utils.hasValue(queryParams.CODNCMEX[1]) ? ` n.exception = ${Utils.toNumber(queryParams.CODNCMEX[1])} ` : ' n.exception is null '}
                                    ) xor (
                                        (                                            
                                            n.position = ${codNcmArr[1]}
                                            and n.subposition = ${codNcmArr[2]}
                                            and n.item = ${codNcmArr[3]}
                                            and ${Utils.hasValue(queryParams.CODNCMEX[1]) ? ` n.subitem = ${codNcmArr[4]} and n.exception is null ` : ' n.subitem is null '}
                                        ) xor (
                                            (
                                                n.position = ${codNcmArr[1]}
                                                and n.subposition = ${codNcmArr[2]}
                                                and ${Utils.hasValue(queryParams.CODNCMEX[1]) ? ` n.item = ${codNcmArr[3]} and n.subitem is null ` : ' n.item is null '}
                                            ) xor (
                                                (
                                                    n.position = ${codNcmArr[1]}
                                                    and ${Utils.hasValue(queryParams.CODNCMEX[1]) ? ` n.subposition = ${codNcmArr[2]} and n.item is null ` : ' n.subposition is null '}
                                                ) xor (
                                                    ${Utils.hasValue(queryParams.CODNCMEX[1]) ? ` n.position = ${codNcmArr[1]} and n.subposition is null ` : ' n.position is null '}
                                                )
                                            )
                                        )
                                    )
                                )
                            )
                            where
                                r.relationship_type_id = 1
                                and r.table_1_id = 8008
                        
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
        this.configureDefaultRequestHandlers([this.get_category_product_name_relationeds]);
    }
}
