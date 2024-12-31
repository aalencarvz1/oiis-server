'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpTrabalhadores  from "./EpTrabalhadores.js";
import  EpOrigensInfo  from "./EpOrigensInfo.js";

/**
 * class model
 */
export default class EpVendedores extends BaseEpTableModel {

  //table fields
  declare COD: number;
  declare CODORIGEMINFO: number;
  declare CODTRABALHADOR: number;
  declare CONTABILIZARVENDAS: number;


  static id = 40006;
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
    CODTRABALHADOR: {
      type: DataTypes.INTEGER,
    },
    CONTABILIZARVENDAS: {
      type: DataTypes.INTEGER,
    },
  };

  static foreignsKeys = [{
    fields: ['CODORIGEMINFO'],
    type: 'foreign key',
    references: { 
        table: EpOrigensInfo,
        field: 'COD'
    }
  }, {
    fields: ['CODTRABALHADOR'],
    type: 'foreign key',
    references: { 
        table: EpTrabalhadores,
        field: 'COD'
    }
  }]; 
};