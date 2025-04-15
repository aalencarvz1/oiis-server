'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Tasks extends BaseTableModel {

  //table fields
  declare name: string;
  declare description: string;
  declare notes: string;
  declare forecast_start_moment: Date;
  declare forecast_end_moment: Date;
  declare start_at: Date;
  declare end_at: Date;


  static id = 15101;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Tasks.getBaseTableModelFields(),...{            
      name: {
        type: DataTypes.STRING(256),
        allowNull:false
      },
      description: {
        type: DataTypes.TEXT
      },
      notes: {
        type: DataTypes.TEXT
      },
      forecast_start_moment: {
        type: DataTypes.DATE
      },
      forecast_end_moment: {
        type: DataTypes.DATE
      },
      start_at: {
        type: DataTypes.DATE
      },
      end_at: {
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Tasks.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys : any[] = [];
  
};