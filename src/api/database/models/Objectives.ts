'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';


/**
 * class model
 */
export default class Objectives extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare start_date: Date;
  declare end_date: Date;
  declare conditions: any;
  declare type_get_objective_from: string;
  declare origin_get_objective_from: string;
  declare get_objective_from: string;
  declare type_get_value_from: string;
  declare origin_get_value_from: string;
  declare get_value_from: string;


  static id = 9060;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Objectives.getBaseTableModelFields(),...{                 
      name:{
        type: DataTypes.STRING(256),
        allowNull:false,
      },
      description:{
        type: DataTypes.TEXT
      },
      start_date:{
        type: DataTypes.DATE,
        allowNull:false,
      },
      end_date:{
        type: DataTypes.DATE,
        allowNull:false,
      },
      conditions:{
        type: DataTypes.JSON
      },
      type_get_objective_from:{
        type: DataTypes.STRING
      },
      origin_get_objective_from:{
        type: DataTypes.STRING
      },
      get_objective_from:{
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

  static constraints = [...(Objectives.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys : any[] = [];

};