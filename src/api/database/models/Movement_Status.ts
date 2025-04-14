'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Movement_Status extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_started:  number;
  declare is_running:  number;
  declare is_stopped:  number;
  declare is_canceled:  number;
  declare is_concluded:  number;
  declare description: string;



  static id = 9002;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static NOT_STARTED = 1;
  static STARTED = 2;
  static STOPPED = 3;
  static CANCELED = 4;
  static CONCLUDED = 5;

  static fields = {
    ...Movement_Status.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_started: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_running: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_stopped: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_canceled: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_concluded: {
        type: DataTypes.INTEGER,
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

  static constraints = [...(Movement_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Movement_Status.tableName + '_u1',
      fields: [...Movement_Status.getBaseTableModelUniqueFields(),...Movement_Status.uniqueFields],
      type:"unique"
    },{
      name: Movement_Status.tableName + '_c_1',
      fields:['is_started'],
      type:"check",
      where:{
        is_started: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Status.tableName + '_c_2',
      fields:['is_running'],
      type:"check",
      where:{
        is_running: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Status.tableName + '_c_3',
      fields:['is_stopped'],
      type:"check",
      where:{
        is_stopped: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Status.tableName + '_c_4',
      fields:['is_canceled'],
      type:"check",
      where:{
        is_canceled: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Movement_Status.tableName + '_c_5',
      fields:['is_concluded'],
      type:"check",
      where:{
        is_concluded: {
              [Op.in]: [0,1]
          }
      }
    }
  ]];

  static foreignsKeys : any[] = [];
  
/**
  * get the foreign keys avoiding ciclyc imports on BaseTableModel
  * @override
  * @created 2025-04-14
  * @version 1.0.0
  */
  static getForeignKeys(): any[] {
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = [];
      let newAdjustedForeignKeys : boolean = true;
      let baseFks = this.getBaseTableModelForeignsKeys();
      for(let i = 0; i < baseFks.length; i++) {
        result.push(baseFks[i]);
        if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
      }        
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    return result;
  }


  /**
  * static initializer block
  */
  static {
    this.foreignsKeys = this.getForeignKeys();
  }  
};