'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpVendedores } = require("./EpVendedores");
const { EpClientes } = require("./EpClientes");
const { EpOrigensInfo } = require("./EpOrigensInfo");
const { EpFiliais } = require("./EpFiliais");
const { EpFornecedores } = require("./EpFornecedores");

/**
 * class model
 */
class EpNfsEnt extends BaseEpTableModel {
  static ID = 40600;
  static model = null;


  static fields = {      
    COD:{
			type: DataTypes.INTEGER,
      primaryKey:true
		},
		CODORIGEMINFO:{
			type: DataTypes.INTEGER
		},
		CODSUP:{
			type: DataTypes.INTEGER
		},
		CODNFSAIDAREF:{
			type: DataTypes.INTEGER
		},
		NUMTRANSENTORIGEM:{
			type: DataTypes.INTEGER
		},
		NUMNOTAORIGEM:{
			type: DataTypes.INTEGER
		},
		CODESPECIENF:{
			type: DataTypes.INTEGER
		},
		CODFILIAL:{
			type: DataTypes.INTEGER
		},
		CODCOMPRADOR:{
			type: DataTypes.INTEGER
		},
		CODFORNECEDOR:{
			type: DataTypes.INTEGER
		},
		CODADMINISTRADOR:{
			type: DataTypes.INTEGER
		},
		CODVENDEDOR:{
			type: DataTypes.INTEGER
		},
		CODCLIENTE:{
			type: DataTypes.INTEGER
		},
		DTEMISSAO:{
			type: DataTypes.DATE
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
		CHAVENFE:{
			type: DataTypes.STRING(100)
		},
		NRCTE:{
			type: DataTypes.INTEGER
		},
		NRCARGA:{
			type: DataTypes.INTEGER
		},
		PLACA:{
			type: DataTypes.STRING(12)
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
    fields: ['CODFILIAL'],
    type: 'foreign key',
    references: { 
        table: EpFiliais,
        field: 'COD'
    }
  }, {
    fields: ['CODVENDEDOR'],
    type: 'foreign key',
    references: { 
        table: EpVendedores,
        field: 'COD'
    }
  },{
    fields: ['CODCLIENTE'],
    type: 'foreign key',
    references: { 
        table: EpClientes,
        field: 'COD'
    }
  },{
    fields: ['CODFORNECEDOR'],
    type: 'foreign key',
    references: { 
        table: EpFornecedores,
        field: 'COD'
    }
  }]; 
};


module.exports = {EpNfsEnt}