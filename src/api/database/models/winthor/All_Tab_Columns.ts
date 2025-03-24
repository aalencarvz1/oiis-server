'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class All_Tab_Columns extends BaseWinthorTableModel {

  //table fields
  declare OWNER:string;
  declare TABLE_NAME: string;
  declare COLUMN_NAME: string;
  declare COLUMN_ID: number;
  declare DATA_TYPE: string;
  declare DATA_LENGTH: number;
  declare DATA_PRECISION: number;
  declare DATA_SCALE: number;
  declare NULLABLE: string;
  declare DATA_DEFAULT: string;



  static id = 30000;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      OWNER:{
        type: DataTypes.STRING(255),
        primaryKey:true
      },
      TABLE_NAME:{
        type: DataTypes.STRING(255),
        primaryKey:true
      },
      COLUMN_NAME:{
        type: DataTypes.STRING(255),
        primaryKey:true
      },
      COLUMN_ID:{
        type: DataTypes.INTEGER
      },
      DATA_TYPE:{
        type: DataTypes.STRING(255)
      },
      DATA_LENGTH:{
        type: DataTypes.INTEGER
      },
      DATA_PRECISION:{
        type: DataTypes.INTEGER
      },
      DATA_SCALE:{
        type: DataTypes.INTEGER
      },
      NULLABLE:{
        type: DataTypes.STRING(1)
      },
      DATA_DEFAULT:{
        type: DataTypes.TEXT
      }
  };
 
};