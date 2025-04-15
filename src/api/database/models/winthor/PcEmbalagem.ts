'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcFilial from './PcFilial.js';
import PcProdut from './PcProdut.js';
import Utils from '../../../controllers/utils/Utils.js';

/**
 * class model
 */
export default class PcEmbalagem extends BaseWinthorTableModel {

  //table fields
  declare CODAUXILIAR: string;
  declare CODPROD: string;
  declare EMBALAGEM?: string;
  declare UNIDADE?: string;
  declare QTUNIT?: string;
  declare PTABELA?: string;
  declare PVENDA?: string;
  declare DTULTALTPTABELA?: Date;
  declare DTULTALTPVENDA?: Date;
  declare CODFUNCALTPTABELA?: string;
  declare CODFUNCALTPVENDA?: string;
  declare QTMAXVENDA?: string;
  declare MARGEM_ESP?: string;
  declare MARGEM?: string;
  declare DTULTALTCOM?: Date;
  declare EXPORTACAMPO?: string;
  declare PRAZOVAL?: string;
  declare CODFILIAL: string;
  declare POFERTA?: string;
  declare DTOFERTAINI?: Date;
  declare DTOFERTAFIM?: Date;
  declare PRECOANTERIOR?: string;
  declare EXCLUIDO?: string;
  declare PERMITEMULTIPLICACAO?: string;
  declare USABALANCATOLEDO?: string;
  declare TIPOEMBALAGEM?: string;
  declare DTEMISSAOETIQ?: Date;
  declare QTMINGONDOLA?: string;
  declare QTMAXGONDOLA?: string;
  declare NUMSEQATU?: string;
  declare FATORPRECO?: string;
  declare QTMINATACADOF?: string;
  declare PTABELAATAC?: string;
  declare PVENDAATAC?: string;
  declare PRECOANTERIORATAC?: string;
  declare QTMINIMAATACADO?: string;
  declare QTMINIMAATACADOF?: string;
  declare ENVIAFV?: string;
  declare MARGEMATAC_ESP?: string;
  declare DTULTALTPTABELAATAC?: Date;
  declare DTULTALTPVENDAATAC?: Date;
  declare MARGEMATAC?: string;
  declare OBS?: string;
  declare MARGEMIDEALATAC?: string;
  declare DTOFERTAATACINI?: Date;
  declare DTOFERTAATACFIM?: Date;
  declare POFERTAATAC?: string;
  declare PESOBRUTO?: string;
  declare PESOLIQ?: string;
  declare ENVIABALANCA?: string;
  declare QTMULTIPLA?: string;
  declare PERMITEVENDAATACADO?: string;
  declare DESCRICAOECF?: string;
  declare ACEITAPRECOREPLICADO?: string;
  declare LAYOUTETIQUETA?: string;
  declare PERVARIACAOPTABELA?: string;
  declare DTEMISSAOETIQPOFERTAS?: Date;
  declare DTULTALTERSRVPRC?: Date;
  declare FATORCONVERSAO?: string;
  declare UNMEDIDA?: string;
  declare CODFUNCALTPTABELAATAC?: string;
  declare CODFUNCALTPVENDAATAC?: string;
  declare CODFUNCALTPOFERTA?: string;
  declare CODFUNCALTPOFERTAATAC?: string;
  declare PERDESCCARTAOFIDELIDADE?: string;
  declare ASSINATURA?: string;
  declare CONTROLEVASILHAME?: string;
  declare CODFUNCINATIVO?: string;
  declare DTINATIVO?: Date;
  declare MOTIVOOFERTA?: string;
  declare DTULTALT?: Date;
  declare USARESTAURANTE?: string;
  declare IMPDATAEMBALAGEMBALANCA?: string;
  declare ENVIAINFNUTRI?: string;
  declare PTABELAWEB?: string;
  declare PVENDAWEB?: string;
  declare POFERTAWEB?: string;
  declare DTOFERTAWEBINI?: Date;
  declare DTOFERTAWEBFIM?: Date;
  declare SITUACAOWEB?: string;
  declare DESCRICAOWEB?: string;
  declare QTDIAS?: string;
  declare CODCOB?: string;
  declare CODCLI?: string;
  declare QTFIXAMULTIPLICCHECKOUT?: string;
  declare DTULTALTPTABELAWEB?: Date;
  declare QTEMISSAOETIQ?: string;
  declare CODINFEXTRABAL?: string;
  declare TARAF?: string;
  declare PERMITEVENDACOMINTERNO?: string;
  declare INDICPESAGEMOBRIGATORIA?: string;
  declare INDICPERMITEPORPREVENDA?: string;
  declare INDICPERMITEDIGITACAOPRECO?: string;
  declare INDICPERMITEDIGITACAODESCONTO?: string;
  declare INDICGERARCODPESOVAR?: string;
  declare INDICALERTAQUANTIDADE?: string;
  declare INDICPRODUCAOPROPRIA?: string;
  declare CODDIGITAQTDE?: string;
  declare PTABELAANT?: string;
  declare PTABELAATACANT?: string;
  declare PVENDAWEBANT?: string;
  declare PTABELAWEBANT?: string;
  declare PCOMINT1?: string;
  declare PCOMEXT1?: string;
  declare PCOMREP1?: string;
  declare BEBALCOOLICA?: string;
  declare DTAPLICPRECOVAREJO?: Date;
  declare DTAPLICPRECOATAC?: Date;
  declare INDCVENDECODINTERNO?: string;
  declare SOCIOTORCEDOR?: string;
  declare DESTINOOFERTAVAREJO?: string;
  declare DESTINOOFERTAATAC?: string;
  declare GIROMES?: string;
  declare GIROMEDIODIA?: string;
  declare DTULTALTGIRO?: Date;
  declare ALTURA?: string;
  declare LARGURA?: string;
  declare COMPRIMENTO?: string;
  declare VOLUME?: string;
  declare OBRIGALEITURACODBARRA?: string;
  declare IMPRESSAORESTAURANTE?: string;
  declare ENVIATELEMARKETING?: string;
  declare ENVIAFRENTECAIXA?: string;
  declare IMPRIMERESTAURANTE?: string;
  declare PRODUTOCOZINHA?: string;
  declare TEMPOPREPARO?: string;
  declare TEMPOALERTA?: string;
  declare PERMITEIMPRESSAOETIQUETA?: string;
  declare USAECOMMERCEUNILEVER?: string;
  declare USAETIQUETAANTIFURTO?: string;
  declare MD5PAF?: string;
  declare ACEITAMARGEMREPLICADA?: string;
  declare ENVIAPENTREGA?: string;
  declare PRODSEMCODBARRAS?: string;
  declare PERMITEVENDACRTALIMENTACAO?: string;
  declare IDCIASHOP?: string;
  declare QTDVIASIMPRESSAOCOZINHA?: string;
  declare JUSTIFICATIVAPRECO?: string;
  declare CODFRACIONADOR?: string;
  declare CODAUXILIARANTERIOR?: string;
  declare IONSYNC?: string;
  declare ENVIAECOMMERCE?: string;
  declare ATIVOECOMMERCE?: string;
  declare CODFILIALINTEGRACAO?: string;
  declare INFOPRODWEB?: string;
  declare ORIGEMPED?: string;
  declare DTALTERC5?: string;
  declare DTCADASTRO?: string;
  declare DTULALTERINTEGRA?: string;
  
