'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Entities_Types extends BaseTableModel {
  static id = 5;
  static tableName = this.name.toLowerCase();
  static model = null;

  static DATABASE = 1;
  static DATABASE_CONNECTION = 2;
  static DATABASE_USER = 3;
  static DATABASE_SCHEMA = 4;
  static DATABASE_TABLE = 5;

  static fields = {
    ...Entities_Types.getBaseTableModelFields(),...{
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

  static constraints = [...(Entities_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Entities_Types.tableName + '_U1',
      fields: [...Entities_Types.getBaseTableModelUniqueFields(),...Entities_Types.uniqueFields],
      type:"unique"
    }

  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
   
};



module.exports = {Entities_Types}