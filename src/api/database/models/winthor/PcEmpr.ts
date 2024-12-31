'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcEmpr extends BaseWinthorTableModel {

  //table fields
  declare MATRICULA: number;
  declare NOME: string;


  static id = 30090;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      MATRICULA:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      NOME: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [];
 
};