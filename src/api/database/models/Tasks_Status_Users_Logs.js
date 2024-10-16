'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Tasks_Status_Users } = require("./Tasks_Status_Users");


/**
 * class model
 */
class Tasks_Status_Users_Logs extends BaseTableModel {
  static id = 15051;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Tasks_Status_Users_Logs.getBaseTableModelFields(),...{            
      task_status_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      operation: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      old_status_id : {
        type: DataTypes.BIGINT.UNSIGNED
      },
      new_status_id : {
        type: DataTypes.BIGINT.UNSIGNED
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Tasks_Status_Users_Logs.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['task_status_user_id'],
      type: 'foreign key',
      references: { 
          table: Tasks_Status_Users,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Tasks_Status_Users_Logs}