'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseSjdTableModel } = require("./BaseSjdTableModel");

/**
 * class model
 */
class XMLBroker extends BaseSjdTableModel {
  static id = 40800;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {
	CHAVENFE:{
		type: DataTypes.STRING(100),
		primaryKey:true
	},
	NUMNOTA:{
		type: DataTypes.INTEGER
	},
	SERIE:{
		type: DataTypes.STRING(100)
	},
	DTEMISSAO:{
		type: DataTypes.DATE
	},
	SITUACAONFE:{
		type: DataTypes.INTEGER
	},
	NATUREZAOP:{
		type: DataTypes.STRING(1000)
	},
	CNPJEMITENTE:{
		type: DataTypes.INTEGER
	},
	CNPJDESTINATARIO:{
		type: DataTypes.INTEGER
	},
	CNPJTRANSPORTADOR:{
		type: DataTypes.INTEGER
	},
	CNPJAUTORIZADO:{
		type: DataTypes.INTEGER
	},
	XMLNFE:{
		type: DataTypes.TEXT
	}
  }    
  static foreignsKeys = [];
 
};


module.exports = {XMLBroker}