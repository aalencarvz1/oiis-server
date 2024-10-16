'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Sql_Object_Types } = require("./Sql_Object_Types");


/**
 * class model
 */
class Sql_Processes extends BaseTableModel {
  static id = 10001;
  static tableName = this.name.toLowerCase();
  static model = null;

  static REPORT_SALES_COST_AND_PROFIT = 1;

  static fields = {
    ...Sql_Processes.getBaseTableModelFields(),...{            
      sql_object_type_id: {
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
    'sql_object_type_id',
    'name'
  ];

  static constraints = [...(Sql_Processes.getBaseTableModelConstraints() || []),...[
    {
      name: Sql_Processes.tableName + '_u1',
      fields: Sql_Processes.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['sql_object_type_id'],
      type: 'foreign key',
      references: { 
          table: Sql_Object_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Sql_Processes}