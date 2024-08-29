'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');
const { PcCidade } = require("./PcCidade");
const { PcBairro } = require("./PcBairro");

/**
 * class model
 */
class PcClient extends BaseWinthorTableModel {
  static ID = 30009;
  static model = null;


  static fields = {      
      CODCLI:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODFILIALNF: {
        type: DataTypes.INTEGER,
      },
      CODUSUR1:{
        type: DataTypes.INTEGER
      },
      CGCENT: {
        type: DataTypes.STRING(2000)
      },
      CLIENTE: {
        type: DataTypes.STRING(2000)
      },      
      FANTASIA: {
        type: DataTypes.STRING(2000)
      },
      TIPOFJ: {
        type: DataTypes.STRING(2)
      },
      CODCIDADE: {
        type: DataTypes.INTEGER
      },
      CODBAIRROENT: {
        type: DataTypes.INTEGER
      },
      MUNICENT: {
        type: DataTypes.STRING(2000)
      },
      BAIRROENT: {
        type: DataTypes.STRING(2000)
      },
      ESTENT: {
        type: DataTypes.STRING(2000)
      },
      ENDERENT: {
        type: DataTypes.STRING(2000)
      },
      NUMEROENT: {
        type: DataTypes.STRING(2000)
      },
      LATITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      LONGITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      DTEXCLUSAO: {
        type: DataTypes.DATE
      }
  };

  static foreignsKeys = [{
    fields: ['CODCIDADE'],
    type: 'foreign key',
    references: { 
        table: PcCidade,
        field: 'CODCIDADE'
    }
  },{
    fields: ['CODBAIRROENT'],
    type: 'foreign key',
    references: { 
        table: PcBairro,
        field: 'CODBAIRRO'
    }
  }]
 
};


module.exports = {PcClient}