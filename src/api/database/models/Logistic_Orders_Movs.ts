'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Logistic_Orders  from "./Logistic_Orders.js";
import  Movement_Status  from "./Movement_Status.js";
import  Logistic_Status  from "./Logistic_Status.js";
import  Action_Status  from "./Action_Status.js";
import  Movements  from "./Movements.js";
import  Logistic_Reasons  from "./Logistic_Reasons.js";


/**
 * class model
 */
export default class Logistic_Orders_Movs extends BaseTableModel {

  //table fields
  declare logistic_order_id: number;
  declare mov_id: number;
  declare action_status_id: number;
  declare logistic_status_id: number;
  declare unmoved_reason_id: number;
  declare collected_reason_id: number;
  declare unmoved_qty_notes: string;
  declare collected_qty_notes: string;
  declare mov_started_at: Date;
  declare mov_ended_at: Date;


  static id = 12004;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Logistic_Orders_Movs.getBaseTableModelFields(),...{           
      logistic_order_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      action_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },
      logistic_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },
      unmoved_reason_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      collected_reason_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      unmoved_qty_notes:{
        type: DataTypes.TEXT
      },
      collected_qty_notes:{
        type: DataTypes.TEXT
      },
      mov_started_at:{
        type: DataTypes.DATE
      },
      mov_ended_at:{
        type: DataTypes.DATE
      },
    }
  };
  
  static uniqueFields = [
    'logistic_order_id',
    'mov_id'
  ];

  static constraints = [...(Logistic_Orders_Movs.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders_Movs.tableName + '_u1',
      fields: [...Logistic_Orders_Movs.getBaseTableModelUniqueFields(),...Logistic_Orders_Movs.uniqueFields],
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
    },
    {
      fields: ['mov_id'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['action_status_id'],
      type: 'foreign key',
      references: { 
          table: Action_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['logistic_status_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['unmoved_reason_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Reasons,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['collected_reason_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Reasons,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};