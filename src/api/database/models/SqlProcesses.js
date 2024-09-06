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
  static model = null;

  static REPORT_SALES_COST_AND_PROFIT = 1;

  static fields = {
    ...SqlProcesses.getBaseTableModelFields(),...{            
      IDSQLOBJECTTYPE: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false
      },       
      NAME: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      DESCRIPTION: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [ 
    'IDSQLOBJECTTYPE',
    'NAME'
  ];

  static constraints = [...(SqlProcesses.getBaseTableModelConstraints() || []),...[
    {
      name: SqlProcesses.name.toLowerCase() + '_u1',
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