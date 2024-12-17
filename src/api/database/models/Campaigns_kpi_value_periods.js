'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Campaign_Kpis_Values_Getters } = require("./Campaigns_kpi_value_getters");

/**
 * class model
 */
class Campaign_Kpis_Value_Periods extends BaseTableModel {
  static id = 16003;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpis_Value_Periods.getBaseTableModelFields(),...{            
     
      id_campaign_kpi_value_get:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
     },
      init_date:{
      type: DataTypes.DATE
     },
     end_date:{
      type: DataTypes.DATE
    },
     periods_agregation_expression:{
      type: DataTypes.TEXT
     }
    

  }};

  static uniqueFields = [
    'id_campaign_kpi_value_get'
  ];

  static constraints = [...(Campaign_Kpis_Value_Periods.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpis_Value_Periods.tableName + '_u1',
    fields: Campaign_Kpis_Value_Periods.uniqueFields,
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['id_campaign_kpi_value_get'],
      type: 'foreign key',
      references: { 
          table: Campaign_Kpis_Values_Getters,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
 
};


module.exports = {Campaign_Kpis_Value_Periods}