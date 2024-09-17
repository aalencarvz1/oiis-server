/*imports*/
require('dotenv').config({ path: __dirname + "/../../../../../.env" });
const { DataTypes, Model, Op, Sequelize } = require("sequelize");
const configDB  = require("../../config/config");
const { BaseTableModel } = require("../BaseTableModel");
const DBConnectionManager = require("../../DBConnectionManager");
const { Utils } = require("../../../controllers/utils/Utils");





/**
 * class model
 */
class BaseWinthorIntegrationTableModel extends BaseTableModel {    
    static schema = configDB[`${process.env.NODE_ENV||'development'}_winthor_integration`].dialectOptions.schema;  
    static getConnection = DBConnectionManager.getWinthorIntegrationDBConnection;
    //not has foreign keys
    static getBaseTableModelForeignsKeys = () => [];

    /**
     * run migrations of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async runUpMigration(queryInterface, options) {
        options = options || {};
        Utils.log('migrating table',this.tableName, Object.keys(this.fields));
        //await queryInterface.createTable(this.tableName, this.fields);
        let originQueryInterface = await this.getConnection().getQueryInterface();
        //let tableExists = await originQueryInterface.tableExists(this.tableName);
        let tableExists = await originQueryInterface.sequelize.query(`
            select 
                count(1) as "exists"
            from user_tables
            where lower(table_name) = lower('${this.tableName}')
        `);        
        if (Utils.hasValue(tableExists)) {
            tableExists = tableExists[0];
        }
        if (Utils.hasValue(tableExists)) {
            tableExists = tableExists[0];
        }
        if (Utils.hasValue(tableExists)) {
            tableExists = Utils.toBool((tableExists.exists-0) > 0);
        } else {
            tableExists = false;
        }

        if (!tableExists) {
            await originQueryInterface.createTable(this.tableName, this.fields);
            await this.migrateConstraints(originQueryInterface);   
            await queryInterface.bulkInsert('tables',[{      
                id:this.id,
                created_at: new Date(),
                is_sys_rec : 1,
                data_connection_id : configDB[`${process.env.NODE_ENV||'development'}_winthor_integration`].id,
                schema_id : configDB[`${process.env.NODE_ENV||'development'}_winthor_integration`].id,
                name : this.tableName
            }],{
                ignoreDuplicates:true,
                updateOnDuplicate:null
            });
            if (Object.keys(options).indexOf('migrateForeignKeyContraint') == -1) options.migrateForeignKeyContraint = true;
            if (options.migrateForeignKeyContraint == true) {
                await this.migrateForeignKeyContraint(originQueryInterface);              
            }
        } else {
            Utils.log('  not migrated, pre-exists');
        }
    }

    static async runDownMigration(queryInterface, options) {
        options = options || {};
        Utils.log('migrating down table',this.tableName, Object.keys(this.fields));
        //await queryInterface.createTable(this.tableName, this.fields);
        let originQueryInterface = this.getConnection().getQueryInterface();
        //await originQueryInterface.dropTable(Error_Logs.tableName);
    }

    
    

    /**
     * init model inherithed
     * @static (pay attention to bindings)
     * @created 2023-11-10
     */
    static initModel(pSequelize) {
        let model = null;
        try {
            pSequelize = pSequelize || this.getConnection();  
            if (pSequelize) {
                model = this.init(this.fields,{
                    sequelize: pSequelize,
                    underscore:false,
                    freezeTableName:true,
                    modelName:this.tableName,
                    tableName:this.tableName,
                    name:{
                        singular:this.tableName,
                        plural:this.tableName
                    },
                    timestamps:false,
                    hooks: this.getBaseTableModelInitHooks(),
                    noPrimaryKey: Utils.firstValid([this.noPrimaryKey ,false]),
                    removeAttr: Utils.firstValid([this.removeAttr ,'']),
                });
            }
            if (Utils.hasValue(this.removeAttr)) {
                model.removeAttribute(this.removeAttr);
            }
        } catch (e) {
            Utils.log(e);
        }
        return model;
    }
};

module.exports = {BaseWinthorIntegrationTableModel}