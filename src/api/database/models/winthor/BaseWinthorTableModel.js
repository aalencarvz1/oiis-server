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
class BaseWinthorTableModel extends BaseTableModel {    
    static schema = configDB[`${process.env.NODE_ENV||'development'}_winthor`].dialectOptions.schema;  
    static getConnection = DBConnectionManager.getWinthorDBConnection;

    /**
     * run migrations of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async runUpMigration(queryInterface, options) {
        options = options || {};
        Utils.log('migrating table',this.tableName, Object.keys(this.fields));
        await queryInterface.bulkInsert('datatables',[{      
            id:this.id,
            created_at: new Date(),
            is_sys_rec : 1,
            IDDATACONNECTION : configDB[`${process.env.NODE_ENV||'development'}_winthor`].id,
            IDSCHEMA : configDB[`${process.env.NODE_ENV||'development'}_winthor`].id,
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
                    modelName:this.tableName,//toLowerCase() winthor uses uppercase by default,
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
        } catch(e) {
            Utils.log(e);
        }
        return model;
    }
};

module.exports = {BaseWinthorTableModel}