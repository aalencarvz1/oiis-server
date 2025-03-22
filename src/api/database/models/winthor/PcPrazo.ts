'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcPrazo extends BaseWinthorTableModel {

  //table fields
  declare CODPRAZOENT: string;
  declare DESCRICAO?: string;
  declare NUMDIAS?: string;

  static id = 30197;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    CODPRAZOENT: {
      type: DataTypes.STRING(4),
      primaryKey: true,
      allowNull: false		
    },
    DESCRICAO: {
      type: DataTypes.STRING(40)		
    },
    NUMDIAS: {
      type: DataTypes.STRING(22)		
    },
  };
 

};