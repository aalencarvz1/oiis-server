'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Project_Task_Types extends BaseTableModel {
  static id = 15050;
  static tableName = this.name.toLowerCase();
  static model = null;

  static TASK = 1;
  static DOCUMENTATION = 2;
  static PLANNING = 3;
  static EXECUTION = 4;
  static DEVELOPMENT = 5;
  static IMPROVEMENT = 6;
  static CORRECTION = 7;

  static fields = {
    ...Project_Task_Types.getBaseTableModelFields(),...{            
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      anotations: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(parent_id,-1))`),
    'name'
  ];

  static constraints = [...(Project_Task_Types.getBaseTableModelConstraints() || []),...[{
    name: Project_Task_Types.tableName + '_u1',
    fields: Project_Task_Types.uniqueFields,
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['parent_id'],
      type: 'foreign key',
      references: { 
          table: Project_Task_Types,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Project_Task_Types}