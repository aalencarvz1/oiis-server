'use strict';


import { DataTypes } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';

/**
 * class model
 */
export default class PcEstcr extends BaseWinthorTableModel {

  //table fields
  declare CODBANCO: number;
  declare CODCOB: string;
  declare VALOR: number;
  declare VALORCONCILIADO: number;
  declare DTULTCONCILIA: Date;
  declare VALORSALDOTOTALCONCIL: number;
  declare VALORSALDOTOTALCOMP: number;
  declare VALORCOMPENSADO: number;
  declare DTULTCOMPENSACAO: Date;



  static id = 30220;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {            
      CODBANCO:{
        type: DataTypes.BIGINT,
        primaryKey:true,
        allowNull:false,        
      },
      CODCOB: {
        type: DataTypes.STRING(100),
        primaryKey:true,
        allowNull:false,        
      },
      VALOR: {
        type: DataTypes.DECIMAL(32,10)
      },
      VALORCONCILIADO: {
        type: DataTypes.DECIMAL(32,10)
      },
      DTULTCONCILIA: {
        type: DataTypes.DATE
      },
      VALORSALDOTOTALCONCIL: {
        type: DataTypes.DECIMAL(32,10)
      },
      VALORSALDOTOTALCOMP: {
        type: DataTypes.DECIMAL(32,10)
      },
      VALORCOMPENSADO: {
        type: DataTypes.DECIMAL(32,10)
      },
      DTULTCOMPENSACAO: {
        type: DataTypes.DATE
      }
  };
  
};