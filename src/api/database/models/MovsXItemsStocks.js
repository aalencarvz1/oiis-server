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
  static ID = 9030;
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
      name: MovsXItemsStocks.name.toUpperCase() + '_U1',
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
          field: 'ID'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDTYPEMOV'],
      type: 'foreign key',
      references: { 
          table: MovementsTypes,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDITEMSTOCK'],
      type: 'foreign key',
      references: { 
          table: ItemsStocks,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTATUSMOV'],
      type: 'foreign key',
      references: { 
          table: MovementsStatus,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {MovsXItemsStocks}