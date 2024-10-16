'use strict';
/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Movement_Status } = require("./Movement_Status");
const { Logistic_Mov_Types } = require("./Logistic_Mov_Types");
const { Action_Status } = require("./Action_Status");
const { Item_Mov_Amounts } = require("./Item_Mov_Amounts");
const { Logistic_Orders_Movs } = require("./Logistic_Orders_Movs");
const { Logistic_Reasons } = require("./Logistic_Reasons");
const { Logistic_Status } = require("./Logistic_Status");
const { Measurement_Units } = require("./Measurement_Units");
const { Movement_Types } = require("./Movement_Types");
const { Packagings } = require("./Packagings");


/**
 * class model
 */
class Logistic_Orders_Items_Mov_Amt extends BaseTableModel {
  static id = 12005;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Logistic_Orders_Items_Mov_Amt.getBaseTableModelFields(),...{           
      mov_logistic_order_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      item_mov_amt_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      logistic_mov_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      action_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },
      type_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      logistic_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      packaging_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },  
      unit_weight:{
        type: DataTypes.DECIMAL(32,10)
      },      
      package_weight:{
        type: DataTypes.DECIMAL(32,10)
      },   
      unit_volume:{
        type: DataTypes.DECIMAL(32,10)
      },      
      package_volume:{
        type: DataTypes.DECIMAL(32,10)
      },        
      mov_started_at:{
        type: DataTypes.DATE
      },
      mov_ended_at:{
        type: DataTypes.DATE
      },
      expected_amt:{
        type: DataTypes.DECIMAL(32,10)
      },
      moved_amt:{
        type: DataTypes.DECIMAL(32,10)
      },
      unmoved_qty:{
        type: DataTypes.DECIMAL(32,10)
      },
      collected_qty:{
        type: DataTypes.DECIMAL(32,10)
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
      unmoved_photos:{
        type: DataTypes.TEXT
      },
      collected_photos:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'mov_logistic_order_id',
    'item_mov_amt_id',
    Sequelize.literal(`(COALESCE(logistic_mov_type_id,0))`),
    'action_status_id',
    Sequelize.literal(`(COALESCE(type_mov_id,0))`),
    Sequelize.literal(`(COALESCE(measurement_unit_id,0))`),
    Sequelize.literal(`(COALESCE(packaging_id,0))`)
  ];

  static constraints = [...(Logistic_Orders_Items_Mov_Amt.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders_Items_Mov_Amt.tableName + '_u1',
      fields: [...Logistic_Orders_Items_Mov_Amt.getBaseTableModelUniqueFields(),...Logistic_Orders_Items_Mov_Amt.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['mov_logistic_order_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_Movs,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['item_mov_amt_id'],
      type: 'foreign key',
      references: { 
          table: Item_Mov_Amounts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['logistic_mov_type_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Mov_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
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
      fields: ['type_mov_id'],
      type: 'foreign key',
      references: { 
          table: Movement_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['measurement_unit_id'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
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
      fields: ['packaging_id'],
      type: 'foreign key',
      references: { 
          table: Packagings,
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


module.exports = {Logistic_Orders_Items_Mov_Amt}