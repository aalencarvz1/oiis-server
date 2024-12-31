'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcCidade extends BaseWinthorTableModel {

  //table fields
  declare CODCIDADE: number;
  declare UF: string;
  declare CODIBGE: number;
  declare NOMECIDADE: string;
  declare POPULACAO: number;
  declare LATITUDE: number;
  declare LONGITUDE: number;



  static id = 30007;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODCIDADE:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      UF:{
        type: DataTypes.STRING(3),
      },
      CODIBGE:{
        type: DataTypes.INTEGER,
      },
      NOMECIDADE: {
        type: DataTypes.STRING(2000)
      },
      POPULACAO:{
        type: DataTypes.INTEGER,
      },
      LATITUDE:{
        type: DataTypes.DECIMAL(18,10)
      },
      LONGITUDE:{
        type: DataTypes.DECIMAL(18,10)
      }
  };

  static foreignsKeys = [{
    fields: ['UF'],
    type: 'foreign key',
    references: { 
        table: 'PCESTADO',
        field: 'UF'
    }
  }];
 
};