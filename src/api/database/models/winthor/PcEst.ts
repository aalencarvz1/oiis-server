'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcProdut from "./PcProdut.js";

/**
 * class model
 */
export default class PcEst extends BaseWinthorTableModel {

  //table fields
  declare CODFILIAL: number;
  declare CODPROD: number;  
  declare QTESTGER:  number;

  static id = 30206;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    CODFILIAL:{
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    CODPROD:{
      type: DataTypes.INTEGER,
      primaryKey:true
    },      
    QTESTGER: {
      type: DataTypes.DECIMAL(32,10),
    },
    ESTMIN: {
      type: DataTypes.DECIMAL(32,10),
    },
    QTBLOQUEADA: {
      type: DataTypes.DECIMAL(32,10),
    },
    QTPENDENTE: {
      type: DataTypes.DECIMAL(32,10),
    },
    QTRESERV: {
      type: DataTypes.DECIMAL(32,10),
    }
  };

  static foreignsKeys = [{
    fields: ['CODPROD'],
    type: 'foreign key',
    references: { 
        table: PcProdut,
        field: 'CODPROD'
    }
  }];
 
};