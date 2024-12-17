'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const {  Campaign_Kpis } = require("./Campaigns_kpis");


/**
 * class model
 */
class Campaign_Kpis_Values_Getters extends BaseTableModel {
  static id = 16002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpis_Values_Getters.getBaseTableModelFields(),...{      
      
      campaign_kpi_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      is_arbitrary_value:{
        type: DataTypes.TEXT
      },
      is_period_value:{
        type: DataTypes.TEXT
      },
      periods_agregation_expression:{
        type: DataTypes.TEXT,
      },
      kpi_value_type:{
        type: DataTypes.TEXT,
      },
      conditions:{
        type: DataTypes.TEXT,
      }
    

  }};

  static uniqueFields = [
    'campaign_kpi_id'
  ];

  static constraints = [...(Campaign_Kpis_Values_Getters.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpis_Values_Getters.tableName + '_u1',
    fields: [...Campaign_Kpis_Values_Getters.getBaseTableModelUniqueFields(),...Campaign_Kpis_Values_Getters.uniqueFields],
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
      onDelete: 'cascade',
    }
  ]];
 
};


module.exports = {Campaign_Kpis_Values_Getters}