'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Commission_Items  from './Commission_Items.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Commission_Values extends BaseTableModel {

  //table fields
  declare commission_item_id: number;
  declare name: string;
  declare description: string;
  declare percent: number;



  static id = 9052;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Commission_Values.getBaseTableModelFields(),...{                 
      commission_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
      },
      name:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      description:{
        type: DataTypes.TEXT
      },
      percent:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'commission_item_id',
    'name'
  ];

  static constraints = [...(Commission_Values.getBaseTableModelConstraints() || []),...[]];

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
      result.push({
        fields: ['commission_item_id'],
        type: 'foreign key',
        references: { 
            table: Commission_Items,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
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