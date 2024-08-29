'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');
const { PcEmpr } = require("./PcEmpr");
const { PcVeicul } = require("./PcVeicul");

/**
 * class model
 */
class PcCarreg extends BaseWinthorTableModel {
  static ID = 30050;
  static model = null;


  static fields = {            
      NUMCAR:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,        
      },
      DTSAIDA:{
        type: DataTypes.DATE,
      },
      CODMOTORISTA:{
        type: DataTypes.INTEGER 
      },
      CODVEICULO:{
        type: DataTypes.INTEGER 
      },
      TOTPESO:{
        type: DataTypes.DECIMAL 
      },
      VLTOTAL:{
        type: DataTypes.DECIMAL 
      },
      NUMNOTAS:{
        type: DataTypes.INTEGER 
      },
      NUMENT:{
        type: DataTypes.INTEGER 
      },
      DESTINO:{
        type: DataTypes.STRING(512) 
      },
      DT_CANCEL:{
        type: DataTypes.DATE,
      }      
  };
   

  static foreignsKeys = [{
    fields: ['CODMOTORISTA'],
    type: 'foreign key',
    references: { 
        table: PcEmpr,
        field: 'MATRICULA'
    }
  },{
    fields: ['CODVEICULO'],
    type: 'foreign key',
    references: { 
        table: PcVeicul,
        field: 'CODVEICULO'
    }
  }];

};


module.exports = {PcCarreg}