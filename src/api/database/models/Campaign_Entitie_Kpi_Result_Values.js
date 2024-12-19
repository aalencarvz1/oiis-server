'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseTableModel } = require('./BaseTableModel');
const { Campaign_Entities } = require("./Campaign_Entities");
const {Campaign_Kpi_Result_Values } = require("./Campaign_Kpi_Result_Values");


/**
 * class model
 */
class Campaign_Entitie_Kpi_Result_Values extends BaseTableModel {
  static id = 16008;
  static tableName = this.name.toLowerCase();
  static model = null;

  static fields = {
    ...Campaign_Entitie_Kpi_Result_Values.getBaseTableModelFields(),...{                  
    campaign_entity_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    campaign_kpi_result_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    value:{
      type: DataTypes.DECIMAL(38,12),
      allowNull: false,
      defaultValue:0
    },
    notes:{
      type: DataTypes.TEXT
    }
  }};

  static uniqueFields = [
    'campaign_entity_id',
    'campaign_kpi_result_id'
  ];

  static constraints = [...(Campaign_Entitie_Kpi_Result_Values.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Entitie_Kpi_Result_Values.tableName + '_u1',
    fields: [...Campaign_Entitie_Kpi_Result_Values.getBaseTableModelUniqueFields(),...Campaign_Entitie_Kpi_Result_Values.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
    {
      fields: ['campaign_entity_id'],
      type: 'foreign key',
      references: { 
        table: Campaign_Entities,
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    },
    {
      fields: ['campaign_kpi_result_id'],
      type: 'foreign key',
      references: { 
        table: Campaign_Kpi_Result_Values,
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
 
};


module.exports = {Campaign_Entitie_Kpi_Result_Values}