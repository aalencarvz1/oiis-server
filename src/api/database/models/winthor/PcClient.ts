'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import  PcCidade  from "./PcCidade.js";
import  PcBairro  from "./PcBairro.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class PcClient extends BaseWinthorTableModel {

  //table fields
  declare CODCLI: number;
  declare CODFILIALNF: number;
  declare CODUSUR1: number;
  declare CGCENT: string;
  declare CLIENTE: string;      
  declare FANTASIA: string;
  declare TIPOFJ: string;
  declare CODCIDADE:  number;
  declare CODBAIRROENT:  number;
  declare MUNICENT: string;
  declare BAIRROENT: string;
  declare ESTENT: string;
  declare ENDERENT: string;
  declare NUMEROENT: string;
  declare LATITUDE: number;
  declare LONGITUDE: number;
  declare DTEXCLUSAO: Date;


  static id = 30020;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
      CODCLI:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODFILIALNF: {
        type: DataTypes.INTEGER,
      },
      CODUSUR1:{
        type: DataTypes.INTEGER
      },
      CGCENT: {
        type: DataTypes.STRING(2000)
      },
      CLIENTE: {
        type: DataTypes.STRING(2000)
      },      
      FANTASIA: {
        type: DataTypes.STRING(2000)
      },
      TIPOFJ: {
        type: DataTypes.STRING(2)
      },
      CODCIDADE: {
        type: DataTypes.INTEGER
      },
      CODBAIRROENT: {
        type: DataTypes.INTEGER
      },
      MUNICENT: {
        type: DataTypes.STRING(2000)
      },
      BAIRROENT: {
        type: DataTypes.STRING(2000)
      },
      ESTENT: {
        type: DataTypes.STRING(2000)
      },
      ENDERENT: {
        type: DataTypes.STRING(2000)
      },
      NUMEROENT: {
        type: DataTypes.STRING(2000)
      },
      LATITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      LONGITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      DTEXCLUSAO: {
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
        fields: ['CODCIDADE'],
        type: 'foreign key',
        references: { 
            table: PcCidade,
            field: 'CODCIDADE'
        }
      });
      result.push({
        fields: ['CODBAIRROENT'],
        type: 'foreign key',
        references: { 
            table: PcBairro,
            field: 'CODBAIRRO'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }  
 
};