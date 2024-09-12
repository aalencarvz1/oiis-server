'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpOrigensInfo } = require("./EpOrigensInfo");
const { EpFornecedores } = require("./EpFornecedores");
const { EpDepartamentosProd } = require("./EpDeparamentosProd");

/**
 * class model
 */
class EpProdutos extends BaseEpTableModel {
  static id = 40200;
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
		CODFORNEC:{
			type: DataTypes.INTEGER
		},
		CODEPTO:{
			type: DataTypes.INTEGER
		},
		CODUNIDADE:{
			type: DataTypes.INTEGER
		},
		DESCRICAO:{
			type: DataTypes.TEXT
		},
		PESOLIQUN:{
			type: DataTypes.DECIMAL(38,10)
		},
		PESOBRUTOUN:{
			type: DataTypes.DECIMAL(38,10)
		},
		CODSTATUSREG:{
			type: DataTypes.INTEGER
		},
		CODNEGOCIOORIGEM:{
			type: DataTypes.INTEGER
		},
		CODCATEGORIAORIGEM:{
			type: DataTypes.INTEGER
		},
		DTEXCLUSAO:{
			type: DataTypes.DATE
		},
		ATIVO:{
			type: DataTypes.INTEGER
		},
		TEMPERARMAZPADRAO:{
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


module.exports = {EpProdutos}