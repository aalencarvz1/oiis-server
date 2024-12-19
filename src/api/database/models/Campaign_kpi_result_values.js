'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const {  Campaign_Kpis } = require("./Campaign_kpis");


/**
 * class model
 */
class Campaign_Kpi_Result_Values extends BaseTableModel {
  static id = 16007;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpi_Result_Values.getBaseTableModelFields(),...{            
    
      campaign_kpi_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue:0
     },
     name:{
      type: DataTypes.STRING(255),
     },
     expression:{
      type: DataTypes.TEXT,
     }
    

  }};

  static uniqueFields = [
    
  ];

  static constraints = [...(Campaign_Kpi_Result_Values.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Result_Values.tableName + '_u1',
    fields: [...Campaign_Kpi_Result_Values.getBaseTableModelUniqueFields(),...Campaign_Kpi_Result_Values.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['campaign_kpi_id'],
      type: 'foreign key',
      references: { 
          table: Campaign_Kpis,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
 
};


module.exports = {Campaign_Kpi_Result_Values}