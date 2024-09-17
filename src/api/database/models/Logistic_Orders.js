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
      logistic_mov_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      identifier_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      identifier:{
        type: DataTypes.STRING(256)
      },
      action_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },
      logistic_status_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:Movement_Status.NOT_STARTED
      },
      unmoved_reason_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      collected_reason_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      unmoved_qty_notes:{
        type: DataTypes.TEXT
      },
      collected_qty_notes:{
        type: DataTypes.TEXT
      },
      mov_started_at:{
        type: DataTypes.DATE
      },
      mov_ended_at:{
        type: DataTypes.DATE
      },
    }
  };
  
  static uniqueFields = [
    'logistic_mov_type_id',
    Sequelize.literal(`(COALESCE(identifier_type_id,0))`),
    Sequelize.literal(`(COALESCE(identifier,'NULL'))`)
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
      fields: ['logistic_mov_type_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Mov_Types,
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
      fields: ['action_status_id'],
      type: 'foreign key',
      references: { 
          table: Action_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['logistic_status_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Status,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['unmoved_reason_id'],
      type: 'foreign key',
      references: { 
          table: Logistic_Reasons,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['collected_reason_id'],
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