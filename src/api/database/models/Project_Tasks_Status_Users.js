'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Users } = require("./Users");
const { Task_Status } = require("./Task_Status");
const { Project_Tasks } = require("./Project_Tasks");


/**
 * class model
 */
class Project_Tasks_Status_Users extends BaseTableModel {
  static id = 15152;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Project_Tasks_Status_Users.getBaseTableModelFields(),...{            
      task_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },       
      user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      status_id : {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
        defaultValue: Task_Status.NOT_STARTED
      },
      triggering_id : {
        type: DataTypes.BIGINT.UNSIGNED
      },
      forecast_start_moment: {
        type: DataTypes.DATE
      },
      forecast_end_moment: {
        type: DataTypes.DATE
      },
      start_at: {
        type: DataTypes.DATE
      },
      end_at: {
        type: DataTypes.DATE
      },
      last_run: {
        type: DataTypes.DATE
      },
      accumulated_time : {
        type: DataTypes.BIGINT
      },
      notes: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'task_id',
    'user_id'
  ];

  static constraints = [...(Project_Tasks_Status_Users.getBaseTableModelConstraints() || []),...[{
    name: Project_Tasks_Status_Users.tableName + '_u1',
    fields: [...Project_Tasks_Status_Users.getBaseTableModelUniqueFields(),...Project_Tasks_Status_Users.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['task_id'],
      type: 'foreign key',
      references: { 
          table: Project_Tasks,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['user_id'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['status_id'],
      type: 'foreign key',
      references: { 
          table: Task_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    },{
      fields: ['triggering_id'],
      type: 'foreign key',
      references: { 
          table: Project_Tasks_Status_Users,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'set null'
    }    
  ]];
  
};


module.exports = {Project_Tasks_Status_Users}