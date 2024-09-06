'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpPessoas } = require("./EpPessoas");
const { EpOrigensInfo } = require("./EpOrigensInfo");
const { EpFiliais } = require("./EpFiliais");

/**
 * class model
 */
class EpTrabalhadores extends BaseEpTableModel {
  static id = 40005;
  static model = null;


  static fields = {      
      COD:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODORIGEMINFO: {
        type: DataTypes.INTEGER,
      },
      CODSUP: {
        type: DataTypes.INTEGER,
      },
      CODPESSOA: {
        type: DataTypes.INTEGER,
      },
      CODFILIAL: {
        type: DataTypes.INTEGER,
      },
      CODTIPOTRABALHADOR: {
        type: DataTypes.INTEGER,
      },
  };

  static foreignsKeys = [{
    fields: ['CODORIGEMINFO'],
    type: 'foreign key',
    references: { 
        table: EpOrigensInfo,
        field: 'COD'
    }
  }, {
    fields: ['CODSUP'],
    type: 'foreign key',
    references: { 
        table: EpTrabalhadores,
        field: 'COD'
    }
  },{
    fields: ['CODPESSOA'],
    type: 'foreign key',
    references: { 
        table: EpPessoas,
        field: 'COD'
    }
  },{
    fields: ['CODFILIAL'],
    type: 'foreign key',
    references: { 
        table: EpFiliais,
        field: 'COD'
    }
  }];
 
};


module.exports = {EpTrabalhadores}