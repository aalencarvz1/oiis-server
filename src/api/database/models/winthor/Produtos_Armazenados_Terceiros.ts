'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import  PcFornec  from "./PcFornec.js";
import  PcProdut  from "./PcProdut.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class Produtos_Armazenados_Terceiros extends BaseWinthorTableModel {

  //table fields
  declare CGCTERCEIRO:  number;      
  declare CODFILIAL: number;
  declare CODPROD: number;
  declare QT: number;
  declare SOMAR_WINT: number;


  static id = 30700;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;
  static primaryKeysFieldsNames = [];


  static fields = {      
      CGCTERCEIRO: {
        type: DataTypes.INTEGER,
        primaryKey:true
      },      
      CODFILIAL:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODPROD:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      QT: {
        type: DataTypes.DECIMAL(32,10)
      },
      SOMAR_WINT: {
        type: DataTypes.INTEGER,
        defaultValue: 1
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
        fields: ['CGCTERCEIRO'],
        type: 'foreign key',
        references: { 
            table: PcFornec,
            field: 'CGC'
        }
      });
      result.push({
        fields: ['CODPROD'],
        type: 'foreign key',
        references: { 
            table: PcProdut,
            field: 'CODPROD'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    

  
};