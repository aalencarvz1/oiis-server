'use strict';


import { DataTypes } from "sequelize";
import  BaseSjdTableModel  from "./BaseSjdTableModel.js";

/**
 * class model
 */
export default class XMLBroker extends BaseSjdTableModel {

	//table fields
	declare CHAVENFE: string;
	declare NUMNOTA: number;
	declare SERIE: string;
	declare DTEMISSAO: Date;
	declare SITUACAONFE: number;
	declare NATUREZAOP: string;
	declare CNPJEMITENTE: number;
	declare CNPJDESTINATARIO: number;
	declare CNPJTRANSPORTADOR: number;
	declare CNPJAUTORIZADO: number;
	declare XMLNFE: string;


	static id = 39200;
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
	static foreignsKeys : any[] = [];
 
};