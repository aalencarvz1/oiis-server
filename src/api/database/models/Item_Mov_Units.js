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
      item_mov_amt_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
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
      status_mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },      
      mov_started_at:{
        type: DataTypes.DATE
      },
      mov_ended_at:{
        type: DataTypes.DATE
      },
      expected_amt:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      moved_amt:{
        type: DataTypes.DECIMAL(32,10),
        allowNull:false,
        defaultValue:0
      },
      variable_unit_measure_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      variable_expected_amt:{
        type: DataTypes.DECIMAL(32,10)
      },
      variable_moved_amt:{
        type: DataTypes.DECIMAL(32,10)
      },
      observations:{
        type:DataTypes.TEXT
      }      
    }
  };
  
  static uniqueFields = [
    'item_mov_amt_id',
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`)
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
      fields: ['item_mov_amt_id'],
      type: 'foreign key',
      references: { 
          table: Item_Mov_Amounts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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
      fields: ['status_mov_id'],
      type: 'foreign key',
      references: { 
          table: Movement_Status,
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


module.exports = {Item_Mov_Units}