'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcDepto from './PcDepto.js';
import Utils from '../../../controllers/utils/Utils.js';

/**
 * class model
 */
export default class PcSecao extends BaseWinthorTableModel {

  //table fields
  declare CODSEC: string;
  declare DESCRICAO: string;
  declare CODEPTO: string;
  declare QTMAX?: string;
  declare TIPO?: string;
  declare CODSECNESTLE?: string;
  declare LINHA?: string;
  declare DTEXCLUSAO?: Date;
  declare IDINTEGRACAOCIASHOP?: string;
  declare ENVIAECOMMERCE?: string;
  declare DTULTALTER?: Date;
  declare DTCADASTRO?: Date;

  static id = 30202;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
    CODSEC: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false,
      defaultValue: null
    },
    DESCRICAO: {
      type: DataTypes.STRING(40),
      allowNull: false		
    },
    CODEPTO: {
      type: DataTypes.STRING(22),
      allowNull: false,
      defaultValue: null
    },
    QTMAX: {
      type: DataTypes.STRING(22)		
    },
    TIPO: {
      type: DataTypes.STRING(1),
      defaultValue: 'A'	
    },
    CODSECNESTLE: {
      type: DataTypes.STRING(22)		
    },
    LINHA: {
      type: DataTypes.STRING(20)		
    },
    DTEXCLUSAO: {
      type: DataTypes.DATE		
    },
    IDINTEGRACAOCIASHOP: {
      type: DataTypes.STRING(250)		
    },
    ENVIAECOMMERCE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    DTULTALTER: {
      type: DataTypes.DATE		
    },
    DTCADASTRO: {
      type: DataTypes.DATE		
    },
  };

  static foreignsKeys : any[] = [];

  /**
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
    let result : any = this.foreignsKeys;
    if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
      result = super.getForeignKeys();
      result.push({
        fields: ['CODEPTO'],
        type: 'foreign key',
        references: { 
          table: PcDepto,
          field: 'CODEPTO'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    
};