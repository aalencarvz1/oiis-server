'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpOrigensInfo  from "./EpOrigensInfo.js";
import  EpRotasClientes  from "./EpRotasClientes.js";

/**
 * class model
 */
export default class EpPracasClientes extends BaseEpTableModel {

  //table fields
  declare COD: number;
  declare CODORIGEMINFO: number;
  declare CODROTA: number;
  declare DESCRICAO: string;
  declare CODSTATUSREG: number;



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