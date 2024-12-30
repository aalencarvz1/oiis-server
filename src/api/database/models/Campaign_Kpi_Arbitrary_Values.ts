'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaign_Kpi_Value_Getters  from "./Campaign_Kpi_Value_Getters.js";

/**
 * class model
 */
export default class Campaign_Kpi_Arbitrary_Values extends BaseTableModel {

  //table fields
  declare campaign_kpi_value_getters_id:number;
  declare entity_id: number;
  declare value:number;
  declare notes: string;


  static id = 16004;
  static tableName = this.name.toLowerCase();
  

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
    },
    notes:{
      type: DataTypes.TEXT
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