'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Campaign_Kpi_Value_Details } = require("./Campaign_Kpi_Value_Details");

/**
 * class model
 */
class Campaign_Kpi_Value_Detail_Entities extends BaseTableModel {
  static id = 16009;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Kpi_Value_Detail_Entities.getBaseTableModelFields(),...{                  
    campaign_kpi_value_detail_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    entity_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    expression:{
      type: DataTypes.TEXT
    }
  }};

  static uniqueFields = [
    'campaign_kpi_value_detail_id',
    'entity_id'
  ];

  static constraints = [...(Campaign_Kpi_Value_Detail_Entities.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Value_Detail_Entities.tableName + '_u1',
    fields: [...Campaign_Kpi_Value_Detail_Entities.getBaseTableModelUniqueFields(),...Campaign_Kpi_Value_Detail_Entities.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['campaign_kpi_value_detail_id'],
    type: 'foreign key',
    references: { 
        table: Campaign_Kpi_Value_Details,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]];
 
};


module.exports = {Campaign_Kpi_Value_Detail_Entities}