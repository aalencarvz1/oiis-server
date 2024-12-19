'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Campaign_Kpi_Value_Getters } = require("./Campaign_kpi_value_getters");

/**
 * class model
 */
class Campaign_Kpi_Value_Periods extends BaseTableModel {
  static id = 16003;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpi_Value_Periods.getBaseTableModelFields(),...{            
     
      campaign_kpi_value_getters_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue:0
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
    
  ];

  static constraints = [...(Campaign_Kpi_Value_Periods.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Value_Periods.tableName + '_u1',
    fields: [...Campaign_Kpi_Value_Periods.getBaseTableModelUniqueFields(),...Campaign_Kpi_Value_Periods.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['campaign_kpi_value_getters_id'],
      type: 'foreign key',
      references: { 
          table: Campaign_Kpi_Value_Getters,
          field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
 
};


module.exports = {Campaign_Kpi_Value_Periods}