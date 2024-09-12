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

  static constraints = [...(Item_X_Meas_X_Pack_X_Identif.getBaseTableModelConstraints() || []),...[
    {
      name: Item_X_Meas_X_Pack_X_Identif.tableName + '_u1',
      fields: [...Item_X_Meas_X_Pack_X_Identif.getBaseTableModelUniqueFields(),...Item_X_Meas_X_Pack_X_Identif.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDITEM'],
      type: 'foreign key',
      references: { 
          table: Items,
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
      fields: ['IDMEASUREMENTUNIT'],
      type: 'foreign key',
      references: { 
          table: Measurement_Units,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },    
    {
      fields: ['IDITEMSTOCK'],
      type: 'foreign key',
      references: { 
          table: Item_Stocks,
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
    }
  ]];
  
};


module.exports = {Item_X_Meas_X_Pack_X_Identif}