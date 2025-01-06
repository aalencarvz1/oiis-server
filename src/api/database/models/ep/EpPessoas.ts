'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpOrigensInfo  from "./EpOrigensInfo.js";

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

  static foreignsKeys = [{
    fields: ['CODORIGEMINFO'],
    type: 'foreign key',
    references: { 
        table: EpOrigensInfo,
        field: 'COD'
    }
  }];
 
};