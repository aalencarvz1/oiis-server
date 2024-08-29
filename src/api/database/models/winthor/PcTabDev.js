'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcTabDev extends BaseWinthorTableModel {
  static ID = 30030;
  static model = null;


  static fields = {      
      CODDEVOL:{
        type: DataTypes.STRING,
        primaryKey:true
      },
      MOTIVO: {
        type: DataTypes.STRING(2000)
      },
      TIPO: {
        type: DataTypes.STRING(2)
      }
  };

  static foreignsKeys = [];
 
};


module.exports = {PcTabDev}