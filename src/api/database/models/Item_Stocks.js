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
const { Items_X_Lots_X_Containers } = require("./Items_X_Lots_X_Containers");



/**
 * class model
 */
class Item_Stocks extends BaseTableModel{
  static id = 8030;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Item_Stocks.getBaseTableModelFields(),...{           
      item_lot_container_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      stock_relationship_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Stock_Entity_Relationship_Types.OWNER
      },
      stock_entity_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false        
      },
      warehouse_address_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      item_stock_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Item_Status.NORMAL
      },
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      packaging_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
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
      amount:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
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
    'item_lot_container_id',
    'stock_relationship_type_id',
    'stock_entity_id',
    Sequelize.literal(`(COALESCE(warehouse_address_id,0))`),
    'item_stock_status_id',
    'measurement_unit_id',
    'packaging_id'
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
      fields: ['item_lot_container_id'],
      type: 'foreign key',
      references: { 
          table: Items_X_Lots_X_Containers,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['stock_relationship_type_id'],
      type: 'foreign key',
      references: { 
          table: Stock_Entity_Relationship_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['stock_entity_id'],
      type: 'foreign key',
      references: { 
          table: Stock_Entities,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['warehouse_address_id'],
      type: 'foreign key',
      references: { 
          table: Warehouse_Addresses,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['item_stock_status_id'],
      type: 'foreign key',
      references: { 
          table: Item_Status,
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
      fields: ['packaging_id'],
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