'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpPessoas  from "./EpPessoas.js";
import  EpOrigensInfo  from "./EpOrigensInfo.js";
import  EpFiliais  from "./EpFiliais.js";
import  EpVendedores  from "./EpVendedores.js";
import  EpAtividadesClientes  from "./EpAtividadesClientes.js";
import  EpRedesClientes  from "./EpRedesClientes.js";
import  EpPracasClientes  from "./EpPracasClientes.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class EpClientes extends BaseEpTableModel {

  //table fields
  declare COD: number;
  declare CODORIGEMINFO: number;
  declare CODPESSOA: number;
  declare CODFILIAL: number;
  declare CODATIV: number;
  declare CODPRACA: number;
  declare CODREDE: number;
  declare CODADMINISTRADOR1: number;
  declare CODADMINISTRADOR2: number;
  declare CODVENDEDOR1: number;
  declare CODVENDEDOR2: number;
  declare CODSTATUSREG: number;
  declare DTEXCLUSAO: Date;
  declare DTULTCOMP: Date;


  static id = 40020;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    COD:{
			type: DataTypes.INTEGER,
      primeryKey:true
		},
		CODORIGEMINFO:{
			type: DataTypes.INTEGER
		},
		CODPESSOA:{
			type: DataTypes.INTEGER
		},
		CODFILIAL:{
			type: DataTypes.INTEGER
		},
		CODATIV:{
			type: DataTypes.INTEGER
		},
		CODPRACA:{
			type: DataTypes.INTEGER
		},
		CODREDE:{
			type: DataTypes.INTEGER
		},
		CODADMINISTRADOR1:{
			type: DataTypes.INTEGER
		},
		CODADMINISTRADOR2:{
			type: DataTypes.INTEGER
		},
		CODVENDEDOR1:{
			type: DataTypes.INTEGER
		},
		CODVENDEDOR2:{
			type: DataTypes.INTEGER
		},
		CODSTATUSREG:{
			type: DataTypes.INTEGER
		},
		DTEXCLUSAO:{
			type: DataTypes.DATE
		},
		DTULTCOMP:{
			type: DataTypes.DATE
		}
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
        fields: ['CODPESSOA'],
        type: 'foreign key',
        references: { 
            table: EpPessoas,
            field: 'COD'
        }
      });
      result.push({
        fields: ['CODFILIAL'],
        type: 'foreign key',
        references: { 
            table: EpFiliais,
            field: 'COD'
        }
      });
      result.push({
        fields: ['CODATIV'],
        type: 'foreign key',
        references: { 
            table: EpAtividadesClientes,
            field: 'COD'
        }
      });
      result.push({
        fields: ['CODREDE'],
        type: 'foreign key',
        references: { 
            table: EpRedesClientes,
            field: 'COD'
        }
      });
      result.push({
        fields: ['CODPRACA'],
        type: 'foreign key',
        references: { 
            table: EpPracasClientes,
            field: 'COD'
        }
      });
      result.push({
        fields: ['CODVENDEDOR1'],
        type: 'foreign key',
        references: { 
            table: EpVendedores,
            field: 'COD'
        }
      });
      result.push({
        fields: ['CODVENDEDOR2'],
        type: 'foreign key',
        references: { 
            table: EpVendedores,
            field: 'COD'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

 
};