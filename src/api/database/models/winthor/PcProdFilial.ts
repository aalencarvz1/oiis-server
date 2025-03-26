'use strict';


import { DataTypes } from 'sequelize';
import  BaseWinthorTableModel  from './BaseWinthorTableModel.js';
import PcFilial from './PcFilial.js';
import PcProdut from './PcProdut.js';

/**
 * class model
 */
export default class PcProdFilial extends BaseWinthorTableModel {

  //table fields
  declare CODPROD: string;
  declare CODFILIAL: string;
  declare CODCOMPRADOR?: string;
  declare PROIBIDAVENDA?: string;
  declare FORALINHA?: string;
  declare REVENDA?: string;
  declare ESTOQUEIDEAL?: string;
  declare MULTIPLO?: string;
  declare CHECARMULTIPLOVENDABNF?: string;
  declare ACEITAVENDAFRACAO?: string;
  declare QTMINAUTOSERV?: string;
  declare QTMINIMAATACADO?: string;
  declare QTMINIMAATACADOF?: string;
  declare CODDISPESTRUTURA?: string;
  declare ATIVO?: string;
  declare UTILIZAQTDESUPMULTIPLA?: string;
  declare PISCOFINSRETIDO?: string;
  declare PERPIS?: string;
  declare PERCOFINS?: string;
  declare CALCCREDIPI?: string;
  declare CLASSEVENDA?: string;
  declare CLASSE?: string;
  declare CLASSEESTOQUE?: string;
  declare PERDESCRETENCAO?: string;
  declare CONSIDERASTNFCUSTO?: string;
  declare ABASTEPALETE?: string;
  declare ABASTEPALETECX?: string;
  declare CODCARACPROD?: string;
  declare CODFUNCULTALTER?: string;
  declare CODROTINAULTALTER?: string;
  declare CODTIPOESTRUTURAPUL?: string;
  declare FRACIONADO?: string;
  declare LASTROPAL?: string;
  declare NIVELMAXIMOARM?: string;
  declare NIVELMINIMOARM?: string;
  declare NORMAPALETE?: string;
  declare PCKROTATIVO?: string;
  declare PERCTOLERANCIAVAL?: string;
  declare PESOPALETE?: string;
  declare PRAZOVAL?: string;
  declare QTPULMAOREGULADOR?: string;
  declare RESTRICAOBLOCADO?: string;
  declare TIPOCARGA?: string;
  declare TIPOPALPUL?: string;
  declare TIPOPROD?: string;
  declare USAPULMAOREGULADOR?: string;
  declare QTTOTPAL?: string;
  declare ALTURAPAL?: string;
  declare ESTOQUEPORSERIE?: string;
  declare USANUMEROSERIE?: string;
  declare PERCTOLERANCIACORTE?: string;
  declare GERAICMSLIVROFISCAL?: string;
  declare GERAICMSLIVROFISCALENT?: string;
  declare GERAICMSLIVROFISCALDEVFORNEC?: string;
  declare PCOMREP1?: string;
  declare PCOMINT1?: string;
  declare PCOMEXT1?: string;
  declare NOVACAIXAFLOWRACK?: string;
  declare CODSITTRIBPISCOFINS?: string;
  declare CONTROLEDEVALIDADE?: string;
  declare CODFIGURA?: string;
  declare PERCALIQVIGINT?: string;
  declare PERCTOLERANCIADEPURATRANSF?: string;
  declare VLPAUTAPISCOFINS?: string;
  declare USAPISCOFINSLIT?: string;
  declare BASEPISCOFINSLIT?: string;
  declare VLPISLIT?: string;
  declare VLCOFINSLIT?: string;
  declare QTMAXPEDVENDA?: string;
  declare CODSITTRIBPISCOFINSDEV?: string;
  declare PERCALTERCUSTOENT?: string;
  declare CODEXCECAOPISCOFINS?: string;
  declare TIPOVARIACAO?: string;
  declare ATUALIZAFILIALGESTAOWMS?: string;
  declare FILIALGESTAOWMS?: string;
  declare DIGITARQTMASTER?: string;
  declare PERCMAXVARPVENDA?: string;
  declare TIPOARREDUNIDMASTER?: string;
  declare ESTOQUEMIN?: string;
  declare TIPOESTOQUEMINIMO?: string;
  declare TIPOESTOQUEMAXIMO?: string;
  declare SUBCLASSE?: string;
  declare PERCARREDONDA?: string;
  declare TIPOSUGESTAO?: string;
  declare ESTOQUEMAX?: string;
  declare USARQTOSUN?: string;
  declare CODAUXILIARFAV?: string;
  declare EMITIRETQENT?: string;
  declare PERCDESC1?: string;
  declare PERCDESC2?: string;
  declare PERCDESC3?: string;
  declare PERCDESC4?: string;
  declare PERCDESC5?: string;
  declare PERCDESC6?: string;
  declare PERCDESC7?: string;
  declare PERCDESC8?: string;
  declare PERCDESC9?: string;
  declare PERCDESC10?: string;
  declare PERCDESC?: string;
  declare CUSTOREP?: string;
  declare PERCACRES?: string;
  declare PTABELAFORNEC?: string;
  declare PERCREDPMC?: string;
  declare CODUSUULTALTCOM?: string;
  declare ENVIARFORCAVENDAS?: string;
  declare QTMINSUGCOMPRA?: string;
  declare USAPMCBASEST?: string;
  declare GERABASEPISCOFINSSEMALIQ?: string;
  declare PERCDESC1TAB?: string;
  declare PERCDESC2TAB?: string;
  declare PERCDESC3TAB?: string;
  declare PERCDESC4TAB?: string;
  declare PERCDESC5TAB?: string;
  declare PERCDESC6TAB?: string;
  declare PERCDESC7TAB?: string;
  declare PERCDESC8TAB?: string;
  declare PERCDESC9TAB?: string;
  declare PERCDESC10TAB?: string;
  declare DTVIGENCIAPOLITICA?: Date;
  declare CUSTOREPANT?: string;
  declare CUSTOREPTAB?: string;
  declare MULTIPLOCOMPRAS?: string;
  declare DTULTATUPCOMPRA?: Date;
  declare CODUSUULTALTCOMTAB?: string;
  declare CODROTINAULTALTCOM?: string;
  declare CODROTINAULTALTCOMTAB?: string;
  declare DTULTALTCOM?: Date;
  declare ORIGMERCTRIB?: string;
  declare REGIMEESPECIAL?: string;
  declare CODTRIBSEFAZ?: string;
  declare CONSIDERASTGUIACUSTO?: string;
  declare CONSIDERASTNFCUSTOCONT?: string;
  declare CONSIDERASTGUIACUSTOCONT?: string;
  declare CONTROLARFCI?: string;
  declare VALIDACAPACIDADEPICKING?: string;
  declare ICMSDIFERIDO?: string;
  declare SUJDESONERACAO?: string;
  declare CNAEDESONERACAO?: string;
  declare PERCDESONERACAO?: string;
  declare PROTOCOLOICMS1785?: string;
  declare DTINICODPRODANTUTICAD?: Date;
  declare DTPRIMOVNOVCODPROD?: Date;
  declare CODPRODANTUTICAD?: string;
  declare DSCPRODANTUTICAD?: string;
  declare DTFINUTICODPRODANTUTICAD?: Date;
  declare NUMEROSSERIECONTROLADOS?: string;
  declare CONTROLANUMSERIE?: string;
  declare TIPOESTAGENDA?: string;
  declare PERCBON?: string;
  declare VLBONIFIC?: string;
  declare PERCBONIFIC?: string;
  declare VERBADINPORPERC?: string;
  declare PERCBONOUTRAS?: string;
  declare PERCBONTAB?: string;
  declare VLBONIFICTAB?: string;
  declare PERCBONIFICTAB?: string;
  declare PERCBONOUTRASTAB?: string;
  declare PRECOUTILIZADONFE?: string;
  declare PERCALIQVIGEXT?: string;
  declare CALCULAIPI?: string;
  declare CODFILIALRETIRABRINDE?: string;
  declare PERCARGAEFETIVA?: string;
  declare PERCMARGEMMIN?: string;
  declare PERCCARGEFETIV?: string;
  declare SEPARARPORET?: string;
  declare CFOPORIG?: string;
  declare MODBCST?: string;
  declare MODBCSTGUIA?: string;
  declare PRECOMAXCONSUM?: string;
  declare DESCONSIDERARCEST?: string;
  declare CODLOCALARMAZENAGEM?: string;
  declare GERARPCHISTEST?: string;
  declare CONFPEDPDV?: string;
  declare USAFORMULACAO?: string;
  declare CNPJFABRICANTE?: string;
  declare INDESCALARELEVANTE?: string;
  declare FABRICANTE?: string;
  declare PERACRESBASEIPI?: string;
  declare QTMINGONDOLA?: string;
  declare QTMAXGONDOLA?: string;
  declare CODCADPRIORIDADE?: string;
  declare EXPEDECAIXAFECHADA?: string;
  declare CODFILIALRETIRA?: string;
  declare PESOBRUTOMASTER?: string;
  declare PESOPECA?: string;
  declare CONSIDERACREDSTFCPBCRCUSTOCONT?: string;
  declare CONSIDERACREDSTFCPBCRCUSTOGER?: string;
  declare CONSIDERACREDICMSBCRCUSTOCONT?: string;
  declare CONSIDERACREDICMSBCRCUSTOGER?: string;
  declare PERMITECREDITOPRESUMIDO?: string;
  declare CLASSEVENDAQT?: string;
  declare ESTOQUEPORDTVALIDADEPK?: string;
  declare USAIDENTIFICADORUNICO?: string;
  declare ENVIAPRODUTOECOMMERCE?: string;
  declare CHAVENATURAL?: string;
  declare PMPFMEDICAMENTO?: string;
  declare PRECOFABRICA?: string;
  declare USAPMPFBASEST?: string;
  declare USAPFABBASEST?: string;
  declare PERCREDPMPF?: string;
  declare PERCREDPFAB?: string;
  declare CODGRUPOSEQNFE?: string;
  declare INFTECNICA?: string;
  declare CALCULAPISCOFINSCOMIPI?: string;
  declare IONSYNC?: string;
  declare PERCFCP?: string;
  declare SUJFCP?: string;
  declare CODFILIALINTEGRACAO?: string;
  declare USASISTEMATICAPE?: string;
  declare CONSIMPSUSPOUTDESP?: string;
  declare DTALTERC5?: string;
  declare SOMACREDCUSTOICMSVLUTENT?: string;
  declare QTMULTIPLA?: string;
  declare CUSTOREPANT2?: string;
  declare CUSTOREPANT3?: string;
  declare REGIMEESPECIALBA?: string;
  declare REGIMEESPECIALPBMED?: string;
  declare USAPMPFBASESTMG?: string;
  declare CODFIGURAFEEF?: string;


