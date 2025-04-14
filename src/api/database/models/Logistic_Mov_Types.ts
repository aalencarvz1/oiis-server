'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Logistic_Mov_Types extends BaseTableModel {

  //table fields
  declare name: number;
  declare is_input:  number;
  declare is_output:  number;
  declare description: string;


  static id = 12000;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static DELIVERY = 1;
  static COLLECT = 2;
  static RETREAT = 3;

  static fields = {
    ...Logistic_Mov_Types.getBaseTableModelFields(),...{           
      name:{
        type: DataTypes.STRING(256),
        allowNull:false
      },
      is_input: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      is_output: {
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

  static constraints = [...(Logistic_Mov_Types.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Mov_Types.tableName + '_u1',
      fields: [...Logistic_Mov_Types.getBaseTableModelUniqueFields(),...Logistic_Mov_Types.uniqueFields],
      type:"unique"
    },{
      name: Logistic_Mov_Types.tableName + '_c_1',
      fields:['is_input'],
      type:"check",
      where:{
        is_input: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Logistic_Mov_Types.tableName + '_c_2',
      fields:['is_output'],
      type:"check",
      where:{
        is_output: {
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