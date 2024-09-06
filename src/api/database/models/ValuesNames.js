'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class ValuesNames extends BaseTableModel {
  static id = 1002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static INVOICENUM = 1;

  static fields = {
    ...ValuesNames.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(ValuesNames.getBaseTableModelConstraints() || []),...[
    {
      name: ValuesNames.tableName + '_u1',
      fields: [...ValuesNames.getBaseTableModelUniqueFields(),...ValuesNames.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {ValuesNames}