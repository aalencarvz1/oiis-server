'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';

import  Campaign_Kpi_Value_Getters  from "./Campaign_Kpi_Value_Getters.js";

/**
 * class model
 */
export default class Campaign_Kpi_Value_Periods extends BaseTableModel {

  //table fields
  declare campaign_kpi_value_getters_id: number;
  declare init_date: Date;
  declare end_date: Date;
  declare periods_agregation_expression: string;


  static id = 16003;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Campaign_Kpi_Value_Periods.getBaseTableModelFields(),...{                 
    campaign_kpi_value_getters_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false
    },
    init_date:{
      type: DataTypes.DATE,
      allowNull: false
    },
    end_date:{
      type: DataTypes.DATE,
      allowNull: false
    },
    periods_agregation_expression:{
      type: DataTypes.TEXT
    }
  }};

  static uniqueFields = [
    'campaign_kpi_value_getters_id',
    'init_date',
    'end_date'
  ];

  static constraints = [...(Campaign_Kpi_Value_Periods.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Value_Periods.tableName + '_u1',
    fields: [...Campaign_Kpi_Value_Periods.getBaseTableModelUniqueFields(),...Campaign_Kpi_Value_Periods.uniqueFields],
    type:"unique"
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['campaign_kpi_value_getters_id'],
    type: 'foreign key',
    references: { 
        table: Campaign_Kpi_Value_Getters,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]]; 
};