import { NextFunction, Request, Response } from "express";
import Entities_Types from "../../../database/models/Entities_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Tables from "../../../database/models/Tables.js";
import { Op, QueryTypes, Sequelize } from "sequelize";
import Schemas from "../../../database/models/Schemas.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import Connections from "../../../database/models/Connections.js";
import Utils from "../../utils/Utils.js";


export default class Entities_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Entities_Types;
    }

    static async _get_entities_type_data(entitieTypesId: number, whereClause?: string | Function | null | undefined) : Promise<any[]> {
        let result : any = [];            
        let entityType = await Entities_Types.findOne({
            raw: true,
            where: {
                id: entitieTypesId,

            },
            include: [
                {
                    //raw:true,
                    model: Tables,
                    attributes:[
                        Sequelize.literal(`${Tables.tableName}.name as table_name`) as any
                    ],
                    on:Sequelize.where(Sequelize.col(`${Tables.tableName}.id`),Sequelize.col(`${Entities_Types.tableName}.table_id`)),
                    include:[
                        {
                            model: Schemas,
                            attributes:[
                                Sequelize.literal(`\`${Tables.tableName}->${Schemas.tableName}\`.name as schema_name`) as any
                            ],
                            on:Sequelize.where(Sequelize.col(`\`${Tables.tableName}->${Schemas.tableName}\`.id`),Sequelize.col(`${Tables.tableName}.schema_id`)) 
                            
                        },
                        {
                            model: Connections,
                            attributes:[
                                Sequelize.literal(`\`${Tables.tableName}->${Connections.tableName}\`.name as connection_name`) as any
                            ],
                            on:Sequelize.where(Sequelize.col(`\`${Tables.tableName}->${Connections.tableName}\`.id`),Sequelize.col(`${Tables.tableName}.data_connection_id`)) 
                            
                        }
                    ]
                }
                
            ]
        });

        let where = [];
        if (Utils.hasValue(entityType?.where_clause)) {
            where.push(entityType.where_clause);
        }
        if (Utils.hasValue(whereClause)) {
            if (typeof whereClause == 'function') {
                where.push(whereClause(entityType));
            } else {
                where.push(whereClause);
            }
        }
        
        let query = `
        SELECT
            ${entityType?.identifier_column} as "id",
            ${entityType?.name_column} as "name"
        FROM
            ${(entityType as any)?.schema_name}.${(entityType as any)?.table_name}
        ${Utils.hasValue(where) ? ` WHERE ${where.join(' and ')} ` : ''}
        ${Utils.hasValue(entityType?.order_by) ? ` ORDER BY ${entityType.order_by} ` : ''}`;
        console.log(query)
        let connection = DBConnectionManager.getConnectionByConnectionName((entityType as any)?.connection_name) 
        result = await connection?.query(query, {type:QueryTypes.SELECT});
        return result;
    }

    static async get_entities_type_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const entitieTypesId = req.body.entitieTypesId
            if(Utils.hasValue(entitieTypesId)){                                
                res.data = await this._get_entities_type_data(entitieTypesId,req.body.whereClause);
            } else {
                throw new Error("missing data");
            }
            res.sendResponse(200,true);
        } catch (e: any) {
            res.setException(e);
            res.sendResponse(517,false);
        }
    }

    static {
        this.configureDefaultRequestHandlers([this.get_entities_type_data]);
    }
}
