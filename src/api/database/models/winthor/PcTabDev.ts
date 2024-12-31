'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcTabDev extends BaseWinthorTableModel {

  //table fields
  declare CODDEVOL: string;
  declare MOTIVO: string;
  declare TIPO: string;



  static id = 30030;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODDEVOL:{
        type: DataTypes.STRING,
        primaryKey:true
      },
      MOTIVO: {
        type: DataTypes.STRING(2000)
      },
      TIPO: {
        type: DataTypes.STRING(2)
      }
  };

  static foreignsKeys = [];
 
};