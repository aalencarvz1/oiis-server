'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcCidade from "./PcCidade.js";
import PcEstado from "./PcEstado.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class PcBairro extends BaseWinthorTableModel {

  //table fields
  declare CODBAIRRO: number;
  declare CODCIDADE: number;
  declare UF: string;
  declare DESCRICAO: string;


  static id = 30010;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
      CODBAIRRO:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODCIDADE:{
        type: DataTypes.INTEGER
      },
      UF:{
        type: DataTypes.STRING(3),
      },
      DESCRICAO: {
        type: DataTypes.STRING(2000)
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
        fields: ['CODCIDADE'],
        type: 'foreign key',
        references: { 
            table: PcCidade,
            field: 'CODCIDADE'
        }
      });
      result.push({
        fields: ['UF'],
        type: 'foreign key',
        references: { 
            table: PcEstado,
            field: 'UF'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }
 
};