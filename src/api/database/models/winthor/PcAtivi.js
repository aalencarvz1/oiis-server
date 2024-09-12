'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcAtivi extends BaseWinthorTableModel {
  static id = 30011;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODATIV:{
        type: DataTypes.STRING,
        primaryKey:true
      },
      RAMO: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [];
 
};


module.exports = {PcAtivi}