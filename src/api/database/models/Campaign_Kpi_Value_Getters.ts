'use strict';


import { DataTypes, Op, Sequelize } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import   Campaign_Kpis  from "./Campaign_Kpis.js";
import Report_Visions from "./Report_Visions.js";
import Measurement_Units from "./Measurement_Units.js";
import Campaign_Entities from "./Campaign_Entities.js";


/**
 * class model 
 * armazena o valor de apuracao (A) e valor de comparacao (C) do kpi
 */
export default class Campaign_Kpi_Value_Getters extends BaseTableModel {

  //table fields
  declare campaign_kpi_id: number;
  declare campaign_entity_id: number;
  declare name: string;  
  declare report_vision_id: number;
  declare init_date: Date;
  declare end_date: Date;    
  declare measurement_unit_id: number;
  declare consider_normal_sales: number;
  declare consider_returns: number;
  declare consider_bonuses: number;
  declare conditions: string;
  declare objective_query: string;
  declare value_query: string;
  declare objective: number;
  declare value: number;
  declare notes: string;

  static id = 16006;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Campaign_Kpi_Value_Getters.getBaseTableModelFields(),...{            
      campaign_kpi_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      campaign_entity_ids:{
        type: DataTypes.STRING(255)
      },
      name:{
        type: DataTypes.STRING(255),
        allowNull: false,
      },  
      report_vision_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },      
      init_date:{
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date:{
        type: DataTypes.DATE,
        allowNull: false
      },     
      measurement_unit_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: Measurement_Units.WT      
      },
      consider_normal_sales:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      consider_returns:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:1
      },
      consider_bonuses:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      conditions:{
        type: DataTypes.TEXT,
      }, 
      objective_query:{
        type: DataTypes.TEXT,
      }, 
      value_query:{
        type: DataTypes.TEXT,
      },  
      objective:{
        type: DataTypes.DECIMAL,
      },
      value:{
        type: DataTypes.DECIMAL,
      },
      notes:{
        type: DataTypes.TEXT,
      }
  }};

  static uniqueFields = [
    'campaign_kpi_id',
    'campaign_entity_ids',
    'name'
  ];

  static constraints = [...(Campaign_Kpi_Value_Getters.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Value_Getters.tableName + '_u1',
    fields: [...Campaign_Kpi_Value_Getters.getBaseTableModelUniqueFields(),...Campaign_Kpi_Value_Getters.uniqueFields],
    type:"unique"
  },{
    name: Campaign_Kpi_Value_Getters.tableName + '_c_2',
    fields:['consider_normal_sales'],
    type:"check",
    where:{
      consider_normal_sales: {
        [Op.in]: [0,1]
      }
    }
  },{
    name: Campaign_Kpi_Value_Getters.tableName + '_c_3',
    fields:['consider_returns'],
    type:"check",
    where:{
      consider_returns: {
        [Op.in]: [0,1]
      }
    }
  },{
    name: Campaign_Kpi_Value_Getters.tableName + '_c_4',
    fields:['consider_bonuses'],
    type:"check",
    where:{
      consider_bonuses: {
        [Op.in]: [0,1]
      }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['campaign_kpi_id'],
    type: 'foreign key',
    references: { 
      table: Campaign_Kpis,
      field: 'id'
    },
    onUpdate: 'cascade',
    onDelete: 'cascade',
  },{
    fields: ['report_vision_id'],
    type: 'foreign key',
    references: { 
      table: Report_Visions,
      field: 'id'
    },
    onUpdate: 'cascade'
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