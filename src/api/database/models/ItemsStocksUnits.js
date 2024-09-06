'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Packagings } = require("./Packagings");
const { MeasurementsUnits } = require("./MeasurementsUnits");
const { ItemsStatus } = require("./ItemsStatus");
const { ItemsStocks } = require("./ItemsStocks");
const { IdentifiersTypes } = require("./IdentifiersTypes");


/**
 * class model
 */
class ItemsStocksUnits extends BaseTableModel {
  static id = 8031;
  static model = null;
  static fields = {
    ...ItemsStocksUnits.getBaseTableModelFields(),...{           
      IDITEMSTOCK:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256)
      },
      IDSTATUSITEMUNIT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:ItemsStatus.NORMAL
      },
      IDMEASUREMENTUNIT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDPACKAGING:{
        type: DataTypes.BIGINT.UNSIGNED
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
      AMOUNT:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      IDVARIABLEMEAUN:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      VARIABLEAMOUNT:{
        type: DataTypes.DECIMAL(32,10)
      }
    }
  };
  
  static uniqueFields = [
    'IDITEMSTOCK',
    Sequelize.literal(`(COALESCE(IDENTIFIER,'NULL'))`)
  ];

  static constraints = [...(ItemsStocksUnits.getBaseTableModelConstraints() || []),...[
    {
      name: ItemsStocksUnits.name.toLowerCase() + '_u1',
      fields: [...ItemsStocksUnits.getBaseTableModelUniqueFields(),...ItemsStocksUnits.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
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
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTATUSITEMUNIT'],
      type: 'foreign key',
      references: { 
          table: ItemsStatus,
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
      fields: ['IDVARIABLEMEAUN'],
      type: 'foreign key',
      references: { 
          table: MeasurementsUnits,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {ItemsStocksUnits}