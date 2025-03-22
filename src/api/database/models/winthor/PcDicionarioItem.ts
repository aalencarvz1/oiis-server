'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import All_Tab_Columns from "./All_Tab_Columns.js";

/**
 * class model
 */
export default class PcDicionarioItem extends BaseWinthorTableModel {

  //table fields
  declare NOMEOBJETO: string;
  declare NOMECAMPO: string;
  declare AJUDA?: string;
  declare TITULO?: string;
  declare CODROTULO?: string;
  declare MASCARA?: string;
  declare NOMEEDITOR?: string;
  declare AUTOGERAR?: string;
  declare CRIADOPELOCLIENTE?: string;
  declare FORMULAAUTOGERACAO?: string;
  declare USUARIOCRIADOR?: string;
  declare CHARCASE?: string;
  declare PSQRETIRACARACTERES?: string;
  declare MULTIEDICAO?: string;
  declare DTCADASTRO?: Date;
  declare CRIPTOGRAFAR?: string;


  static id = 30002;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    NOMEOBJETO: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
      defaultValue: ''	
    },
    NOMECAMPO: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
      defaultValue: ''	
    },
    AJUDA: {
      type: DataTypes.STRING(255),
      defaultValue: 'Ajuda para o campo'	
    },
    TITULO: {
      type: DataTypes.STRING(150),
      defaultValue: ''	
    },
    CODROTULO: {
      type: DataTypes.STRING(40)		
    },
    MASCARA: {
      type: DataTypes.STRING(30),
      defaultValue: ''	
    },
    NOMEEDITOR: {
      type: DataTypes.STRING(30),
      defaultValue: ''	
    },
    AUTOGERAR: {
      type: DataTypes.STRING(150),
      defaultValue: 'N'	
    },
    CRIADOPELOCLIENTE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    FORMULAAUTOGERACAO: {
      type: DataTypes.STRING(200),
      defaultValue: ''	
    },
    USUARIOCRIADOR: {
      type: DataTypes.STRING(50)		
    },
    CHARCASE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PSQRETIRACARACTERES: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    MULTIEDICAO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    DTCADASTRO: {
      type: DataTypes.DATE,
      defaultValue: 'SYSDATE'
    },
    CRIPTOGRAFAR: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
  }


  static foreignsKeys = [{
    fields: ['NOMEOBJETO'],
    type: 'foreign key',
    references: { 
        table: All_Tab_Columns,
        field: 'TABLE_NAME'
    }
  },{
    fields: ['NOMECAMPO'],
    type: 'foreign key',
    references: { 
        table: All_Tab_Columns,
        field: 'COLUMN_NAME'
    }
  }];
 
};