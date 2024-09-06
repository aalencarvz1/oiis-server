'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpOrigensInfo } = require("./EpOrigensInfo");

/**
 * class model
 */
class EpDepartamentosProd extends BaseEpTableModel {
  static id = 40199;
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
		DESCRICAO:{
			type: DataTypes.TEXT
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
  }]; 
};


module.exports = {EpDepartamentosProd}