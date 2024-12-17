const { Utils } = require("../../../utils/Utils");
const { Tables } = require("../../../../database/models/Tables");
const { RegistersController } = require("../RegistersController");
const { Groups } = require("../../../../database/models/Groups");
const { Entities_Types } = require("../../../../database/models/Entities_Types");
const { Sequelize, QueryTypes } = require("sequelize");
const { DatabaseUtils } = require("../../../database/DatabaseUtils");
const { Schemas } = require("../../../../database/models/Schemas");
const { Connections } = require("../../../../database/models/Connections");
const DBConnectionManager = require("../../../../database/DBConnectionManager");
const { Groups_Items } = require("../../../../database/models/Groups_Items");

/**
 * Class controller to handle registers module
 * @author Alencar
 * @created 2023-09-05
 */
class GroupsController extends RegistersController{

    static async getItemsWithNames(req,res) {
        try {
            let queryParams = req.body.queryParams || req.body;            
            queryParams.raw = true;
            let queryParams2 = null;
            if (Utils.hasValue(queryParams)) {
                queryParams2 = JSON.parse(JSON.stringify(queryParams));
                queryParams = await DatabaseUtils.prepareQueryParams(queryParams);
                queryParams2 = await DatabaseUtils.prepareQueryParams(queryParams2);
            }
            res.data = await Groups_Items.getModel().findAll(queryParams2);
            if (Utils.hasValue(res.data)) {
                queryParams.attributes = queryParams.attributes || [
                    Sequelize.literal(`DISTINCT \`${Groups.tableName}\`.name`)
                ];
                queryParams.include = queryParams.include || [];
                queryParams.include.push({
                    raw:true,
                    attributes:[],
                    model:Groups.getModel(),
                    on: Sequelize.where(Sequelize.col(`${Groups.tableName}.id`),Sequelize.col(`${Groups_Items.tableName}.group_id`)),
                    include:[{
                        raw:true,
                        attributes:[
                            Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}\`.table_id as table_id`),
                            Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}\`.identifier_column as identifier_column`),
                            Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}\`.name_column as name_column`),
                            Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}\`.columns as columns`),
                            Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}\`.where as \`where\``),
                            Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}\`.order_by as order_by`),
                        ],
                        model:Entities_Types.getModel(),
                        on: Sequelize.where(Sequelize.col(`${Groups.tableName}->${Entities_Types.tableName}.id`),Sequelize.col(`${Groups.tableName}.entity_type_id`)),
                        include:[{
                            raw:true,
                            model:Tables.getModel(),
                            attributes:[
                                Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}->${Tables.tableName}\`.name as table_name`)
                            ],
                            on: Sequelize.where(Sequelize.col(`${Groups.tableName}->${Entities_Types.tableName}->${Tables.tableName}.id`),Sequelize.col(`${Groups.tableName}->${Entities_Types.tableName}.table_id`)),
                            include:[{
                                raw:true,
                                model:Schemas.getModel(),
                                attributes:[
                                    Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}\`.name as schema_name`),
                                    Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}\`.default_connection_id as default_connection_id`)
                                ],
                                on: Sequelize.where(Sequelize.col(`${Groups.tableName}->${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}.id`),Sequelize.col(`${Groups.tableName}->${Entities_Types.tableName}->${Tables.tableName}.schema_id`)),
                                include:[{
                                    raw:true,
                                    model:Connections.getModel(),
                                    attributes:[
                                        Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}->${Connections.tableName}\`.name as connection_name`),
                                        Sequelize.literal(`\`${Groups.tableName}->${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}->${Connections.tableName}\`.default_env_identifier as default_env_identifier`)
                                    ],
                                    on: Sequelize.where(Sequelize.col(`${Groups.tableName}->${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}->${Connections.tableName}.id`),Sequelize.col(`${Groups.tableName}->${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}.default_connection_id`))
                                }]
                            }]
                        }]
                    }]
                });
                let groups = await Groups_Items.getModel().findAll(queryParams);
                for(let i in groups) {
                    let connection = DBConnectionManager.getConnectionByConnectionName(groups[i].connection_name);
                    let query = `
                        select
                            ${groups[i].columns||'*'}
                        from
                            ${groups[i].schema_name}.${groups[i].table_name}
                        where
                            ${groups[i].where||'1=1'}                        
                            AND ${groups[i].table_name}.${groups[i].identifier_column} in (${res.data.map(el=>el.item_id).join(',')})
                        order by
                            ${groups[i].order_by||'1'}
                    `;
                    let items = await connection.query(query,{raw:true,type:QueryTypes.SELECT});

                    for(let k in items) {
                        res.data.filter(el=>el.item_id == items[k][groups[i].identifier_column]).forEach(element => {
                            element.item_name = items[k][groups[i].name_column];
                        });
                    }
                }
            }

            res.sendResponse(200,true);
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        } 
    }

    static async processSqlCondiction(req,res) {
        try {
            let queryParams = req.body.queryParams || req.body;
            if (Utils.hasValue(queryParams)) {
                queryParams = await DatabaseUtils.prepareQueryParams(queryParams);
            }
            queryParams.raw = true;
            queryParams.attributes = queryParams.attributes || [
                `${Groups.tableName}.*`,
                Sequelize.literal(`(select group_concat(i.item_id,',') from groups_items i where i.group_id = ${Groups.tableName}.id) as items_ids_list`)
            ];
            queryParams.include = queryParams.include || [];
            queryParams.include.push({
                raw:true,
                model:Entities_Types.getModel(),
                attributes:[
                    Sequelize.literal(`${Entities_Types.tableName}.table_id`),
                    Sequelize.literal(`${Entities_Types.tableName}.identifier_column`),
                    Sequelize.literal(`${Entities_Types.tableName}.columns`),
                    Sequelize.literal(`${Entities_Types.tableName}.where`),
                    Sequelize.literal(`${Entities_Types.tableName}.order_by`),
                ],
                on: Sequelize.where(Sequelize.col(`${Entities_Types.tableName}.id`),Sequelize.col(`${Groups.tableName}.entity_type_id`)),
                include:[{
                    raw:true,
                    model:Tables.getModel(),
                    attributes:[
                        Sequelize.literal(`\`${Entities_Types.tableName}->${Tables.tableName}\`.name as table_name`)
                    ],
                    on: Sequelize.where(Sequelize.col(`${Entities_Types.tableName}->${Tables.tableName}.id`),Sequelize.col(`${Entities_Types.tableName}.table_id`)),
                    include:[{
                        raw:true,
                        model:Schemas.getModel(),
                        attributes:[
                            Sequelize.literal(`\`${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}\`.name as schema_name`),
                            Sequelize.literal(`\`${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}\`.default_connection_id as default_connection_id`)
                        ],
                        on: Sequelize.where(Sequelize.col(`${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}.id`),Sequelize.col(`${Entities_Types.tableName}->${Tables.tableName}.schema_id`)),
                        include:[{
                            raw:true,
                            model:Connections.getModel(),
                            attributes:[
                                Sequelize.literal(`\`${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}->${Connections.tableName}\`.name as connection_name`),
                                Sequelize.literal(`\`${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}->${Connections.tableName}\`.default_env_identifier as default_env_identifier`)
                            ],
                            on: Sequelize.where(Sequelize.col(`${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}->${Connections.tableName}.id`),Sequelize.col(`${Entities_Types.tableName}->${Tables.tableName}->${Schemas.tableName}.default_connection_id`))
                        }]
                    }]
                }]
            });
            let registers = await Groups.getModel().findAll(queryParams);
            if (Utils.hasValue(registers)) {

                //fazer o loop pelos registros, montar a query, acrescentar a clausula where do sql_condiction do grupo e fazer loop pelos resultados, incluindo no grupo se ainda nao tiver
                let newItems = [];
                for(let i in registers) {
                    registers[i].items_ids_list = (registers[i].items_ids_list||'').replace(/,,/g,',');
                    registers[i].items_ids_list = registers[i].items_ids_list.split(',');
                    registers[i].items_ids_list = [...new Set(registers[i].items_ids_list)];
                    registers[i].items_ids_list = registers[i].items_ids_list.filter(el=>Utils.hasValue(el));
                    let connection = DBConnectionManager.getConnectionByConnectionName(registers[i].connection_name);
                    let query = `
                        select
                            ${registers[i].columns||'*'}
                        from
                            ${registers[i].schema_name}.${registers[i].table_name}
                        where
                            ${registers[i].where||'1=1'}
                            ${Utils.hasValue(registers[i].sql_condiction) ? ` AND (${registers[i].sql_condiction.replace(/:new/gi,registers[i].table_name)}) `: ''}
                            ${Utils.hasValue(registers[i].items_ids_list) ? ` AND ${registers[i].table_name}.${registers[i].identifier_column} not in (${registers[i].items_ids_list.join(',')})` : ''}
                        order by
                            ${registers[i].order_by||'1'}
                    `;
                    let items = await connection.query(query,{raw:true,type:QueryTypes.SELECT});

                    for(let k in items) {
                        newItems.push({
                            group_id: registers[i].id,
                            item_id: items[k][registers[i].identifier_column],
                            is_manual_included: 1
                        });
                    }
                }

                if (Utils.hasValue(newItems)) {
                    let createResult = await Groups_Items.getModel().bulkCreate(newItems);
                    console.log(createResult);
                }

                res.sendResponse(200,true);
            } else {
                throw new Error("no data found");
            }
        } catch (e) {
            res.setException(e);
            res.sendResponse(517,false);
        }    
    }   
}

module.exports = {GroupsController}