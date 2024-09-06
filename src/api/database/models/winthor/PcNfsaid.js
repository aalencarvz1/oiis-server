'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcNfsaid extends BaseWinthorTableModel {
  static id = 30210;
  static tableName = this.name.toUpperCase();
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
 
};


module.exports = {PcNfsaid}