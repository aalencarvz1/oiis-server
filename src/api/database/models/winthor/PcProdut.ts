'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcProdut extends BaseWinthorTableModel {

  //table fields
  declare CODPROD: number;
  declare CODFILIAL: number;
  declare DESCRICAO:  number;
  declare CODNCMEX: string;
  declare NBM: string;
  declare EMBALAGEM: string;
  declare EMBALAGEMMASTER: string;
  declare UNIDADE: string;
  declare UNIDADEMASTER: string;
  declare QTUNITCX: number;      
  declare QTUNIT: number;
  declare MULTIPLO: number;
  declare CODFORNEC: number;
  declare CODEPTO: number;
  declare CODSEC: number;      
  declare CODCATEGORIA: number;      
  declare CODSUBCATEGORIA: number;      
  declare PESOLIQ: number;
  declare PESOBRUTO: number;
  declare GTINCODAUXILIAR: number;
  declare CODAUXILIAR: string;
  declare GTINCODAUXILIAR2: number;
  declare CODAUXILIAR2: string;
  declare GTINCODAUXILIARTRIB: number;
  declare CODAUXILIARTRIB: string;
  declare PCOMREP1: number;
  declare PRAZOVAL: number;
  declare REVENDA: string;
  declare IMPORTADO: string;
  declare TIPOMERC: string;
  declare ACEITAVENDAFRACAO: string;
  declare DIRFOTOPROD: string;
  declare VALIDARLOTE: string;
  declare ESTOQUEPORLOTE: string;
  declare CONTROLAVALIDADEDOLOTE: string;
  declare ENVIARFORCAVENDAS: string;
  declare DTEXCLUSAO: Date;
  declare OBS2: string;


  static id = 30205;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODPROD:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODFILIAL:{
        type: DataTypes.INTEGER,
      },
      DESCRICAO: {
        type: DataTypes.INTEGER,
      },
      CODNCMEX: {
        type: DataTypes.STRING(50)
      },
      NBM: {
        type: DataTypes.STRING(50)
      },
      EMBALAGEM: {
        type: DataTypes.STRING(50)
      },
      EMBALAGEMMASTER: {
        type: DataTypes.STRING(50)
      },
      UNIDADE: {
        type: DataTypes.STRING(50)
      },
      UNIDADEMASTER: {
        type: DataTypes.STRING(50)
      },
      QTUNITCX: {
        type: DataTypes.DECIMAL(32,10)
      },      
      QTUNIT: {
        type: DataTypes.DECIMAL(32,10)
      },
      MULTIPLO: {
        type: DataTypes.DECIMAL(32,10)
      },
      CODFORNEC: {
        type: DataTypes.INTEGER
      },
      CODEPTO: {
        type: DataTypes.INTEGER
      },
      CODSEC: {
        type: DataTypes.INTEGER
      },      
      CODCATEGORIA: {
        type: DataTypes.INTEGER
      },      
      CODSUBCATEGORIA: {
        type: DataTypes.INTEGER
      },      
      PESOLIQ: {
        type: DataTypes.DECIMAL(32,10)
      },
      PESOBRUTO: {
        type: DataTypes.DECIMAL(32,10)
      },
      GTINCODAUXILIAR: {
        type: DataTypes.INTEGER
      },
      CODAUXILIAR: {
        type: DataTypes.STRING(50)
      },
      GTINCODAUXILIAR2: {
        type: DataTypes.INTEGER
      },
      CODAUXILIAR2: {
        type: DataTypes.STRING(50)
      },
      GTINCODAUXILIARTRIB: {
        type: DataTypes.INTEGER
      },
      CODAUXILIARTRIB: {
        type: DataTypes.STRING(50)
      },
      PCOMREP1: {
        type: DataTypes.DECIMAL(32,10)
      },
      PRAZOVAL: {
        type: DataTypes.INTEGER
      },
      REVENDA: {
        type: DataTypes.STRING(1)
      },
      IMPORTADO: {
        type: DataTypes.STRING(1)
      },
      TIPOMERC: {
        type: DataTypes.STRING(2)
      },
      ACEITAVENDAFRACAO: {
        type: DataTypes.STRING(1)
      },
      DIRFOTOPROD: {
        type: DataTypes.STRING(4000)
      },
      VALIDARLOTE: {
        type: DataTypes.STRING(1)
      },
      ESTOQUEPORLOTE: {
        type: DataTypes.STRING(1)
      },
      CONTROLAVALIDADEDOLOTE: {
        type: DataTypes.STRING(1)
      },
      ENVIARFORCAVENDAS: {
        type: DataTypes.STRING(1)
      },
      DTEXCLUSAO: {
        type: DataTypes.DATE
      },
      OBS2: {
        type: DataTypes.STRING(2)
      }
  };
 
};