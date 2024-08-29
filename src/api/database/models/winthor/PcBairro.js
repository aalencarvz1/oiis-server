'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcBairro extends BaseWinthorTableModel {
  static ID = 30012;
  static model = null;


  static fields = {      
      CODBAIRRO:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODCIDADE:{
        type: DataTypes.INTEGER
      },
      UF:{
        type: DataTypes.STRING(3),
      },
      DESCRICAO: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [{
    fields: ['CODCIDADE'],
    type: 'foreign key',
    references: { 
        table: 'PCCIDADE',
        field: 'CODCIDADE'
    }
  }, {
    fields: ['UF'],
    type: 'foreign key',
    references: { 
        table: 'PCESTADO',
        field: 'UF'
    }
  }];
 
};


module.exports = {PcBairro}