'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcFornec extends BaseWinthorTableModel {
  static id = 30013;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODFORNEC:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CGC: {
        type: DataTypes.STRING(2000)
      },
      FORNECEDOR: {
        type: DataTypes.STRING(2000)
      },
      ESTADO: {
        type: DataTypes.STRING(2000)
      }
  };
 
};


module.exports = {PcFornec}