'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Sql_Object_Types extends BaseTableModel {
  static id = 10000;
  static tableName = this.name.toLowerCase();
  static model = null;

  static DATABASE = 1;
  static USER = 100;
  static SCHEMA = 200;
  static TABLE = 300;
  static FIELD = 400;
  static SELECT = 1000;
  static FROM = 1100;
  static JOIN = 1150;
  static ON = 1155;
  static WHERE = 1200;
  static GROUP_BY = 1300;
  static HAVING = 1400;
  static ORDER_BY = 1500;
  static PIVOT = 1600;
  static FOR = 1650;
  static IN = 1655;
  static TEXT = 10000;


  static fields = {
    ...Sql_Object_Types.getBaseTableModelFields(),...{            
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

  static constraints = [...(Sql_Object_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Sql_Object_Types.tableName + '_u1',
      fields: Sql_Object_Types.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Sql_Object_Types}