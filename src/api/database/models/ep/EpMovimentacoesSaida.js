'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpNfsSaida } = require("./EpNfsSaida");
const { EpProdutos } = require("./EpProdutos");
const { EpOrigensInfo } = require("./EpOrigensInfo");
const { EpFornecedores } = require("./EpFornecedores");
const { EpDepartamentosProd } = require("./EpDeparamentosProd");

/**
 * class model
 */
class EpMovimentacoesSaida extends BaseEpTableModel {
  static ID = 40510;
  static model = null;


  static fields = {      
		COD:{
			type: DataTypes.INTEGER,
      primaryKey:true
		},
		CODORIGEMINFO:{
			type: DataTypes.INTEGER
		},
		NUMTRANSITEMORIGEM:{
			type: DataTypes.INTEGER
		},
		CODNFSAIDA:{
			type: DataTypes.INTEGER
		},
		CODPROD:{
			type: DataTypes.INTEGER
		},
		CODFORNEC:{
			type: DataTypes.INTEGER
		},
		CODOPER:{
			type: DataTypes.INTEGER
		},
		CODEPTO:{
			type: DataTypes.INTEGER
		},
		CODUNIDADE:{
			type: DataTypes.INTEGER
		},
		QTSAIDA:{
			type: DataTypes.DECIMAL(38,10)
		},
		QTDEVOLVIDA:{
			type: DataTypes.DECIMAL(38,10)
		},
		VLUN:{
			type: DataTypes.DECIMAL(38,10)
		},
		PESOLIQUN:{
			type: DataTypes.DECIMAL(38,10)
		},
		PESOBRUTOUN:{
			type: DataTypes.DECIMAL(38,10)
		},
		DTMOVIMENTACAO:{
			type: DataTypes.DATE
		},
		DTCANCEL:{
			type: DataTypes.DATE
		},
		CODSTATUSREG:{
			type: DataTypes.INTEGER
		},
  };

  static foreignsKeys = [{
    fields: ['CODORIGEMINFO'],
    type: 'foreign key',
    references: { 
        table: EpOrigensInfo,
        field: 'COD'
    }
  }, {
    fields: ['CODNFSAIDA'],
    type: 'foreign key',
    references: { 
        table: EpNfsSaida,
        field: 'COD'
    }
  },{
    fields: ['CODPROD'],
    type: 'foreign key',
    references: { 
        table: EpProdutos,
        field: 'COD'
    }
  },{
    fields: ['CODFORNEC'],
    type: 'foreign key',
    references: { 
        table: EpFornecedores,
        field: 'COD'
    }
  },{
    fields: ['CODEPTO'],
    type: 'foreign key',
    references: { 
        table: EpDepartamentosProd,
        field: 'COD'
    }
  }]; 
};


module.exports = {EpMovimentacoesSaida}