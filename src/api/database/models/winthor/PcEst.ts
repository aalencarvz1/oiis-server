'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcProdut from './PcProdut.js';
import PcFilial from './PcFilial.js';
import Utils from '../../../controllers/utils/Utils.js';

/**
 * class model
 */
export default class PcEst extends BaseWinthorTableModel {

  //table fields
  declare CODFILIAL: string;
  declare CODPROD: string;
  declare QTEST?: string;
  declare ESTMIN?: string;
  declare DTULTENT?: Date;
  declare DTULTSAIDA?: Date;
  declare QTVENDMES?: string;
  declare QTVENDMES1?: string;
  declare QTVENDMES2?: string;
  declare QTVENDMES3?: string;
  declare QTPERDADIA?: string;
  declare QTPERDAMES?: string;
  declare VLVENDMES?: string;
  declare QTVENDDIA?: string;
  declare VLVENDDIA?: string;
  declare QTPEDIDA?: string;
  declare VLCUSTODIAREAL?: string;
  declare VLCUSTOMESREAL?: string;
  declare VLCUSTODIAFIN?: string;
  declare VLCUSTOMESFIN?: string;
  declare QTESTANT?: string;
  declare PCUSTOANT?: string;
  declare QTRESERV?: string;
  declare QTULTENT?: string;
  declare CUSTOULTENT?: string;
  declare QTESTGER?: string;
  declare QTENTDIA?: string;
  declare QTENTMES?: string;
  declare VLVENDDIAREAL?: string;
  declare VLVENDMESREAL?: string;
  declare CUSTOCONT?: string;
  declare QTBLOQUEADA?: string;
  declare FIMESTOQUE?: string;
  declare QTINDENIZ?: string;
  declare QTULTINVENT?: string;
  declare QTVENDAPERDIDA?: string;
  declare CUSTOREAL?: string;
  declare CUSTOFIN?: string;
  declare CUSTOREP?: string;
  declare VALORULTENT?: string;
  declare QTBLOQTRANSF?: string;
  declare QTPENDENTE?: string;
  declare QTVENDSEMANA?: string;
  declare QTVENDSEMANA1?: string;
  declare QTVENDSEMANA2?: string;
  declare QTVENDSEMANA3?: string;
  declare QTGIRODIA?: string;
  declare PERCEVOLUCAOVENDA?: string;
  declare VLVENDMESANT?: string;
  declare VLCUSTOMESFINANT?: string;
  declare VLCUSTOMESREALANT?: string;
  declare NUMNOTAULTENT?: string;
  declare PCOMPRAULTENT?: string;
  declare VLSTULTENT?: string;
  declare MODULO?: string;
  declare RUA?: string;
  declare APTO?: string;
  declare DTULTINVENT?: Date;
  declare CUSTODOLAR?: string;
  declare CUSTOULTENTMED?: string;
  declare VALORULTENTMED?: string;
  declare QTRESERVMED?: string;
  declare QTREQUISICAO?: string;
  declare CUSTOREALSEMST?: string;
  declare DTULTPEDCOMPRA?: Date;
  declare CUSTOULTPEDCOMPRA?: string;
  declare CUSTOULTENTFIN?: string;
  declare DTULTDESDOBRA?: Date;
  declare CORREDOR?: string;
  declare QTLOJA?: string;
  declare BASEBCR?: string;
  declare STBCR?: string;
  declare CUSTOPROXIMACOMPRA?: string;
  declare NUMTRANSENTULTENT?: string;
  declare CUSTOULTENTANT?: string;
  declare MOTIVOBLOQESTOQUE?: string;
  declare CODDEVOL?: string;
  declare QTDEVOLMES?: string;
  declare QTDEVOLMES1?: string;
  declare QTDEVOLMES2?: string;
  declare QTDEVOLMES3?: string;
  declare ESTMAX?: string;
  declare VLULTENTCONTSEMST?: string;
  declare CUSTOULTENTLIQ?: string;
  declare CUSTOREALLIQ?: string;
  declare MODULOCX?: string;
  declare RUACX?: string;
  declare APTOCX?: string;
  declare DTULTFAT?: Date;
  declare VLULTPCOMPRA?: string;
  declare ESTIDEAL?: string;
  declare DTULTALTERSRVPRC?: Date;
  declare DTPRIMCOMPRA?: Date;
  declare CUSTONFSEMST?: string;
  declare BASEICMSULTENT?: string;
  declare CUSTOULTENTCONT?: string;
  declare QTTRANSITO?: string;
  declare VLSTULTENTTAB?: string;
  declare VLSTGUIAULTENTTAB?: string;
  declare CUSTONFSEMSTTAB?: string;
  declare CUSTONFSEMSTGUIAULTENTTAB?: string;
  declare IVAULTENTTAB?: string;
  declare ALIQICMS1ULTENTTAB?: string;
  declare ALIQICMS2ULTENTTAB?: string;
  declare REDBASEIVAULTENTTAB?: string;
  declare PERCICMSFRETEFOBSTULTENTTAB?: string;
  declare VLFRETECONHECULTENTTAB?: string;
  declare PERCALIQEXTGUIAULTENTTAB?: string;
  declare VLSTGUIAULTENT?: string;
  declare CUSTONFSEMSTGUIAULTENT?: string;
  declare IVAULTENT?: string;
  declare ALIQICMS1ULTENT?: string;
  declare ALIQICMS2ULTENT?: string;
  declare REDBASEIVAULTENT?: string;
  declare PERCICMSFRETEFOBSTULTENT?: string;
  declare VLFRETECONHECULTENT?: string;
  declare PERCALIQEXTGUIAULTENT?: string;
  declare BASEICMSULTENTTAB?: string;
  declare QTESTORNOPRODUZDIA?: string;
  declare QTESTORNOPRODUZMES?: string;
  declare QTPRODUZIDADIA?: string;
  declare QTPRODUZIDAMES?: string;
  declare PERCMVAORIGULTENT?: string;
  declare PERCMVAORIGTAB?: string;
  declare ASSINATURA?: string;
  declare ROTINALANC?: string;
  declare DTALTERACAO1107?: Date;
  declare DTEMISSAOULTENT?: Date;
  declare CUSTOFORNEC?: string;
  declare QTGIROCURVATURA?: string;
  declare QTGIROCURVATURAANT?: string;
  declare QTFRENTELOJA?: string;
  declare NUMFCI?: string;
  declare VLPARCELAIMPFCI?: string;
  declare PERCCONTEUDOIMPFCI?: string;
  declare VLIMPORTACAOFCI?: string;
  declare CUSTOFORNECSEMST?: string;
  declare CUSTOPROXIMACOMPRASEMST?: string;
  declare CUSTOFINSEMST?: string;
  declare CUSTOULTENTFINSEMST?: string;
  declare CUSTOULTENTSEMST?: string;
  declare CUSTOULTPEDCOMPRASEMST?: string;
  declare BASEIPIULTENT?: string;
  declare VLIPIULTENT?: string;
  declare PERCIPIULTENT?: string;
  declare QTTRANSITOTV13?: string;
  declare CODCEST?: string;
  declare IDENTIFICADOR?: string;
  declare TEMESTOQUEECOMMERCE?: string;
  declare QTINDUSTRIA?: string;
  declare VLFCPICMSULTENTTAB?: string;
  declare VLFCPSTULTENTTAB?: string;
  declare VLBASEFCPSTULTENTTAB?: string;
  declare VLBCFCPSTRET?: string;
  declare PERFCPSTRET?: string;
  declare VLFCPSTRET?: string;
  declare PERCREDBASEEFET?: string;
  declare VLBASEEFET?: string;
  declare PERCICMSEFET?: string;
  declare VLICMSEFET?: string;
  declare NUMTRANSULTENTET?: string;
  declare NUMTRANSULTENTED?: string;
  declare ALIQICMS1?: string;
  declare NUMTRANSULTENTST?: string;
  declare ESTBONIFIC?: string;
  declare VLICMSBCR?: string;
  declare BASEICMSBCR?: string;
  declare TIPOCURVA?: string;
  declare CURVA?: string;
  declare SUBCURVA?: string;
  declare FREQUENCIA?: string;
  declare NUMTRANSENTULTENTBNF?: string;
  declare QTCROSSDOCK?: string;
  declare QTESTOQUEEMTERCEIRO?: string;
  declare QTESTOQUEDETERCEIRO?: string;
  declare QTTRANSITOTV10?: string;
  declare DTHORAULTSAIDA?: Date;
  declare DTHORAULTALTDISP?: Date;
  declare QBCMONORET?: string;
  declare ADREMICMSRET?: string;
  declare VICMSMONORET?: string;
  declare CUSTOULTENTFISCAL?: string;
  declare CUSTOFISCAL?: string;
  declare VLIPISUSPENSOULTENT?: string;
  declare VLIISUSPENSOULTENT?: string;
  declare PLIQULTENT?: string;
  declare PERICMSANTECIPADOULTENT?: string;
  declare PERICMULTENT?: string;
  declare NUMERO?: string;
  declare NUMEROCX?: string;


