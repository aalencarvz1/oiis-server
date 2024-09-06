'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcEstcr extends BaseWinthorTableModel {
  static id = 30220;
  static model = null;


  static fields = {            
      CODBANCO:{
        type: DataTypes.BIGINT,
        primaryKey:true,
        allowNull:false,        
      },
      CODCOB: {
        type: DataTypes.STRING(100),
        primaryKey:true,
        allowNull:false,        
      },
      VALOR: {
        type: DataTypes.DECIMAL(32,10)
      },
      VALORCONCILIADO: {
        type: DataTypes.DECIMAL(32,10)
      },
      DTULTCONCILIA: {
        type: DataTypes.DATE
      },
      VALORSALDOTOTALCONCIL: {
        type: DataTypes.DECIMAL(32,10)
      },
      VALORSALDOTOTALCOMP: {
        type: DataTypes.DECIMAL(32,10)
      },
      VALORCOMPENSADO: {
        type: DataTypes.DECIMAL(32,10)
      },
      DTULTCOMPENSACAO: {
        type: DataTypes.DATE
      }
  };
  
};


module.exports = {PcEstcr}