'use strict';


import { Sequelize, DataTypes, Op } from "sequelize";
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import  PcCob  from "./PcCob.js";
import  DatabaseUtils  from "../../../controllers/database/DatabaseUtils.js";
import  Utils  from "../../../controllers/utils/Utils.js";

/**
 * class model
 */
export default class PcPrest extends BaseWinthorTableModel {

  //table fields
  declare NUMTRANSVENDA: number;
  declare CODCLI: number;
  declare CODBANCO: number;
  declare DTEMISSAO: Date;
  declare PREST: number;
  declare DUPLIC: number;      
  declare VALOR: number;
  declare CODCOB: string;
  declare CODCOBBANCO: string;
  declare DTVENC: Date;
  declare CODFILIAL: number;
  declare CODFILIALNF: number;
  declare CODUSUR: number;
  declare VPAGO: number;
  declare DTPAG: Date;
  declare VLDEVOL: number;
  declare PERDESC: number;
  declare DTBAIXA: Date;
  declare DATAHORAMINUTOBAIXA: Date;
  declare CODFUNCFECHA: number;
  declare CODFUNCCXMOT: number;
  declare CODBAIXA: number;
  declare DTFECHA: Date;
  declare DTCXMOT: Date;
  declare DTESTORNO: Date;
  declare DTULTALTER: Date;
  declare CODFUNCULTALTER: number;
  declare OBS: string;
  declare OBS2: string;
  declare CARTORIO : string;
  declare PROTESTO: string;
  declare ROTINALANCULTALT: string;
  declare ROTINAPAG: string;
  declare ROTINAFECHA: string;
  declare TIPOPREST:  string;
  declare NUMTRANSVENDAST: number;
  declare NUMASSOCDNI: number;
  declare DTASSOCIADNICLI: Date;
  declare CODFUNCDNICLI: number;
  declare TXPERMPREVISTO: number;
  declare DTRECEBIMENTOPREVISTO: Date;
  declare TXPERMPREVREAL: number;
  declare OBSTITULO: string;
  declare HISTORIGDESDOBRAMENTO: string;
  declare NSUHOST: string;
  declare DTMOVIMENTOCX: Date;
  declare DTTRANSACAOCC: Date;
  declare VALORMULTA: number;
  declare CODCOBSEFAZ: string;
  declare PASTAARQUIVOBOLETO: string;
  declare PERCOMLIQ: number;
  declare VALORDESCORIG: number;
  declare NSUTEF: string;
  declare DTVENCVALE: Date;
  declare AGRUPADO:  string;
  declare CODADMCARTAO: string;
  declare PRESTTEF: number;
  declare DTEMISSAOORIG: Date;
  declare TIPOOPERACAOTEF: string;
  declare BLOQDESDEMITENTEDIF:  string;
  declare CODAUTORIZACAOTEF: number;
  declare NUMCARTAO: string;
  declare CODFUNCCONCIL: number;
  declare DTCONCIL: Date;
  declare DTCONCILVENC: Date;
  declare CODFUNCCONCILVENC: number;
  declare SOMATXBOLETO:  string;
  declare PERMITEESTORNO:  string;
  declare CODEMITENTEPEDIDO: number;
  declare DTCRIACAO: Date;
  declare CHEQUETERCEIRO:  string;
  declare DTBAIXACRED: Date;
  declare QTPARCELASPOS: number;
  declare CODAGENTECOBRANCA: number;
  declare DTPROCESSAMENTO: Date;
  declare DTABERTURACONTA: Date;
  declare CODFUNCPRORROG: number;
  declare CODUSUR4: number;
  declare PERCOM4: number;
  declare DTPAGCOMISSAO2: Date;
  declare DTPAGCOMISSAO3: Date;
  declare DTPAGCOMISSAO4: Date;
  declare CODPROFISSIONAL: number;
  declare ROTINALANC: number;
  declare DTCXMOTHHMMSS: Date;
  declare VLROUTROSACRESC: number;
  declare NUMTRANS: number;
  declare DTDEVOL: Date;
  declare DTLANCPRORROG: Date;
  declare DTVENCORIG: Date;
  declare CODSUPERVISOR: number;
  declare TIPO:  string;
  declare LINHADIG: string;
  declare CODBARRA: string;
  declare VALORORIG: string;
  declare CODCOBORIG: string;
  declare CODEPTO: number;
  declare DTVENDOR: Date;
  declare PERCOM: number;
  declare VALORLIQCOM: number;
  declare VLTXBOLETO: string;
  declare NOSSONUMBCO2: string;
  declare CODMOTORISTA: number;
  declare CODFUNCVALE: number;
  declare CODHISTVALE: number;
  declare DTPAGCOMISSAO: Date;
  declare DVCOB: number;
  declare NUMTRANSENTDEVCLI: number;
  declare NUMPED: number;
  declare CODFUNCDESD: number;
  declare CODFUNCVEND: number;
  declare NUMCONTACORRENTE: number;
  declare HORADESD: number;
  declare MINUTODESD: number;
  declare HORAFECHA: number;
  declare MINUTOFECHA: number;
  declare CGCCPFCH: string;
  declare CODUSUR2: number;
  declare NUMCHECKOUT: number;
  declare CODFUNCCHECKOUT: number;
  declare COMPENSACAOBCO: number;
  declare DVAGENCIA: number;
  declare DVCONTA: number;
  declare DVCHEQUE: number;
  declare CODUSUR3: number;
  declare ROTDESD: number;
  declare PERCOM2: number;
  declare PERCOM3: number;
  declare TIPOPORTADOR:  string;
  declare CODPORTADOR: number;
  declare CODOCORRBAIXA: number;
  declare NUMBORDERO: number;
  declare DTBORDERO: Date;
  declare CODFUNCBORDERO: number;
  declare NUMDIASPRAZOPROTESTO: number;
  declare CODBANCOCM: number;
  declare TXPERM: number;
  declare OPERACAO:  string;
  declare STATUS:  string;
  declare VALORDESC: number;
  declare BOLETO:  string;
  declare NUMBANCO: number;
  declare NUMAGENCIA: number;
  declare NUMCHEQUE: number;
  declare DTLANCCH: Date;
  declare NUMCAR: number;
  declare DTDESD: Date;
  declare NOSSONUMBCO: string;


