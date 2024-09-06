'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcUsuari extends BaseWinthorTableModel {
  static id = 30091;
  static model = null;


  static fields = {      
      CODUSUR:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      NOME: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [];
 
};


module.exports = {PcUsuari}