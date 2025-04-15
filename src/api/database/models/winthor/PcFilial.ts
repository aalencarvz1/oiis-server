'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcClient from "./PcClient.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class PcFilial extends BaseWinthorTableModel {

  //table fields
  declare CODIGO: number;
  declare CIDADE: string;
  declare CGC: string;
  declare RAZAOSOCIAL: string;
  declare FANTASIA: string;
  declare UF: string;
  declare CODCLI: number;



  static id = 30011;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
      CODIGO:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CIDADE: {
        type: DataTypes.STRING(2000)
      },
      CGC: {
        type: DataTypes.STRING(2000)
      },
      RAZAOSOCIAL: {
        type: DataTypes.STRING(2000)
      },
      FANTASIA: {
        type: DataTypes.STRING(2000)
      },
      UF: {
        type: DataTypes.STRING(2000)
      },
      CODCLI: {
        type: DataTypes.BIGINT.UNSIGNED
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
        fields: ['CODCLI'],
        type: 'foreign key',
        references: { 
            table: PcClient,
            field: 'CODCLI'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    
 
};