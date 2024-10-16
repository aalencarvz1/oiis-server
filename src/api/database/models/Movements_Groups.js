'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Movement_Groups } = require("./Movement_Groups");
const { Movements } = require("./Movements");

/**
 * class model
 */
class Movements_Groups extends BaseTableModel {
  static id = 9012;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Movements_Groups.getBaseTableModelFields(),...{           
      movement_group_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      mov_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      numeric_order:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      precedence:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'movement_group_id',
    'mov_id'
  ];

  static constraints = [...(Movements_Groups.getBaseTableModelConstraints() || []),...[
    {
      name: Movements_Groups.tableName + '_u1',
      fields: [...Movements_Groups.getBaseTableModelUniqueFields(),...Movements_Groups.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['movement_group_id'],
      type: 'foreign key',
      references: { 
          table: Movement_Groups,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['mov_id'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Movements_Groups}