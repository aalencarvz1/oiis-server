'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');



/**
 * class model
 */
class Action_Status extends BaseTableModel {
  static id = 51;
  static tableName = this.name.toLowerCase();
  static model = null;

  static NOT_STARTED = 1;
  static RUNNING = 2;
  static STOPPED = 3;
  static CANCELED = 4;
  static CONCLUDED = 5;

  static fields = {
    ...Action_Status.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_started: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_running: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_stopped: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_canceled: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      is_concluded: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Action_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Action_Status.tableName + '_u1',
      fields: [...Action_Status.getBaseTableModelUniqueFields(),...Action_Status.uniqueFields],
      type:"unique"
    },{
      name: Action_Status.tableName + '_c_1',
      fields:['is_started'],
      type:"check",
      where:{
        is_started: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Action_Status.tableName + '_c_2',
      fields:['is_running'],
      type:"check",
      where:{
        is_running: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Action_Status.tableName + '_c_3',
      fields:['is_stopped'],
      type:"check",
      where:{
        is_stopped: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Action_Status.tableName + '_c_4',
      fields:['is_canceled'],
      type:"check",
      where:{
        is_canceled: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    },{
      name: Action_Status.tableName + '_c_5',
      fields:['is_concluded'],
      type:"check",
      where:{
        is_concluded: {
              [Sequelize.Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[]];
  
};


module.exports = {Action_Status}
