'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcNcm extends BaseWinthorTableModel {

  //table fields
  declare CODNCMEX: string;
  declare CODNCM: number;
  declare CODEX: number;
  declare CAPITULO: number;
  declare DESCRICAO: string;


  static id = 30200;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODNCMEX:{
        type: DataTypes.STRING,
        primaryKey:true
      },
      CODNCM: {
        type: DataTypes.INTEGER
      },
      CODEX: {
        type: DataTypes.INTEGER
      },
      CAPITULO: {
        type: DataTypes.INTEGER
      },
      DESCRICAO: {
        type: DataTypes.STRING
      }
  };

  static foreignsKeys = [];
 
};