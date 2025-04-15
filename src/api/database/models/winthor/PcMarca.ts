'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcMarca extends BaseWinthorTableModel {

  //table fields
  declare CODMARCA: string;
  declare MARCA?: string;
  declare ATIVO?: string;
  declare CODADWORDS?: string;
  declare DESCRICAOECOMMERCE?: string;
  declare CODCAMPLOMADEE?: string;
  declare TITULO?: string;
  declare DTULTALTER?: Date;
  declare DTCADASTRO?: Date;
  declare CODCOMPRADOR?: string;
  declare DTALTERC5?: string;

  static id = 30203;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
    CODMARCA: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    MARCA: {
      type: DataTypes.STRING(40)		
    },
    ATIVO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    CODADWORDS: {
      type: DataTypes.STRING(200)		
    },
    DESCRICAOECOMMERCE: {
      type: DataTypes.STRING(400)		
    },
    CODCAMPLOMADEE: {
      type: DataTypes.STRING(200)		
    },
    TITULO: {
      type: DataTypes.STRING(200)		
    },
    DTULTALTER: {
      type: DataTypes.DATE		
    },
    DTCADASTRO: {
      type: DataTypes.DATE		
    },
    CODCOMPRADOR: {
      type: DataTypes.STRING(22)		
    },
    DTALTERC5: {
      type: DataTypes.STRING(11)		
    } 
  }

  static foreignsKeys : any[] = [];
};