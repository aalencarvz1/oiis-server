'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcDepto extends BaseWinthorTableModel {

  //table fields
  declare CODEPTO:number;
  declare DESCRICAO: string;


  static id = 30204;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      CODEPTO:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      DESCRICAO: {
        type: DataTypes.STRING(2000)
      }
  };
 
};