'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class SqlObjectsTypes extends BaseTableModel {
  static id = 10000;
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
    ...SqlObjectsTypes.getBaseTableModelFields(),...{            
      IDSUP: {
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    Sequelize.literal(`(COALESCE(IDSUP,0))`),
    'name'
  ];

  static constraints = [...(SqlObjectsTypes.getBaseTableModelConstraints() || []),...[
    {
      name: SqlObjectsTypes.name.toLowerCase() + '_u1',
      fields: SqlObjectsTypes.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSUP'],
      type: 'foreign key',
      references: { 
          table: SqlObjectsTypes,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {SqlObjectsTypes}