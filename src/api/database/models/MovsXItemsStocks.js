'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Movements } = require("./Movements");
const { ItemsStocks } = require("./ItemsStocks");
const { MovementsStatus } = require("./MovementsStatus");
const { MovementsTypes } = require("./MovementsTypes");

/**
 * class model
 */
class MovsXItemsStocks extends BaseTableModel {
  static id = 9030;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...MovsXItemsStocks.getBaseTableModelFields(),...{                 
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
        defaultValue: MovementsStatus.NOT_STARTED
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

  static constraints = [...(MovsXItemsStocks.getBaseTableModelConstraints() || []),...[
    {
      name: MovsXItemsStocks.tableName + '_u1',
      fields: [...MovsXItemsStocks.getBaseTableModelUniqueFields(),...MovsXItemsStocks.uniqueFields],
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
          table: MovementsTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDITEMSTOCK'],
      type: 'foreign key',
      references: { 
          table: ItemsStocks,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTATUSMOV'],
      type: 'foreign key',
      references: { 
          table: MovementsStatus,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {MovsXItemsStocks}