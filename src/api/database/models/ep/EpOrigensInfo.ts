'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';

/**
 * class model
 */
export default class EpOrigensInfo extends BaseEpTableModel {

	//table fields
	declare COD: number;
	declare NOME: string;
	declare CODSTATUSREG: number;


	static id = 40002;
	static tableName = this.name.toUpperCase();
	static model = null;


	static fields = {      
		COD:{
			type: DataTypes.INTEGER,
			primaryKey:true
		},
		NOME:{
			type: DataTypes.STRING(1000)
		},
		CODSTATUSREG:{
			type: DataTypes.INTEGER
		},
	};

	static foreignsKeys = []; 
};