'use strict';


import { DataTypes, Op } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Report_Data_Founts  from "./Report_Data_Founts.js";
import  Sql_Object_Types  from "./Sql_Object_Types.js";
import  Data_Types  from "./Data_Types.js";


/**
 * class model
 */
export default class Report_Data_Fount_Items extends BaseTableModel {

  //table fields
  declare report_data_source_id: number;
  declare sql_object_type_id: number;
  declare sql_object_id: number;
  declare before_sql_text: string;
  declare sql_text: string;
  declare sql_text_after_children: string;
  declare numeric_order: number;
  declare sql_alias: string;
  declare data_type_id:number;
  declare existence_critery: string;
  declare access_critery: string;
  declare is_unique_in_groupment: number;
  declare data_groupment: number;
  declare value_groupment: number;
  declare observations: string;


  static id = 10006;
  static tableName = this.name.toLowerCase();
  
  static fields = {
    ...Report_Data_Fount_Items.getBaseTableModelFields(),...{                 
      report_data_source_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      sql_object_type_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      sql_object_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      before_sql_text:{
        type: DataTypes.TEXT,
      },
      sql_text:{
        type: DataTypes.TEXT,
        allowNull:false,
      },
      sql_text_after_children:{
        type: DataTypes.TEXT
      },
      numeric_order: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false,
        defaultValue: 1
      },
      sql_alias:{
        type: DataTypes.STRING(2000)
      },
      data_type_id:{
        type: DataTypes.BIGINT.UNSIGNED
      },
      existence_critery:{
        type: DataTypes.TEXT
      },
      access_critery:{
        type: DataTypes.TEXT
      },
      is_unique_in_groupment:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      data_groupment:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      value_groupment:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue:0
      },
      observations:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Report_Data_Fount_Items.getBaseTableModelConstraints() || []),...[{
    name: Report_Data_Fount_Items.tableName + '_c_1',
    fields:['is_unique_in_groupment'],
    type:"check",
    where:{
      is_unique_in_groupment: {
            [Op.in]: [0,1]
        }
    }
  },{
    name: Report_Data_Fount_Items.tableName + '_c_2',
    fields:['data_groupment'],
    type:"check",
    where:{
      data_groupment: {
            [Op.in]: [0,1]
        }
    }
  },{
    name: Report_Data_Fount_Items.tableName + '_c_3',
    fields:['value_groupment'],
    type:"check",
    where:{
      value_groupment: {
            [Op.in]: [0,1]
        }
    }
  }]];

  static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[{
    fields: ['report_data_source_id'],
    type: 'foreign key',
    references: { 
        table: Report_Data_Founts,
        field: 'id'
    },    
    onUpdate: 'cascade',
    onDelete: 'cascade'
  },{
    fields: ['sql_object_type_id'],
    type: 'foreign key',
    references: { 
        table: Sql_Object_Types,
        field: 'id'
    },    
    onUpdate: 'cascade'
  },{
    fields: ['data_type_id'],
    type: 'foreign key',
    references: { 
        table: Data_Types,
        field: 'id'
    },    
    onUpdate: 'cascade'
  }]];

};