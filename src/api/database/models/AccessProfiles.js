'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class AccessProfiles extends BaseTableModel {
  static id = 119;
  static tableName = "access_profiles";
  static model = null;

  static SYSTEM = 1;
  static DEFAULT = 2;
  static ADMINISTRATIVE = 3;
  static GERENCIAL = 4;
  static SUPERVISOR = 5;
  static INVOICING = 10;
  static FINANCIAL = 20;  
  static SELLER = 50;  
  static SUPLIER = 60;  

  static fields = {
    ...AccessProfiles.getBaseTableModelFields(),...{           
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

  static constraints = [...(AccessProfiles.getBaseTableModelConstraints() || []),...[
    {
      name: AccessProfiles.tableName + '_u1',
      fields: [...AccessProfiles.getBaseTableModelUniqueFields(),...AccessProfiles.uniqueFields],
      type:"unique"
    },{
      name: AccessProfiles.tableName + '_c_1',
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


module.exports = {AccessProfiles}

