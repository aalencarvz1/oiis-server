'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Movements } = require("./Movements");
const { Item_Stocks } = require("./Item_Stocks");
const { Movement_Status } = require("./Movement_Status");
const { Movement_Types } = require("./Movement_Types");

/**
 * class model
 */
class Movs_X_Items_Stocks extends BaseTableModel {
  static id = 9030;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Movs_X_Items_Stocks.getBaseTableModelFields(),...{                 
      mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      type_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      stock_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      status_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Movement_Status.NOT_STARTED
      },      
      mov_started_at:{
        type: DataTypes.DATE
      },
      mov_ended_at:{
        type: DataTypes.DATE
      },
      numeric_order:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      precedence:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'mov_id',
    'type_mov_id',
    'stock_item_id'
  ];

  static constraints = [...(Movs_X_Items_Stocks.getBaseTableModelConstraints() || []),...[
    {
      name: Movs_X_Items_Stocks.tableName + '_u1',
      fields: [...Movs_X_Items_Stocks.getBaseTableModelUniqueFields(),...Movs_X_Items_Stocks.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
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
      fields: ['type_mov_id'],
      type: 'foreign key',
      references: { 
          table: Movement_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['stock_item_id'],
      type: 'foreign key',
      references: { 
          table: Item_Stocks,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['status_mov_id'],
      type: 'foreign key',
      references: { 
          table: Movement_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Movs_X_Items_Stocks}