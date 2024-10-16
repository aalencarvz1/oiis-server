/*imports*/
const configDB  = require("../../config/config");
const { BaseTableModel } = require("../BaseTableModel");
const DBConnectionManager = require("../../DBConnectionManager");
const { Utils } = require("../../../controllers/utils/Utils");


/**
 * class model
 */
class BaseExternalDataTableModel extends BaseTableModel {    
    static schema = configDB[`${process.env.NODE_ENV||'development'}_external_data`].database;  
    static getConnection = DBConnectionManager.getExternalDataDBConnection;

    //not has base foreign keys
    static getBaseTableModelForeignsKeys = () => [];
    
    /**
     * run migrations of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async runUpMigration(queryInterface, options) {
        options = options || {};
        Utils.log('creating table',`${this.schema}.${this.tableName}`, Object.keys(this.fields));
        //await queryInterface.createTable({scheme: this.schema, tableName: this.tableName}, this.fields);
        //await this.migrateConstraints(queryInterface);    
        await queryInterface.bulkInsert('tables',[{      
            id:this.id,
            created_at: new Date(),
            is_sys_rec : 1,
            data_connection_id : configDB[`${process.env.NODE_ENV||'development'}_external_data`].id,
            schema_id : configDB[`${process.env.NODE_ENV||'development'}_external_data`].id,
            name : this.tableName
        }],{
            ignoreDuplicates:true,
            updateOnDuplicate:null
        });
    }

    /**
     * init model inherithed
     * @static (pay attention to bindings)
     * @created 2023-11-10
     */
    static initModel(pSequelize) {
        let model = null;
        try {
            //Utils.log('Initializing model ',pClassModel.name);
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
                    noPrimaryKey: Utils.firstValid([this.noPrimaryKey ,false]),
                    removeAttr: Utils.firstValid([this.removeAttr ,'']),
                });
            }
            //Utils.log(' successfull initied model ',pClassModel.name);
            if (Utils.hasValue(this.removeAttr)) {
                model.removeAttribute(this.removeAttr);
            }
        } catch (e) {
            Utils.log(e);
        }
        return model;
    }      
};

module.exports = {BaseExternalDataTableModel}