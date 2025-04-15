'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import  PcNfsaid  from "./PcNfsaid.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class PcPixCobrancaDados extends BaseWinthorTableModel {

  //table fields
  declare NUMTRANSPAGDIGITAL: string;
  declare FILIAL: string;
  declare LINK: string;
  declare QRCODE: string;      
  declare VENCIMENTO: Date;
  declare DESCRICAO: string;
  declare NUMTRANSVENDA: string;
  declare PREST: string;
  declare JUROS: number;
  declare EMAIL_ENVIADO: string;
  declare STATUS: string;
  declare BAIXADOPCPRESTVIAAPI: number;


  static id = 30501;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {            
    NUMTRANSPAGDIGITAL:{
      type: DataTypes.STRING(100),
      primaryKey:true,
      allowNull:false,        
    },
    FILIAL: {
      type: DataTypes.STRING(2)
    },
    LINK: {
      type: DataTypes.STRING(250)
    },
    QRCODE: {
      type: DataTypes.STRING(4000)
    },      
    VENCIMENTO:{
      type: DataTypes.DATE,
    },
    DESCRICAO: {
      type: DataTypes.STRING(4000)
    },
    NUMTRANSVENDA: {
      type: DataTypes.STRING(30)
    },
    PREST: {
      type: DataTypes.STRING(2)
    },
    JUROS: {
      type: DataTypes.DECIMAL(10,2)
    },
    EMAIL_ENVIADO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'
    },
    STATUS: {
      type: DataTypes.STRING(1000)
    },
    BAIXADOPCPRESTVIAAPI: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue:0
    }
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
        fields: ['NUMTRANSVENDA'],
        type: 'foreign key',
        references: { 
            table: PcNfsaid,
            field: 'NUMTRANSVENDA'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    
};