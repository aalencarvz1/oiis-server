'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Greatnesses extends BaseTableModel {

  //table fields
  declare name: string;
  declare sigla: string;
  declare description: string;
  declare is_scalar: number;
  declare is_vetorial: number;


  static id = 79;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static QUANTITY = 1;
  static MASS = 2;
  static VOLUM = 3;
  static LENGTH = 4;
  
  static fields = {
    ...Greatnesses.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      sigla: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      description: {
        type: DataTypes.TEXT
      },
      is_scalar: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      is_vetorial: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
    }
  };
  
  static uniqueFields = [
    'name',
    'sigla'
  ];

  static constraints = [...(Greatnesses.getBaseTableModelConstraints() || []),...[
    {
      name: Greatnesses.tableName + '_u1',
      fields: [...Greatnesses.getBaseTableModelUniqueFields(),...Greatnesses.uniqueFields],
      type:"unique"
    },{
      name: Greatnesses.tableName + '_c_1',
      fields:['is_scalar'],
      type:"check",
      where:{
        is_scalar: {
              [Op.in]: [0,1]
          }
      }
    },{
      name: Greatnesses.tableName + '_c_2',
      fields:['is_vetorial'],
      type:"check",
      where:{
        is_vetorial: {
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
