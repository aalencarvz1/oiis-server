'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcVeicul extends BaseWinthorTableModel {
  static ID = 30040;
  static model = null;


  static fields = {      
      CODVEICULO:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      PLACA: {
        type: DataTypes.STRING(50)
      }
  };

  static foreignsKeys = [];
 
};


module.exports = {PcVeicul}