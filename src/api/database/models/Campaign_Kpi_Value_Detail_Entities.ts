'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaign_Kpi_Value_Details  from "./Campaign_Kpi_Value_Details.js";

/**
 * class model
 */
export default class Campaign_Kpi_Value_Detail_Entities extends BaseTableModel {

  //table fields
  declare campaign_kpi_value_detail_id:number;
  declare entity_id: number;
  declare expression: string;


  static id = 16011;
  static tableName = this.name.toLowerCase();
  

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