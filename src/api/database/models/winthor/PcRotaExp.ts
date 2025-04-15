'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcRotaExp extends BaseWinthorTableModel {

  //table fields
  declare CODROTA:string;
  declare DESCRICAO: string;


  static id = 30013;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
      CODROTA:{
        type: DataTypes.STRING,
        primaryKey:true
      },
      DESCRICAO: {
        type: DataTypes.STRING(2000)
      }
  };

  static foreignsKeys : any[] = [];
 
};