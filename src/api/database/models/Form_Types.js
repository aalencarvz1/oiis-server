'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Form_Types extends BaseTableModel {
  static id = 1031;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Form_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      path:{
        type: DataTypes.STRING(2000)
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Form_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Form_Types.tableName + '_u1',
      fields: [...Form_Types.getBaseTableModelUniqueFields(),...Form_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
  
};


module.exports = {Form_Types}