'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcSuperv extends BaseWinthorTableModel {

  //table fields
  declare CODSUPERVISOR: number;
  declare NOME: string;


  static id = 30089;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODSUPERVISOR:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      NOME: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [];
 
};