  static id = 30207;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
    CODFILIAL: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false		
    },
    CODPROD: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false,
      defaultValue: null	
    },
    QTEST: {
      type: DataTypes.STRING(22)		
    },
    ESTMIN: {
      type: DataTypes.STRING(22)		
    },
    DTULTENT: {
      type: DataTypes.DATE		
    },
    DTULTSAIDA: {
      type: DataTypes.DATE		
    },
    QTVENDMES: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTVENDMES1: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTVENDMES2: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTVENDMES3: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTPERDADIA: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTPERDAMES: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    VLVENDMES: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTVENDDIA: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    VLVENDDIA: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTPEDIDA: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    VLCUSTODIAREAL: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    VLCUSTOMESREAL: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    VLCUSTODIAFIN: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    VLCUSTOMESFIN: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTESTANT: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    PCUSTOANT: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTRESERV: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTULTENT: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    CUSTOULTENT: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTESTGER: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTENTDIA: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTENTMES: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    VLVENDDIAREAL: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    VLVENDMESREAL: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    CUSTOCONT: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTBLOQUEADA: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    FIMESTOQUE: {
      type: DataTypes.STRING(1)		
    },
    QTINDENIZ: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTULTINVENT: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTVENDAPERDIDA: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    CUSTOREAL: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    CUSTOFIN: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    CUSTOREP: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    VALORULTENT: {
      type: DataTypes.STRING(22)		
    },
    QTBLOQTRANSF: {
      type: DataTypes.STRING(22)		
    },
    QTPENDENTE: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTVENDSEMANA: {
      type: DataTypes.STRING(22)		
    },
    QTVENDSEMANA1: {
      type: DataTypes.STRING(22)		
    },
    QTVENDSEMANA2: {
      type: DataTypes.STRING(22)		
    },
    QTVENDSEMANA3: {
      type: DataTypes.STRING(22)		
    },
    QTGIRODIA: {
      type: DataTypes.STRING(22)		
    },
    PERCEVOLUCAOVENDA: {
      type: DataTypes.STRING(22)		
    },
    VLVENDMESANT: {
      type: DataTypes.STRING(22)		
    },
    VLCUSTOMESFINANT: {
      type: DataTypes.STRING(22)		
    },
    VLCUSTOMESREALANT: {
      type: DataTypes.STRING(22)		
    },
    NUMNOTAULTENT: {
      type: DataTypes.STRING(22)		
    },
    PCOMPRAULTENT: {
      type: DataTypes.STRING(22)		
    },
    VLSTULTENT: {
      type: DataTypes.STRING(22)		
    },
    MODULO: {
      type: DataTypes.STRING(22)		
    },
    RUA: {
      type: DataTypes.STRING(22)		
    },
    APTO: {
      type: DataTypes.STRING(22)		
    },
    DTULTINVENT: {
      type: DataTypes.DATE		
    },
    CUSTODOLAR: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    CUSTOULTENTMED: {
      type: DataTypes.STRING(22)		
    },
    VALORULTENTMED: {
      type: DataTypes.STRING(22)		
    },
    QTRESERVMED: {
      type: DataTypes.STRING(22)		
    },
    QTREQUISICAO: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREALSEMST: {
      type: DataTypes.STRING(22)		
    },
    DTULTPEDCOMPRA: {
      type: DataTypes.DATE		
    },
    CUSTOULTPEDCOMPRA: {
      type: DataTypes.STRING(22)		
    },
    CUSTOULTENTFIN: {
      type: DataTypes.STRING(22)		
    },
    DTULTDESDOBRA: {
      type: DataTypes.DATE		
    },
    CORREDOR: {
      type: DataTypes.STRING(22)		
    },
    QTLOJA: {
      type: DataTypes.STRING(22)		
    },
    BASEBCR: {
      type: DataTypes.STRING(22)		
    },
    STBCR: {
      type: DataTypes.STRING(22)		
    },
    CUSTOPROXIMACOMPRA: {
      type: DataTypes.STRING(22)		
    },
    NUMTRANSENTULTENT: {
      type: DataTypes.STRING(22)		
    },
    CUSTOULTENTANT: {
      type: DataTypes.STRING(22)		
    },
    MOTIVOBLOQESTOQUE: {
      type: DataTypes.STRING(80)		
    },
    CODDEVOL: {
      type: DataTypes.STRING(22)		
    },
    QTDEVOLMES: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    QTDEVOLMES1: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    QTDEVOLMES2: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    QTDEVOLMES3: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    ESTMAX: {
      type: DataTypes.STRING(22)		
    },
    VLULTENTCONTSEMST: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    CUSTOULTENTLIQ: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    CUSTOREALLIQ: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    MODULOCX: {
      type: DataTypes.STRING(22)		
    },
    RUACX: {
      type: DataTypes.STRING(22)		
    },
    APTOCX: {
      type: DataTypes.STRING(22)		
    },
    DTULTFAT: {
      type: DataTypes.DATE		
    },
    VLULTPCOMPRA: {
      type: DataTypes.STRING(22)		
    },
    ESTIDEAL: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTERSRVPRC: {
      type: DataTypes.DATE		
    },
    DTPRIMCOMPRA: {
      type: DataTypes.DATE		
    },
    CUSTONFSEMST: {
      type: DataTypes.STRING(22)		
    },
    BASEICMSULTENT: {
      type: DataTypes.STRING(22)		
    },
    CUSTOULTENTCONT: {
      type: DataTypes.STRING(22)		
    },
    QTTRANSITO: {
      type: DataTypes.STRING(22)		
    },
    VLSTULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    VLSTGUIAULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    CUSTONFSEMSTTAB: {
      type: DataTypes.STRING(22)		
    },
    CUSTONFSEMSTGUIAULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    IVAULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    ALIQICMS1ULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    ALIQICMS2ULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    REDBASEIVAULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    PERCICMSFRETEFOBSTULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    VLFRETECONHECULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQEXTGUIAULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    VLSTGUIAULTENT: {
      type: DataTypes.STRING(22)		
    },
    CUSTONFSEMSTGUIAULTENT: {
      type: DataTypes.STRING(22)		
    },
    IVAULTENT: {
      type: DataTypes.STRING(22)		
    },
    ALIQICMS1ULTENT: {
      type: DataTypes.STRING(22)		
    },
    ALIQICMS2ULTENT: {
      type: DataTypes.STRING(22)		
    },
    REDBASEIVAULTENT: {
      type: DataTypes.STRING(22)		
    },
    PERCICMSFRETEFOBSTULTENT: {
      type: DataTypes.STRING(22)		
    },
    VLFRETECONHECULTENT: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQEXTGUIAULTENT: {
      type: DataTypes.STRING(22)		
    },
    BASEICMSULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    QTESTORNOPRODUZDIA: {
      type: DataTypes.STRING(22)		
    },
    QTESTORNOPRODUZMES: {
      type: DataTypes.STRING(22)		
    },
    QTPRODUZIDADIA: {
      type: DataTypes.STRING(22)		
    },
    QTPRODUZIDAMES: {
      type: DataTypes.STRING(22)		
    },
    PERCMVAORIGULTENT: {
      type: DataTypes.STRING(22)		
    },
    PERCMVAORIGTAB: {
      type: DataTypes.STRING(22)		
    },
    ASSINATURA: {
      type: DataTypes.STRING(255)		
    },
    ROTINALANC: {
      type: DataTypes.STRING(48)		
    },
    DTALTERACAO1107: {
      type: DataTypes.DATE		
    },
    DTEMISSAOULTENT: {
      type: DataTypes.DATE		
    },
    CUSTOFORNEC: {
      type: DataTypes.STRING(22)		
    },
    QTGIROCURVATURA: {
      type: DataTypes.STRING(22)		
    },
    QTGIROCURVATURAANT: {
      type: DataTypes.STRING(22)		
    },
    QTFRENTELOJA: {
      type: DataTypes.STRING(22)		
    },
    NUMFCI: {
      type: DataTypes.STRING(36)		
    },
    VLPARCELAIMPFCI: {
      type: DataTypes.STRING(22)		
    },
    PERCCONTEUDOIMPFCI: {
      type: DataTypes.STRING(22)		
    },
    VLIMPORTACAOFCI: {
      type: DataTypes.STRING(22)		
    },
    CUSTOFORNECSEMST: {
      type: DataTypes.STRING(22)		
    },
    CUSTOPROXIMACOMPRASEMST: {
      type: DataTypes.STRING(22)		
    },
    CUSTOFINSEMST: {
      type: DataTypes.STRING(22)		
    },
    CUSTOULTENTFINSEMST: {
      type: DataTypes.STRING(22)		
    },
    CUSTOULTENTSEMST: {
      type: DataTypes.STRING(22)		
    },
    CUSTOULTPEDCOMPRASEMST: {
      type: DataTypes.STRING(22)		
    },
    BASEIPIULTENT: {
      type: DataTypes.STRING(22)		
    },
    VLIPIULTENT: {
      type: DataTypes.STRING(22)		
    },
    PERCIPIULTENT: {
      type: DataTypes.STRING(22)		
    },
    QTTRANSITOTV13: {
      type: DataTypes.STRING(22)		
    },
    CODCEST: {
      type: DataTypes.STRING(7)		
    },
    IDENTIFICADOR: {
      type: DataTypes.STRING(22)		
    },
    TEMESTOQUEECOMMERCE: {
      type: DataTypes.STRING(1)		
    },
    QTINDUSTRIA: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    VLFCPICMSULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    VLFCPSTULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    VLBASEFCPSTULTENTTAB: {
      type: DataTypes.STRING(22)		
    },
    VLBCFCPSTRET: {
      type: DataTypes.STRING(22)		
    },
    PERFCPSTRET: {
      type: DataTypes.STRING(22)		
    },
    VLFCPSTRET: {
      type: DataTypes.STRING(22)		
    },
    PERCREDBASEEFET: {
      type: DataTypes.STRING(22)		
    },
    VLBASEEFET: {
      type: DataTypes.STRING(22)		
    },
    PERCICMSEFET: {
      type: DataTypes.STRING(22)		
    },
    VLICMSEFET: {
      type: DataTypes.STRING(22)		
    },
    NUMTRANSULTENTET: {
      type: DataTypes.STRING(22)		
    },
    NUMTRANSULTENTED: {
      type: DataTypes.STRING(22)		
    },
    ALIQICMS1: {
      type: DataTypes.STRING(22)		
    },
    NUMTRANSULTENTST: {
      type: DataTypes.STRING(22)		
    },
    ESTBONIFIC: {
      type: DataTypes.STRING(1)		
    },
    VLICMSBCR: {
      type: DataTypes.STRING(22)		
    },
    BASEICMSBCR: {
      type: DataTypes.STRING(22)		
    },
    TIPOCURVA: {
      type: DataTypes.STRING(1)		
    },
    CURVA: {
      type: DataTypes.STRING(250)		
    },
    SUBCURVA: {
      type: DataTypes.STRING(250)		
    },
    FREQUENCIA: {
      type: DataTypes.STRING(250)		
    },
    NUMTRANSENTULTENTBNF: {
      type: DataTypes.STRING(22)		
    },
    QTCROSSDOCK: {
      type: DataTypes.STRING(22)		
    },
    QTESTOQUEEMTERCEIRO: {
      type: DataTypes.STRING(22)		
    },
    QTESTOQUEDETERCEIRO: {
      type: DataTypes.STRING(22)		
    },
    QTTRANSITOTV10: {
      type: DataTypes.STRING(22)		
    },
    DTHORAULTSAIDA: {
      type: DataTypes.DATE		
    },
    DTHORAULTALTDISP: {
      type: DataTypes.DATE		
    },
    QBCMONORET: {
      type: DataTypes.STRING(22)		
    },
    ADREMICMSRET: {
      type: DataTypes.STRING(22)		
    },
    VICMSMONORET: {
      type: DataTypes.STRING(22)		
    },
    CUSTOULTENTFISCAL: {
      type: DataTypes.STRING(22),
      defaultValue: null	
    },
    CUSTOFISCAL: {
      type: DataTypes.STRING(22),
      defaultValue: null	
    },
    VLIPISUSPENSOULTENT: {
      type: DataTypes.STRING(22)		
    },
    VLIISUSPENSOULTENT: {
      type: DataTypes.STRING(22)		
    },
    PLIQULTENT: {
      type: DataTypes.STRING(22)		
    },
    PERICMSANTECIPADOULTENT: {
      type: DataTypes.STRING(22)		
    },
    PERICMULTENT: {
      type: DataTypes.STRING(22)		
    },
    NUMERO: {
      type: DataTypes.STRING(22)		
    },
    NUMEROCX: {
      type: DataTypes.STRING(22)		
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
        fields: ['CODPROD'],
        type: 'foreign key',
        references: { 
            table: PcProdut,
            field: 'CODPROD'
        }
      });
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