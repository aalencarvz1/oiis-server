'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { MeasurementsUnits } = require("./MeasurementsUnits");
const { Packagings } = require("./Packagings");
const { MovementsStatus } = require("./MovementsStatus");
const { MovementsTypes } = require("./MovementsTypes");
const { MovsXItemsStocks } = require("./MovsXItemsStocks");


/**
 * class model
 */
class ItemsMovsAmounts extends BaseTableModel {
  static id = 9035;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...ItemsMovsAmounts.getBaseTableModelFields(),...{                 
      IDMOVXITEMSTOCK:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDTYPEMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMEASUREMENTUNIT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDPACKAGING:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      UNITWEIGHT:{
        type: DataTypes.DECIMAL(32,10)
      },      
      PACKAGEWEIGHT:{
        type: DataTypes.DECIMAL(32,10)
      },      
      UNITVOLUME:{
        type: DataTypes.DECIMAL(32,10)
      },      
      PACKAGEVOLUME:{
        type: DataTypes.DECIMAL(32,10)
      },
      UNITVALUE:{
        type: DataTypes.DECIMAL(32,10)
      },  
      IDSTATUSMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:MovementsStatus.NOT_STARTED
      },      
      MOVSTARTED_AT:{
        type: DataTypes.DATE
      },
      MOVENDED_AT:{
        type: DataTypes.DATE
      },
      EXPECTEDAMT:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      MOVIMENTEDAMT:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      OBSERVATIONS:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDMOVXITEMSTOCK',
    'IDTYPEMOV',
    'IDMEASUREMENTUNIT',
    'IDPACKAGING'
  ];

  static constraints = [...(ItemsMovsAmounts.getBaseTableModelConstraints() || []),...[
    {
      name: ItemsMovsAmounts.tableName + '_u1',
      fields: [...ItemsMovsAmounts.getBaseTableModelUniqueFields(),...ItemsMovsAmounts.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDMOVXITEMSTOCK'],
      type: 'foreign key',
      references: { 
          table: MovsXItemsStocks,
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
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: MeasurementsUnits,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDPACKAGING'],
      type: 'foreign key',
      references: { 
          table: Packagings,
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


module.exports = {ItemsMovsAmounts}