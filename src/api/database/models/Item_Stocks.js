'use strict';
/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Packagings } = require("./Packagings");
const { Measurement_Units } = require("./Measurement_Units");
const { Item_Status } = require("./Item_Status");
const { Warehouse_Addresses } = require("./Warehouse_Addresses");
const { Stock_Entity_Relationship_Types } = require("./Stock_Entity_Relationship_Types");
const { Stock_Entities } = require("./Stock_Entities");
const { Items_X_Lots_X_Conteiners } = require("./Items_X_Lots_X_Conteiners");



/**
 * class model
 */
class Item_Stocks extends BaseTableModel{
  static id = 8030;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Item_Stocks.getBaseTableModelFields(),...{           
      IDITEMXLOTXCONTEINER:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDSTOCKRELATIONSHIPTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Stock_Entity_Relationship_Types.OWNER
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
        defaultValue:Item_Status.NORMAL
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

  static constraints = [...(Item_Stocks.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Stocks.tableName + '_u1',
      fields: [...Item_Stocks.getBaseTableModelUniqueFields(),...Item_Stocks.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDITEMXLOTXCONTEINER'],
      type: 'foreign key',
      references: { 
          table: Items_X_Lots_X_Conteiners,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTOCKRELATIONSHIPTYPE'],
      type: 'foreign key',
      references: { 
          table: Stock_Entity_Relationship_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTOCKENTITY'],
      type: 'foreign key',
      references: { 
          table: Stock_Entities,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDWAREHOUSEADDRESS'],
      type: 'foreign key',
      references: { 
          table: Warehouse_Addresses,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTATUSITEMSTOCK'],
      type: 'foreign key',
      references: { 
          table: Item_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
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


module.exports = {Item_Stocks}