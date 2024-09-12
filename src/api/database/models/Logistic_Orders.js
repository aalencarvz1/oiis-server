'use strict';
/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Identifier_Types } = require("./Identifier_Types");
const { Movement_Status } = require("./Movement_Status");
const { Logistic_Mov_Types } = require("./Logistic_Mov_Types");
const { Action_Status } = require("./Action_Status");
const { Logistic_Status } = require("./Logistic_Status");
const { Logistic_Reasons } = require("./Logistic_Reasons");


/**
 * class model
 */
class Logistic_Orders extends BaseTableModel {
  static id = 12003;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Logistic_Orders.getBaseTableModelFields(),...{           
      IDLOGISTICMOVTYPE:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDIDENTIFIERTYPE:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      IDENTIFIER:{
        type: DataTypes.STRING(256)
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
    'IDLOGISTICMOVTYPE',
    Sequelize.literal(`(COALESCE(IDIDENTIFIERTYPE,0))`),
    Sequelize.literal(`(COALESCE(IDENTIFIER,'NULL'))`)
  ];

  static constraints = [...(Logistic_Orders.getBaseTableModelConstraints() || []),...[
    {
      name: Logistic_Orders.tableName + '_u1',
      fields: [...Logistic_Orders.getBaseTableModelUniqueFields(),...Logistic_Orders.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDLOGISTICMOVTYPE'],
      type: 'foreign key',
      references: { 
          table: Logistic_Mov_Types,
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


module.exports = {Logistic_Orders}