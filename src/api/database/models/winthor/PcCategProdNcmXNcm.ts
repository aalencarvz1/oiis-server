'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcCategProdNcm from './PcCategProdNcm.js';

/**
 * class model
 */
export default class PcCategProdNcmXNcm extends BaseWinthorTableModel {

  //table fields
  declare ID: string;
  declare CAPITULO: string;
  declare POSICAO?: string;
  declare SUBPOSICAO?: string;
  declare ITEM?: string;
  declare SUBITEM?: string;
  declare EXCESSAO?: string;
  declare CATEGPRODNCM_ID: string;

  static id = 30226;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    ID: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    CAPITULO: {
      type: DataTypes.STRING(22),
      allowNull: false		
    },
    POSICAO: {
      type: DataTypes.STRING(22)		
    },
    SUBPOSICAO: {
      type: DataTypes.STRING(22)		
    },
    ITEM: {
      type: DataTypes.STRING(22)		
    },
    SUBITEM: {
      type: DataTypes.STRING(22)		
    },
    EXCESSAO: {
      type: DataTypes.STRING(22)		
    },
    CATEGPRODNCM_ID: {
      type: DataTypes.STRING(22),
      allowNull: false		
    },
  };

  static foreignsKeys = [{
    fields: ['CATEGPRODNCM_ID'],
    type: 'foreign key',
    references: { 
      table: PcCategProdNcm,
      field: 'ID'
    }
  }];
};