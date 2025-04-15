'use strict';


import { DataTypes } from "sequelize";
import  BaseEpTableModel  from './BaseEpTableModel.js';
import  EpVendedores  from "./EpVendedores.js";
import  EpClientes  from "./EpClientes.js";
import  EpOrigensInfo  from "./EpOrigensInfo.js";
import  EpFiliais  from "./EpFiliais.js";
import  EpFornecedores  from "./EpFornecedores.js";
import Utils from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class EpNfsSaida extends BaseEpTableModel {

  //table fields
  declare COD: number;
  declare CODORIGEMINFO: number;
  declare CODSUP: number;
  declare CODNFENTREF: number;
  declare NUMTRANSSAIDAORIGEM: number;
  declare NUMNOTAORIGEM: number;
  declare CODESPECIENF: number;
  declare CODFILIAL: number;
  declare CODCOMPRADOR: number;
  declare CODFORNECEDOR: number;
  declare CODADMINISTRADOR: number;
  declare CODVENDEDOR: number;
  declare CODCLIENTE: number;
  declare DTEMISSAO: Date;
  declare DTCANCEL: Date;
  declare CODSTATUSREG: number;
  declare CHAVENFE: string;
  declare NRCTE: number;
  declare NRCARGA: number;
  declare PLACA: string;
  declare NUMTRANSCTE: number;
  declare NUMTRANSCTEITEM: number;
  declare NUMTRANSCTECOMP: number;
  declare NUMTRANSCTECOMPLS: string;
  declare CODVEICULO: number;
  declare CODMOTORISTA: number;



  static id = 40500;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
      COD:{
        type: DataTypes.INTEGER,
        primaryKey:true
      },
      CODORIGEMINFO: {
        type: DataTypes.INTEGER,
      },
      CODSUP: {
        type: DataTypes.INTEGER,
      },
      CODNFENTREF: {
        type: DataTypes.INTEGER,
      },
      NUMTRANSSAIDAORIGEM: {
        type: DataTypes.INTEGER,
      },
      NUMNOTAORIGEM: {
        type: DataTypes.INTEGER,
      },
      CODESPECIENF: {
        type: DataTypes.INTEGER,
      },
      CODFILIAL: {
        type: DataTypes.INTEGER,
      },
      CODCOMPRADOR: {
        type: DataTypes.INTEGER,
      },
      CODFORNECEDOR: {
        type: DataTypes.INTEGER,
      },
      CODADMINISTRADOR: {
        type: DataTypes.INTEGER,
      },
      CODVENDEDOR: {
        type: DataTypes.INTEGER,
      },
      CODCLIENTE: {
        type: DataTypes.INTEGER,
      },
      DTEMISSAO: {
        type: DataTypes.DATE,
      },
      DTCANCEL: {
        type: DataTypes.DATE,
      },
      CODSTATUSREG: {
        type: DataTypes.INTEGER,
      },
      CHAVENFE: {
        type: DataTypes.STRING(255),
      },
      NRCTE: {
        type: DataTypes.INTEGER,
      },
      NRCARGA: {
        type: DataTypes.INTEGER,
      },
      PLACA: {
        type: DataTypes.STRING(10),
      },
      NUMTRANSCTE: {
        type: DataTypes.INTEGER,
      },
      NUMTRANSCTEITEM: {
        type: DataTypes.INTEGER,
      },
      NUMTRANSCTECOMP: {
        type: DataTypes.INTEGER,
      },
      NUMTRANSCTECOMPLS: {
        type: DataTypes.STRING(2000),
      },
      CODVEICULO: {
        type: DataTypes.INTEGER,
      },
      CODMOTORISTA: {
        type: DataTypes.INTEGER,
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
      result = super.getForeignKeys()
      result.push({
        fields: ['CODORIGEMINFO'],
        type: 'foreign key',
        references: { 
            table: EpOrigensInfo,
            field: 'COD'
        }
      });
      result.push({
        fields: ['CODFILIAL'],
        type: 'foreign key',
        references: { 
            table: EpFiliais,
            field: 'COD'
        }
      });
      result.push({
        fields: ['CODVENDEDOR'],
        type: 'foreign key',
        references: { 
            table: EpVendedores,
            field: 'COD'
        }
      });
      result.push({
        fields: ['CODCLIENTE'],
        type: 'foreign key',
        references: { 
            table: EpClientes,
            field: 'COD'
        }
      });
      result.push({
        fields: ['CODFORNECEDOR'],
        type: 'foreign key',
        references: { 
            table: EpFornecedores,
            field: 'COD'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }


};