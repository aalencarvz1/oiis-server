'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcClient from './PcClient.js';
import Utils from '../../../controllers/utils/Utils.js';
import PcFilial from './PcFilial.js';

/**
 * class model
 */
export default class PcRegiao extends BaseWinthorTableModel {

  //table fields
  declare NUMREGIAO: string;
  declare REGIAO: string;
  declare PERFRETE: string;
  declare UF?: string;
  declare VLFRETEKG?: string;
  declare CODFILIAL?: string;
  declare SEGMENTO?: string;
  declare PERFRETETERCEIROS?: string;
  declare PERFRETEESPECIAL?: string;
  declare STATUS?: string;
  declare TAREPF?: string;
  declare REGIAOZFM?: string;
  declare PERFRETECONHEC?: string;
  declare VLMINFATBK?: string;
  declare VLMINFATCH?: string;
  declare EXPORTAFV?: string;
  declare NUMTABELA?: string;
  declare CODESTABELECIMENTO?: string;
  declare ATUALIZAF11?: string;
  declare OBS?: string;
  declare VLFRETEKGPADRAO?: string;
  declare VLFRETEKGVENDA?: string;
  declare VLMINVENDA?: string;
  declare VLTXENT?: string;
  declare USAECOMMERCE?: string;
  declare DTALTERC5?: string;
  declare DTALTERACAO?: string;
  declare DTCRIACAO?: string;

  static id = 30015;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
    NUMREGIAO: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false,
      defaultValue: null 	
    },
    REGIAO: {
      type: DataTypes.STRING(40),
      allowNull: false		
    },
    PERFRETE: {
      type: DataTypes.STRING(22),
      allowNull: false		
    },
    UF: {
      type: DataTypes.STRING(2)		
    },
    VLFRETEKG: {
      type: DataTypes.STRING(22),
      defaultValue: 	0	
    },
    CODFILIAL: {
      type: DataTypes.STRING(2)		
    },
    SEGMENTO: {
      type: DataTypes.STRING(1)		
    },
    PERFRETETERCEIROS: {
      type: DataTypes.STRING(22)		
    },
    PERFRETEESPECIAL: {
      type: DataTypes.STRING(22)		
    },
    STATUS: {
      type: DataTypes.STRING(1),
      defaultValue: 	'A'	
    },
    TAREPF: {
      type: DataTypes.STRING(1),
      defaultValue: 	'S'	
    },
    REGIAOZFM: {
      type: DataTypes.STRING(1),
      defaultValue: 	'N'	
    },
    PERFRETECONHEC: {
      type: DataTypes.STRING(22)		
    },
    VLMINFATBK: {
      type: DataTypes.STRING(22)		
    },
    VLMINFATCH: {
      type: DataTypes.STRING(22)		
    },
    EXPORTAFV: {
      type: DataTypes.STRING(22)		
    },
    NUMTABELA: {
      type: DataTypes.STRING(20)		
    },
    CODESTABELECIMENTO: {
      type: DataTypes.STRING(3)		
    },
    ATUALIZAF11: {
      type: DataTypes.STRING(1),
      defaultValue: 	'S'	
    },
    OBS: {
      type: DataTypes.STRING(60)		
    },
    VLFRETEKGPADRAO: {
      type: DataTypes.STRING(22),
      defaultValue: 	0	
    },
    VLFRETEKGVENDA: {
      type: DataTypes.STRING(22)		
    },
    VLMINVENDA: {
      type: DataTypes.STRING(22)		
    },
    VLTXENT: {
      type: DataTypes.STRING(22)		
    },
    USAECOMMERCE: {
      type: DataTypes.STRING(1),
      defaultValue: 	'N'	
    },
    DTALTERC5: {
      type: DataTypes.STRING(11)		
    },
    DTALTERACAO: {
      type: DataTypes.STRING(11)		
    },
    DTCRIACAO: {
      type: DataTypes.STRING(11)		
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
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    
 
};