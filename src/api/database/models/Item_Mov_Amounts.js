'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Measurement_Units } = require("./Measurement_Units");
const { Packagings } = require("./Packagings");
const { Movement_Status } = require("./Movement_Status");
const { Movement_Types } = require("./Movement_Types");
const { Movs_X_Items_Stocks } = require("./Movs_X_Items_Stocks");


/**
 * class model
 */
class Item_Mov_Amounts extends BaseTableModel {
  static id = 9035;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Item_Mov_Amounts.getBaseTableModelFields(),...{                 
      IDMOVXITEMSTOCK:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDTYPEMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
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
      UNITVALUE:{
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
      observations:{
        type:DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDMOVXITEMSTOCK',
    'IDTYPEMOV',
    'IDMEASUREMENTUNIT',
    'IDPACKAGING'
  ];

  static constraints = [...(Item_Mov_Amounts.getBaseTableModelConstraints() || []),...[
    {
      name: Item_Mov_Amounts.tableName + '_u1',
      fields: [...Item_Mov_Amounts.getBaseTableModelUniqueFields(),...Item_Mov_Amounts.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDMOVXITEMSTOCK'],
      type: 'foreign key',
      references: { 
          table: Movs_X_Items_Stocks,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDTYPEMOV'],
      type: 'foreign key',
      references: { 
          table: Movement_Types,
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
    }
  ]];
  
};


module.exports = {Item_Mov_Amounts}