'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');
const { PcFornec } = require("./PcFornec");
const { PcProdut } = require("./PcProdut");
const { Utils } = require("../../../controllers/utils/Utils");

/**
 * class model
 */
class Produtos_Armazenados_Terceiros extends BaseWinthorTableModel {
  static id = 30014;
  static tableName = this.name.toUpperCase();
  static model = null;
  static primaryKeysFieldsNames = [];


  static fields = {      
      CGCTERCEIRO: {
        type: DataTypes.INTEGER,
        primaryKey:true
      },      
      CODFILIAL:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODPROD:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      QT: {
        type: DataTypes.DECIMAL(32,10)
      },
      SOMAR_WINT: {
        type: DataTypes.INTEGER(1),
        defaultValue: 1
      }
  };

  static foreignsKeys = [{
    fields: ['CGCTERCEIRO'],
    type: 'foreign key',
    references: { 
        table: PcFornec,
        field: 'CGC'
    }
  },{
    fields: ['CODPROD'],
    type: 'foreign key',
    references: { 
        table: PcProdut,
        field: 'CODPROD'
    }
  }]; 

  
};


module.exports = {Produtos_Armazenados_Terceiros}