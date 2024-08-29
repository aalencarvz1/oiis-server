'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpPessoas } = require("./EpPessoas");
const { EpOrigensInfo } = require("./EpOrigensInfo");
const { EpFiliais } = require("./EpFiliais");
const { EpVendedores } = require("./EpVendedores");
const { EpAtividadesClientes } = require("./EpAtividadesClientes");
const { EpRedesClientes } = require("./EpRedesClientes");
const { EpPracasClientes } = require("./EpPracasClientes");

/**
 * class model
 */
class EpClientes extends BaseEpTableModel {
  static ID = 40020;
  static model = null;


  static fields = {      
    COD:{
			type: DataTypes.INTEGER,
      primeryKey:true
		},
		CODORIGEMINFO:{
			type: DataTypes.INTEGER
		},
		CODPESSOA:{
			type: DataTypes.INTEGER
		},
		CODFILIAL:{
			type: DataTypes.INTEGER
		},
		CODATIV:{
			type: DataTypes.INTEGER
		},
		CODPRACA:{
			type: DataTypes.INTEGER
		},
		CODREDE:{
			type: DataTypes.INTEGER
		},
		CODADMINISTRADOR1:{
			type: DataTypes.INTEGER
		},
		CODADMINISTRADOR2:{
			type: DataTypes.INTEGER
		},
		CODVENDEDOR1:{
			type: DataTypes.INTEGER
		},
		CODVENDEDOR2:{
			type: DataTypes.INTEGER
		},
		CODSTATUSREG:{
			type: DataTypes.INTEGER
		},
		DTEXCLUSAO:{
			type: DataTypes.DATE
		},
		DTULTCOMP:{
			type: DataTypes.DATE
		}
  };

  static foreignsKeys = [{
    fields: ['CODORIGEMINFO'],
    type: 'foreign key',
    references: { 
        table: EpOrigensInfo,
        field: 'COD'
    }
  },{
    fields: ['CODPESSOA'],
    type: 'foreign key',
    references: { 
        table: EpPessoas,
        field: 'COD'
    }
  },{
    fields: ['CODFILIAL'],
    type: 'foreign key',
    references: { 
        table: EpFiliais,
        field: 'COD'
    }
  },{
    fields: ['CODATIV'],
    type: 'foreign key',
    references: { 
        table: EpAtividadesClientes,
        field: 'COD'
    }
  },{
    fields: ['CODREDE'],
    type: 'foreign key',
    references: { 
        table: EpRedesClientes,
        field: 'COD'
    }
  },{
    fields: ['CODPRACA'],
    type: 'foreign key',
    references: { 
        table: EpPracasClientes,
        field: 'COD'
    }
  },{
    fields: ['CODVENDEDOR1'],
    type: 'foreign key',
    references: { 
        table: EpVendedores,
        field: 'COD'
    }
  },{
    fields: ['CODVENDEDOR2'],
    type: 'foreign key',
    references: { 
        table: EpVendedores,
        field: 'COD'
    }
  }];
 
};


module.exports = {EpClientes}