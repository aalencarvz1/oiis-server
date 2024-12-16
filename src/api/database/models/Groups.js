'use strict';

/*imports*/
const { Sequelize, DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Entities_Types } = require("./Entities_Types");
const { Comparators } = require("./Comparators");


/**
 * class model
 */
class Groups extends BaseTableModel {
  static id = 7006;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Groups.getBaseTableModelFields(),...{              
      entity_type_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },      
      sigla: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      description:{
        type: DataTypes.TEXT
      },
      sql_condiction: {
        type: DataTypes.TEXT
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [
    'sigla'
  ];

  static constraints = [...(Groups.getBaseTableModelConstraints() || []),...[
    {
      name: Groups.tableName + '_u1',
      fields: [...Groups.getBaseTableModelUniqueFields(),...Groups.uniqueFields],
      type:"unique"
    }
  ]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['entity_type_id'],
      type: 'foreign key',
      references: { 
          table: Entities_Types,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};

module.exports = {Groups}
