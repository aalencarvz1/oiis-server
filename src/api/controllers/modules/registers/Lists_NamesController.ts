import { NextFunction, Request, Response } from "express";
import Lists_Names from "../../../database/models/Lists_Names.js";
import BaseRegistersController from "./BaseRegistersController.js";
import DatabaseUtils from "../../database/DatabaseUtils.js";
import { QueryTypes } from "sequelize";
import Relationships from "../../../database/models/Relationships.js";
import Value_Names from "../../../database/models/Value_Names.js";
import Utils from "../../utils/Utils.js";
import Relationship_Types from "../../../database/models/Relationship_Types.js";

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
                let join : any = [];
                if (Utils.hasValue(params.relationship_type_id)) {
                    join.push(`${Relationships.tableName}.relationship_type_id = ${params.relationship_type_id}`);
                }
                if (Utils.hasValue(params.table_1_id)) {
                    join.push(`${Relationships.tableName}.table_1_id = ${params.table_1_id}`);
                }
                if (Utils.hasValue(params.record_1_column)) {
                    join.push(`${Relationships.tableName}.record_1_column = ${params.record_1_column}`);
                }
                if (Utils.hasValue(params.record_1_id)) {
                    join.push(`${Relationships.tableName}.record_1_id = ${params.record_1_id}`);
                }
                join.push(`${Relationships.tableName}.table_2_id = ${Lists_Names.id}}`);
                if (Utils.hasValue(params.record_2_column)) {
                    join.push(`${Relationships.tableName}.record_2_column = ${params.record_2_column}`);
                }
                if (Utils.hasValue(params.record_2_id)) {
                    join.push(`${Relationships.tableName}.record_2_id = ${params.record_2_id}`);
                }
                if (Utils.hasValue(params.parent_id)) {
                    join.push(`${Relationships.tableName}.parent_id = ${params.parent_id}`);
                } else if (params.parent_id === null) {
                    join.push(`${Relationships.tableName}.parent_id is null`);
                }
                queryParams.query = `
                    select
                        ${Lists_Names.tableName}.*
                    from
                        ${Lists_Names}
                        inner join ${Relationships.tableName} on (${join.join(',')})
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
