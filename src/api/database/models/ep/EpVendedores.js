'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpTrabalhadores } = require("./EpTrabalhadores");
const { EpOrigensInfo } = require("./EpOrigensInfo");

/**
 * class model
 */
class EpVendedores extends BaseEpTableModel {
  static id = 40006;
  static model = null;


  static fields = {      
      COD:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODORIGEMINFO: {
        type: DataTypes.INTEGER,
      },
      CODTRABALHADOR: {
        type: DataTypes.INTEGER,
      },
      CONTABILIZARVENDAS: {
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
    fields: ['CODTRABALHADOR'],
    type: 'foreign key',
    references: { 
        table: EpTrabalhadores,
        field: 'COD'
    }
  }]; 
};


module.exports = {EpVendedores}