'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Tasks } = require("./Tasks");
const { Users } = require("./Users");
const { TasksStatus } = require("./TasksStatus");


/**
 * class model
 */
class TasksXStatusXUsers extends BaseTableModel {
  static ID = 15050;
  static model = null;

  static fields = {
    ...TasksXStatusXUsers.getBaseTableModelFields(),...{            
      IDTASK: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },       
      IDUSER: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      IDSTATUS : {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull : false,
        defaultValue: TasksStatus.NOT_STARTED
      },
      IDTASKCAUSESTATUS : {
        type: DataTypes.BIGINT.UNSIGNED
      },
      FORECASTSTARTMOMENT: {
        type: DataTypes.DATE
      },
      FORECASTENDMOMENT: {
        type: DataTypes.DATE
      },
      STARTMOMENT: {
        type: DataTypes.DATE
      },
      ENDMOMENT: {
        type: DataTypes.DATE
      },
      LASTRUN: {
        type: DataTypes.DATE
      },
      ACCUMTIME : {
        type: DataTypes.BIGINT
      },
      OBSERVATIONS: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDTASK',
    'IDUSER',
    'IDSTATUS'
  ];

  static constraints = [...(TasksXStatusXUsers.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDTASK'],
      type: 'foreign key',
      references: { 
          table: Tasks,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDUSER'],
      type: 'foreign key',
      references: { 
          table: Users,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDSTATUS'],
      type: 'foreign key',
      references: { 
          table: TasksStatus,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },{
      fields: ['IDTASKCAUSESTATUS'],
      type: 'foreign key',
      references: { 
          table: Tasks,
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'set null'
    }    
  ]];
  
};


module.exports = {TasksXStatusXUsers}