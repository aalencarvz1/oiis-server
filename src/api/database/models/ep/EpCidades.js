'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpOrigensInfo } = require("./EpOrigensInfo");

/**
 * class model
 */
class EpCidades extends BaseEpTableModel {
  static id = 40008;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    COD:{
		type: DataTypes.INTEGER
	},
	CODORIGEMINFO:{
		type: DataTypes.INTEGER
	},
	NOME:{
		type: DataTypes.TEXT
	},
	UF:{
		type: DataTypes.STRING(2)
	},
	CODIBGE:{
		type: DataTypes.INTEGER
	},
	CODSTATUSREG:{
		type: DataTypes.INTEGER
	},
	POPULACAO:{
		type: DataTypes.DECIMAL(32,10)
	},
  };

  static foreignsKeys = [{
    fields: ['CODORIGEMINFO'],
    type: 'foreign key',
    references: { 
        table: EpOrigensInfo,
        field: 'COD'
    }
  }];
 
};


module.exports = {EpCidades}