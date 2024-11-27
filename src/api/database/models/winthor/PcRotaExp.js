'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcRotaExp extends BaseWinthorTableModel {
  static id = 30031;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODROTA:{
        type: DataTypes.STRING,
        primaryKey:true
      },
      DESCRICAO: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [];
 
};


module.exports = {PcRotaExp}