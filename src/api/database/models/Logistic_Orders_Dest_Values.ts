'use strict';

import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Logistic_Orders  from "./Logistic_Orders.js";
import  Financial_Value_Forms  from "./Financial_Value_Forms.js";
import  Currencies  from "./Currencies.js";
import  Financial_Value_Mov_Types  from "./Financial_Value_Mov_Types.js";


/**
 * class model
 */
export default class Logistic_Orders_Dest_Values extends BaseTableModel {

  //table fields
  declare logistic_order_id: number;       
  declare logistic_order_financial_value_form_id: number;
  declare currenty_type_id: number;      
  declare financial_value_mov_type_dest: number;      
  declare destinated_value: number;
  declare numeric_order: number;
  declare observations: string;


  static id = 12007;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Logistic_Orders_Dest_Values.getBaseTableModelFields(),...{    
      logistic_order_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },       
      logistic_order_financial_value_form_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      currenty_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      financial_value_mov_type_dest:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },      
      destinated_value:{
        type: DataTypes.DECIMAL(32,10)
      },
      numeric_order:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        defaultValue:1
      },
      observations:{
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [
    'logistic_order_id',
    'logistic_order_financial_value_form_id',
    'financial_value_mov_type_dest',
    'numeric_order'
  ];

  static constraints = [...(Logistic_Orders_Dest_Values.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders_Dest_Values.tableName + '_u1',
      fields: [...Logistic_Orders_Dest_Values.getBaseTableModelUniqueFields(),...Logistic_Orders_Dest_Values.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['logistic_order_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['logistic_order_financial_value_form_id'],
      type: 'foreign key',
      references: { 
          table: Financial_Value_Forms,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['currenty_type_id'],
      type: 'foreign key',
      references: { 
          table: Currencies,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['financial_value_mov_type_dest'],
      type: 'foreign key',
      references: { 
          table: Financial_Value_Mov_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
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