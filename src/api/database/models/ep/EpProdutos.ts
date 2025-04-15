'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpOrigensInfo  from "./EpOrigensInfo.js";
import  EpFornecedores  from "./EpFornecedores.js";
import  EpDepartamentosProd  from "./EpDeparamentosProd.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class EpProdutos extends BaseEpTableModel {

	//table fields
	declare COD: number;
	declare CODORIGEMINFO: number;
	declare CODFORNEC: number;
	declare CODEPTO: number;
	declare CODUNIDADE: number;
	declare DESCRICAO: string;
	declare PESOLIQUN: number;
	declare PESOBRUTOUN: number;
	declare CODSTATUSREG: number;
	declare CODNEGOCIOORIGEM: number;
	declare CODCATEGORIAORIGEM: number;
	declare DTEXCLUSAO: Date;
	declare ATIVO: number;
	declare TEMPERARMAZPADRAO: number;


	static id = 40200;
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
		CODFORNEC:{
			type: DataTypes.INTEGER
		},
		CODEPTO:{
			type: DataTypes.INTEGER
		},
		CODUNIDADE:{
			type: DataTypes.INTEGER
		},
		DESCRICAO:{
			type: DataTypes.TEXT
		},
		PESOLIQUN:{
			type: DataTypes.DECIMAL(38,10)
		},
		PESOBRUTOUN:{
			type: DataTypes.DECIMAL(38,10)
		},
		CODSTATUSREG:{
			type: DataTypes.INTEGER
		},
		CODNEGOCIOORIGEM:{
			type: DataTypes.INTEGER
		},
		CODCATEGORIAORIGEM:{
			type: DataTypes.INTEGER
		},
		DTEXCLUSAO:{
			type: DataTypes.DATE
		},
		ATIVO:{
			type: DataTypes.INTEGER
		},
		TEMPERARMAZPADRAO:{
			type: DataTypes.INTEGER
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
		result.push({
			fields: ['CODFORNEC'],
			type: 'foreign key',
			references: { 
				table: EpFornecedores,
				field: 'COD'
			}
		});
		result.push({
			fields: ['CODEPTO'],
			type: 'foreign key',
			references: { 
				table: EpDepartamentosProd,
				field: 'COD'
			}
		});
	}
	//Utils.logf(this.name,'getForeignKeys');
	return result;
  }


};