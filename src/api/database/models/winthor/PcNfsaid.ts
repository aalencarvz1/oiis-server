'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcNfsaid extends BaseWinthorTableModel {

  //table fields
  declare NUMTRANSVENDA: number;
  declare NUMNOTA: number;
  declare NUMCAR: number;
  declare ESPECIE: string;
  declare CODFILIAL:number;
  declare CODCLI: number;
  declare CODUSUR: number;
  declare CLIENTE: string;
  declare DTSAIDA: Date;
  declare CODCOB: string;
  declare CODPLPAG: string;
  declare VLTOTAL: number;
  declare TOTPESO: number;
  declare DTCANCEL: Date;


  static id = 30210;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {            
      NUMTRANSVENDA: {
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      NUMNOTA: {
        type: DataTypes.INTEGER
      },
      NUMCAR: {
        type: DataTypes.INTEGER
      },
      ESPECIE: {
        type: DataTypes.STRING
      },
      CODFILIAL:{
        type: DataTypes.INTEGER
      },
      CODCLI:{
        type: DataTypes.INTEGER,
      },
      CODUSUR:{
        type: DataTypes.INTEGER,
      },
      CLIENTE: {
        type: DataTypes.STRING(2000)
      },
      DTSAIDA: {
        type: DataTypes.DATE
      },
      CODCOB: {
        type: DataTypes.STRING(50)
      },
      CODPLPAG: {
        type: DataTypes.STRING(50)
      },
      VLTOTAL: {
        type: DataTypes.DECIMAL(32,10)
      },
      TOTPESO: {
        type: DataTypes.DECIMAL(32,10)
      },
      DTCANCEL: {
        type: DataTypes.DATE
      }
  };

  static foreignsKeys : any[] = [];
 
};