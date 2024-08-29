'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');
const { PcNfsaid } = require("./PcNfsaid");

/**
 * class model
 */
class PcDocEletronico extends BaseWinthorTableModel {
  static ID = 30500;
  static model = null;


  static fields = {            
      NUMTRANSACAO: {
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      XMLNFE: {
        type: DataTypes.TEXT
      }
  };

  static foreignsKeys = [{
    fields: ['NUMTRANSACAO'],
    type: 'foreign key',
    references: { 
        table: PcNfsaid,
        field: 'NUMTRANSVENDA'
    }
  }];
 
};


module.exports = {PcDocEletronico}