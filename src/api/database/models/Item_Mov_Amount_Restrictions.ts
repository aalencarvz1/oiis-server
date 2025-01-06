'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Value_Names  from "./Value_Names.js";
import  Item_Mov_Amounts  from "./Item_Mov_Amounts.js";
import  Identifier_Types  from "./Identifier_Types.js";

/**
 * class model
 */
export default class Item_Mov_Amount_Restrictions extends BaseTableModel {

  //table fields
  declare item_mov_amt_id: number;
  declare identifier_type_id: number;
  declare value_name_id: number;
  declare operation: string;
  declare value: string;



  static id = 9037;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Item_Mov_Amount_Restrictions.getBaseTableModelFields(),...{                 
      item_mov_amt_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      value_name_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      operation:{
        type: DataTypes.STRING(256)
      },
      value:{
        type: DataTypes.STRING(256)
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Item_Mov_Amount_Restrictions.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['item_mov_amt_id'],
      type: 'foreign key',
      references: { 
          table: Item_Mov_Amounts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['value_name_id'],
      type: 'foreign key',
      references: { 
          table: Value_Names,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};