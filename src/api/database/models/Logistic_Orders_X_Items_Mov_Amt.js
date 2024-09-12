'use strict';
/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Movement_Status } = require("./Movement_Status");
const { Logistic_Mov_Types } = require("./Logistic_Mov_Types");
const { Action_Status } = require("./Action_Status");
const { Item_Mov_Amounts } = require("./Item_Mov_Amounts");
const { Logistic_Orders_X_Movs } = require("./Logistic_Orders_X_Movs");
const { Logistic_Reasons } = require("./Logistic_Reasons");
const { Logistic_Status } = require("./Logistic_Status");
const { Measurement_Units } = require("./Measurement_Units");
const { Movement_Types } = require("./Movement_Types");
const { Packagings } = require("./Packagings");


/**
 * class model
 */
class Logistic_Orders_X_Items_Mov_Amt extends BaseTableModel {
  static id = 12005;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Logistic_Orders_X_Items_Mov_Amt.getBaseTableModelFields(),...{           
      IDLOGISTICORDERXMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDITEMMOVAMT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDLOGISTICMOVTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      }, 
      IDACTIONSTATUS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },
      IDTYPEMOV:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDLOGISTICSTATUS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
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
      MOVSTARTED_AT:{
        type: DataTypes.DATE
      },
      MOVENDED_AT:{
        type: DataTypes.DATE
      },
      EXPECTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      MOVIMENTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      NOTMOVIMENTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      RETREATMOVIMENTEDAMT:{
        type: DataTypes.DECIMAL(32,10)
      },
      IDREASONNOTMOVIMENTEDAMT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDREASONRETREATMOVIMENTEDAMT:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      OBSERVATIONSNOTMOVIMENTEDAMT:{
        type: DataTypes.TEXT
      },
      OBSERVATIONSRETREATMOVIMENTEDAMT:{
        type: DataTypes.TEXT
      },
      PHOTOSNOTMOVIMENTEDAMT:{
        type: DataTypes.TEXT
      },
      PHOTOSRETREATMOVIMENTEDAMT:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'IDLOGISTICORDERXMOV',
    'IDITEMMOVAMT',
    Sequelize.literal(`(COALESCE(IDLOGISTICMOVTYPE,0))`),
    'IDACTIONSTATUS',
    Sequelize.literal(`(COALESCE(IDTYPEMOV,0))`),
    Sequelize.literal(`(COALESCE(IDMEASUREMENTUNIT,0))`),
    Sequelize.literal(`(COALESCE(IDPACKAGING,0))`)
  ];

  static constraints = [...(Logistic_Orders_X_Items_Mov_Amt.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders_X_Items_Mov_Amt.tableName + '_u1',
      fields: [...Logistic_Orders_X_Items_Mov_Amt.getBaseTableModelUniqueFields(),...Logistic_Orders_X_Items_Mov_Amt.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDLOGISTICORDERXMOV'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders_X_Movs,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDITEMMOVAMT'],
      type: 'foreign key',
      references: { 
          table: Item_Mov_Amounts,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },{
      fields: ['IDLOGISTICMOVTYPE'],
      type: 'foreign key',
      references: { 
          table: Logistic_Mov_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDACTIONSTATUS'],
      type: 'foreign key',
      references: { 
          table: Action_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
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
      fields: ['IDLOGISTICSTATUS'],
      type: 'foreign key',
      references: { 
          table: Logistic_Status,
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
      fields: ['IDREASONNOTMOVIMENTEDAMT'],
      type: 'foreign key',
      references: { 
          table: Logistic_Reasons,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDREASONRETREATMOVIMENTEDAMT'],
      type: 'foreign key',
      references: { 
          table: Logistic_Reasons,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Logistic_Orders_X_Items_Mov_Amt}