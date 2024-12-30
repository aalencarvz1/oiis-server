'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Commission_Items  from './Commission_Items.js';


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

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['commission_item_id'],
    type: 'foreign key',
    references: { 
        table: Commission_Items,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];

};