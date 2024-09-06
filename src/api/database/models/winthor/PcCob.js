'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcCob extends BaseWinthorTableModel {
  static id = 30008;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODCOB:{
        type: DataTypes.STRING,
        primaryKey:true
      },
      COBRANCA: {
        type: DataTypes.STRING(2000)
      },
      BOLETO: {
        type: DataTypes.STRING(1)
      },
      CARTAO: {
        type: DataTypes.STRING(1)
      }
  };

  static foreignsKeys = [];
 
};


module.exports = {PcCob}