'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Task_Status extends BaseTableModel {
  static id = 15100;
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
      sigla: {
        type: DataTypes.STRING(10)
      },
      is_running: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      is_stopped: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      is_canceled: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue: 0
      },
      is_concluded: {
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
    Sequelize.literal(`(COALESCE(sigla,'NULL'))`)
  ];

  static constraints = [...(Task_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Task_Status.tableName + '_u1',
      fields: [...Task_Status.getBaseTableModelUniqueFields(),...Task_Status.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Task_Status}