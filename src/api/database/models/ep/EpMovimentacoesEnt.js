'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpNfsSaida } = require("./EpNfsSaida");
const { EpProdutos } = require("./EpProdutos");
const { EpNfsEnt } = require("./EpNfsEnt");
const { EpOrigensInfo } = require("./EpOrigensInfo");
const { EpFornecedores } = require("./EpFornecedores");
const { EpDepartamentosProd } = require("./EpDeparamentosProd");

/**
 * class model
 */
class EpMovimentacoesEnt extends BaseEpTableModel {
  static id = 40610;
  static tableName = this.name.toUpperCase();
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
		CODNFENT:{
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
		QTENT:{
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
		CODMOTIVO:{
			type: DataTypes.INTEGER
		},
		NUMNFSAIDA:{
			type: DataTypes.INTEGER
		},
		CODNFSAIDA:{
			type: DataTypes.INTEGER
		},
		NUMTRANASSAIDAORIGEM:{
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
    fields: ['CODNFENT'],
    type: 'foreign key',
    references: { 
        table: EpNfsEnt,
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


module.exports = {EpMovimentacoesEnt}