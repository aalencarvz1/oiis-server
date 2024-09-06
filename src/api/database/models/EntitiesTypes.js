'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class EntitiesTypes extends BaseTableModel {
  static id = 5;
  static tableName = this.name.toLowerCase();
  static model = null;

  static DATABASE = 1;
  static DATABASE_CONNECTION = 2;
  static DATABASE_USER = 3;
  static DATABASE_SCHEMA = 4;
  static DATABASE_TABLE = 5;

  static fields = {
    ...EntitiesTypes.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(EntitiesTypes.getBaseTableModelConstraints() || []),...[
    {
      name: EntitiesTypes.tableName + '_U1',
      fields: [...EntitiesTypes.getBaseTableModelUniqueFields(),...EntitiesTypes.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
   
};



module.exports = {EntitiesTypes}