  static id = 30215;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {            
      NUMTRANSVENDA:{
        type: DataTypes.BIGINT,
        primaryKey:true,
        allowNull:false,        
      },
      CODCLI: {
        type: DataTypes.INTEGER
      },
      CODBANCO: {
        type: DataTypes.BIGINT
      },
      DTEMISSAO: {
        type: DataTypes.DATE
      },
      PREST: {
        type: DataTypes.BIGINT,
        primaryKey:true
      },
      DUPLIC: {
        type: DataTypes.BIGINT
      },      
      VALOR:{
        type: DataTypes.DECIMAL(32,10),
      },
      CODCOB: {
        type: DataTypes.STRING(1000)
      },
      CODCOBBANCO: {
        type: DataTypes.STRING(1000)
      },
      DTVENC: {
        type: DataTypes.DATE
      },
      CODFILIAL: {
        type: DataTypes.BIGINT
      },
      CODFILIALNF: {
        type: DataTypes.BIGINT
      },
      CODUSUR: {
        type: DataTypes.BIGINT
      },
      VPAGO: {
        type: DataTypes.DECIMAL(32,10)
      },
      DTPAG: {
        type: DataTypes.DATE
      },
      VLDEVOL: {
        type: DataTypes.DECIMAL(32,10)
      },
      PERDESC: {
        type: DataTypes.DECIMAL(32,10)
      },
      DTBAIXA: {
        type: DataTypes.DATE
      },
      DATAHORAMINUTOBAIXA: {
        type: DataTypes.DATE
      },
      CODFUNCFECHA: {
        type: DataTypes.BIGINT
      },
      CODFUNCCXMOT: {
        type: DataTypes.BIGINT
      },
      CODBAIXA: {
        type: DataTypes.BIGINT
      },
      DTFECHA: {
        type: DataTypes.DATE
      },
      DTCXMOT: {
        type: DataTypes.DATE
      },
      DTESTORNO: {
        type: DataTypes.DATE
      },
      DTULTALTER: {
        type: DataTypes.DATE
      },
      CODFUNCULTALTER: {
        type: DataTypes.BIGINT
      },
      OBS: {
        type: DataTypes.STRING(4000)
      },
      OBS2: {
        type: DataTypes.STRING(4000)
      },
      CARTORIO :{
        type: DataTypes.STRING(1)
      },
      PROTESTO:{
        type: DataTypes.STRING(1)
      },
      ROTINALANCULTALT:{
        type: DataTypes.STRING(100)
      },
      ROTINAPAG:{
        type: DataTypes.STRING(100)
      },
      ROTINAFECHA:{
        type: DataTypes.STRING(100)
      },
      TIPOPREST: {
        type: DataTypes.STRING(1)
      },
      NUMTRANSVENDAST: {
        type: DataTypes.INTEGER
      },
      NUMASSOCDNI: {
        type: DataTypes.INTEGER
      },
      DTASSOCIADNICLI: {
        type: DataTypes.DATE
      },
      CODFUNCDNICLI: {
          type: DataTypes.INTEGER
      },
      TXPERMPREVISTO: {
        type: DataTypes.DECIMAL(14,2)
      },
      DTRECEBIMENTOPREVISTO: {
        type: DataTypes.DATE
      },
      TXPERMPREVREAL: {
        type: DataTypes.DECIMAL(14,2)
      },
      OBSTITULO: {
        type: DataTypes.STRING(1000)
      },
      HISTORIGDESDOBRAMENTO: {
        type: DataTypes.STRING(1000)
      },
      NSUHOST: {
        type: DataTypes.STRING(15)
      },
      DTMOVIMENTOCX: {
        type: DataTypes.DATE
      },
      DTTRANSACAOCC: {
        type: DataTypes.DATE
      },
      VALORMULTA: {
        type: DataTypes.DECIMAL(10,2)
      },
      CODCOBSEFAZ: {
        type: DataTypes.STRING(4)
      },
      PASTAARQUIVOBOLETO: {
        type: DataTypes.STRING(2000)
      },
      PERCOMLIQ: {
        type: DataTypes.DECIMAL(8,5)
      },
      VALORDESCORIG: {
        type: DataTypes.DECIMAL(10,2)
      },
      NSUTEF: {
        type: DataTypes.STRING(15)
      },
      DTVENCVALE: {
        type: DataTypes.DATE
      },
      AGRUPADO: {
        type: DataTypes.STRING(1)
      },
      CODADMCARTAO: {
        type: DataTypes.STRING(6)
      },
      PRESTTEF: {
        type: DataTypes.INTEGER
      },
      DTEMISSAOORIG: {
        type: DataTypes.DATE
      },
      TIPOOPERACAOTEF: {
        type: DataTypes.STRING(4)
      },
      BLOQDESDEMITENTEDIF: {
        type: DataTypes.STRING(1)
      },
      CODAUTORIZACAOTEF: {
        type: DataTypes.INTEGER
      },
      NUMCARTAO: {
        type: DataTypes.STRING(30)
      },
      CODFUNCCONCIL: {
        type: DataTypes.INTEGER
      },
      DTCONCIL: {
        type: DataTypes.DATE
      },
      DTCONCILVENC: {
        type: DataTypes.DATE
      },
      CODFUNCCONCILVENC: {
        type: DataTypes.INTEGER
      },
      SOMATXBOLETO: {
        type: DataTypes.STRING(1)
      },
      PERMITEESTORNO: {
        type: DataTypes.STRING(1)
      },
      CODEMITENTEPEDIDO: {
        type: DataTypes.INTEGER
      },
      DTCRIACAO: {
        type: DataTypes.DATE
      },
      CHEQUETERCEIRO: {
        type: DataTypes.STRING(1)
      },
      DTBAIXACRED: {
        type: DataTypes.DATE
      },
      QTPARCELASPOS: {
        type: DataTypes.INTEGER
      },
      CODAGENTECOBRANCA: {
        type: DataTypes.INTEGER
      },
      DTPROCESSAMENTO: {
        type: DataTypes.DATE
      },
      DTABERTURACONTA: {
        type: DataTypes.DATE
      },
      CODFUNCPRORROG: {
        type: DataTypes.INTEGER
      },
      CODUSUR4: {
        type: DataTypes.INTEGER
      },
      PERCOM4: {
        type: DataTypes.DECIMAL(8,5)
      },
      DTPAGCOMISSAO2: {
        type: DataTypes.DATE
      },
      DTPAGCOMISSAO3: {
        type: DataTypes.DATE
      },
      DTPAGCOMISSAO4: {
        type: DataTypes.DATE
      },
      CODPROFISSIONAL: {
        type: DataTypes.INTEGER
      },
      ROTINALANC: {
        type: DataTypes.INTEGER
      },
      DTCXMOTHHMMSS: {
        type: DataTypes.DATE
      },
      VLROUTROSACRESC: {
        type: DataTypes.DECIMAL(14,2)
      },
      NUMTRANS: {
        type: DataTypes.INTEGER
      },
      DTDEVOL: {
        type: DataTypes.DATE
      },
      DTLANCPRORROG: {
        type: DataTypes.DATE
      },
      DTVENCORIG: {
        type: DataTypes.DATE
      },
      CODSUPERVISOR: {
        type: DataTypes.INTEGER
      },
      TIPO: {
        type: DataTypes.STRING(1)
      },
      LINHADIG: {
        type: DataTypes.STRING(65)
      },
      CODBARRA: {
        type: DataTypes.STRING(44)
      },
      VALORORIG: {
        type: DataTypes.DECIMAL(12,2)
      },
      CODCOBORIG: {
        type: DataTypes.STRING(4)
      },
      CODEPTO: {
        type: DataTypes.INTEGER
      },
      DTVENDOR: {
        type: DataTypes.DATE
      },
      PERCOM: {
        type: DataTypes.DECIMAL(8,5)
      },
      VALORLIQCOM: {
        type: DataTypes.DECIMAL(14,2)
      },
      VLTXBOLETO: {
        type: DataTypes.DECIMAL(12,2)
      },
      NOSSONUMBCO2: {
        type: DataTypes.STRING(30)
      },
      CODMOTORISTA: {
        type: DataTypes.INTEGER
      },
      CODFUNCVALE: {
        type: DataTypes.INTEGER
      },
      CODHISTVALE: {
        type: DataTypes.INTEGER
      },
      DTPAGCOMISSAO: {
        type: DataTypes.DATE
      },
      DVCOB: {
        type: DataTypes.INTEGER
      },
      NUMTRANSENTDEVCLI: {
        type: DataTypes.INTEGER
      },
      NUMPED: {
        type: DataTypes.INTEGER
      },
      CODFUNCDESD: {
        type: DataTypes.INTEGER
      },
      CODFUNCVEND: {
        type: DataTypes.INTEGER
      },
      NUMCONTACORRENTE: {
        type: DataTypes.INTEGER
      },
      HORADESD: {
        type: DataTypes.INTEGER
      },
      MINUTODESD: {
        type: DataTypes.INTEGER
      },
      HORAFECHA: {
        type: DataTypes.INTEGER
      },
      MINUTOFECHA: {
        type: DataTypes.INTEGER
      },
      CGCCPFCH: {
        type: DataTypes.STRING(18)
      },
      CODUSUR2: {
        type: DataTypes.INTEGER
      },
      NUMCHECKOUT: {
        type: DataTypes.INTEGER
      },
      CODFUNCCHECKOUT: {
        type: DataTypes.INTEGER
      },
      COMPENSACAOBCO: {
        type: DataTypes.INTEGER
      },
      DVAGENCIA: {
        type: DataTypes.INTEGER
      },
      DVCONTA: {
        type: DataTypes.INTEGER
      },
      DVCHEQUE: {
        type: DataTypes.INTEGER
      },
      CODUSUR3: {
        type: DataTypes.INTEGER
      },
      ROTDESD: {
        type: DataTypes.INTEGER
      },
      PERCOM2: {
        type: DataTypes.DECIMAL(8,5)
      },
      PERCOM3: {
        type: DataTypes.DECIMAL(8,5)
      },
      TIPOPORTADOR: {
        type: DataTypes.STRING(1)
      },
      CODPORTADOR: {
        type: DataTypes.INTEGER
      },
      CODOCORRBAIXA: {
        type: DataTypes.INTEGER
      },
      NUMBORDERO: {
        type: DataTypes.INTEGER
      },
      DTBORDERO: {
        type: DataTypes.DATE
      },
      CODFUNCBORDERO: {
        type: DataTypes.INTEGER
      },
      NUMDIASPRAZOPROTESTO: {
        type: DataTypes.INTEGER
      },
      CODBANCOCM: {
        type: DataTypes.INTEGER
      },
      TXPERM: {
        type: DataTypes.DECIMAL(10,2)
      },
      OPERACAO: {
        type: DataTypes.STRING(1)
      },
      STATUS: {
        type: DataTypes.STRING(1)
      },
      VALORDESC: {
        type: DataTypes.DECIMAL(10,2)
      },
      BOLETO: {
        type: DataTypes.STRING(1)
      },
      NUMBANCO: {
        type: DataTypes.INTEGER
      },
      NUMAGENCIA: {
        type: DataTypes.INTEGER
      },
      NUMCHEQUE: {
        type: DataTypes.INTEGER
      },
      DTLANCCH: {
        type: DataTypes.DATE
      },
      NUMCAR: {
        type: DataTypes.INTEGER
      },
      DTDESD: {
        type: DataTypes.DATE
      },
      NOSSONUMBCO: {
        type: DataTypes.STRING(30)
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
        fields: ['CODCOB'],
        type: 'foreign key',
        references: { 
            table: PcCob,
            field: 'CODCOB'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    
};