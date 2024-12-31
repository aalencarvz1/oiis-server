'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpOrigensInfo  from "./EpOrigensInfo.js";
import  EpPessoas  from "./EpPessoas.js";

/**
 * class model
 */
export default class EpFiliais extends BaseEpTableModel {

  //table fields
  declare COD: number;
  declare CODORIGEMINFO: number;
  declare CODPESSOA: number;
  declare CODSTATUSREG: number;


  static id = 40012;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    COD:{
			type: DataTypes.INTEGER
		},
		CODORIGEMINFO:{
			type: DataTypes.INTEGER
		},
		CODPESSOA:{
			type: DataTypes.INTEGER
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
  }, {
    fields: ['CODPESSOA'],
    type: 'foreign key',
    references: { 
        table: EpPessoas,
        field: 'COD'
    }
  }]; 
};