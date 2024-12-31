'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorIntegrationTableModel  from "./BaseWinthorIntegrationTableModel.js";

/**
 * class model
 */
export default class Error_Logs extends BaseWinthorIntegrationTableModel {

  //table fields
  declare created_at : Date;
  declare object_type: string;
  declare object_name: string;
  declare object_line: number;
  declare error_code: string;
  declare message: string;
  declare log_values: string;


  static id = 35000;
  static tableName = this.name.toLowerCase();
  static model = null;
  static fields = {
    created_at : {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    object_type:{
      type: DataTypes.STRING(100)
    },
    object_name:{
      type: DataTypes.STRING(255)
    },
    object_line:{
      type: DataTypes.BIGINT.UNSIGNED,
    },
    error_code:{
      type: DataTypes.STRING(255)
    },
    message:{
      type: DataTypes.TEXT
    },
    log_values:{
      type: DataTypes.TEXT
    }
  };
  
  static uniqueFields = [];

  static constraints = [];

  static foreignsKeys = [];
  
};
