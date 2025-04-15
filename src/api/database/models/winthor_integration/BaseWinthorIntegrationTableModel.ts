
import  BaseTableModel  from "../BaseTableModel.js";
import  Utils  from "../../../controllers/utils/Utils.js";
import { QueryInterface } from "sequelize";
import config from "../../config/config.js";
import DBConnectionManager from "../../DBConnectionManager.js";


/**
 * class model
 */
export default class BaseWinthorIntegrationTableModel extends BaseTableModel {    
    static schema = (config as any)[`${process.env.NODE_ENV||'development'}_winthor_integration`].dialectOptions.schema;  

    static getConnection = DBConnectionManager.getWinthorIntegrationDBConnection;

    static getBaseTableModelUniqueFields = () => {
        let result = super.getBaseTableModelUniqueFields.bind(this)();
        result[0] = "parent_id"; //Sequelize.literal(`(COALESCE(parent_id,0))`) is`nt supported by oracle
        return result;
    };  

    //not has base foreign keys
    static getBaseTableModelForeignsKeys = () => [];

    

    /**
     * run migrations of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async runUpMigration(queryInterface: QueryInterface, options? :any) {
        options = options || {};
        let originQueryInterface : any = await this.getConnection()?.getQueryInterface();
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
                data_connection_id : (config as any)[`${process.env.NODE_ENV||'development'}_winthor_integration`].id,
                schema_id : (config as any)[`${process.env.NODE_ENV||'development'}_winthor_integration`].id,
                name : this.tableName
            }],{
                ignoreDuplicates:true
            });
            if (Object.keys(options).indexOf('migrateForeignKeyContraint') == -1) options.migrateForeignKeyContraint = true;
            if (options.migrateForeignKeyContraint == true) {
                await this.migrateForeignKeyContraint(originQueryInterface);              
            }
        } 
    }

    static async runDownMigration(queryInterface: QueryInterface, options?: any) {
        options = options || {};
        let originQueryInterface = this.getConnection()?.getQueryInterface();
    }

    
    

    /**
     * init model inherithed
     * @static (pay attention to bindings)
     * @created 2023-11-10
     */
    static async initModel(pSequelize?: any) : Promise<void> {
        try {
            pSequelize = pSequelize || this.getConnection();  
            if (pSequelize) {
                this.init(this.fields,{
                    sequelize: pSequelize,
                    underscored:false,
                    freezeTableName:true,
                    modelName:this.tableName,
                    tableName:this.tableName,
                    name:{
                        singular:this.tableName,
                        plural:this.tableName
                    },
                    timestamps:false,
                    hooks: this.getTableModelHooks(),
                    //noPrimaryKey: Utils.firstValid([this.noPrimaryKey ,false]),
                    //removeAttr: Utils.firstValid([this.removeAttr ,'']),
                });
            }
            if (Utils.hasValue(this.removeAttr)) {
                this.removeAttribute(this.removeAttr);
            }
        } catch (e) {
            Utils.logError(e);
        }
    }

    /**
     * @static
     * @override
     * @created 2025-04-13
     * @version 1.0.0
     */
    static getForeignKeys(): any[] {   
        if (!this.adjustedForeignKeys) this.adjustedForeignKeys = true;     
        return [];
    }
};