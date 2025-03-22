'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcFilial from './PcFilial.js';

/**
 * class model
 */
export default class PcLinhaProd extends BaseWinthorTableModel {

  //table fields
  declare CODLINHA: string;
  declare DESCRICAO?: string;
  declare CODFILIAL?: string;
  declare NUMDIASTRABSEMANA?: string;
  declare NUMTURNODIA?: string;
  declare HORASPORTURNO?: string;
  declare NUMPESSOASTURNO?: string;
  declare CODLINHAPROD?: string;
  declare PRAZOMAXIMO?: string;
  declare OBS?: string;

  static id = 30199;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    CODLINHA: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    DESCRICAO: {
      type: DataTypes.STRING(40)		
    },
    CODFILIAL: {
      type: DataTypes.STRING(2)		
    },
    NUMDIASTRABSEMANA: {
      type: DataTypes.STRING(22)		
    },
    NUMTURNODIA: {
      type: DataTypes.STRING(22)		
    },
    HORASPORTURNO: {
      type: DataTypes.STRING(22)		
    },
    NUMPESSOASTURNO: {
      type: DataTypes.STRING(22)		
    },
    CODLINHAPROD: {
      type: DataTypes.STRING(22)		
    },
    PRAZOMAXIMO: {
      type: DataTypes.STRING(22)		
    },
    OBS: {
      type: DataTypes.STRING(100)		
    },
  };
 

  static foreignsKeys = [{
    fields: ['CODFILIAL'],
    type: 'foreign key',
    references: { 
        table: PcFilial,
        field: 'CODIGO'
    }
  },{
    fields: ['CODLINHAPROD'],
    type: 'foreign key',
    references: { 
        table: PcLinhaProd,
        field: 'CODLINHAPROD'
    }
  }];
};