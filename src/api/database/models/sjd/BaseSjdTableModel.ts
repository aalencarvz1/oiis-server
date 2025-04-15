
import { QueryInterface } from "sequelize";
import  BaseTableModel  from "../BaseTableModel.js";
import  Utils  from "../../../controllers/utils/Utils.js";
import DBConnectionManager from "../../DBConnectionManager.js";
import config from "../../config/config.js";





/**
 * class model
 */
export default class BaseSjdTableModel extends BaseTableModel {    
    static schema = (config as any)[`${process.env.NODE_ENV||'development'}_consult`].dialectOptions.schema;  

    static getConnection = DBConnectionManager.getConsultDBConnection;

    //not has base foreign keys
    static getBaseTableModelForeignsKeys = () => [];
    
    /**
     * run migrations of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async runUpMigration(queryInterface: QueryInterface, options?: any) {
        options = options || {};
        await queryInterface.bulkInsert('tables',[{      
            id:this.id,
            created_at: new Date(),
            is_sys_rec : 1,
            data_connection_id : (config as any)[`${process.env.NODE_ENV||'development'}_consult`].id,
            schema_id : (config as any)[`${process.env.NODE_ENV||'development'}_consult`].id,
            name : this.tableName
        }],{
            ignoreDuplicates:true
        });
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