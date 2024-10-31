'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcDepto extends BaseWinthorTableModel {
  static id = 30204;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODEPTO:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      DESCRICAO: {
        type: DataTypes.STRING(2000)
      }
  };
 
};


module.exports = {PcDepto}