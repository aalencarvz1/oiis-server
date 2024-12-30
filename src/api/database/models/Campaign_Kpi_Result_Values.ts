'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaign_Kpis  from "./Campaign_Kpis.js";



/**
 * class model
 */
export default class Campaign_Kpi_Result_Values extends BaseTableModel {

  //table fields
  declare campaign_kpi_id:number;
  declare name:string;
  declare expression:string;


  static id = 16007;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Campaign_Kpi_Result_Values.getBaseTableModelFields(),...{                
    campaign_kpi_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue:0
    },
    name:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expression:{
      type: DataTypes.TEXT,
      allowNull: false
    }
  }};

  static uniqueFields = [
    'campaign_kpi_id',
    'name'
  ];

  static constraints = [...(Campaign_Kpi_Result_Values.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Result_Values.tableName + '_u1',
    fields: [...Campaign_Kpi_Result_Values.getBaseTableModelUniqueFields(),...Campaign_Kpi_Result_Values.uniqueFields],
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
      onDelete: 'cascade'
    }
  ]];
 
};