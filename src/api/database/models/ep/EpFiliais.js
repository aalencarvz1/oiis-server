'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpOrigensInfo } = require("./EpOrigensInfo");
const { EpPessoas } = require("./EpPessoas");

/**
 * class model
 */
class EpFiliais extends BaseEpTableModel {
  static ID = 40012;
  static model = null;


  static fields = {      
    COD:{
			type: DataTypes.INTEGER
		},
		CODORIGEMINFO:{
			type: DataTypes.INTEGER
		},
		CODPESSOA:{
			type: DataTypes.INTEGER
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
    fields: ['CODPESSOA'],
    type: 'foreign key',
    references: { 
        table: EpPessoas,
        field: 'COD'
    }
  }]; 
};


module.exports = {EpFiliais}