'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpOrigensInfo } = require("./EpOrigensInfo");

/**
 * class model
 */
class EpPessoas extends BaseEpTableModel {
  static ID = 40009;
  static model = null;


  static fields = {      
      COD:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODORIGEMINFO: {
        type: DataTypes.INTEGER,
      },
      CODTIPODOCIDENTIFICADOR: {
        type: DataTypes.INTEGER,
      },
      CODDOCIDENTIFICADOR: {
        type: DataTypes.STRING(2000)
      },
      NOMERAZAO: {
        type: DataTypes.STRING(2000)
      },
      FANTASIA: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [{
    fields: ['CODORIGEMINFO'],
    type: 'foreign key',
    references: { 
        table: EpOrigensInfo,
        field: 'COD'
    }
  }];
 
};


module.exports = {EpPessoas}