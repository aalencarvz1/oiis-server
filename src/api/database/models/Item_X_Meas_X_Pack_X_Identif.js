'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Packagings } = require("./Packagings");
const { Measurement_Units } = require("./Measurement_Units");
const { Stock_Entities } = require("./Stock_Entities");
const { Items } = require("./Items");
const { Item_Stocks } = require("./Item_Stocks");
const { Identifier_Types } = require("./Identifier_Types");


/**
 * class model
 */
class Item_X_Meas_X_Pack_X_Identif extends BaseTableModel {
  static id = 8032;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Item_X_Meas_X_Pack_X_Identif.getBaseTableModelFields(),...{           
      item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      packaging_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED        
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
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
      },
      multiplier:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:1
      },
      stock_item_id:{
        type: DataTypes.BIGINT.UNSIGNED        
      },      
      stock_entity_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      numeric_order:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      }
    }
  };
  
  static uniqueFields = [
    'item_id',
    'packaging_id',
    Sequelize.literal(`(COALESCE(measurement_unit_id,0))`),
    Sequelize.literal(`(COALESCE(identifier_type_id,0))`),
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`),
    'multiplier',
    Sequelize.literal(`(COALESCE(stock_item_id,0))`),
    Sequelize.literal(`(COALESCE(stock_entity_id,0))`)
  ];

  static constraints = [...(Item_X_Meas_X_Pack_X_Identif.getBaseTableModelConstraints() || []),...[
    {
      name: Item_X_Meas_X_Pack_X_Identif.tableName + '_u1',
      fields: [...Item_X_Meas_X_Pack_X_Identif.getBaseTableModelUniqueFields(),...Item_X_Meas_X_Pack_X_Identif.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['item_id'],
      type: 'foreign key',
      references: { 
          table: Items,
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
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
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
      fields: ['stock_entity_id'],
      type: 'foreign key',
      references: { 
          table: Stock_Entities,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Item_X_Meas_X_Pack_X_Identif}