'use strict';
/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { DataTables } = require("./DataTables");


/**
 * class model
 */
class LogisticLogs extends BaseTableModel {
  static id = 12100;
  static model = null;
  static fields = {
    ...LogisticLogs.getBaseTableModelFields(),...{    
      IDTABLEREF:{
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull:false
      },       
      IDREGISTERREF:{
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull:false
      },
      OPERATION:{
          type: DataTypes.STRING(10),
          allowNull:false,
          defaultValue: 'UPDATE'
      },      
      JSONOBJECT:{
          type: DataTypes.TEXT
      },      
      COLUMNNAME:{
          type: DataTypes.STRING(256),
      },
      OLDVALUE: {
          type: DataTypes.TEXT,
      },
      NEWVALUE: {
          type: DataTypes.TEXT,
      },
      LATITUDE:{
          type: DataTypes.DECIMAL(18,10)
      },
      LONGITUDE:{
          type: DataTypes.DECIMAL(18,10)
      },
      OBSERVATIONS:{
          type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(LogisticLogs.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDTABLEREF'],
      type: 'foreign key',
      references: { 
          table: DataTables,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {LogisticLogs}