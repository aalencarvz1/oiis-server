'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { SqlObjectsTypes } = require("./SqlObjectsTypes");


/**
 * class model
 */
class SqlProcesses extends BaseTableModel {
  static id = 10001;
  static tableName = this.name.toLowerCase();
  static model = null;

  static REPORT_SALES_COST_AND_PROFIT = 1;

  static fields = {
    ...SqlProcesses.getBaseTableModelFields(),...{            
      IDSQLOBJECTTYPE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false
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
    'name'
  ];

  static constraints = [...(SqlProcesses.getBaseTableModelConstraints() || []),...[
    {
      name: SqlProcesses.tableName + '_u1',
      fields: SqlProcesses.uniqueFields,
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
    }
  ]];
  
};


module.exports = {SqlProcesses}