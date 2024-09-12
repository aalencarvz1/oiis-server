'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Task_Status extends BaseTableModel {
  static id = 15005;
  static tableName = this.name.toLowerCase();
  static model = null;

  static NOT_STARTED = 1;
  static RUNNING = 2;
  static STOPED = 3;
  static CANCELED = 4;
  static CONCLUDED = 5;

  static fields = {
    ...Task_Status.getBaseTableModelFields(),...{            
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      SIGLA: {
        type: DataTypes.STRING(10)
      },
      ISRUNNING: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      ISSTOPED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      ISCANCELED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      ISCONCLUDED: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [     
    'name',
    Sequelize.literal(`(COALESCE(SIGLA,'NULL'))`)
  ];

  static constraints = [...(Task_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Task_Status.tableName + '_u1',
      fields: Task_Status.uniqueFields,
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Task_Status}