'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseWinthorIntegrationTableModel } = require("./BaseWinthorIntegrationTableModel");
const { Integration_Tables } = require("./Integration_Tables");

/**
 * class model
 */
class Integration_Control extends BaseWinthorIntegrationTableModel {
  static id = 35005;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    creator_user_id: {
      type: DataTypes.BIGINT.UNSIGNED,                
      allowNull: false,
      defaultValue:1 
    },
    created_at : {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    },
    updater_user_id: {
        type: DataTypes.BIGINT.UNSIGNED,
    },
    updated_at : {
        type: DataTypes.DATE
    },                
    integration_table_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull:false
    },
    register_id:{
      type: DataTypes.STRING(2000),
      allowNull:false
    },      
    operation:{
      type: DataTypes.STRING(100),
      allowNull:false,
      defaultValue:'UPDATE'
    },      
    values_to_integrate:{
      type: DataTypes.JSON
    },
    integrated_at:{
      type: DataTypes.DATE
    }
  };
  
  static uniqueFields = [
    'integration_table_id',
    'register_id',
    'operation',
    'integrated_at'
  ];

  static constraints = [{
    name: Integration_Control.tableName + '_u1',
    fields: Integration_Control.uniqueFields,
    type:"unique"
  }];

  static foreignsKeys = [{
    fields: ['integration_table_id'],
    type: 'foreign key',
    references: { 
        table: Integration_Tables,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }];
  
};


module.exports = {Integration_Control}
