'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { TasksXStatusXUsers } = require("./TasksXStatusXUsers");


/**
 * class model
 */
class TasksXStatusXUsersLogs extends BaseTableModel {
  static id = 15051;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...TasksXStatusXUsersLogs.getBaseTableModelFields(),...{            
      IDTASKXSTATUSXUSER: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      OPERATION: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      IDOLDSTATUS : {
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDNEWSTATUS : {
        type: DataTypes.BIGINT.UNSIGNED
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(TasksXStatusXUsersLogs.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDTASKXSTATUSXUSER'],
      type: 'foreign key',
      references: { 
          table: TasksXStatusXUsers,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {TasksXStatusXUsersLogs}