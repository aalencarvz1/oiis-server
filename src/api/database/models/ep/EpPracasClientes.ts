'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpOrigensInfo  from "./EpOrigensInfo.js";
import  EpRotasClientes  from "./EpRotasClientes.js";
import Utils from "../../../controllers/utils/Utils.js";

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
        fields: ['CODROTA'],
        type: 'foreign key',
        references: { 
            table: EpRotasClientes,
            field: 'COD'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

 
};