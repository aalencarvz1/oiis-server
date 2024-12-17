'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Routine_Types extends BaseTableModel {
  static id = 210;
  static tableName = this.name.toLowerCase();
  static model = null;

  static SYSTEM = 1;
  static REGISTER = 2;
  static REPORT = 3;

  static fields = {
    ...Routine_Types.getBaseTableModelFields(),...{      
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },      
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [    
    'name'
  ];

  static constraints = [...(Routine_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Routine_Types.tableName + '_u1',
      fields: [...Routine_Types.getBaseTableModelUniqueFields(),...Routine_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {Routine_Types}