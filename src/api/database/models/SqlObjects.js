'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { SqlObjectsTypes } = require("./SqlObjectsTypes");


/**
 * class model
 */
class SqlObjects extends BaseTableModel {
  static id = 10004;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...SqlObjects.getBaseTableModelFields(),...{            
      IDSQLOBJECTTYPE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false
      }, 
      IDSUP: {
        type: DataTypes.BIGINT.UNSIGNED
      }, 
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
    'IDSQLOBJECTTYPE',
    Sequelize.literal(`(COALESCE(IDSUP,0))`),
    'name'
  ];

  static constraints = [...(SqlObjects.getBaseTableModelConstraints() || []),...[
    {
      name: SqlObjects.tableName + '_u1',
      fields: SqlObjects.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDSQLOBJECTTYPE'],
      type: 'foreign key',
      references: { 
          table: SqlObjectsTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSUP'],
      type: 'foreign key',
      references: { 
          table: SqlObjects,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {SqlObjects}