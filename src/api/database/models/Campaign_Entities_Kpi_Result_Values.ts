'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaign_Entities  from "./Campaign_Entities.js";
import Campaign_Kpi_Result_Values  from "./Campaign_Kpi_Result_Values.js";


/**
 * class model
 */
export default class Campaign_Entities_Kpi_Result_Values extends BaseTableModel {


  declare campaign_entity_id: number;
  declare campaign_kpi_result_value_id: number;
  declare value: number;
  declare calculated_at: Date;
  declare notes: string;

  //table 
  static id = 16060;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Campaign_Entities_Kpi_Result_Values.getBaseTableModelFields(),...{                  
    campaign_entity_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    campaign_kpi_result_value_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    value:{
      type: DataTypes.DECIMAL(38,12),
      allowNull: false,
      defaultValue:0
    },
    calculated_at:{
      type: DataTypes.DATE(3),
    },
    notes:{
      type: DataTypes.TEXT
    }
  }};

  static uniqueFields = [
    'campaign_entity_id',
    'campaign_kpi_result_value_id'
  ];

  static constraints = [...(Campaign_Entities_Kpi_Result_Values.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Entities_Kpi_Result_Values.tableName + '_u1',
    fields: [...Campaign_Entities_Kpi_Result_Values.getBaseTableModelUniqueFields(),...Campaign_Entities_Kpi_Result_Values.uniqueFields],
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
      fields: ['campaign_kpi_result_value_id'],
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