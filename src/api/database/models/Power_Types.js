'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Power_Types extends BaseTableModel {
  static id = 7002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static SYSTEM = 1;
  static ACCESS = 2;

  static fields = {
    ...Power_Types.getBaseTableModelFields(),...{           
      name:{
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

  static constraints = [...(Power_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Power_Types.tableName + '_u1',
      fields: [...Power_Types.getBaseTableModelUniqueFields(),...Power_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Power_Types}