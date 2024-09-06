'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcProdut extends BaseWinthorTableModel {
  static id = 30205;
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


module.exports = {PcProdut}