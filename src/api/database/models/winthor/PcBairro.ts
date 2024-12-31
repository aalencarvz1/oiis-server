'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcBairro extends BaseWinthorTableModel {

  //table fields
  declare CODBAIRRO: number;
  declare CODCIDADE: number;
  declare UF: string;
  declare DESCRICAO: string;


  static id = 30012;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODBAIRRO:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODCIDADE:{
        type: DataTypes.INTEGER
      },
      UF:{
        type: DataTypes.STRING(3),
      },
      DESCRICAO: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [{
    fields: ['CODCIDADE'],
    type: 'foreign key',
    references: { 
        table: 'PCCIDADE',
        field: 'CODCIDADE'
    }
  }, {
    fields: ['UF'],
    type: 'foreign key',
    references: { 
        table: 'PCESTADO',
        field: 'UF'
    }
  }];
 
};