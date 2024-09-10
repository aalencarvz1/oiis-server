'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

/**
 * class model
 */
class Street_Types extends BaseTableModel {
  static id = 2005;
  static tableName = this.name.toLowerCase();
  static model = null;

  static STREET = 1;
  static AVENUE = 2;

  static fields = {
    ...Street_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Street_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Street_Types.tableName + '_u1',
      fields: [...Street_Types.getBaseTableModelUniqueFields(),...Street_Types.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Street_Types}