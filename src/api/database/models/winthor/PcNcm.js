'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcNcm extends BaseWinthorTableModel {
  static id = 30200;
  static model = null;


  static fields = {      
      CODNCMEX:{
        type: DataTypes.STRING,
        primaryKey:true
      },
      CODNCM: {
        type: DataTypes.INTEGER
      },
      CODEX: {
        type: DataTypes.INTEGER
      },
      CAPITULO: {
        type: DataTypes.INTEGER
      },
      DESCRICAO: {
        type: DataTypes.STRING
      }
  };

  static foreignsKeys = [];
 
};


module.exports = {PcNcm}