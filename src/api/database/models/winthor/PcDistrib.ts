'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcDistrib extends BaseWinthorTableModel {

  //table fields
  declare CODDISTRIB: string;
  declare DESCRICAO?: string;
  declare TIPOMAPASEQ?: string;
  declare CODDISTRIBDEC?: string;


  static id = 30196;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    CODDISTRIB: {
      type: DataTypes.STRING(4),
      primaryKey: true,
      allowNull: false		
    },
    DESCRICAO: {
      type: DataTypes.STRING(40)		
    },
    TIPOMAPASEQ: {
      type: DataTypes.STRING(1)		
    },
    CODDISTRIBDEC: {
      type: DataTypes.STRING(10)		
    },
  };
 

};