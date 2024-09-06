'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcPais extends BaseWinthorTableModel {
  static id = 30005;
  static model = null;


  static fields = {      
      CODPAIS:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      DESCRICAO: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [];
 
};


module.exports = {PcPais}