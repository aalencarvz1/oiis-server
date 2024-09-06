'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');

/**
 * class model
 */
class PcPixCobrancaDados extends BaseWinthorTableModel {
  static id = 30501;
  static model = null;


  static fields = {            
      NUMTRANSPAGDIGITAL:{
        type: DataTypes.STRING(100),
        primaryKey:true,
        allowNull:false,        
      },
      FILIAL: {
        type: DataTypes.STRING(2)
      },
      LINK: {
        type: DataTypes.STRING(250)
      },
      QRCODE: {
        type: DataTypes.STRING(4000)
      },      
      VENCIMENTO:{
        type: DataTypes.DATE,
      },
      DESCRICAO: {
        type: DataTypes.STRING(4000)
      },
      NUMTRANSVENDA: {
        type: DataTypes.STRING(30)
      },
      PREST: {
        type: DataTypes.STRING(2)
      },
      JUROS: {
        type: DataTypes.DECIMAL(10,2)
      },
      EMAIL_ENVIADO: {
        type: DataTypes.STRING(1),
        defaultValue: 'N'
      },
      STATUS: {
        type: DataTypes.STRING(1000)
      },
      BAIXADOPCPRESTVIAAPI: {
        type: DataTypes.INTEGER(1),
        allowNull: false,
        defaultValue:0
      }
  };
 
};


module.exports = {PcPixCobrancaDados}