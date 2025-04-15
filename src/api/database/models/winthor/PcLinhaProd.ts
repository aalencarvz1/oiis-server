'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcFilial from './PcFilial.js';
import Utils from '../../../controllers/utils/Utils.js';

/**
 * class model
 */
export default class PcLinhaProd extends BaseWinthorTableModel {

  //table fields
  declare CODLINHA: string;
  declare DESCRICAO?: string;
  declare CODFILIAL?: string;
  declare NUMDIASTRABSEMANA?: string;
  declare NUMTURNODIA?: string;
  declare HORASPORTURNO?: string;
  declare NUMPESSOASTURNO?: string;
  declare CODLINHAPROD?: string;
  declare PRAZOMAXIMO?: string;
  declare OBS?: string;

  static id = 30199;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
    CODLINHA: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    DESCRICAO: {
      type: DataTypes.STRING(40)		
    },
    CODFILIAL: {
      type: DataTypes.STRING(2)		
    },
    NUMDIASTRABSEMANA: {
      type: DataTypes.STRING(22)		
    },
    NUMTURNODIA: {
      type: DataTypes.STRING(22)		
    },
    HORASPORTURNO: {
      type: DataTypes.STRING(22)		
    },
    NUMPESSOASTURNO: {
      type: DataTypes.STRING(22)		
    },
    CODLINHAPROD: {
      type: DataTypes.STRING(22)		
    },
    PRAZOMAXIMO: {
      type: DataTypes.STRING(22)		
    },
    OBS: {
      type: DataTypes.STRING(100)		
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
        fields: ['CODFILIAL'],
        type: 'foreign key',
        references: { 
            table: PcFilial,
            field: 'CODIGO'
        }
      });
      result.push({
        fields: ['CODLINHAPROD'],
        type: 'foreign key',
        references: { 
            table: PcLinhaProd,
            field: 'CODLINHAPROD'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    
};