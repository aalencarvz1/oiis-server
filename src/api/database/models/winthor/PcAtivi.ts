'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcAtivi extends BaseWinthorTableModel {

  //table fields
  declare CODATIV: string;
  declare RAMO: string;


  static id = 30012;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
      CODATIV:{
        type: DataTypes.STRING,
        primaryKey:true
      },
      RAMO: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys : any[] = [];
 
};