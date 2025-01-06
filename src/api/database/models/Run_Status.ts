'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";



/**
 * class model
 */
export default class Run_Status extends BaseTableModel {

  //table fields
  declare name: string;
  declare sigla: string;
  declare is_running: number;
  declare is_stopped: number;
  declare is_canceled: number;
  declare is_concluded: number;
  declare description: string;


  static id = 67;
  static tableName = this.name.toLowerCase();
  

  static NOT_STARTED = 1;
  static RUNNING = 2;
  static STOPPED = 3;
  static CANCELED = 4;
  static CONCLUDED = 5;

  static fields = {
    ...Run_Status.getBaseTableModelFields(),...{
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
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Run_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Run_Status.tableName + '_u1',
      fields: [...Run_Status.getBaseTableModelUniqueFields(),...Run_Status.uniqueFields],
      type:"unique"
    },{
      name: Run_Status.tableName + '_c_1',
      fields:['is_running'],
      type:"check",
      where:{
        is_running: {
          [Op.in]: [0,1]
        }
      }
    },{
      name: Run_Status.tableName + '_c_2',
      fields:['is_stopped'],
      type:"check",
      where:{
        is_stopped: {
          [Op.in]: [0,1]
        }
      }
    },{
      name: Run_Status.tableName + '_c_3',
      fields:['is_canceled'],
      type:"check",
      where:{
        is_canceled: {
          [Op.in]: [0,1]
        }
      }
    },{
      name: Run_Status.tableName + '_c_4',
      fields:['is_concluded'],
      type:"check",
      where:{
        is_concluded: {
          [Op.in]: [0,1]
        }
      }
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[])]
    
};
