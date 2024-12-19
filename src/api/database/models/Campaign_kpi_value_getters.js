'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const {  Campaign_Kpis } = require("./Campaign_kpis");


/**
 * class model
 */
class Campaign_Kpi_Value_Getters extends BaseTableModel {
  static id = 16002;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpi_Value_Getters.getBaseTableModelFields(),...{      
      
      campaign_kpi_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultvalue:0
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
    
  ];

  static constraints = [...(Campaign_Kpi_Value_Getters.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Value_Getters.tableName + '_u1',
    fields: [...Campaign_Kpi_Value_Getters.getBaseTableModelUniqueFields(),...Campaign_Kpi_Value_Getters.uniqueFields],
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


module.exports = {Campaign_Kpi_Value_Getters}