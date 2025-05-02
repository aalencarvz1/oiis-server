'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import Utils from '../../../controllers/utils/Utils.js';

/**
 * class model
 */
export default class PcCodFabrica extends BaseWinthorTableModel {

  //table fields
  declare CODPROD: string;
  declare CODFORNEC: string;
  declare CODFAB: string;
  declare TIPOFATOR?: string;
  declare FATOR?: string;


  static id = 30209;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
    CODPROD: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    CODFORNEC: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    CODFAB: {
      type: DataTypes.STRING(30),
      primaryKey: true,
      allowNull: false		
    },
    TIPOFATOR: {
      type: DataTypes.STRING(1),
      defaultValue: 'M'	
    },
    FATOR: {
      type: DataTypes.STRING(22)		
    },
  };

  static foreignsKeys : any[] = [];
 
};