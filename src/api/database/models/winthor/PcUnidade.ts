'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcDepto from './PcDepto.js';

/**
 * class model
 */
export default class PcUnidade extends BaseWinthorTableModel {

  //table fields
  declare UNIDADE: string;
  declare DESCRICAO?: string;
  declare UNIDADECTE?: string;
  declare DTEXCLUSAO?: Date;


  static id = 30198;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    UNIDADE: {
      type: DataTypes.STRING(6),
      primaryKey: true,
      allowNull: false		
    },
    DESCRICAO: {
      type: DataTypes.STRING(60)		
    },
    UNIDADECTE: {
      type: DataTypes.STRING(2)		
    },
    DTEXCLUSAO: {
      type: DataTypes.DATE		
    },
  };

};