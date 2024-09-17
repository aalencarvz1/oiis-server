'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Packagings } = require("./Packagings");
const { Measurement_Units } = require("./Measurement_Units");
const { Item_Status } = require("./Item_Status");
const { Item_Stocks } = require("./Item_Stocks");
const { Identifier_Types } = require("./Identifier_Types");


/**
 * class model
 */
class Item_Stock_Units extends BaseTableModel {
  static id = 8031;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Item_Stock_Units.getBaseTableModelFields(),...{           
      stock_item_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
      },
      item_unit_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Item_Status.NORMAL
      },
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      packaging_id:{
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
      amount:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      variable_unit_measure_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      variable_amount:{
        type: DataTypes.DECIMAL(32,10)
      }
    }
  };
  
  static uniqueFields = [
    'stock_item_id',
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`)
  ];

  static constraints = [...(Item_Stock_Units.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Stock_Units.tableName + '_u1',
      fields: [...Item_Stock_Units.getBaseTableModelUniqueFields(),...Item_Stock_Units.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
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
      fields: ['identifier_type_id'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['item_unit_status_id'],
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
    },
    {
      fields: ['variable_unit_measure_id'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Item_Stock_Units}