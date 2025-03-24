'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcSecao from './PcSecao.js';

/**
 * class model
 */
export default class PcCategoria extends BaseWinthorTableModel {

  //table fields
  declare CODSEC: string;
  declare CODCATEGORIA: string;
  declare CATEGORIA?: string;
  declare IDINTEGRACAOCIASHOP?: string;
  declare ENVIAECOMMERCE?: string;
  declare DTULTALTER?: Date;
  declare DTCADASTRO?: Date;

  static id = 30204;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    CODSEC: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    CODCATEGORIA: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    CATEGORIA: {
      type: DataTypes.STRING(40)		
    },
    IDINTEGRACAOCIASHOP: {
      type: DataTypes.STRING(250)		
    },
    ENVIAECOMMERCE: {
      type: DataTypes.STRING(1),
      defaultValue: 	'N'	
    },
    DTULTALTER: {
      type: DataTypes.DATE		
    },
    DTCADASTRO: {
      type: DataTypes.DATE		
    },
  }

  static foreignsKeys = [{
    fields: ['CODSEC'],
    type: 'foreign key',
    references: { 
      table: PcSecao,
      field: 'CODSEC'
    }
  }];
};