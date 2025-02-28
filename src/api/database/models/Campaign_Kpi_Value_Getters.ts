'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import   Campaign_Kpis  from "./Campaign_Kpis.js";


/**
 * class model 
 * armazena o valor de apuracao (A) e valor de comparacao (C) do kpi
 */
export default class Campaign_Kpi_Value_Getters extends BaseTableModel {

  //table fields
  declare campaign_kpi_id: number;
  declare is_arbitrary_value: number;
  declare init_date: Date;
  declare end_date: Date;
  declare conditions: string;


  static id = 16002;
  static tableName = this.name.toLowerCase();
  

  static fields = {
    ...Campaign_Kpi_Value_Getters.getBaseTableModelFields(),...{            
      campaign_kpi_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultvalue:0
      },
      name:{
        type: DataTypes.STRING(512),
        allowNull: false,
      },  
      is_arbitrary_value:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      init_date:{
        type: DataTypes.DATE,
        allowNull: false
      },
      end_date:{
        type: DataTypes.DATE,
        allowNull: false
      },     
      conditions:{
        type: DataTypes.TEXT,
      }  
  }};

  static uniqueFields = [
    'campaign_kpi_id',
    'name'
  ];

  static constraints = [...(Campaign_Kpi_Value_Getters.getBaseTableModelConstraints() || []),...[{
    name: Campaign_Kpi_Value_Getters.tableName + '_u1',
    fields: [...Campaign_Kpi_Value_Getters.getBaseTableModelUniqueFields(),...Campaign_Kpi_Value_Getters.uniqueFields],
    type:"unique"
  },{
    name: Campaign_Kpi_Value_Getters.tableName + '_c_2',
    fields:['is_arbitrary_value'],
    type:"check",
    where:{
      is_arbitrary_value: {
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
  }]];
 
};