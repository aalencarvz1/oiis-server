'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Packagings } = require("./Packagings");
const { MeasurementsUnits } = require("./MeasurementsUnits");
const { StocksEntities } = require("./StocksEntities");
const { Items } = require("./Items");
const { ItemsStocks } = require("./ItemsStocks");
const { IdentifiersTypes } = require("./IdentifiersTypes");


/**
 * class model
 */
class ItemsXMeaXPackXIdentif extends BaseTableModel {
  static ID = 8032;
  static model = null;
  static fields = {
    ...ItemsXMeaXPackXIdentif.getBaseTableModelFields(),...{           
      IDITEM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDPACKAGING:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMEASUREMENTUNIT:{
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
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256)
      },
      MULTIPLIER:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:1
      },
      IDITEMSTOCK:{
        type: DataTypes.BIGINT.UNSIGNED        
      },      
      IDSTOCKENTITY:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      ORDERNUM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'IDITEM',
    'IDPACKAGING',
    Sequelize.literal(`(COALESCE(IDMEASUREMENTUNIT,0))`),
    Sequelize.literal(`(COALESCE(IDIDENTIFIERTYPE,0))`),
    Sequelize.literal(`(COALESCE(IDENTIFIER,'NULL'))`),
    'MULTIPLIER',
    Sequelize.literal(`(COALESCE(IDITEMSTOCK,0))`),
    Sequelize.literal(`(COALESCE(IDSTOCKENTITY,0))`)
  ];

  static constraints = [...(ItemsXMeaXPackXIdentif.getBaseTableModelConstraints() || []),...[
    {
      name: ItemsXMeaXPackXIdentif.name.toUpperCase() + '_U1',
      fields: [...ItemsXMeaXPackXIdentif.getBaseTableModelUniqueFields(),...ItemsXMeaXPackXIdentif.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDITEM'],
      type: 'foreign key',
      references: { 
          table: Items,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDPACKAGING'],
      type: 'foreign key',
      references: { 
          table: Packagings,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: MeasurementsUnits,
          field: 'ID'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: IdentifiersTypes,
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
      fields: ['IDSTOCKENTITY'],
      type: 'foreign key',
      references: { 
          table: StocksEntities,
          field: 'ID'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {ItemsXMeaXPackXIdentif}