'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcCob extends BaseWinthorTableModel {

  //table fields
  declare CODCOB: string;
  declare COBRANCA: string;
  declare BOLETO: string;
  declare CARTAO: string;


  static id = 30008;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODCOB:{
        type: DataTypes.STRING,
        primaryKey:true
      },
      COBRANCA: {
        type: DataTypes.STRING(2000)
      },
      BOLETO: {
        type: DataTypes.STRING(1)
      },
      CARTAO: {
        type: DataTypes.STRING(1)
      }
  };

  static foreignsKeys = [];
 
};