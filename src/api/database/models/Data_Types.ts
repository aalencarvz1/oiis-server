'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";





/**
 * class model
 */
export default class Data_Types extends BaseTableModel {

  //table fields
  declare name: string;
  declare is_bool: number;
  declare is_text: number;
  declare is_number: number;
  declare is_array: number;
  declare is_object: number;
  declare is_decimal: number;
  declare is_date: number;
  declare is_time: number;
  declare is_other: number;
  declare description: string;



  static id = 50;

  static tableName = this.name.toLowerCase();

  private static adjustedForeignKeys : boolean = false;

  static ANY = 1;
  static STRING = 2;
  static INTEGER = 3;  
  static BOOLEAN = 4;
  static ARRAY = 5;
  static OBJECT = 6;
  static NUMBER = 7;
  static DATE = 8;
  static TIME = 9;
  static DATETIME = 10;

  
  static fields = {
    ...Data_Types.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      is_bool:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_text:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_number:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_array:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_object:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_decimal:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_date:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_time:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_other:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      description: {
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Data_Types.getBaseTableModelConstraints() || []),...[{
    name: Data_Types.tableName + '_u1',
    fields: [...Data_Types.getBaseTableModelUniqueFields(),...Data_Types.uniqueFields],
    type:"unique"
  },{
    name: Data_Types.tableName + '_c_1',
    fields:['is_bool'],
    type:"check",
    where:{
      is_bool: {
            [Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_2',
    fields:['is_text'],
    type:"check",
    where:{
      is_text: {
            [Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_3',
    fields:['is_number'],
    type:"check",
    where:{
      is_number: {
            [Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_4',
    fields:['is_array'],
    type:"check",
    where:{
      is_array: {
            [Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_5',
    fields:['is_object'],
    type:"check",
    where:{
      is_object: {
            [Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_6',
    fields:['is_decimal'],
    type:"check",
    where:{
      is_decimal: {
            [Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_7',
    fields:['is_date'],
    type:"check",
    where:{
      is_date: {
            [Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_8',
    fields:['is_time'],
    type:"check",
    where:{
      is_time: {
            [Op.in]: [0,1]
      }
    }
  },{
    name: Data_Types.tableName + '_c_9',
    fields:['is_other'],
    type:"check",
    where:{
      is_other: {
            [Op.in]: [0,1]
      }
    }
  }]];

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

