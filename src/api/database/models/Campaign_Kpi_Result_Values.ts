'use strict';


import { DataTypes, Op, Sequelize } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaign_Kpis  from "./Campaign_Kpis.js";
import Campaign_Entities from "./Campaign_Entities.js";



/**
 * class model
 */
export default class Campaign_Kpi_Result_Values extends BaseTableModel {

  //table fields
  declare campaign_kpi_id:number;
  declare campaign_entity_id:number;
  declare name:string;
  declare expression:string;
  declare is_participation_criterion:number;
  declare notes:string;
  


  static id = 16009;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Campaign_Kpi_Result_Values.getBaseTableModelFields(),...{                
    campaign_kpi_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue:0
    },
    campaign_entity_id:{
      type: DataTypes.BIGINT.UNSIGNED
    },
    name:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    expression:{
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_participation_criterion:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    notes:{
      type: DataTypes.TEXT
    },
  }};

  static uniqueFields = [
    'campaign_kpi_id',
    Sequelize.literal(`(COALESCE(campaign_entity_id,0))`),
    'name'
  ];

  static constraints = [...(Campaign_Kpi_Result_Values.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Result_Values.tableName + '_u1',
    fields: [...Campaign_Kpi_Result_Values.getBaseTableModelUniqueFields(),...Campaign_Kpi_Result_Values.uniqueFields],
    type:"unique"
  },{
    name: Campaign_Kpi_Result_Values.tableName + '_c_1',
    fields:['is_participation_criterion'],
    type:"check",
    where:{
      is_participation_criterion: {
        [Op.in]: [0,1]
      }
    }
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
    },{
      fields: ['campaign_entity_id'],
      type: 'foreign key',
      references: { 
        table: Campaign_Entities,
        field: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade'
    }
  ]];
 
};