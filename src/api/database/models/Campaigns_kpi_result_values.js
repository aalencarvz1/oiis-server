'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const {  Campaign_Kpis } = require("./Campaigns_kpis");


/**
 * class model
 */
class Campaign_Kpi_Result_Value extends BaseTableModel {
  static id = 16007;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpi_Result_Value.getBaseTableModelFields(),...{            
     campaign_kpis_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
     },
     name:{
      type: DataTypes.STRING(255),
     },
     expression:{
      type: DataTypes.TEXT,
     }
    

  }};

  static uniqueFields = [
    'campaign_kpis_id'
  ];

  static constraints = [...(Campaign_Kpi_Result_Value.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Result_Value.tableName + '_u1',
    fields: Campaign_Kpi_Result_Value.uniqueFields,
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['campaign_kpis_id'],
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


module.exports = {Campaign_Kpi_Result_Value}