'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseEpTableModel } = require('./BaseEpTableModel');
const { EpOrigensInfo } = require("./EpOrigensInfo");
const { EpRotasClientes } = require("./EpRotasClientes");

/**
 * class model
 */
class EpPracasClientes extends BaseEpTableModel {
  static id = 40017;
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
		CODROTA:{
			type: DataTypes.INTEGER
		},
		DESCRICAO:{
			type: DataTypes.TEXT
		},
		CODSTATUSREG:{
			type: DataTypes.INTEGER
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
    fields: ['CODROTA'],
    type: 'foreign key',
    references: { 
        table: EpRotasClientes,
        field: 'COD'
    }
  }];
 
};


module.exports = {EpPracasClientes}