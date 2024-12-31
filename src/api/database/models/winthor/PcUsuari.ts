'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcUsuari extends BaseWinthorTableModel {

  //table fields
  declare CODUSUR: number;
  declare NOME: string;


  static id = 30091;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODUSUR:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      NOME: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [];
 
};