'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaign_Entities  from "./Campaign_Entities.js";
import Campaign_Kpi_Value_Getters from "./Campaign_Kpi_Value_Getters.js";


/**
 * class model
 */
export default class Campaign_Entities_Kpi_Value_Getters_Values extends BaseTableModel {

  //table 
  static id = 16050;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Campaign_Entities_Kpi_Value_Getters_Values.getBaseTableModelFields(),...{                  
    campaign_entity_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    campaign_kpi_value_getter_id:{
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
    'campaign_kpi_value_getter_id'
  ];

  static constraints = [...(Campaign_Entities_Kpi_Value_Getters_Values.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Entities_Kpi_Value_Getters_Values.tableName + '_u1',
    fields: [...Campaign_Entities_Kpi_Value_Getters_Values.getBaseTableModelUniqueFields(),...Campaign_Entities_Kpi_Value_Getters_Values.uniqueFields],
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
      fields: ['campaign_kpi_value_getter_id'],
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