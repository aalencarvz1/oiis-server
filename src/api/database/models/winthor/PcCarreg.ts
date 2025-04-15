'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import  PcEmpr  from "./PcEmpr.js";
import  PcVeicul  from "./PcVeicul.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class PcCarreg extends BaseWinthorTableModel {

  //table fields
  declare NUMCAR: number;
  declare DTSAIDA: Date;
  declare CODMOTORISTA: number;
  declare CODVEICULO: number;
  declare TOTPESO: number;
  declare VLTOTAL: number;
  declare NUMNOTAS: number;
  declare NUMENT: number;
  declare DESTINO: string;
  declare DT_CANCEL: Date;


  static id = 30050;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {            
      NUMCAR:{
        type: DataTypes.INTEGER,
        primaryKey:true,
        allowNull:false,        
      },
      DTSAIDA:{
        type: DataTypes.DATE,
      },
      CODMOTORISTA:{
        type: DataTypes.INTEGER 
      },
      CODVEICULO:{
        type: DataTypes.INTEGER 
      },
      TOTPESO:{
        type: DataTypes.DECIMAL 
      },
      VLTOTAL:{
        type: DataTypes.DECIMAL 
      },
      NUMNOTAS:{
        type: DataTypes.INTEGER 
      },
      NUMENT:{
        type: DataTypes.INTEGER 
      },
      DESTINO:{
        type: DataTypes.STRING(512) 
      },
      DT_CANCEL:{
        type: DataTypes.DATE,
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
        fields: ['CODMOTORISTA'],
        type: 'foreign key',
        references: { 
            table: PcEmpr,
            field: 'MATRICULA'
        }
      });
      result.push({
        fields: ['CODVEICULO'],
        type: 'foreign key',
        references: { 
            table: PcVeicul,
            field: 'CODVEICULO'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

};