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
      IDMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDTYPEMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDITEMSTOCK:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDSTATUSMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue: Movement_Status.NOT_STARTED
      },      
      MOVSTARTED_AT:{
        type: DataTypes.DATE
      },
      MOVENDED_AT:{
        type: DataTypes.DATE
      },
      ORDERNUM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      PRECEDENCE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      OBSERVATIONS:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDMOV',
    'IDTYPEMOV',
    'IDITEMSTOCK'
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
      fields: ['IDMOV'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDTYPEMOV'],
      type: 'foreign key',
      references: { 
          table: Movement_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDITEMSTOCK'],
      type: 'foreign key',
      references: { 
          table: Item_Stocks,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTATUSMOV'],
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