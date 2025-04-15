'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcFornec extends BaseWinthorTableModel {

  //table fields
  declare CODFORNEC: number;
  declare CGC: string;
  declare FORNECEDOR: string;
  declare ESTADO: string;



  static id = 30014;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODFORNEC:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CGC: {
        type: DataTypes.STRING(2000)
      },
      FORNECEDOR: {
        type: DataTypes.STRING(2000)
      },
      ESTADO: {
        type: DataTypes.STRING(2000)
      }
  };
 
};