'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Value_Names extends BaseTableModel {
  static id = 1002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static INVOICENUM = 1;

  static fields = {
    ...Value_Names.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Value_Names.getBaseTableModelConstraints() || []),...[
    {
      name: Value_Names.tableName + '_u1',
      fields: [...Value_Names.getBaseTableModelUniqueFields(),...Value_Names.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {Value_Names}