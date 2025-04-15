'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import  PcFornec  from "./PcFornec.js";
import  PcProdut  from "./PcProdut.js";

/**
 * class model
 */
export default class Produtos_Armazenados_Terceiros extends BaseWinthorTableModel {

  //table fields
  declare CGCTERCEIRO:  number;      
  declare CODFILIAL: number;
  declare CODPROD: number;
  declare QT: number;
  declare SOMAR_WINT: number;


  static id = 30700;
  static tableName = this.name.toUpperCase();
  static model = null;
  static primaryKeysFieldsNames = [];


  static fields = {      
      CGCTERCEIRO: {
        type: DataTypes.INTEGER,
        primaryKey:true
      },      
      CODFILIAL:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODPROD:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      QT: {
        type: DataTypes.DECIMAL(32,10)
      },
      SOMAR_WINT: {
        type: DataTypes.INTEGER,
        defaultValue: 1
      }
  };

  static foreignsKeys = [{
    fields: ['CGCTERCEIRO'],
    type: 'foreign key',
    references: { 
        table: PcFornec,
        field: 'CGC'
    }
  },{
    fields: ['CODPROD'],
    type: 'foreign key',
    references: { 
        table: PcProdut,
        field: 'CODPROD'
    }
  }]; 

  
};