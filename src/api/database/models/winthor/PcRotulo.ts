'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcRotulo extends BaseWinthorTableModel {

  //table fields
  declare ID: string;
  declare VALORDEFAULT?: string;
  declare DTCADASTRO?: Date;
  declare CRIADOPELOCLIENTE?: string;



  static id = 30005;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    ID: {
      type: DataTypes.STRING(40),
      primaryKey: true,
      allowNull: false		
    },
    VALORDEFAULT: {
      type: DataTypes.STRING(15)		
    },
    DTCADASTRO: {
      type: DataTypes.DATE,
      defaultValue: 'SYSDATE'
    },
    CRIADOPELOCLIENTE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
  };
 
};