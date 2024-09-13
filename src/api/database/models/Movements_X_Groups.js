'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Movement_Groups } = require("./Movement_Groups");
const { Movements } = require("./Movements");

/**
 * class model
 */
class Movements_X_Groups extends BaseTableModel {
  static id = 9012;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Movements_X_Groups.getBaseTableModelFields(),...{           
      IDGROUPMOVEMENT:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      IDMOV:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      ORDERNUM:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false,
        defaultValue:0
      },
      PRECEDENCE:{
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
    'IDGROUPMOVEMENT',
    'IDMOV'
  ];

  static constraints = [...(Movements_X_Groups.getBaseTableModelConstraints() || []),...[
    {
      name: Movements_X_Groups.tableName + '_u1',
      fields: [...Movements_X_Groups.getBaseTableModelUniqueFields(),...Movements_X_Groups.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDGROUPMOVEMENT'],
      type: 'foreign key',
      references: { 
          table: Movement_Groups,
          field: 'id'
      },
      onUpdate: 'cascade'
    },
    {
      fields: ['IDMOV'],
      type: 'foreign key',
      references: { 
          table: Movements,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Movements_X_Groups}