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
      table_ref_id:{
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull:false
      },       
      record_ref_id:{
          type: DataTypes.BIGINT.UNSIGNED,
          allowNull:false
      },
      operation:{
          type: DataTypes.STRING(10),
          allowNull:false,
          defaultValue: 'UPDATE'
      },      
      json_object:{
          type: DataTypes.TEXT
      },      
      column_name:{
          type: DataTypes.STRING(256),
      },
      old_value: {
          type: DataTypes.TEXT,
      },
      new_value: {
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
      fields: ['table_ref_id'],
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