'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcFilial extends BaseWinthorTableModel {
  static ID = 30010;
  static model = null;


  static fields = {      
      CODIGO:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CIDADE: {
        type: DataTypes.STRING(2000)
      },
      CGC: {
        type: DataTypes.STRING(2000)
      },
      RAZAOSOCIAL: {
        type: DataTypes.STRING(2000)
      },
      FANTASIA: {
        type: DataTypes.STRING(2000)
      },
      UF: {
        type: DataTypes.STRING(2000)
      },
      CODCLI: {
        type: DataTypes.BIGINT.UNSIGNED
      }
  };

  static foreignsKeys = [{
    fields: ['CODCLI'],
    type: 'foreign key',
    references: { 
        table: 'PCCLIENT',
        field: 'CODCLI'
    }
  }];
 
};


module.exports = {PcFilial}