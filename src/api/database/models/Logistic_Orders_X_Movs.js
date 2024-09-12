'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Logistic_Orders } = require("./Logistic_Orders");
const { Movement_Status } = require("./Movement_Status");
const { Logistic_Status } = require("./Logistic_Status");
const { Action_Status } = require("./Action_Status");
const { Movements } = require("./Movements");
const { Logistic_Reasons } = require("./Logistic_Reasons");


/**
 * class model
 */
class Logistic_Orders_X_Movs extends BaseTableModel {
  static id = 12004;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Logistic_Orders_X_Movs.getBaseTableModelFields(),...{           
      IDLOGISTICORDER:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDACTIONSTATUS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },
      IDLOGISTICSTATUS:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
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
      MOVSTARTED_AT:{
        type: DataTypes.DATE
      },
      MOVENDED_AT:{
        type: DataTypes.DATE
      },
    }
  };
  
  static uniqueFields = [
    'IDLOGISTICORDER',
    'IDMOV'
  ];

  static constraints = [...(Logistic_Orders_X_Movs.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders_X_Movs.tableName + '_u1',
      fields: [...Logistic_Orders_X_Movs.getBaseTableModelUniqueFields(),...Logistic_Orders_X_Movs.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDLOGISTICORDER'],
      type: 'foreign key',
      references: { 
          table: Logistic_Orders,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['IDMOV'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
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
      fields: ['IDLOGISTICSTATUS'],
      type: 'foreign key',
      references: { 
          table: Logistic_Status,
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


module.exports = {Logistic_Orders_X_Movs}