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
        Utils.log('migrating table',this.name.toUpperCase(), Object.keys(this.fields));
        //await queryInterface.createTable(this.name.toUpperCase(), this.fields);
        let originQueryInterface = await this.getConnection().getQueryInterface();
        let tableExists = await originQueryInterface.tableExists(this.name.toUpperCase());
        Utils.log('tableExists',tableExists);
        if (!tableExists) {
            await originQueryInterface.createTable(this.name.toUpperCase(), this.fields);
            await this.migrateConstraints(originQueryInterface);   
            await queryInterface.bulkInsert('DATATABLES',[{      
                ID:this.ID,
                CREATEDAT: new Date(),
                ISSYSTEMREG : 1,
                IDDATACONNECTION : configDB[`${process.env.NODE_ENV||'development'}_winthor_integration`].ID,
                IDSCHEMA : configDB[`${process.env.NODE_ENV||'development'}_winthor_integration`].ID,
                NAME : this.name.toUpperCase()
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
        Utils.log('migrating down table',this.name.toUpperCase(), Object.keys(this.fields));
        //await queryInterface.createTable(this.name.toUpperCase(), this.fields);
        let originQueryInterface = this.getConnection().getQueryInterface();
        await originQueryInterface.dropTable(ErrorsLogs.name.toUpperCase());
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
                    modelName:this.name.toUpperCase(),
                    tableName:this.name.toUpperCase(),
                    name:{
                        singular:this.name.toUpperCase(),
                        plural:this.name.toUpperCase()
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