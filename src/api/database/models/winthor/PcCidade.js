'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcCidade extends BaseWinthorTableModel {
  static id = 30007;
  static model = null;


  static fields = {      
      CODCIDADE:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      UF:{
        type: DataTypes.STRING(3),
      },
      CODIBGE:{
        type: DataTypes.INTEGER,
      },
      NOMECIDADE: {
        type: DataTypes.STRING(2000)
      },
      POPULACAO:{
        type: DataTypes.INTEGER,
      },
      LATITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      LONGITUDE:{
        type: DataTypes.DECIMAL(18,10)
      }
  };

  static foreignsKeys = [{
    fields: ['UF'],
    type: 'foreign key',
    references: { 
        table: 'PCESTADO',
        field: 'UF'
    }
  }];
 
};


module.exports = {PcCidade}