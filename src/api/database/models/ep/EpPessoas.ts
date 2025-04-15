'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpOrigensInfo  from "./EpOrigensInfo.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class EpPessoas extends BaseEpTableModel {

  //table fields
  declare COD: number;
  declare CODORIGEMINFO: number;
  declare CODTIPODOCIDENTIFICADOR: number;
  declare CODDOCIDENTIFICADOR: string;
  declare NOMERAZAO: string;
  declare FANTASIA: string;


  static id = 40009;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    COD:{
      type: DataTypes.INTEGER,
      primaryKey:true
    },
    CODORIGEMINFO: {
      type: DataTypes.INTEGER,
    },
    CODTIPODOCIDENTIFICADOR: {
      type: DataTypes.INTEGER,
    },
    CODDOCIDENTIFICADOR: {
      type: DataTypes.STRING(2000)
    },
    NOMERAZAO: {
      type: DataTypes.STRING(2000)
    },
    FANTASIA: {
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
        fields: ['CODORIGEMINFO'],
        type: 'foreign key',
        references: { 
            table: EpOrigensInfo,
            field: 'COD'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }

 
};