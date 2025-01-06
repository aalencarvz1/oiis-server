'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import  PcEmpr  from "./PcEmpr.js";
import  PcVeicul  from "./PcVeicul.js";

/**
 * class model
 */
export default class PcCarreg extends BaseWinthorTableModel {

  //table fields
  declare NUMCAR: number;
  declare DTSAIDA: Date;
  declare CODMOTORISTA: number;
  declare CODVEICULO: number;
  declare TOTPESO: number;
  declare VLTOTAL: number;
  declare NUMNOTAS: number;
  declare NUMENT: number;
  declare DESTINO: string;
  declare DT_CANCEL: Date;


  static id = 30050;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {            
      NUMCAR:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,        
      },
      DTSAIDA:{
        type: DataTypes.DATE,
      },
      CODMOTORISTA:{
        type: DataTypes.INTEGER 
      },
      CODVEICULO:{
        type: DataTypes.INTEGER 
      },
      TOTPESO:{
        type: DataTypes.DECIMAL 
      },
      VLTOTAL:{
        type: DataTypes.DECIMAL 
      },
      NUMNOTAS:{
        type: DataTypes.INTEGER 
      },
      NUMENT:{
        type: DataTypes.INTEGER 
      },
      DESTINO:{
        type: DataTypes.STRING(512) 
      },
      DT_CANCEL:{
        type: DataTypes.DATE,
      }      
  };
   

  static foreignsKeys = [{
    fields: ['CODMOTORISTA'],
    type: 'foreign key',
    references: { 
        table: PcEmpr,
        field: 'MATRICULA'
    }
  },{
    fields: ['CODVEICULO'],
    type: 'foreign key',
    references: { 
        table: PcVeicul,
        field: 'CODVEICULO'
    }
  }];

};