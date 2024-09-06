'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class EntitiesTypes extends BaseTableModel {
  static id = 5;
  static model = null;

  static DATABASE = 1;
  static DATABASE_CONNECTION = 2;
  static DATABASE_USER = 3;
  static DATABASE_SCHEMA = 4;
  static DATABASE_TABLE = 5;

  static fields = {
    ...EntitiesTypes.getBaseTableModelFields(),...{
      NAME: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'NAME'
  ];

  static constraints = [...(EntitiesTypes.getBaseTableModelConstraints() || []),...[
    {
      name: EntitiesTypes.name.toLowerCase() + '_U1',
      fields: [...EntitiesTypes.getBaseTableModelUniqueFields(),...EntitiesTypes.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
   
};



module.exports = {EntitiesTypes}