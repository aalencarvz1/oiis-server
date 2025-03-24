'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcPais extends BaseWinthorTableModel {

  //table fields
  declare CODPAIS: number;
  declare DESCRICAO: string;


  static id = 30007;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODPAIS:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      DESCRICAO: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [];
 
};