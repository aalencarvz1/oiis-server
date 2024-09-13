'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Measurement_Units } = require("./Measurement_Units");
const { Packagings } = require("./Packagings");
const { Movement_Status } = require("./Movement_Status");
const { Item_Mov_Amounts } = require("./Item_Mov_Amounts");
const { Identifier_Types } = require("./Identifier_Types");

/**
 * class model
 */
class Item_Mov_Units extends BaseTableModel {
  static id = 9036;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Item_Mov_Units.getBaseTableModelFields(),...{                 
      IDITEMMOVAMT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256)
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
      IDSTATUSMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
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
      IDVARIABLEMEAUN:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      VARIABLEEXPECTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      VARIABLEMOVIMENTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      observations:{
        type:DataTypes.TEXT
      }      
    }
  };
  
  static uniqueFields = [
    'IDITEMMOVAMT',
    Sequelize.literal(`(COALESCE(IDENTIFIER,'NULL'))`)
  ];

  static constraints = [...(Item_Mov_Units.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Mov_Units.tableName + '_u1',
      fields: [...Item_Mov_Units.getBaseTableModelUniqueFields(),...Item_Mov_Units.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDITEMMOVAMT'],
      type: 'foreign key',
      references: { 
          table: Item_Mov_Amounts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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
      fields: ['IDSTATUSMOV'],
      type: 'foreign key',
      references: { 
          table: Movement_Status,
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


module.exports = {Item_Mov_Units}