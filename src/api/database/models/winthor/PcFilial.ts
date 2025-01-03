'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcClient from "./PcClient.js";

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



  static id = 30010;
  static tableName = this.name.toUpperCase();
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

  static foreignsKeys = [{
    fields: ['CODCLI'],
    type: 'foreign key',
    references: { 
        table: PcClient,
        field: 'CODCLI'
    }
  }];
 
};