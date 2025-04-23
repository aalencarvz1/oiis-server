'use strict';


import { DataTypes, Sequelize } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcFornec from './PcFornec.js';
import PcDepto from './PcDepto.js';
import PcSecao from './PcSecao.js';
import PcMarca from './PcMarca.js';
import PcCategoria from './PcCategoria.js';
import PcLinhaProd from './PcLinhaProd.js';
import PcPrazo from './PcPrazo.js';
import PcDistrib from './PcDistrib.js';
import Utils from '../../../controllers/utils/Utils.js';

/**
 * class model
 */
export default class PcProdut extends BaseWinthorTableModel {

  //table fields
  declare CODPROD: string;
  declare DESCRICAO: string;
  declare EMBALAGEM: string;
  declare UNIDADE?: string;
  declare PESOLIQ?: string;
  declare PESOBRUTO?: string;
  declare CODEPTO: string;
  declare CODSEC: string;
  declare PCOMINT1?: string;
  declare TEMREPOS?: string;
  declare QTUNIT?: string;
  declare OBS?: string;
  declare PCOMREP1?: string;
  declare PCOMEXT1?: string;
  declare CODFORNEC: string;
  declare DTCADASTRO?: Date;
  declare VOLUME?: string;
  declare CODAUXILIAR?: string;
  declare CLASSE?: string;
  declare LASTROPAL?: string;
  declare ALTURAPAL?: string;
  declare QTTOTPAL?: string;
  declare PRAZOVAL?: string;
  declare QTUNITCX?: string;
  declare REVENDA?: string;
  declare IMPORTADO?: string;
  declare DTEXCLUSAO?: Date;
  declare MODULO?: string;
  declare RUA?: string;
  declare APTO?: string;
  declare DTULTALTCOM?: Date;
  declare CAMPANHA?: string;
  declare CODPRODPRINC?: string;
  declare OBS2?: string;
  declare PERCIPI?: string;
  declare UNIDADEMASTER?: string;
  declare DV?: string;
  declare CLASSEVENDA?: string;
  declare CLASSEMC?: string;
  declare CLASSEESTOQUE?: string;
  declare CLASSECOMPRA?: string;
  declare PERICM?: string;
  declare PERCDESC?: string;
  declare PERCBON?: string;
  declare PERCFRETE?: string;
  declare MOEDA?: string;
  declare DTDOLAR?: string;
  declare DESCRICAO1?: string;
  declare DESCRICAO2?: string;
  declare DESCRICAO3?: string;
  declare DESCRICAO4?: string;
  declare CLASSIFICFISCAL?: string;
  declare CUSTOREP?: string;
  declare NBM?: string;
  declare CODFAB?: string;
  declare PERCDESC1?: string;
  declare PERCDESC2?: string;
  declare PERCDESC3?: string;
  declare PERCDESC4?: string;
  declare PERICMSANTECIPADO?: string;
  declare CODCATEGORIA?: string;
  declare CODSUBCATEGORIA?: string;
  declare CODFILIAL?: string;
  declare TIPODESCARGA?: string;
  declare STATUS?: string;
  declare PERCOUTRASDESP?: string;
  declare PERCFRETEFOB?: string;
  declare PERCDESPADICIONAL?: string;
  declare VLBONIFIC?: string;
  declare PRECOFIXO?: string;
  declare PISCOFINSRETIDO?: string;
  declare IVARESSARC?: string;
  declare ICMSRESSARC?: string;
  declare TIPOVOLUMEDESCARGA?: string;
  declare USACLASSIFICACAO?: string;
  declare PERCICMRED?: string;
  declare PERCIVA?: string;
  declare PERCALIQINT?: string;
  declare PERCALIQEXT?: string;
  declare CODAUXILIAR2?: string;
  declare PASSELIVRE?: string;
  declare CODPASSEFISCAL?: string;
  declare TIPOALTURAPALETE?: string;
  declare NUMLOTE?: string;
  declare DTVENC?: Date;
  declare PERINDENIZ?: string;
  declare PERPIS?: string;
  declare MULTIPLO?: string;
  declare TIPOMERC?: string;
  declare NORMAFORNECEDOR?: string;
  declare ACEITAVENDAFRACAO?: string;
  declare CODFUNCCADASTRO?: string;
  declare CODFUNCULTALTER?: string;
  declare MARGEMMIN?: string;
  declare TIPOPROD?: string;
  declare CODPRODMASTER?: string;
  declare VLPAUTA?: string;
  declare EMBALAGEMMASTER?: string;
  declare PSICOTROPICO?: string;
  declare CODLINHAPROD?: string;
  declare CUSTOREPTAB?: string;
  declare PRECOMAXCONSUM?: string;
  declare PRECOMAXCONSUMTAB?: string;
  declare PERCDESC5?: string;
  declare NUMLISTAINVENTROT?: string;
  declare NUMSEQINVENTROT?: string;
  declare PERCBONIFICVENDA?: string;
  declare TIPOTRIBUTMEDIC?: string;
  declare PERCSUFRAMA?: string;
  declare EXPORTABALANCA?: string;
  declare CODINFNUTRI?: string;
  declare SEQTABPRECO?: string;
  declare CODPRINCIPATIVO?: string;
  declare CODPRODSINTEGRA?: string;
  declare INFORMACOESTECNICAS?: string;
  declare FRETEESPECIAL?: string;
  declare DIRFOTOPROD?: string;
  declare PESOBRUTOMASTER?: string;
  declare PERCDESC6?: string;
  declare PERCDESC7?: string;
  declare PERCDESC8?: string;
  declare PERCDESC9?: string;
  declare PERCDESC10?: string;
  declare NUMORIGINAL?: string;
  declare DESCRICAO5?: string;
  declare DESCRICAO6?: string;
  declare DESCRICAO7?: string;
  declare CODDISTRIB?: string;
  declare PERCVENDA?: string;
  declare PAISORIGEM?: string;
  declare USAWMS?: string;
  declare UTILIZARVASILHAME?: string;
  declare CODVASILHAME?: string;
  declare TIPOCOMISSAO?: string;
  declare TIPOESTOQUE?: string;
  declare PESOPECA?: string;
  declare RESTRICAOTRANSP?: string;
  declare CODPRAZOENT?: string;
  declare QTMETROS?: string;
  declare CODGRADE?: string;
  declare CODCOR?: string;
  declare COLUNAGRADE?: string;
  declare ESTOQUEPORLOTE?: string;
  declare PROXNUMLOTE?: string;
  declare CONTROLAVALIDADEDOLOTE?: string;
  declare PREFIXOLOTE?: string;
  declare PRAZOMEDIOVENDA?: string;
  declare CONCILIAIMPORTACAO?: string;
  declare PERCBONOUTRAS?: string;
  declare VLMAODEOBRA?: string;
  declare CODRISCO?: string;
  declare CODACONDICIONAMENTO?: string;
  declare CONFERENOCHECKOUT?: string;
  declare CODAGRUPMAPASEP?: string;
  declare PERCPERDAKG?: string;
  declare CHECARMULTIPLOVENDABNF?: string;
  declare CLASSECOMISSAO?: string;
  declare DENSIDADE?: string;
  declare CODPRODEMBALAGEM?: string;
  declare PERCOFINS?: string;
  declare DTULTALTER?: Date;
  declare PERCDIFERENCAKGFRIO?: string;
  declare ENVIARFORCAVENDAS?: string;
  declare DADOSTECNICOS?: string;
  declare PRAZOMINVALIDADE?: string;
  declare PRAZOMAXVALIDADE?: string;
  declare UTILIZAPRECOMAXCONSUMIDOR?: string;
  declare DESTAQUEFICHATECNICA?: string;
  declare NUMPAG?: string;
  declare LETRAPAGINA?: string;
  declare SEQPAGINA?: string;
  declare CODONU?: string;
  declare NATUREZAPRODUTO?: string;
  declare IMUNETRIB?: string;
  declare CODFORMATOPAPEL?: string;
  declare GRAMATURA?: string;
  declare CODUNIDMEDIDANF?: string;
  declare FATORCONVERSAOKG?: string;
  declare DESCPAPEL?: string;
  declare PESOVARIAVEL?: string;
  declare COMPRACONSIGNADO?: string;
  declare PRAZOGARANTIA?: string;
  declare QTDEMAXSEPARPEDIDO?: string;
  declare PRAZOMAXINDENIZACAO?: string;
  declare CODFILIALRETIRA?: string;
  declare CODMARCA?: string;
  declare PESOEMBALAGEM?: string;
  declare NUMDIASVALIDADEMIN?: string;
  declare PRECIFICESTRANGEIRA?: string;
  declare FUNDAPIANO?: string;
  declare CONTROLAPATRIMONIO?: string;
  declare EXTIPI?: string;
  declare ANVISA?: string;
  declare SIMPRO?: string;
  declare PRAZOMAXVENDA?: string;
  declare DTINICONTLOTE?: Date;
  declare CONCENTRACAO?: string;
  declare SUGVENDA?: string;
  declare LITRAGEM?: string;
  declare CODNCMEX?: string;
  declare GTINCODAUXILIAR?: string;
  declare GTINCODAUXILIAR2?: string;
  declare NOMEECOMMERCE?: string;
  declare TITULOECOMMERCE?: string;
  declare SUBTITULOECOMMERCE?: string;
  declare DIRETORIOFOTOS?: string;
  declare TIPOMEDICAMENTO?: string;
  declare GRUPOFATURAMENTO?: string;
  declare CODDEPTOWEB?: string;
  declare CODSECAOWEB?: string;
  declare CODCATEGORIAWEB?: string;
  declare CODSUBCATEGORIAWEB?: string;
  declare CODTABLIT?: string;
  declare CODGRULIT?: string;
  declare CODLINHAPRAZO?: string;
  declare UTILIZASELO?: string;
  declare QTMINSUGCOMPRA?: string;
  declare ENVIAINFTECNICANFE?: string;
  declare CONTROLADOIBAMA?: string;
  declare CESTABASICALEGIS?: string;
  declare CODINTERNO?: string;
  declare MYFROTA?: string;
  declare USALICENCAIMPORTACAO?: string;
  declare MULTIPLOCOMPRAS?: string;
  declare REGISTROMSMED?: string;
  declare RETINOICO?: string;
  declare FATORCONVTRIB?: string;
  declare UNIDADETRIB?: string;
  declare ANP?: string;
  declare STATUSSUCATA?: string;
  declare CODPRODFORNEC?: string;
  declare TIPOCUSTOTRANSF?: string;
  declare CODCLASSETERAPEUTSNGPC?: string;
  declare USOPROLONGADOSNGPC?: string;
  declare VALORTARAPORPECA?: string;
  declare TARAPORPECA?: string;
  declare FARMACIAPOPULAR?: string;
  declare PERCPRODEIC?: string;
  declare CODPRODANTUTICAD?: string;
  declare DTINICODPRODANTUTICAD?: Date;
  declare DTPRIMOVNOVCODPROD?: Date;
  declare CODSUBMARCA?: string;
  declare ALTURA?: string;
  declare ALTURATOTAL?: string;
  declare DIAMETROINTERNO?: string;
  declare DIAMETROEXTERNO?: string;
  declare DIASCONSECENT?: string;
  declare NUMREGAGRMAP?: string;
  declare IDEMBALAGEM?: string;
  declare TAMANHOPECA?: string;
  declare PESOMINIMO?: string;
  declare PESOMAXIMO?: string;
  declare DTFINUTICODPRODANTUTICAD?: Date;
  declare DSCPRODANTUTICAD?: string;
  declare IDDESTAQUE?: string;
  declare INDUZLOTE?: string;
  declare TIPOEMBARQUEIMP?: string;
  declare CODSALMED?: string;
  declare FORMAESTERILIZACAO?: string;
  declare PESOLIQDI?: string;
  declare ENVIAECOMMERCE?: string;
  declare GTINCODAUXILIARTRIB?: string;
  declare CODAUXILIARTRIB?: string;
  declare VERIFCRAMOATIVCALCST?: string;
  declare REGISTROPECA?: string;
  declare COMODATO?: string;
  declare PRODUSAENGRADADO?: string;
  declare CODPRODENGRADADO?: string;
  declare FATCONVPRODENGRAD?: string;
  declare PERMITIRBROKERTV5?: string;
  declare ANTIDUMPING?: string;
  declare DTULTALTCAD?: Date;
  declare CODFUNCULTALTCAD?: string;
  declare LICITUSARCAP?: string;
  declare LICITPERCDESONERACAP?: string;
  declare LICITCONVENIOISENCAOICMS?: string;
  declare USAECOMMERCEUNILEVER?: string;
  declare LICITUSARDESONERAICM?: string;
  declare LICITPERCDESONERAICM?: string;
  declare PESOBRUTOFRETE?: string;
  declare EMBVENDAECOMMERCEUNILEVER?: string;
  declare ACEITATROCAINSERVIVEL?: string;
  declare CODINSERVIVEL?: string;
  declare CARCACABATERIA?: string;
  declare UTILIZAPRECOFABRICA?: string;
  declare ISENTOTCIF?: string;
  declare UNIDADETRIBEX?: string;
  declare FATORCONVTRIBEX?: string;
  declare DESCANP?: string;
  declare BLOQUEIOACORDOPARCERIA?: string;
  declare CODAGREGACAO?: string;
  declare USACODAGREGACAO?: string;
  declare ISENTOSTCOZINHAINDUSTRIAL?: string;
  declare CODPRINCIPATIVO2?: string;
  declare PGLP?: string;
  declare PGNN?: string;
  declare PGNI?: string;
  declare VPART?: string;
  declare FATORCONVERSAOBIONEXO?: string;
  declare UNIDADEPADRAO?: string;
  declare TIPOINTEGRACAOB2B?: string;
  declare GRAMATURALICIT?: string;
  declare CODMOTISENCAOANVISA?: string;
  declare CODSAZONALIDADEMED?: string;
  declare CODADWORDS?: string;
  declare EXIBESEMESTOQUEECOMMERCE?: string;
  declare LINKID?: string;
  declare CODCAMPLOMADEE?: string;
  declare UTILIZAINTEGRACAOKIBON?: string;
  declare PREDOMINANCIA?: string;
  declare NUMERO?: string;
  declare ALIQUOTATCIF?: string;
  declare PMPFMEDICAMENTO?: string;
  declare PRECOFABRICA?: string;
  declare OBSCONTXCAMPO?: string;
  declare OBSCONTXTEXTO?: string;
  declare OBSFISCOXCAMPO?: string;
  declare OBSFISCOXTEXTO?: string;
  declare CONVENIOISENCAOICMSMED?: string;
  declare PERMITEMULTIPLICACAOPDV?: string;


