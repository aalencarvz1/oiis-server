'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import  PcNfsaid  from "./PcNfsaid.js";

/**
 * class model
 */
export default class PcDocEletronico extends BaseWinthorTableModel {

  //table fields
  declare NUMTRANSACAO: number;
  declare XMLNFE: string;


  static id = 30500;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {            
      NUMTRANSACAO: {
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      XMLNFE: {
        type: DataTypes.TEXT
      }
  };

  static foreignsKeys = [{
    fields: ['NUMTRANSACAO'],
    type: 'foreign key',
    references: { 
        table: PcNfsaid,
        field: 'NUMTRANSVENDA'
    }
  }];
 
};