'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Access_Profiles extends BaseTableModel {
  static id = 119;
  static tableName = this.name.toLowerCase();
  static model = null;

  static SYSTEM = 1;
  static DEFAULT = 2;
  static ADMINISTRATIVE = 3;
  static GERENCIAL = 4;
  static SUPERVISOR = 5;
  static HUMAN_RESOURCES = 6;
  static INVOICING = 10;
  static FINANCIAL = 20;  
  static SELLER = 50;  
  static SUPLIER = 60;  

  static fields = {
    ...Access_Profiles.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      allow_access_to_all_module_routines: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
        defaultValue: 0
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];  

  static constraints = [...(Access_Profiles.getBaseTableModelConstraints() || []),...[
    {
      name: Access_Profiles.tableName + '_u1',
      fields: [...Access_Profiles.getBaseTableModelUniqueFields(),...Access_Profiles.uniqueFields],
      type:"unique"
    },{
      name: Access_Profiles.tableName + '_c_1',
      fields:['allow_access_to_all_module_routines'],
      type:"check",
      where:{
        allow_access_to_all_module_routines: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];  
  
};


module.exports = {Access_Profiles}

