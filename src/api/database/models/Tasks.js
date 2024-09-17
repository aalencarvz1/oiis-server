'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Tasks extends BaseTableModel {
  static id = 15010;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Tasks.getBaseTableModelFields(),...{            
      parent_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },       
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      ANOTATIONS: {
        type: DataTypes.TEXT
      },
      FORECASTSTARTMOMENT: {
        type: DataTypes.DATE
      },
      FORECASTENDMOMENT: {
        type: DataTypes.DATE
      },
      STARTMOMENT: {
        type: DataTypes.DATE
      },
      ENDMOMENT: {
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Tasks.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['parent_id'],
      type: 'foreign key',
      references: { 
          table: Tasks,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
  
};


module.exports = {Tasks}