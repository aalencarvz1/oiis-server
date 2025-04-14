'use strict';

import { DataTypes, Op } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Sync_Status extends BaseTableModel {

  //table fields
  declare name: string;
  declare synchronized: number;
  

  static id = 66;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Sync_Status.getBaseTableModelFields(),...{
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      synchronized: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      }
    }
  };
  
  static uniqueFields = [
    'name'
  ];

  static constraints = [...(Sync_Status.getBaseTableModelConstraints() || []),...[
    {
      name: Sync_Status.tableName + '_u1',
      fields: [...Sync_Status.getBaseTableModelUniqueFields(),...Sync_Status.uniqueFields],
      type:"unique"
    },{
      name: Sync_Status.tableName + '_c_1',
      fields:['synchronized'],
      type:"check",
      where:{
        synchronized: {
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
