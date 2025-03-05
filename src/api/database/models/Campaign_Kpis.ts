'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Campaigns  from "./Campaigns.js";
import  Measurement_Units  from "./Measurement_Units.js";

/**
 * class model
 */
export default class Campaign_Kpis extends BaseTableModel {

  //table fields
  declare campaign_id:number;
  declare name: string;
  declare description: string;    
  declare conditions:string;
  declare notes:string;



  static id = 16005;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Campaign_Kpis.getBaseTableModelFields(),...{            
    campaign_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue:0
     },
    name:{
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description:{
      type: DataTypes.TEXT
    },    
    conditions:{
      type: DataTypes.TEXT,      
    },
    notes:{
      type: DataTypes.TEXT,      
    },
  }};

  static uniqueFields = [
    'campaign_id',
    'name'
  ];

  static constraints = [...(Campaign_Kpis.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpis.tableName + '_u1',
    fields: [...Campaign_Kpis.getBaseTableModelUniqueFields(),...Campaign_Kpis.uniqueFields],
    type:"unique"    
  }
]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['campaign_id'],
    type: 'foreign key',
    references: { 
        table: Campaigns,
        field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade'
  }]]; 
};