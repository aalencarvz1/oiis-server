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
        defaultValue:Item_Status.NORMAL
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

  static constraints = [...(Item_Stock_Units.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Stock_Units.tableName + '_u1',
      fields: [...Item_Stock_Units.getBaseTableModelUniqueFields(),...Item_Stock_Units.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
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
      fields: ['IDIDENTIFIERTYPE'],
      type: 'foreign key',
      references: { 
          table: Identifier_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDSTATUSITEMUNIT'],
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
    },
    {
      fields: ['IDVARIABLEMEAUN'],
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