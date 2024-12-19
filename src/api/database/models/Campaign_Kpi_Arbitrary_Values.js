'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');

const { Campaign_Kpi_Value_Getters } = require("./Campaign_Kpi_Value_Getters");
const { toDefaultValue } = require("sequelize/lib/utils");

/**
 * class model
 */
class Campaign_Kpi_Arbitrary_Values extends BaseTableModel {
  static id = 16004;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpi_Arbitrary_Values.getBaseTableModelFields(),...{                  
    campaign_kpi_value_getters_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
      },
    entity_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      comment:'reference to entity of campain, ex.: id of seller'
    },
    value:{
      type: DataTypes.DECIMAL(38,12),
      allowNull: false,
      defaultValue: 0
    }        
  }};

  static uniqueFields = [
    'campaign_kpi_value_getters_id',
    'entity_id'
  ];

  static constraints = [...(Campaign_Kpi_Arbitrary_Values.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Arbitrary_Values.tableName + '_u1',
    fields: [...Campaign_Kpi_Arbitrary_Values.getBaseTableModelUniqueFields(),...Campaign_Kpi_Arbitrary_Values.uniqueFields],
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


module.exports = {Campaign_Kpi_Arbitrary_Values}