'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');


/**
 * class model
 */
class Tasks extends BaseTableModel {
  static id = 15010;
  static model = null;

  static fields = {
    ...Tasks.getBaseTableModelFields(),...{            
      IDSUP: {
        type: DataTypes.BIGINT.UNSIGNED
      },       
      NAME: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      DESCRIPTION: {
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
      fields: ['IDSUP'],
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