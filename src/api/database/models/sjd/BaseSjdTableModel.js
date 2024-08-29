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
class BaseSjdTableModel extends BaseTableModel {    
    static schema = configDB[`${process.env.NODE_ENV||'development'}_consult`].dialectOptions.schema;  
    static getConnection = DBConnectionManager.getConsultDBConnection;

    /**
     * run migrations of inherited model
     * @static (pay attention to bindings)
     * @async (pay attention to await)
     * @created 2023-11-10
     */
    static async runUpMigration(queryInterface, options) {
        options = options || {};
        Utils.log('migrating table',this.name.toUpperCase(), Object.keys(this.fields));
        await queryInterface.bulkInsert('DATATABLES',[{      
            ID:this.ID,
            CREATEDAT: new Date(),
            ISSYSTEMREG : 1,
            IDDATACONNECTION : configDB[`${process.env.NODE_ENV||'development'}_consult`].ID,
            IDSCHEMA : configDB[`${process.env.NODE_ENV||'development'}_consult`].ID,
            NAME : this.name.toUpperCase()
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

module.exports = {BaseSjdTableModel}