'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcDicionarioItem from './PcDicionarioItem.js';
import Utils from '../../../controllers/utils/Utils.js';

/**
 * class model
 */
export default class PcDicionarioItemRot extends BaseWinthorTableModel {

  //table fields
  declare CODROTINA: number;
  declare NOMECAMPO: string;
  declare NOMEOBJETO: string;
  declare EDITAVEL?: string;
  declare OBRIGATORIO?: string;
  declare ORDEMCAD?: number;
  declare ORDEMPSQ?: number;
  declare PSQAUXILIAR?: string;
  declare PSQCAMPO?: string;
  declare PSQFILTRO?: string;
  declare PSQRETORNODESCRICAO?: string;
  declare PSQOBJETO?: string;
  declare SECAO?: string;
  declare VALORDEFAULT?: string;
  declare VISIVEL?: string;
  declare CODCONTROLE_EDITAVEL?: number;
  declare USARNAPESQUISA?: string;
  declare EXIBIRRESPESQ?: string;
  declare CODROTINACAD?: number;
  declare GERALOG?: string;
  declare PSQRETORNOCODIGO?: string;
  declare EXECUTAACAO?: number;
  declare DTCADASTRO?: Date;
  declare PSQFILTRO131?: string;
  declare UTILIZACADASTRODINAMICO?: string;


  static id = 30003;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
    CODROTINA: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false		
    },
    NOMECAMPO: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
      defaultValue: ''	
    },
    NOMEOBJETO: {
      type: DataTypes.STRING(100),
      primaryKey: true,
      allowNull: false,
      defaultValue: ''	
    },
    EDITAVEL: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    OBRIGATORIO: {
      type: DataTypes.STRING(100),
      defaultValue: 'N'	
    },
    ORDEMCAD: {
      type: DataTypes.INTEGER,
      defaultValue: 0	
    },
    ORDEMPSQ: {
      type: DataTypes.INTEGER,
      defaultValue: 0	
    },
    PSQAUXILIAR: {
      type: DataTypes.STRING(100)		
    },
    PSQCAMPO: {
      type: DataTypes.STRING(200)		
    },
    PSQFILTRO: {
      type: DataTypes.STRING(200)		
    },
    PSQRETORNODESCRICAO: {
      type: DataTypes.STRING(200)		
    },
    PSQOBJETO: {
      type: DataTypes.STRING(100)		
    },
    SECAO: {
      type: DataTypes.STRING(200)		
    },
    VALORDEFAULT: {
      type: DataTypes.STRING(30)		
    },
    VISIVEL: {
      type: DataTypes.STRING(100),
      defaultValue: 'S'	
    },
    CODCONTROLE_EDITAVEL: {
      type: DataTypes.INTEGER		
    },
    USARNAPESQUISA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    EXIBIRRESPESQ: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODROTINACAD: {
      type: DataTypes.INTEGER		
    },
    GERALOG: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PSQRETORNOCODIGO: {
      type: DataTypes.STRING(200)		
    },
    EXECUTAACAO: {
      type: DataTypes.INTEGER,
      defaultValue: 0	
    },
    DTCADASTRO: {
      type: DataTypes.DATE,
      defaultValue: 'SYSDATE'
    },
    PSQFILTRO131: {
      type: DataTypes.STRING(500)		
    },
    UTILIZACADASTRODINAMICO: {
      type: DataTypes.STRING(1)		
    },
  }

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
        fields: ['NOMEOBJETO'],
        type: 'foreign key',
        references: { 
            table: PcDicionarioItem,
            field: 'NOMEOBJETO'
        }
      });
      result.push({
        fields: ['NOMECAMPO'],
        type: 'foreign key',
        references: { 
            table: PcDicionarioItem,
            field: 'NOMECAMPO'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    
};