  static id = 30208;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
    CODAUXILIAR: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    CODPROD: {
      type: DataTypes.STRING(22),
      allowNull: false		
    },
    EMBALAGEM: {
      type: DataTypes.STRING(12)		
    },
    UNIDADE: {
      type: DataTypes.STRING(2)		
    },
    QTUNIT: {
      type: DataTypes.STRING(22)		
    },
    PTABELA: {
      type: DataTypes.STRING(22)		
    },
    PVENDA: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTPTABELA: {
      type: DataTypes.DATE		
    },
    DTULTALTPVENDA: {
      type: DataTypes.DATE		
    },
    CODFUNCALTPTABELA: {
      type: DataTypes.STRING(22)		
    },
    CODFUNCALTPVENDA: {
      type: DataTypes.STRING(22)		
    },
    QTMAXVENDA: {
      type: DataTypes.STRING(22)		
    },
    MARGEM_ESP: {
      type: DataTypes.STRING(22)		
    },
    MARGEM: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTCOM: {
      type: DataTypes.DATE		
    },
    EXPORTACAMPO: {
      type: DataTypes.STRING(1),
      defaultValue: 'D'	
    },
    PRAZOVAL: {
      type: DataTypes.STRING(22)		
    },
    CODFILIAL: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false		
    },
    POFERTA: {
      type: DataTypes.STRING(22)		
    },
    DTOFERTAINI: {
      type: DataTypes.DATE		
    },
    DTOFERTAFIM: {
      type: DataTypes.DATE		
    },
    PRECOANTERIOR: {
      type: DataTypes.STRING(22)		
    },
    EXCLUIDO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERMITEMULTIPLICACAO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    USABALANCATOLEDO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    TIPOEMBALAGEM: {
      type: DataTypes.STRING(1)		
    },
    DTEMISSAOETIQ: {
      type: DataTypes.DATE		
    },
    QTMINGONDOLA: {
      type: DataTypes.STRING(22)		
    },
    QTMAXGONDOLA: {
      type: DataTypes.STRING(22)		
    },
    NUMSEQATU: {
      type: DataTypes.STRING(22)		
    },
    FATORPRECO: {
      type: DataTypes.STRING(22)		
    },
    QTMINATACADOF: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATAC: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    PVENDAATAC: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    PRECOANTERIORATAC: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
    },
    QTMINIMAATACADO: {
      type: DataTypes.STRING(22)		
    },
    QTMINIMAATACADOF: {
      type: DataTypes.STRING(22)		
    },
    ENVIAFV: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    MARGEMATAC_ESP: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTPTABELAATAC: {
      type: DataTypes.DATE		
    },
    DTULTALTPVENDAATAC: {
      type: DataTypes.DATE		
    },
    MARGEMATAC: {
      type: DataTypes.STRING(22)		
    },
    OBS: {
      type: DataTypes.STRING(2)		
    },
    MARGEMIDEALATAC: {
      type: DataTypes.STRING(22)		
    },
    DTOFERTAATACINI: {
      type: DataTypes.DATE		
    },
    DTOFERTAATACFIM: {
      type: DataTypes.DATE		
    },
    POFERTAATAC: {
      type: DataTypes.STRING(22)		
    },
    PESOBRUTO: {
      type: DataTypes.STRING(22)		
    },
    PESOLIQ: {
      type: DataTypes.STRING(22)		
    },
    ENVIABALANCA: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    QTMULTIPLA: {
      type: DataTypes.STRING(22)		
    },
    PERMITEVENDAATACADO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    DESCRICAOECF: {
      type: DataTypes.STRING(40)		
    },
    ACEITAPRECOREPLICADO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    LAYOUTETIQUETA: {
      type: DataTypes.STRING(40)		
    },
    PERVARIACAOPTABELA: {
      type: DataTypes.STRING(22)		
    },
    DTEMISSAOETIQPOFERTAS: {
      type: DataTypes.DATE		
    },
    DTULTALTERSRVPRC: {
      type: DataTypes.DATE		
    },
    FATORCONVERSAO: {
      type: DataTypes.STRING(22),
      defaultValue: '1'	
    },
    UNMEDIDA: {
      type: DataTypes.STRING(4)		
    },
    CODFUNCALTPTABELAATAC: {
      type: DataTypes.STRING(22)		
    },
    CODFUNCALTPVENDAATAC: {
      type: DataTypes.STRING(22)		
    },
    CODFUNCALTPOFERTA: {
      type: DataTypes.STRING(22)		
    },
    CODFUNCALTPOFERTAATAC: {
      type: DataTypes.STRING(22)		
    },
    PERDESCCARTAOFIDELIDADE: {
      type: DataTypes.STRING(22)		
    },
    ASSINATURA: {
      type: DataTypes.STRING(255)		
    },
    CONTROLEVASILHAME: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODFUNCINATIVO: {
      type: DataTypes.STRING(22)		
    },
    DTINATIVO: {
      type: DataTypes.DATE		
    },
    MOTIVOOFERTA: {
      type: DataTypes.STRING(60)		
    },
    DTULTALT: {
      type: DataTypes.DATE		
    },
    USARESTAURANTE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    IMPDATAEMBALAGEMBALANCA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    ENVIAINFNUTRI: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    PTABELAWEB: {
      type: DataTypes.STRING(22)		
    },
    PVENDAWEB: {
      type: DataTypes.STRING(22)		
    },
    POFERTAWEB: {
      type: DataTypes.STRING(22)		
    },
    DTOFERTAWEBINI: {
      type: DataTypes.DATE		
    },
    DTOFERTAWEBFIM: {
      type: DataTypes.DATE		
    },
    SITUACAOWEB: {
      type: DataTypes.STRING(1)		
    },
    DESCRICAOWEB: {
      type: DataTypes.STRING(100)		
    },
    QTDIAS: {
      type: DataTypes.STRING(22)		
    },
    CODCOB: {
      type: DataTypes.STRING(4)		
    },
    CODCLI: {
      type: DataTypes.STRING(22)		
    },
    QTFIXAMULTIPLICCHECKOUT: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTPTABELAWEB: {
      type: DataTypes.DATE		
    },
    QTEMISSAOETIQ: {
      type: DataTypes.STRING(22)		
    },
    CODINFEXTRABAL: {
      type: DataTypes.STRING(22)		
    },
    TARAF: {
      type: DataTypes.STRING(22)		
    },
    PERMITEVENDACOMINTERNO: {
      type: DataTypes.STRING(1)		
    },
    INDICPESAGEMOBRIGATORIA: {
      type: DataTypes.STRING(1)		
    },
    INDICPERMITEPORPREVENDA: {
      type: DataTypes.STRING(1)		
    },
    INDICPERMITEDIGITACAOPRECO: {
      type: DataTypes.STRING(1)		
    },
    INDICPERMITEDIGITACAODESCONTO: {
      type: DataTypes.STRING(1)		
    },
    INDICGERARCODPESOVAR: {
      type: DataTypes.STRING(1)		
    },
    INDICALERTAQUANTIDADE: {
      type: DataTypes.STRING(1)		
    },
    INDICPRODUCAOPROPRIA: {
      type: DataTypes.STRING(1)		
    },
    CODDIGITAQTDE: {
      type: DataTypes.STRING(1)		
    },
    PTABELAANT: {
      type: DataTypes.STRING(22)		
    },
    PTABELAATACANT: {
      type: DataTypes.STRING(22)		
    },
    PVENDAWEBANT: {
      type: DataTypes.STRING(22)		
    },
    PTABELAWEBANT: {
      type: DataTypes.STRING(22)		
    },
    PCOMINT1: {
      type: DataTypes.STRING(22)		
    },
    PCOMEXT1: {
      type: DataTypes.STRING(22)		
    },
    PCOMREP1: {
      type: DataTypes.STRING(22)		
    },
    BEBALCOOLICA: {
      type: DataTypes.STRING(1)		
    },
    DTAPLICPRECOVAREJO: {
      type: DataTypes.DATE		
    },
    DTAPLICPRECOATAC: {
      type: DataTypes.DATE		
    },
    INDCVENDECODINTERNO: {
      type: DataTypes.STRING(1)		
    },
    SOCIOTORCEDOR: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    DESTINOOFERTAVAREJO: {
      type: DataTypes.STRING(2),
      defaultValue: 'AF'	
    },
    DESTINOOFERTAATAC: {
      type: DataTypes.STRING(2),
      defaultValue: 'AF'	
    },
    GIROMES: {
      type: DataTypes.STRING(22)		
    },
    GIROMEDIODIA: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTGIRO: {
      type: DataTypes.DATE		
    },
    ALTURA: {
      type: DataTypes.STRING(22)		
    },
    LARGURA: {
      type: DataTypes.STRING(22)		
    },
    COMPRIMENTO: {
      type: DataTypes.STRING(22)		
    },
    VOLUME: {
      type: DataTypes.STRING(22)		
    },
    OBRIGALEITURACODBARRA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    IMPRESSAORESTAURANTE: {
      type: DataTypes.STRING(1)		
    },
    ENVIATELEMARKETING: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    ENVIAFRENTECAIXA: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    IMPRIMERESTAURANTE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PRODUTOCOZINHA: {
      type: DataTypes.STRING(1)		
    },
    TEMPOPREPARO: {
      type: DataTypes.STRING(22)		
    },
    TEMPOALERTA: {
      type: DataTypes.STRING(22)		
    },
    PERMITEIMPRESSAOETIQUETA: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    USAECOMMERCEUNILEVER: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    USAETIQUETAANTIFURTO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    MD5PAF: {
      type: DataTypes.STRING(200)		
    },
    ACEITAMARGEMREPLICADA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    ENVIAPENTREGA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PRODSEMCODBARRAS: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERMITEVENDACRTALIMENTACAO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    IDCIASHOP: {
      type: DataTypes.STRING(22)		
    },
    QTDVIASIMPRESSAOCOZINHA: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    JUSTIFICATIVAPRECO: {
      type: DataTypes.STRING(50)		
    },
    CODFRACIONADOR: {
      type: DataTypes.STRING(4)		
    },
    CODAUXILIARANTERIOR: {
      type: DataTypes.STRING(22)		
    },
    IONSYNC: {
      type: DataTypes.STRING(1)		
    },
    ENVIAECOMMERCE: {
      type: DataTypes.STRING(1)		
    },
    ATIVOECOMMERCE: {
      type: DataTypes.STRING(1)		
    },
    CODFILIALINTEGRACAO: {
      type: DataTypes.STRING(22)		
    },
    INFOPRODWEB: {
      type: DataTypes.STRING(4000)		
    },
    ORIGEMPED: {
      type: DataTypes.STRING(1),
      defaultValue: null	
    },
    DTALTERC5: {
      type: DataTypes.STRING(11)		
    },
    DTCADASTRO: {
      type: DataTypes.STRING(11)		
    },
    DTULALTERINTEGRA: {
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
      result.push({
        fields: ['CODPROD'],
        type: 'foreign key',
        references: { 
          table: PcProdut,
          field: 'CODPROD'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    

};