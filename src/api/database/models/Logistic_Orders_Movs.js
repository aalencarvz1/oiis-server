'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Logistic_Orders } = require("./Logistic_Orders");
const { Movement_Status } = require("./Movement_Status");
const { Logistic_Status } = require("./Logistic_Status");
const { Action_Status } = require("./Action_Status");
const { Movements } = require("./Movements");
const { Logistic_Reasons } = require("./Logistic_Reasons");


/**
 * class model
 */
class Logistic_Orders_Movs extends BaseTableModel {
  static id = 12004;
  static tableName = this.name.toLowerCase();
  static model = null;
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


module.exports = {Logistic_Orders_Movs}