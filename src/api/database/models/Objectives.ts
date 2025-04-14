'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


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

  /**
    * get the foreign keys avoiding ciclyc imports on BaseTableModel
    * @override
    * @created 2025-04-14
    * @version 1.0.0
    */
    static getForeignKeys(): any[] {
      let result : any = this.foreignsKeys;
      if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
        result = [];
        let newAdjustedForeignKeys : boolean = true;
        let baseFks = this.getBaseTableModelForeignsKeys();
        for(let i = 0; i < baseFks.length; i++) {
          result.push(baseFks[i]);
          if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
        }        
        this.adjustedForeignKeys = newAdjustedForeignKeys;
      }
      return result;
    }
  
  
    /**
    * static initializer block
    */
    static {
      this.foreignsKeys = this.getForeignKeys();
    }
};