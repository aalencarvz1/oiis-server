'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpOrigensInfo  from "./EpOrigensInfo.js";
import Utils from "../../../controllers/utils/Utils.js";

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

	static foreignsKeys : any[] = [];

  /**
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
	//Utils.logi(this.name,'getForeignKeys');
	let result : any = this.foreignsKeys;
	if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
	  result = super.getForeignKeys();
	  result.push({
		fields: ['CODORIGEMINFO'],
		type: 'foreign key',
		references: { 
			table: EpOrigensInfo,
			field: 'COD'
		}
	});
	}
	//Utils.logf(this.name,'getForeignKeys');
	return result;
  }

 
};