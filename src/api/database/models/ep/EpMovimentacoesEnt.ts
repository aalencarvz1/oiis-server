'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpProdutos  from "./EpProdutos.js";
import  EpNfsEnt  from "./EpNfsEnt.js";
import  EpOrigensInfo  from "./EpOrigensInfo.js";
import  EpFornecedores  from "./EpFornecedores.js";
import  EpDepartamentosProd  from "./EpDeparamentosProd.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class EpMovimentacoesEnt extends BaseEpTableModel {
	
	//table fields
	declare COD: number;
	declare CODORIGEMINFO: number;
	declare NUMTRANSITEMORIGEM: number;
	declare CODNFENT: number;
	declare CODPROD: number;
	declare CODFORNEC: number;
	declare CODOPER: number;
	declare CODEPTO: number;
	declare CODUNIDADE: number;
	declare QTENT: number;
	declare QTDEVOLVIDA: number;
	declare VLUN: number;
	declare PESOLIQUN: number;
	declare PESOBRUTOUN: number;
	declare DTMOVIMENTACAO: Date;
	declare DTCANCEL: Date;
	declare CODSTATUSREG: number;
	declare CODMOTIVO: number;
	declare NUMNFSAIDA: number;
	declare CODNFSAIDA: number;
	declare NUMTRANASSAIDAORIGEM: number;



	static id = 40610;
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
		NUMTRANSITEMORIGEM:{
			type: DataTypes.INTEGER
		},
		CODNFENT:{
			type: DataTypes.INTEGER
		},
		CODPROD:{
			type: DataTypes.INTEGER
		},
		CODFORNEC:{
			type: DataTypes.INTEGER
		},
		CODOPER:{
			type: DataTypes.INTEGER
		},
		CODEPTO:{
			type: DataTypes.INTEGER
		},
		CODUNIDADE:{
			type: DataTypes.INTEGER
		},
		QTENT:{
			type: DataTypes.DECIMAL(38,10)
		},
		QTDEVOLVIDA:{
			type: DataTypes.DECIMAL(38,10)
		},
		VLUN:{
			type: DataTypes.DECIMAL(38,10)
		},
		PESOLIQUN:{
			type: DataTypes.DECIMAL(38,10)
		},
		PESOBRUTOUN:{
			type: DataTypes.DECIMAL(38,10)
		},
		DTMOVIMENTACAO:{
			type: DataTypes.DATE
		},
		DTCANCEL:{
			type: DataTypes.DATE
		},
		CODSTATUSREG:{
			type: DataTypes.INTEGER
		},
		CODMOTIVO:{
			type: DataTypes.INTEGER
		},
		NUMNFSAIDA:{
			type: DataTypes.INTEGER
		},
		CODNFSAIDA:{
			type: DataTypes.INTEGER
		},
		NUMTRANASSAIDAORIGEM:{
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
				fields: ['CODNFENT'],
				type: 'foreign key',
				references: { 
					table: EpNfsEnt,
					field: 'COD'
				}
			});
			result.push({
				fields: ['CODPROD'],
				type: 'foreign key',
				references: { 
					table: EpProdutos,
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