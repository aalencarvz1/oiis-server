'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Report_Data_Founts extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare start_date: Date;
  declare end_date: Date;
  declare conditions: any;
  declare type_get_expected_data_from: string;
  declare origin_get_expected_data_from: string;
  declare get_expected_data_from: string;
  declare type_get_value_from: string;
  declare origin_get_value_from: string;
  declare get_value_from: string;


  static id = 10005;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Report_Data_Founts.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      description:{
        type: DataTypes.TEXT
      },
      start_date:{
        type: DataTypes.DATE
      },
      end_date:{
        type: DataTypes.DATE
      },
      conditions:{
        type: DataTypes.JSON
      },
      type_get_expected_data_from:{
        type: DataTypes.STRING
      },
      origin_get_expected_data_from:{
        type: DataTypes.STRING
      },
      get_expected_data_from:{
        type: DataTypes.TEXT
      },
      type_get_value_from:{
        type: DataTypes.STRING
      },
      origin_get_value_from:{
        type: DataTypes.STRING
      },
      get_value_from:{
        type: DataTypes.TEXT
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Report_Data_Founts.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys : any[] = [];

};