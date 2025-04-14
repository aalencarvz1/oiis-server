'use strict';


import { Sequelize, DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Task_Status extends BaseTableModel {

  //table fields
  declare name: string;
  declare sigla: string;
  declare is_running: number;
  declare is_stopped: number;
  declare is_canceled: number;
  declare is_concluded: number;
  declare is_visible: number;
  declare description: string;



  static id = 15100;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static NOT_STARTED = 1;
  static RUNNING = 2;
  static STOPPED = 3;
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
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_stopped: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_canceled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_concluded: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_visible: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
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
    },{
      name: Task_Status.tableName + '_c_1',
      fields:['is_running'],
      type:"check",
      where:{
        is_running: {
          [Op.in]: [0,1]
        }
      }
    },{
      name: Task_Status.tableName + '_c_2',
      fields:['is_stopped'],
      type:"check",
      where:{
        is_stopped: {
          [Op.in]: [0,1]
        }
      }
    },{
      name: Task_Status.tableName + '_c_3',
      fields:['is_canceled'],
      type:"check",
      where:{
        is_canceled: {
          [Op.in]: [0,1]
        }
      }
    },{
      name: Task_Status.tableName + '_c_4',
      fields:['is_concluded'],
      type:"check",
      where:{
        is_concluded: {
          [Op.in]: [0,1]
        }
      }
    },{
      name: Task_Status.tableName + '_c_5',
      fields:['is_visible'],
      type:"check",
      where:{
        is_visible: {
          [Op.in]: [0,1]
        }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
  
};