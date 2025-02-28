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
  declare measurement_unit_id: number;
  declare description: string;    
  declare conditions:string;
  declare is_participation_criterion:number;
  declare manipulation_kpis:string;



  static id = 16001;
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
    measurement_unit_id:{
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: false,
      defaultValue: Measurement_Units.WT
    },
    description:{
      type: DataTypes.TEXT
    },    
    conditions:{
      type: DataTypes.TEXT,      
    },
    is_participation_criterion:{
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    },
    manipulation_kpis:{
      type: DataTypes.TEXT,
    }  
  }};

  static uniqueFields = [
    'campaign_id',
    'name'
  ];

  static constraints = [...(Campaign_Kpis.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpis.tableName + '_u1',
    fields: [...Campaign_Kpis.getBaseTableModelUniqueFields(),...Campaign_Kpis.uniqueFields],
    type:"unique"    
  },{
    name: Campaign_Kpis.tableName + '_c_1',
    fields:['is_participation_criterion'],
    type:"check",
    where:{
      is_participation_criterion: {
            [Op.in]: [0,1]
        }
    }
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
  },{
    fields: ['measurement_unit_id'],
    type: 'foreign key',
    references: { 
        table: Measurement_Units,
        field: 'id'
    },
    onUpdate: 'cascade'
  }]]; 
};