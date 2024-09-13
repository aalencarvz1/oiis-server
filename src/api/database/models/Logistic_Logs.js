'use strict';
/*imports*/
const { DataTypes } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Tables } = require("./Tables");


/**
 * class model
 */
class Logistic_Logs extends BaseTableModel {
  static id = 12100;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    ...Logistic_Logs.getBaseTableModelFields(),...{    
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
      latitude:{
          type: DataTypes.DECIMAL(18,10)
      },
      longitude:{
          type: DataTypes.DECIMAL(18,10)
      },
      observations:{
          type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Logistic_Logs.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['IDTABLEREF'],
      type: 'foreign key',
      references: { 
          table: Tables,
          field: 'id'
      },
      onUpdate: 'cascade'
    }
  ]];
  
};


module.exports = {Logistic_Logs}