  static id = 30205;
  static tableName = this.name.toUpperCase();
  static adjustedForeignKeys : boolean = false;
  static model = null;


  static fields = {      
        CODPROD: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false,
      defaultValue: null 	
    },
    DESCRICAO: {
      type: DataTypes.STRING(120),
      allowNull: false,
      defaultValue: null 	
    },
    EMBALAGEM: {
      type: DataTypes.STRING(12),
      allowNull: false,
      defaultValue: null 	
    },
    UNIDADE: {
      type: DataTypes.STRING(2)		
    },
    PESOLIQ: {
      type: DataTypes.STRING(22)		
    },
    PESOBRUTO: {
      type: DataTypes.STRING(22)		
    },
    CODEPTO: {
      type: DataTypes.STRING(22),
      allowNull: false,
      defaultValue: null 	
    },
    CODSEC: {
      type: DataTypes.STRING(22),
      allowNull: false,
      defaultValue: null 	
    },
    PCOMINT1: {
      type: DataTypes.STRING(22)		
    },
    TEMREPOS: {
      type: DataTypes.STRING(22)		
    },
    QTUNIT: {
      type: DataTypes.STRING(22)		
    },
    OBS: {
      type: DataTypes.STRING(2)		
    },
    PCOMREP1: {
      type: DataTypes.STRING(22)		
    },
    PCOMEXT1: {
      type: DataTypes.STRING(22)		
    },
    CODFORNEC: {
      type: DataTypes.STRING(22),
      allowNull: false,
      defaultValue: null 	
    },
    DTCADASTRO: {
      type: DataTypes.DATE		
    },
    VOLUME: {
      type: DataTypes.STRING(22)		
    },
    CODAUXILIAR: {
      type: DataTypes.STRING(22),
      defaultValue: null	
    },
    CLASSE: {
      type: DataTypes.STRING(1)		
    },
    LASTROPAL: {
      type: DataTypes.STRING(22)		
    },
    ALTURAPAL: {
      type: DataTypes.STRING(22)		
    },
    QTTOTPAL: {
      type: DataTypes.STRING(22)		
    },
    PRAZOVAL: {
      type: DataTypes.STRING(22)		
    },
    QTUNITCX: {
      type: DataTypes.STRING(22)		
    },
    REVENDA: {
      type: DataTypes.STRING(1)		
    },
    IMPORTADO: {
      type: DataTypes.STRING(1)		
    },
    DTEXCLUSAO: {
      type: DataTypes.DATE		
    },
    MODULO: {
      type: DataTypes.STRING(22),
      defaultValue: null	
    },
    RUA: {
      type: DataTypes.STRING(22),
      defaultValue: null	
    },
    APTO: {
      type: DataTypes.STRING(22),
      defaultValue: null	
    },
    DTULTALTCOM: {
      type: DataTypes.DATE		
    },
    CAMPANHA: {
      type: DataTypes.STRING(1)		
    },
    CODPRODPRINC: {
      type: DataTypes.STRING(22)		
    },
    OBS2: {
      type: DataTypes.STRING(2)		
    },
    PERCIPI: {
      type: DataTypes.STRING(22)		
    },
    UNIDADEMASTER: {
      type: DataTypes.STRING(2)		
    },
    DV: {
      type: DataTypes.STRING(22)		
    },
    CLASSEVENDA: {
      type: DataTypes.STRING(1)		
    },
    CLASSEMC: {
      type: DataTypes.STRING(1)		
    },
    CLASSEESTOQUE: {
      type: DataTypes.STRING(1)		
    },
    CLASSECOMPRA: {
      type: DataTypes.STRING(1)		
    },
    PERICM: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC: {
      type: DataTypes.STRING(22)		
    },
    PERCBON: {
      type: DataTypes.STRING(22)		
    },
    PERCFRETE: {
      type: DataTypes.STRING(22)		
    },
    MOEDA: {
      type: DataTypes.STRING(1)		
    },
    DTDOLAR: {
      type: DataTypes.STRING(1)		
    },
    DESCRICAO1: {
      type: DataTypes.STRING(45)		
    },
    DESCRICAO2: {
      type: DataTypes.STRING(45)		
    },
    DESCRICAO3: {
      type: DataTypes.STRING(45)		
    },
    DESCRICAO4: {
      type: DataTypes.STRING(45)		
    },
    CLASSIFICFISCAL: {
      type: DataTypes.STRING(20)		
    },
    CUSTOREP: {
      type: DataTypes.STRING(22)		
    },
    NBM: {
      type: DataTypes.STRING(15)		
    },
    CODFAB: {
      type: DataTypes.STRING(30)		
    },
    PERCDESC1: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC2: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC3: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC4: {
      type: DataTypes.STRING(22)		
    },
    PERICMSANTECIPADO: {
      type: DataTypes.STRING(22)		
    },
    CODCATEGORIA: {
      type: DataTypes.STRING(22)		
    },
    CODSUBCATEGORIA: {
      type: DataTypes.STRING(22)		
    },
    CODFILIAL: {
      type: DataTypes.STRING(2)		
    },
    TIPODESCARGA: {
      type: DataTypes.STRING(1)		
    },
    STATUS: {
      type: DataTypes.STRING(1)		
    },
    PERCOUTRASDESP: {
      type: DataTypes.STRING(22)		
    },
    PERCFRETEFOB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESPADICIONAL: {
      type: DataTypes.STRING(22)		
    },
    VLBONIFIC: {
      type: DataTypes.STRING(22)		
    },
    PRECOFIXO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PISCOFINSRETIDO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    IVARESSARC: {
      type: DataTypes.STRING(22)		
    },
    ICMSRESSARC: {
      type: DataTypes.STRING(22)		
    },
    TIPOVOLUMEDESCARGA: {
      type: DataTypes.STRING(2)		
    },
    USACLASSIFICACAO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERCICMRED: {
      type: DataTypes.STRING(22)		
    },
    PERCIVA: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQINT: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQEXT: {
      type: DataTypes.STRING(22)		
    },
    CODAUXILIAR2: {
      type: DataTypes.STRING(22)		
    },
    PASSELIVRE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODPASSEFISCAL: {
      type: DataTypes.STRING(22)		
    },
    TIPOALTURAPALETE: {
      type: DataTypes.STRING(22)		
    },
    NUMLOTE: {
      type: DataTypes.STRING(20)		
    },
    DTVENC: {
      type: DataTypes.DATE		
    },
    PERINDENIZ: {
      type: DataTypes.STRING(22)		
    },
    PERPIS: {
      type: DataTypes.STRING(22)		
    },
    MULTIPLO: {
      type: DataTypes.STRING(22),
      defaultValue: '1'	
    },
    TIPOMERC: {
      type: DataTypes.STRING(2)		
    },
    NORMAFORNECEDOR: {
      type: DataTypes.STRING(10)		
    },
    ACEITAVENDAFRACAO: {
      type: DataTypes.STRING(1)		
    },
    CODFUNCCADASTRO: {
      type: DataTypes.STRING(22)		
    },
    CODFUNCULTALTER: {
      type: DataTypes.STRING(22)		
    },
    MARGEMMIN: {
      type: DataTypes.STRING(22)		
    },
    TIPOPROD: {
      type: DataTypes.STRING(22)		
    },
    CODPRODMASTER: {
      type: DataTypes.STRING(22)		
    },
    VLPAUTA: {
      type: DataTypes.STRING(22)		
    },
    EMBALAGEMMASTER: {
      type: DataTypes.STRING(12)		
    },
    PSICOTROPICO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODLINHAPROD: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREPTAB: {
      type: DataTypes.STRING(22)		
    },
    PRECOMAXCONSUM: {
      type: DataTypes.STRING(22)		
    },
    PRECOMAXCONSUMTAB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC5: {
      type: DataTypes.STRING(22)		
    },
    NUMLISTAINVENTROT: {
      type: DataTypes.STRING(22)		
    },
    NUMSEQINVENTROT: {
      type: DataTypes.STRING(22)		
    },
    PERCBONIFICVENDA: {
      type: DataTypes.STRING(22)		
    },
    TIPOTRIBUTMEDIC: {
      type: DataTypes.STRING(2)		
    },
    PERCSUFRAMA: {
      type: DataTypes.STRING(22)		
    },
    EXPORTABALANCA: {
      type: DataTypes.STRING(1)		
    },
    CODINFNUTRI: {
      type: DataTypes.STRING(22)		
    },
    SEQTABPRECO: {
      type: DataTypes.STRING(22)		
    },
    CODPRINCIPATIVO: {
      type: DataTypes.STRING(22)		
    },
    CODPRODSINTEGRA: {
      type: DataTypes.STRING(20)		
    },
    INFORMACOESTECNICAS: {
      type: DataTypes.STRING(500)		
    },
    FRETEESPECIAL: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    DIRFOTOPROD: {
      type: DataTypes.STRING(100)		
    },
    PESOBRUTOMASTER: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC6: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC7: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC8: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC9: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC10: {
      type: DataTypes.STRING(22)		
    },
    NUMORIGINAL: {
      type: DataTypes.STRING(20)		
    },
    DESCRICAO5: {
      type: DataTypes.STRING(45)		
    },
    DESCRICAO6: {
      type: DataTypes.STRING(45)		
    },
    DESCRICAO7: {
      type: DataTypes.STRING(45)		
    },
    CODDISTRIB: {
      type: DataTypes.STRING(4)		
    },
    PERCVENDA: {
      type: DataTypes.STRING(22)		
    },
    PAISORIGEM: {
      type: DataTypes.STRING(40)		
    },
    USAWMS: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    UTILIZARVASILHAME: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODVASILHAME: {
      type: DataTypes.STRING(22)		
    },
    TIPOCOMISSAO: {
      type: DataTypes.STRING(1),
      defaultValue: 'P'	
    },
    TIPOESTOQUE: {
      type: DataTypes.STRING(2)		
    },
    PESOPECA: {
      type: DataTypes.STRING(22)		
    },
    RESTRICAOTRANSP: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODPRAZOENT: {
      type: DataTypes.STRING(4)		
    },
    QTMETROS: {
      type: DataTypes.STRING(22)		
    },
    CODGRADE: {
      type: DataTypes.STRING(22)		
    },
    CODCOR: {
      type: DataTypes.STRING(22)		
    },
    COLUNAGRADE: {
      type: DataTypes.STRING(22)		
    },
    ESTOQUEPORLOTE: {
      type: DataTypes.STRING(1)		
    },
    PROXNUMLOTE: {
      type: DataTypes.STRING(22)		
    },
    CONTROLAVALIDADEDOLOTE: {
      type: DataTypes.STRING(1)		
    },
    PREFIXOLOTE: {
      type: DataTypes.STRING(5)		
    },
    PRAZOMEDIOVENDA: {
      type: DataTypes.STRING(22)		
    },
    CONCILIAIMPORTACAO: {
      type: DataTypes.STRING(1)		
    },
    PERCBONOUTRAS: {
      type: DataTypes.STRING(22)		
    },
    VLMAODEOBRA: {
      type: DataTypes.STRING(22)		
    },
    CODRISCO: {
      type: DataTypes.STRING(4)		
    },
    CODACONDICIONAMENTO: {
      type: DataTypes.STRING(4)		
    },
    CONFERENOCHECKOUT: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    CODAGRUPMAPASEP: {
      type: DataTypes.STRING(2)		
    },
    PERCPERDAKG: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    CHECARMULTIPLOVENDABNF: {
      type: DataTypes.STRING(1)		
    },
    CLASSECOMISSAO: {
      type: DataTypes.STRING(2)		
    },
    DENSIDADE: {
      type: DataTypes.STRING(100)		
    },
    CODPRODEMBALAGEM: {
      type: DataTypes.STRING(22)		
    },
    PERCOFINS: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTER: {
      type: DataTypes.DATE		
    },
    PERCDIFERENCAKGFRIO: {
      type: DataTypes.STRING(22)		
    },
    ENVIARFORCAVENDAS: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    DADOSTECNICOS: {
      type: DataTypes.STRING(4000)		
    },
    PRAZOMINVALIDADE: {
      type: DataTypes.STRING(22)		
    },
    PRAZOMAXVALIDADE: {
      type: DataTypes.STRING(22)		
    },
    UTILIZAPRECOMAXCONSUMIDOR: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    DESTAQUEFICHATECNICA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    NUMPAG: {
      type: DataTypes.STRING(22)		
    },
    LETRAPAGINA: {
      type: DataTypes.STRING(1)		
    },
    SEQPAGINA: {
      type: DataTypes.STRING(22)		
    },
    CODONU: {
      type: DataTypes.STRING(4)		
    },
    NATUREZAPRODUTO: {
      type: DataTypes.STRING(2)		
    },
    IMUNETRIB: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODFORMATOPAPEL: {
      type: DataTypes.STRING(22)		
    },
    GRAMATURA: {
      type: DataTypes.STRING(22)		
    },
    CODUNIDMEDIDANF: {
      type: DataTypes.STRING(22)		
    },
    FATORCONVERSAOKG: {
      type: DataTypes.STRING(22)		
    },
    DESCPAPEL: {
      type: DataTypes.STRING(60)		
    },
    PESOVARIAVEL: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    COMPRACONSIGNADO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PRAZOGARANTIA: {
      type: DataTypes.STRING(22)		
    },
    QTDEMAXSEPARPEDIDO: {
      type: DataTypes.STRING(22)		
    },
    PRAZOMAXINDENIZACAO: {
      type: DataTypes.STRING(22)		
    },
    CODFILIALRETIRA: {
      type: DataTypes.STRING(2)		
    },
    CODMARCA: {
      type: DataTypes.STRING(22)		
    },
    PESOEMBALAGEM: {
      type: DataTypes.STRING(22)		
    },
    NUMDIASVALIDADEMIN: {
      type: DataTypes.STRING(22)		
    },
    PRECIFICESTRANGEIRA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    FUNDAPIANO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CONTROLAPATRIMONIO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    EXTIPI: {
      type: DataTypes.STRING(3)		
    },
    ANVISA: {
      type: DataTypes.STRING(20)		
    },
    SIMPRO: {
      type: DataTypes.STRING(20)		
    },
    PRAZOMAXVENDA: {
      type: DataTypes.STRING(22)		
    },
    DTINICONTLOTE: {
      type: DataTypes.DATE		
    },
    CONCENTRACAO: {
      type: DataTypes.STRING(22)		
    },
    SUGVENDA: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    LITRAGEM: {
      type: DataTypes.STRING(22)		
    },
    CODNCMEX: {
      type: DataTypes.STRING(20)		
    },
    GTINCODAUXILIAR: {
      type: DataTypes.STRING(22)		
    },
    GTINCODAUXILIAR2: {
      type: DataTypes.STRING(22)		
    },
    NOMEECOMMERCE: {
      type: DataTypes.STRING(200)		
    },
    TITULOECOMMERCE: {
      type: DataTypes.STRING(200)		
    },
    SUBTITULOECOMMERCE: {
      type: DataTypes.STRING(200)		
    },
    DIRETORIOFOTOS: {
      type: DataTypes.STRING(200)		
    },
    TIPOMEDICAMENTO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    GRUPOFATURAMENTO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODDEPTOWEB: {
      type: DataTypes.STRING(22)		
    },
    CODSECAOWEB: {
      type: DataTypes.STRING(22)		
    },
    CODCATEGORIAWEB: {
      type: DataTypes.STRING(22)		
    },
    CODSUBCATEGORIAWEB: {
      type: DataTypes.STRING(22)		
    },
    CODTABLIT: {
      type: DataTypes.STRING(2)		
    },
    CODGRULIT: {
      type: DataTypes.STRING(2)		
    },
    CODLINHAPRAZO: {
      type: DataTypes.STRING(22)		
    },
    UTILIZASELO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    QTMINSUGCOMPRA: {
      type: DataTypes.STRING(22)		
    },
    ENVIAINFTECNICANFE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CONTROLADOIBAMA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CESTABASICALEGIS: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODINTERNO: {
      type: DataTypes.STRING(20)		
    },
    MYFROTA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    USALICENCAIMPORTACAO: {
      type: DataTypes.STRING(1)		
    },
    MULTIPLOCOMPRAS: {
      type: DataTypes.STRING(22)		
    },
    REGISTROMSMED: {
      type: DataTypes.STRING(13)		
    },
    RETINOICO: {
      type: DataTypes.STRING(1),
      defaultValue: 'M'	
    },
    FATORCONVTRIB: {
      type: DataTypes.STRING(22)		
    },
    UNIDADETRIB: {
      type: DataTypes.STRING(6)		
    },
    ANP: {
      type: DataTypes.STRING(22)		
    },
    STATUSSUCATA: {
      type: DataTypes.STRING(22)		
    },
    CODPRODFORNEC: {
      type: DataTypes.STRING(22)		
    },
    TIPOCUSTOTRANSF: {
      type: DataTypes.STRING(1)		
    },
    CODCLASSETERAPEUTSNGPC: {
      type: DataTypes.STRING(22)		
    },
    USOPROLONGADOSNGPC: {
      type: DataTypes.STRING(1)		
    },
    VALORTARAPORPECA: {
      type: DataTypes.STRING(22)		
    },
    TARAPORPECA: {
      type: DataTypes.STRING(22)		
    },
    FARMACIAPOPULAR: {
      type: DataTypes.STRING(1)		
    },
    PERCPRODEIC: {
      type: DataTypes.STRING(22)		
    },
    CODPRODANTUTICAD: {
      type: DataTypes.STRING(20)		
    },
    DTINICODPRODANTUTICAD: {
      type: DataTypes.DATE		
    },
    DTPRIMOVNOVCODPROD: {
      type: DataTypes.DATE		
    },
    CODSUBMARCA: {
      type: DataTypes.STRING(22)		
    },
    ALTURA: {
      type: DataTypes.STRING(22)		
    },
    ALTURATOTAL: {
      type: DataTypes.STRING(22)		
    },
    DIAMETROINTERNO: {
      type: DataTypes.STRING(22)		
    },
    DIAMETROEXTERNO: {
      type: DataTypes.STRING(22)		
    },
    DIASCONSECENT: {
      type: DataTypes.STRING(22)		
    },
    NUMREGAGRMAP: {
      type: DataTypes.STRING(10)		
    },
    IDEMBALAGEM: {
      type: DataTypes.STRING(22)		
    },
    TAMANHOPECA: {
      type: DataTypes.STRING(22)		
    },
    PESOMINIMO: {
      type: DataTypes.STRING(22)		
    },
    PESOMAXIMO: {
      type: DataTypes.STRING(22)		
    },
    DTFINUTICODPRODANTUTICAD: {
      type: DataTypes.DATE		
    },
    DSCPRODANTUTICAD: {
      type: DataTypes.STRING(60)		
    },
    IDDESTAQUE: {
      type: DataTypes.STRING(8)		
    },
    INDUZLOTE: {
      type: DataTypes.STRING(1)		
    },
    TIPOEMBARQUEIMP: {
      type: DataTypes.STRING(50)		
    },
    CODSALMED: {
      type: DataTypes.STRING(22)		
    },
    FORMAESTERILIZACAO: {
      type: DataTypes.STRING(500)		
    },
    PESOLIQDI: {
      type: DataTypes.STRING(22)		
    },
    ENVIAECOMMERCE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    GTINCODAUXILIARTRIB: {
      type: DataTypes.STRING(22)		
    },
    CODAUXILIARTRIB: {
      type: DataTypes.STRING(22)		
    },
    VERIFCRAMOATIVCALCST: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    REGISTROPECA: {
      type: DataTypes.STRING(15)		
    },
    COMODATO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PRODUSAENGRADADO: {
      type: DataTypes.STRING(1)		
    },
    CODPRODENGRADADO: {
      type: DataTypes.STRING(22)		
    },
    FATCONVPRODENGRAD: {
      type: DataTypes.STRING(22)		
    },
    PERMITIRBROKERTV5: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    ANTIDUMPING: {
      type: DataTypes.STRING(1)		
    },
    DTULTALTCAD: {
      type: DataTypes.DATE		
    },
    CODFUNCULTALTCAD: {
      type: DataTypes.STRING(22)		
    },
    LICITUSARCAP: {
      type: DataTypes.STRING(1)		
    },
    LICITPERCDESONERACAP: {
      type: DataTypes.STRING(22)		
    },
    LICITCONVENIOISENCAOICMS: {
      type: DataTypes.STRING(40)		
    },
    USAECOMMERCEUNILEVER: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    LICITUSARDESONERAICM: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    LICITPERCDESONERAICM: {
      type: DataTypes.STRING(22)		
    },
    PESOBRUTOFRETE: {
      type: DataTypes.STRING(22)		
    },
    EMBVENDAECOMMERCEUNILEVER: {
      type: DataTypes.STRING(1),
      defaultValue: 'U'	
    },
    ACEITATROCAINSERVIVEL: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODINSERVIVEL: {
      type: DataTypes.STRING(22)		
    },
    CARCACABATERIA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    UTILIZAPRECOFABRICA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    ISENTOTCIF: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    UNIDADETRIBEX: {
      type: DataTypes.STRING(6)		
    },
    FATORCONVTRIBEX: {
      type: DataTypes.STRING(22)		
    },
    DESCANP: {
      type: DataTypes.STRING(95)		
    },
    BLOQUEIOACORDOPARCERIA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODAGREGACAO: {
      type: DataTypes.STRING(20)		
    },
    USACODAGREGACAO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    ISENTOSTCOZINHAINDUSTRIAL: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODPRINCIPATIVO2: {
      type: DataTypes.STRING(22)		
    },
    PGLP: {
      type: DataTypes.STRING(22)		
    },
    PGNN: {
      type: DataTypes.STRING(22)		
    },
    PGNI: {
      type: DataTypes.STRING(22)		
    },
    VPART: {
      type: DataTypes.STRING(22)		
    },
    FATORCONVERSAOBIONEXO: {
      type: DataTypes.STRING(22)		
    },
    UNIDADEPADRAO: {
      type: DataTypes.STRING(2)		
    },
    TIPOINTEGRACAOB2B: {
      type: DataTypes.STRING(22)		
    },
    GRAMATURALICIT: {
      type: DataTypes.STRING(22)		
    },
    CODMOTISENCAOANVISA: {
      type: DataTypes.STRING(255)		
    },
    CODSAZONALIDADEMED: {
      type: DataTypes.STRING(22)		
    },
    CODADWORDS: {
      type: DataTypes.STRING(200)		
    },
    EXIBESEMESTOQUEECOMMERCE: {
      type: DataTypes.STRING(1)		
    },
    LINKID: {
      type: DataTypes.STRING(255)		
    },
    CODCAMPLOMADEE: {
      type: DataTypes.STRING(200)		
    },
    UTILIZAINTEGRACAOKIBON: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PREDOMINANCIA: {
      type: DataTypes.STRING(2)		
    },
    NUMERO: {
      type: DataTypes.STRING(22)		
    },
    ALIQUOTATCIF: {
      type: DataTypes.STRING(22)		
    },
    PMPFMEDICAMENTO: {
      type: DataTypes.STRING(22)		
    },
    PRECOFABRICA: {
      type: DataTypes.STRING(22)		
    },
    OBSCONTXCAMPO: {
      type: DataTypes.STRING(20)		
    },
    OBSCONTXTEXTO: {
      type: DataTypes.STRING(60)		
    },
    OBSFISCOXCAMPO: {
      type: DataTypes.STRING(20)		
    },
    OBSFISCOXTEXTO: {
      type: DataTypes.STRING(60)		
    },
    CONVENIOISENCAOICMSMED: {
      type: DataTypes.STRING(1)		
    },
    PERMITEMULTIPLICACAOPDV: {
      type: DataTypes.STRING(1)		
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
        fields: ['CODFORNEC'],
        type: 'foreign key',
        references: { 
          table: PcFornec,
          field: 'CODFORNEC'
        }
      });
      result.push({
        fields: ['CODEPTO'],
        type: 'foreign key',
        references: { 
          table: PcDepto,
          field: 'CODEPTO'
        }
      });
      result.push({
        fields: ['CODSEC'],
        type: 'foreign key',
        references: { 
          table: PcSecao,
          field: 'CODSEC'
        }
      });
      result.push({
        fields: ['CODMARCA'],
        type: 'foreign key',
        references: { 
          table: PcMarca,
          field: 'CODMARCA'
        }
      });
      result.push({
        fields: ['CODCATEGORIA'],
        type: 'foreign key',
        references: { 
          table: PcCategoria,
          field: 'CODCATEGORIA'
        }
      });
      result.push({
        fields: ['CODPRAZOENT'],
        type: 'foreign key',
        references: { 
          table: PcPrazo,
          field: 'CODPRAZOENT'
        }
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }    

  static async getOneByID(id?: number | string, queryParams?: any) : Promise<any> {
    let result = null;
    if (Utils.hasValue(id)) {
        result = await this.getData({
          queryParams:{
            ...queryParams || {},
            where:{
              CODPROD:id
            }
          }
        });
        if (result && result.length) {
            result = result[0];
        }
    }
    return result;
  }

  /**
   * create data of model inherithed of this
   * @override
   * @static (pay attention to bindings)
   * @async (pay attention to await)
   * @created 2023-11-10
   */
  /*static async createData(params: any,returnRaw: boolean = true) {
    let queryParams = params.queryParams?.values || params.values || params.queryParams || params || {};
    let result = await this.create(queryParams,{returning:false, isNewRecord: true, transaction: params.transaction}); //out of buffer
    //let result = await this.build(queryParams,{isNewRecord: true}).save({returning: false, transaction: params.transaction}); //out of buffer
    result = await this.getOneByID(queryParams.CODPROD,{raw:returnRaw, transaction: params.transaction});
    return result;
  }
  static putData = this.createData;*/
  
};