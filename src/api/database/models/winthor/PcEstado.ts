'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcEstado extends BaseWinthorTableModel {

  //table fields
  declare UF: string;
  declare CODPAIS: number;
  declare CODIBGE: number;
  declare ESTADO: string;


  static id = 30101;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      UF:{
        type: DataTypes.STRING(3),
        primaryKey:true
      },
      CODPAIS:{
        type: DataTypes.INTEGER,
      },
      CODIBGE:{
        type: DataTypes.INTEGER,
      },
      ESTADO: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys = [{
    fields: ['CODPAIS'],
    type: 'foreign key',
    references: { 
        table: 'PCPAIS',
        field: 'CODPAIS'
    }
  }];
 
};