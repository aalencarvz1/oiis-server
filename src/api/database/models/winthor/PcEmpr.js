'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcEmpr extends BaseWinthorTableModel {
  static id = 30090;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      MATRICULA:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      NOME: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [];
 
};


module.exports = {PcEmpr}