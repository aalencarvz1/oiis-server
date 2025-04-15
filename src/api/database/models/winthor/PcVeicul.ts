'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcVeicul extends BaseWinthorTableModel {

  //table fields
  declare CODVEICULO: number;
  declare PLACA: string;


  static id = 30040;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
      CODVEICULO:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      PLACA: {
        type: DataTypes.STRING(50)
      }
  };

  static foreignsKeys : any[] = [];
 
};