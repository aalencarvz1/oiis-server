'use strict';

import { Sequelize, DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Logistic_Orders_Movs  from "./Logistic_Orders_Movs.js";
import  Logistic_Orders  from "./Logistic_Orders.js";
import  Logistic_Orders_Items_Mov_Amt  from "./Logistic_Orders_Items_Mov_Amt.js";
import  Financial_Value_Forms  from "./Financial_Value_Forms.js";
import  Currencies  from "./Currencies.js";


/**
 * class model
 */
export default class Logistic_Orders_Movs_Received_Values extends BaseTableModel {

  //table fields
   declare logistic_order_movement_receipt_value_ref_id: number;       
   declare logistic_order_id: number;       
   declare mov_logistic_order_id: number;
   declare financial_value_form_id: number;
   declare logistic_mov_item_mov_id: number;            
   declare expected_currency_id: number;
   declare expiration_date: Date;      
   declare expected_value: number;     
   declare expected_value_notes: string; 
   declare received_currency_id: number;
   declare received_value: number;      
   declare received_at: Date;            
   declare received_notes: string;
   declare numeric_order: number;
   declare proofs: string;
   declare canceled_at: Date; 


  static id = 12006;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Logistic_Orders_Movs_Received_Values.getBaseTableModelFields(),...{    
      logistic_order_movement_receipt_value_ref_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },       
      logistic_order_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },       
      mov_logistic_order_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      financial_value_form_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      logistic_mov_item_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },            
      expected_currency_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      expiration_date:{
        type: DataTypes.DATE
      },      
      expected_value:{
        type: DataTypes.DECIMAL(32,10)
      },     
      expected_value_notes:{
        type: DataTypes.TEXT
      }, 
      received_currency_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      received_value:{
        type: DataTypes.DECIMAL(32,10)
      },      
      received_at:{
        type: DataTypes.DATE
      },            
      received_notes:{
        type: DataTypes.TEXT
      },
      numeric_order:{
        type:DataTypes.INTEGER.UNSIGNED,
        allowNull:false,
        defaultValue:1
      },
      proofs:{
        type: DataTypes.TEXT
      },
      canceled_at:{
        type: DataTypes.DATE
      }, 
    }
  };
  
  static uniqueFields = [
    Sequelize.literal(`(COALESCE(logistic_order_movement_receipt_value_ref_id,0))`),
    'logistic_order_id',
    Sequelize.literal(`(COALESCE(mov_logistic_order_id,0))`),
    'financial_value_form_id',
    Sequelize.literal(`(COALESCE(logistic_mov_item_mov_id,0))`),
    'expected_currency_id',
    'numeric_order'
  ];

  static constraints = [...(Logistic_Orders_Movs_Received_Values.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders_Movs_Received_Values.tableName + '_u1',
      fields: [...Logistic_Orders_Movs_Received_Values.getBaseTableModelUniqueFields(),...Logistic_Orders_Movs_Received_Values.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['logistic_order_movement_receipt_value_ref_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_Movs_Received_Values,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['logistic_order_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['mov_logistic_order_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_Movs,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['financial_value_form_id'],
      type: 'foreign key',
      references: { 
          table: Financial_Value_Forms,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['logistic_mov_item_mov_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_Items_Mov_Amt,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['expected_currency_id'],
      type: 'foreign key',
      references: { 
          table: Currencies,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['received_currency_id'],
      type: 'foreign key',
      references: { 
          table: Currencies,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};