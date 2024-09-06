'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcEstado extends BaseWinthorTableModel {
  static id = 30101;
  static model = null;


  static fields = {      
      UF:{
        type: DataTypes.STRING(3),
        primaryKey:true
      },
      CODPAIS:{
        type: DataTypes.INTEGER,
      },
      CODIBGE:{
        type: DataTypes.INTEGER,
      },
      ESTADO: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [{
    fields: ['CODPAIS'],
    type: 'foreign key',
    references: { 
        table: 'PCPAIS',
        field: 'CODPAIS'
    }
  }];
 
};


module.exports = {PcEstado}