import { NextFunction, Request, Response } from "express";
import Entities_Types from "../../../database/models/Entities_Types.js";
import BaseRegistersController from "./BaseRegistersController.js";
import Tables from "../../../database/models/Tables.js";
import { Op, QueryTypes, Sequelize } from "sequelize";
import Schemas from "../../../database/models/Schemas.js";
import DBConnectionManager from "../../../database/DBConnectionManager.js";
import Connections from "../../../database/models/Connections.js";


export default class Entities_TypesController extends BaseRegistersController {
    static getTableClassModel() : any {
        return Entities_Types;
    }
    static async get_entities_type_data(req: Request, res: Response, next: NextFunction) : Promise<void> {
        try {
            const entitieTypesId = req.body.entitieTypesId
            if(entitieTypesId!){
                
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
                })
                
                let query = `
                SELECT
                    ${entityType?.identifier_column} as "id",
                    ${entityType?.name_column} as "name"
                FROM
                    ${(entityType as any)?.schema_name}.${(entityType as any)?.table_name}
                `
                console.log(query)
                let connection = DBConnectionManager.getConnectionByConnectionName((entityType as any)?.connection_name) 
                res.data = await connection?.query(query, {type:QueryTypes.SELECT});
                
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
