'use strict';
/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Packagings } = require("./Packagings");
const { MeasurementsUnits } = require("./MeasurementsUnits");
const { ItemsStatus } = require("./ItemsStatus");
const { WarehousesAddresses } = require("./WarehousesAddresses");
const { StocksEntitiesRelationshipsTypes } = require("./StocksEntitiesRelationshipsTypes");
const { StocksEntities } = require("./StocksEntities");
const { ItemsXLotsXConteiners } = require("./ItemsXLotsXConteiners");



/**
 * class model
 */
class ItemsStocks extends BaseTableModel{
  static id = 8030;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...ItemsStocks.getBaseTableModelFields(),...{           
      IDITEMXLOTXCONTEINER:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDSTOCKRELATIONSHIPTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:StocksEntitiesRelationshipsTypes.OWNER
      },
      IDSTOCKENTITY:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false        
      },
      IDWAREHOUSEADDRESS:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDSTATUSITEMSTOCK:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:ItemsStatus.NORMAL
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
      AMOUNT:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
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
    'IDITEMXLOTXCONTEINER',
    'IDSTOCKRELATIONSHIPTYPE',
    'IDSTOCKENTITY',
    Sequelize.literal(`(COALESCE(IDWAREHOUSEADDRESS,0))`),
    'IDSTATUSITEMSTOCK',
    'IDMEASUREMENTUNIT',
    'IDPACKAGING'
  ];

  static constraints = [...(ItemsStocks.getBaseTableModelConstraints() || []),...[
    {
      name: ItemsStocks.tableName + '_u1',
      fields: [...ItemsStocks.getBaseTableModelUniqueFields(),...ItemsStocks.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDITEMXLOTXCONTEINER'],
      type: 'foreign key',
      references: { 
          table: ItemsXLotsXConteiners,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTOCKRELATIONSHIPTYPE'],
      type: 'foreign key',
      references: { 
          table: StocksEntitiesRelationshipsTypes,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTOCKENTITY'],
      type: 'foreign key',
      references: { 
          table: StocksEntities,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDWAREHOUSEADDRESS'],
      type: 'foreign key',
      references: { 
          table: WarehousesAddresses,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTATUSITEMSTOCK'],
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
    }
  ]];  
};


module.exports = {ItemsStocks}