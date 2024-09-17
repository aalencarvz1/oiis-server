'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Tasks_X_Status_X_Users } = require("./Tasks_X_Status_X_Users");


/**
 * class model
 */
class Tasks_X_Status_X_Users_Logs extends BaseTableModel {
  static id = 15051;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Tasks_X_Status_X_Users_Logs.getBaseTableModelFields(),...{            
      IDTASKXSTATUSXUSER: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      operation: {
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

  static constraints = [...(Tasks_X_Status_X_Users_Logs.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDTASKXSTATUSXUSER'],
      type: 'foreign key',
      references: { 
          table: Tasks_X_Status_X_Users,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Tasks_X_Status_X_Users_Logs}