'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcPais from "./PcPais.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class PcEstado extends BaseWinthorTableModel {

  //table fields
  declare UF: string;
  declare CODPAIS: number;
  declare CODIBGE: number;
  declare ESTADO: string;


  static id = 30101;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
      UF:{
        type: DataTypes.STRING(3),
        primaryKey:true
      },
      CODPAIS:{
        type: DataTypes.INTEGER,
      },
      CODIBGE:{
        type: DataTypes.INTEGER,
      },
      ESTADO: {
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
        fields: ['CODPAIS'],
        type: 'foreign key',
        references: { 
            table: PcPais,
            field: 'CODPAIS'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    
};