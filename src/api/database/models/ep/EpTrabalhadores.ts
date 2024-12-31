'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpPessoas  from "./EpPessoas.js";
import  EpOrigensInfo  from "./EpOrigensInfo.js";
import  EpFiliais  from "./EpFiliais.js";

/**
 * class model
 */
export default class EpTrabalhadores extends BaseEpTableModel {

  //table fields
  declare COD: number;
  declare CODORIGEMINFO: number;
  declare CODSUP: number;
  declare CODPESSOA: number;
  declare CODFILIAL: number;
  declare CODTIPOTRABALHADOR: number;


  static id = 40005;
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
    CODSUP: {
      type: DataTypes.INTEGER,
    },
    CODPESSOA: {
      type: DataTypes.INTEGER,
    },
    CODFILIAL: {
      type: DataTypes.INTEGER,
    },
    CODTIPOTRABALHADOR: {
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
    fields: ['CODSUP'],
    type: 'foreign key',
    references: { 
        table: EpTrabalhadores,
        field: 'COD'
    }
  },{
    fields: ['CODPESSOA'],
    type: 'foreign key',
    references: { 
        table: EpPessoas,
        field: 'COD'
    }
  },{
    fields: ['CODFILIAL'],
    type: 'foreign key',
    references: { 
        table: EpFiliais,
        field: 'COD'
    }
  }];
 
};