  static id = 30206;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {
    CODPROD: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false		
    },
    CODFILIAL: {
      type: DataTypes.STRING(2),
      primaryKey: true,
      allowNull: false		
    },
    CODCOMPRADOR: {
      type: DataTypes.STRING(22)		
    },
    PROIBIDAVENDA: {
      type: DataTypes.STRING(1)		
    },
    FORALINHA: {
      type: DataTypes.STRING(1)		
    },
    REVENDA: {
      type: DataTypes.STRING(1)		
    },
    ESTOQUEIDEAL: {
      type: DataTypes.STRING(22)		
    },
    MULTIPLO: {
      type: DataTypes.STRING(22)		
    },
    CHECARMULTIPLOVENDABNF: {
      type: DataTypes.STRING(1)		
    },
    ACEITAVENDAFRACAO: {
      type: DataTypes.STRING(1)		
    },
    QTMINAUTOSERV: {
      type: DataTypes.STRING(22)		
    },
    QTMINIMAATACADO: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    QTMINIMAATACADOF: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    CODDISPESTRUTURA: {
      type: DataTypes.STRING(22)		
    },
    ATIVO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    UTILIZAQTDESUPMULTIPLA: {
      type: DataTypes.STRING(1)		
    },
    PISCOFINSRETIDO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERPIS: {
      type: DataTypes.STRING(22)		
    },
    PERCOFINS: {
      type: DataTypes.STRING(22)		
    },
    CALCCREDIPI: {
      type: DataTypes.STRING(1)		
    },
    CLASSEVENDA: {
      type: DataTypes.STRING(1)		
    },
    CLASSE: {
      type: DataTypes.STRING(1)		
    },
    CLASSEESTOQUE: {
      type: DataTypes.STRING(1)		
    },
    PERDESCRETENCAO: {
      type: DataTypes.STRING(22)		
    },
    CONSIDERASTNFCUSTO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    ABASTEPALETE: {
      type: DataTypes.STRING(1)		
    },
    ABASTEPALETECX: {
      type: DataTypes.STRING(1)		
    },
    CODCARACPROD: {
      type: DataTypes.STRING(22)		
    },
    CODFUNCULTALTER: {
      type: DataTypes.STRING(22)		
    },
    CODROTINAULTALTER: {
      type: DataTypes.STRING(22)		
    },
    CODTIPOESTRUTURAPUL: {
      type: DataTypes.STRING(22)		
    },
    FRACIONADO: {
      type: DataTypes.STRING(1)		
    },
    LASTROPAL: {
      type: DataTypes.STRING(22)		
    },
    NIVELMAXIMOARM: {
      type: DataTypes.STRING(22)		
    },
    NIVELMINIMOARM: {
      type: DataTypes.STRING(22)		
    },
    NORMAPALETE: {
      type: DataTypes.STRING(1)		
    },
    PCKROTATIVO: {
      type: DataTypes.STRING(1)		
    },
    PERCTOLERANCIAVAL: {
      type: DataTypes.STRING(22)		
    },
    PESOPALETE: {
      type: DataTypes.STRING(22)		
    },
    PRAZOVAL: {
      type: DataTypes.STRING(22)		
    },
    QTPULMAOREGULADOR: {
      type: DataTypes.STRING(22)		
    },
    RESTRICAOBLOCADO: {
      type: DataTypes.STRING(22)		
    },
    TIPOCARGA: {
      type: DataTypes.STRING(22)		
    },
    TIPOPALPUL: {
      type: DataTypes.STRING(22)		
    },
    TIPOPROD: {
      type: DataTypes.STRING(22)		
    },
    USAPULMAOREGULADOR: {
      type: DataTypes.STRING(1)		
    },
    QTTOTPAL: {
      type: DataTypes.STRING(22)		
    },
    ALTURAPAL: {
      type: DataTypes.STRING(22)		
    },
    ESTOQUEPORSERIE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    USANUMEROSERIE: {
      type: DataTypes.STRING(1)		
    },
    PERCTOLERANCIACORTE: {
      type: DataTypes.STRING(22)		
    },
    GERAICMSLIVROFISCAL: {
      type: DataTypes.STRING(1)		
    },
    GERAICMSLIVROFISCALENT: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    GERAICMSLIVROFISCALDEVFORNEC: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    PCOMREP1: {
      type: DataTypes.STRING(22)		
    },
    PCOMINT1: {
      type: DataTypes.STRING(22)		
    },
    PCOMEXT1: {
      type: DataTypes.STRING(22)		
    },
    NOVACAIXAFLOWRACK: {
      type: DataTypes.STRING(1)		
    },
    CODSITTRIBPISCOFINS: {
      type: DataTypes.STRING(22)		
    },
    CONTROLEDEVALIDADE: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    CODFIGURA: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQVIGINT: {
      type: DataTypes.STRING(22)		
    },
    PERCTOLERANCIADEPURATRANSF: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    VLPAUTAPISCOFINS: {
      type: DataTypes.STRING(22)		
    },
    USAPISCOFINSLIT: {
      type: DataTypes.STRING(1)		
    },
    BASEPISCOFINSLIT: {
      type: DataTypes.STRING(22)		
    },
    VLPISLIT: {
      type: DataTypes.STRING(22)		
    },
    VLCOFINSLIT: {
      type: DataTypes.STRING(22)		
    },
    QTMAXPEDVENDA: {
      type: DataTypes.STRING(22)		
    },
    CODSITTRIBPISCOFINSDEV: {
      type: DataTypes.STRING(22)		
    },
    PERCALTERCUSTOENT: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    CODEXCECAOPISCOFINS: {
      type: DataTypes.STRING(22)		
    },
    TIPOVARIACAO: {
      type: DataTypes.STRING(1)		
    },
    ATUALIZAFILIALGESTAOWMS: {
      type: DataTypes.STRING(1)		
    },
    FILIALGESTAOWMS: {
      type: DataTypes.STRING(2)		
    },
    DIGITARQTMASTER: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERCMAXVARPVENDA: {
      type: DataTypes.STRING(22)		
    },
    TIPOARREDUNIDMASTER: {
      type: DataTypes.STRING(1)		
    },
    ESTOQUEMIN: {
      type: DataTypes.STRING(22)		
    },
    TIPOESTOQUEMINIMO: {
      type: DataTypes.STRING(1),
      defaultValue: 'M'	
    },
    TIPOESTOQUEMAXIMO: {
      type: DataTypes.STRING(1),
      defaultValue: 'M'	
    },
    SUBCLASSE: {
      type: DataTypes.STRING(2)		
    },
    PERCARREDONDA: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    TIPOSUGESTAO: {
      type: DataTypes.STRING(1),
      defaultValue: 'E'	
    },
    ESTOQUEMAX: {
      type: DataTypes.STRING(22)		
    },
    USARQTOSUN: {
      type: DataTypes.STRING(2)		
    },
    CODAUXILIARFAV: {
      type: DataTypes.STRING(250)		
    },
    EMITIRETQENT: {
      type: DataTypes.STRING(1)		
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
    PERCDESC5: {
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
    PERCDESC: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREP: {
      type: DataTypes.STRING(22)		
    },
    PERCACRES: {
      type: DataTypes.STRING(22)		
    },
    PTABELAFORNEC: {
      type: DataTypes.STRING(22)		
    },
    PERCREDPMC: {
      type: DataTypes.STRING(22)		
    },
    CODUSUULTALTCOM: {
      type: DataTypes.STRING(22)		
    },
    ENVIARFORCAVENDAS: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    QTMINSUGCOMPRA: {
      type: DataTypes.STRING(22)		
    },
    USAPMCBASEST: {
      type: DataTypes.STRING(1)		
    },
    GERABASEPISCOFINSSEMALIQ: {
      type: DataTypes.STRING(1)		
    },
    PERCDESC1TAB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC2TAB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC3TAB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC4TAB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC5TAB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC6TAB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC7TAB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC8TAB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC9TAB: {
      type: DataTypes.STRING(22)		
    },
    PERCDESC10TAB: {
      type: DataTypes.STRING(22)		
    },
    DTVIGENCIAPOLITICA: {
      type: DataTypes.DATE		
    },
    CUSTOREPANT: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREPTAB: {
      type: DataTypes.STRING(22)		
    },
    MULTIPLOCOMPRAS: {
      type: DataTypes.STRING(22)		
    },
    DTULTATUPCOMPRA: {
      type: DataTypes.DATE		
    },
    CODUSUULTALTCOMTAB: {
      type: DataTypes.STRING(22)		
    },
    CODROTINAULTALTCOM: {
      type: DataTypes.STRING(22)		
    },
    CODROTINAULTALTCOMTAB: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTCOM: {
      type: DataTypes.DATE		
    },
    ORIGMERCTRIB: {
      type: DataTypes.STRING(1)		
    },
    REGIMEESPECIAL: {
      type: DataTypes.STRING(1)		
    },
    CODTRIBSEFAZ: {
      type: DataTypes.STRING(5)		
    },
    CONSIDERASTGUIACUSTO: {
      type: DataTypes.STRING(1)		
    },
    CONSIDERASTNFCUSTOCONT: {
      type: DataTypes.STRING(1)		
    },
    CONSIDERASTGUIACUSTOCONT: {
      type: DataTypes.STRING(1)		
    },
    CONTROLARFCI: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    VALIDACAPACIDADEPICKING: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    ICMSDIFERIDO: {
      type: DataTypes.STRING(1)		
    },
    SUJDESONERACAO: {
      type: DataTypes.STRING(1)		
    },
    CNAEDESONERACAO: {
      type: DataTypes.STRING(60)		
    },
    PERCDESONERACAO: {
      type: DataTypes.STRING(22)		
    },
    PROTOCOLOICMS1785: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    DTINICODPRODANTUTICAD: {
      type: DataTypes.DATE		
    },
    DTPRIMOVNOVCODPROD: {
      type: DataTypes.DATE		
    },
    CODPRODANTUTICAD: {
      type: DataTypes.STRING(20)		
    },
    DSCPRODANTUTICAD: {
      type: DataTypes.STRING(60)		
    },
    DTFINUTICODPRODANTUTICAD: {
      type: DataTypes.DATE		
    },
    NUMEROSSERIECONTROLADOS: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    CONTROLANUMSERIE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    TIPOESTAGENDA: {
      type: DataTypes.STRING(2)		
    },
    PERCBON: {
      type: DataTypes.STRING(22)		
    },
    VLBONIFIC: {
      type: DataTypes.STRING(22)		
    },
    PERCBONIFIC: {
      type: DataTypes.STRING(22)		
    },
    VERBADINPORPERC: {
      type: DataTypes.STRING(1)		
    },
    PERCBONOUTRAS: {
      type: DataTypes.STRING(22)		
    },
    PERCBONTAB: {
      type: DataTypes.STRING(22)		
    },
    VLBONIFICTAB: {
      type: DataTypes.STRING(22)		
    },
    PERCBONIFICTAB: {
      type: DataTypes.STRING(22)		
    },
    PERCBONOUTRASTAB: {
      type: DataTypes.STRING(22)		
    },
    PRECOUTILIZADONFE: {
      type: DataTypes.STRING(2),
      defaultValue: 'N'	
    },
    PERCALIQVIGEXT: {
      type: DataTypes.STRING(22)		
    },
    CALCULAIPI: {
      type: DataTypes.STRING(1),
      defaultValue: 'I'	
    },
    CODFILIALRETIRABRINDE: {
      type: DataTypes.STRING(2)		
    },
    PERCARGAEFETIVA: {
      type: DataTypes.STRING(22)		
    },
    PERCMARGEMMIN: {
      type: DataTypes.STRING(22)		
    },
    PERCCARGEFETIV: {
      type: DataTypes.STRING(22)		
    },
    SEPARARPORET: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CFOPORIG: {
      type: DataTypes.STRING(22)		
    },
    MODBCST: {
      type: DataTypes.STRING(22)		
    },
    MODBCSTGUIA: {
      type: DataTypes.STRING(22)		
    },
    PRECOMAXCONSUM: {
      type: DataTypes.STRING(22)		
    },
    DESCONSIDERARCEST: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODLOCALARMAZENAGEM: {
      type: DataTypes.STRING(22)		
    },
    GERARPCHISTEST: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    CONFPEDPDV: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    USAFORMULACAO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CNPJFABRICANTE: {
      type: DataTypes.STRING(18)		
    },
    INDESCALARELEVANTE: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    FABRICANTE: {
      type: DataTypes.STRING(60)		
    },
    PERACRESBASEIPI: {
      type: DataTypes.STRING(22)		
    },
    QTMINGONDOLA: {
      type: DataTypes.STRING(22)		
    },
    QTMAXGONDOLA: {
      type: DataTypes.STRING(22)		
    },
    CODCADPRIORIDADE: {
      type: DataTypes.STRING(22)		
    },
    EXPEDECAIXAFECHADA: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    CODFILIALRETIRA: {
      type: DataTypes.STRING(2)		
    },
    PESOBRUTOMASTER: {
      type: DataTypes.STRING(22)		
    },
    PESOPECA: {
      type: DataTypes.STRING(22)		
    },
    CONSIDERACREDSTFCPBCRCUSTOCONT: {
      type: DataTypes.STRING(1)		
    },
    CONSIDERACREDSTFCPBCRCUSTOGER: {
      type: DataTypes.STRING(1)		
    },
    CONSIDERACREDICMSBCRCUSTOCONT: {
      type: DataTypes.STRING(1)		
    },
    CONSIDERACREDICMSBCRCUSTOGER: {
      type: DataTypes.STRING(1)		
    },
    PERMITECREDITOPRESUMIDO: {
      type: DataTypes.STRING(1)		
    },
    CLASSEVENDAQT: {
      type: DataTypes.STRING(1)		
    },
    ESTOQUEPORDTVALIDADEPK: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    USAIDENTIFICADORUNICO: {
      type: DataTypes.STRING(2),
      defaultValue: 'N'	
    },
    ENVIAPRODUTOECOMMERCE: {
      type: DataTypes.STRING(1)		
    },
    CHAVENATURAL: {
      type: DataTypes.STRING(44)		
    },
    PMPFMEDICAMENTO: {
      type: DataTypes.STRING(22)		
    },
    PRECOFABRICA: {
      type: DataTypes.STRING(22)		
    },
    USAPMPFBASEST: {
      type: DataTypes.STRING(1)		
    },
    USAPFABBASEST: {
      type: DataTypes.STRING(1)		
    },
    PERCREDPMPF: {
      type: DataTypes.STRING(22)		
    },
    PERCREDPFAB: {
      type: DataTypes.STRING(22)		
    },
    CODGRUPOSEQNFE: {
      type: DataTypes.STRING(22)		
    },
    INFTECNICA: {
      type: DataTypes.STRING(500)		
    },
    CALCULAPISCOFINSCOMIPI: {
      type: DataTypes.STRING(1)		
    },
    IONSYNC: {
      type: DataTypes.STRING(1)		
    },
    PERCFCP: {
      type: DataTypes.STRING(22)		
    },
    SUJFCP: {
      type: DataTypes.STRING(1)		
    },
    CODFILIALINTEGRACAO: {
      type: DataTypes.STRING(22)		
    },
    USASISTEMATICAPE: {
      type: DataTypes.STRING(1)		
    },
    CONSIMPSUSPOUTDESP: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    DTALTERC5: {
      type: DataTypes.STRING(11)		
    },
    SOMACREDCUSTOICMSVLUTENT: {
      type: DataTypes.STRING(1)		
    },
    QTMULTIPLA: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREPANT2: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREPANT3: {
      type: DataTypes.STRING(22)		
    },
    REGIMEESPECIALBA: {
      type: DataTypes.STRING(1)		
    },
    REGIMEESPECIALPBMED: {
      type: DataTypes.STRING(1)		
    },
    USAPMPFBASESTMG: {
      type: DataTypes.STRING(1)		
    },
    CODFIGURAFEEF: {
      type: DataTypes.STRING(22)		
    },          
  }  


  static foreignsKeys = [{
      fields: ['CODFILIAL'],
      type: 'foreign key',
      references: { 
        table: PcFilial,
        field: 'CODIGO'
      }
  },{
      fields: ['CODPROD'],
      type: 'foreign key',
      references: { 
        table: PcProdut,
        field: 'CODPROD'
      }
  }]


  
};