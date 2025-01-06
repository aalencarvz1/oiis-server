'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Conditions  from "./Conditions.js";


/**
 * class model
 */
export default class Condition_Items extends BaseTableModel {

  //table fields
  declare condition_id: number;
  declare value: string;
  declare expression: string;


  static id = 7005;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Condition_Items.getBaseTableModelFields(),...{           
      condition_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      value:{
        type: DataTypes.TEXT
      },
      expression: {
        type: DataTypes.TEXT
      }      
    }
};

static constraints = [...(Condition_Items.getBaseTableModelConstraints() || []),...[]];

static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
  {
    fields: ['condition_id'],
    type: 'foreign key',
    references: { 
        table: Conditions,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }
]];
  
};
