'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import  PcNfsaid  from "./PcNfsaid.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class PcDocEletronico extends BaseWinthorTableModel {

  //table fields
  declare NUMTRANSACAO: number;
  declare XMLNFE: string;


  static id = 30500;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {            
      NUMTRANSACAO: {
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      XMLNFE: {
        type: DataTypes.TEXT
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
        fields: ['NUMTRANSACAO'],
        type: 'foreign key',
        references: { 
            table: PcNfsaid,
            field: 'NUMTRANSVENDA'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    
 
};