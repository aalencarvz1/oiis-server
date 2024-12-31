'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpOrigensInfo  from "./EpOrigensInfo.js";

/**
 * class model
 */
export default class EpCidades extends BaseEpTableModel {

	//table fields
	declare COD: number;
	declare CODORIGEMINFO: number;
	declare NOME: string;
	declare UF: string;
	declare CODIBGE: number;
	declare CODSTATUSREG: number;
	declare POPULACAO: number;


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