'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcVeicul extends BaseWinthorTableModel {
  static id = 30040;
  static tableName = this.name.toUpperCase();
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