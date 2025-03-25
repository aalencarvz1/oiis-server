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
import Utils from "../../../controllers/utils/Utils.js";

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
  declare FOLHAROSTO?: string;
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
  declare CORREDOR?: string;
  declare LARGURAM3?: string;
  declare ALTURAM3?: string;
  declare COMPRIMENTOM3?: string;
  declare TIPORESTRICAO?: string;
  declare QTTOTPALFRAC?: string;
  declare DV?: string;
  declare CLASSEVENDA?: string;
  declare CLASSEMC?: string;
  declare CLASSEESTOQUE?: string;
  declare CLASSECOMPRA?: string;
  declare PERICM?: string;
  declare PERCDESC?: string;
  declare PERCST?: string;
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
  declare DTULTALTCUSTOREP?: Date;
  declare NBM?: string;
  declare CODFAB?: string;
  declare TRIBFEDERAL?: string;
  declare PERCIPIVENDA?: string;
  declare PERCDESC1?: string;
  declare PERCDESC2?: string;
  declare PERCDESC3?: string;
  declare PERCDESC4?: string;
  declare PERICMSANTECIPADO?: string;
  declare CODPRODSIMILAR?: string;
  declare CODCATEGORIA?: string;
  declare CODSUBCATEGORIA?: string;
  declare CODFILIAL?: string;
  declare TIPODESCARGA?: string;
  declare STATUS?: string;
  declare PERCOUTRASDESP?: string;
  declare PERCFRETEFOB?: string;
  declare PERCDESPADICIONAL?: string;
  declare PERCDESPFIN?: string;
  declare VLBONIFIC?: string;
  declare PRECOFIXO?: string;
  declare PISCOFINSRETIDO?: string;
  declare PERCCOMMOT?: string;
  declare IVARESSARC?: string;
  declare ICMSRESSARC?: string;
  declare TIPOVOLUMEDESCARGA?: string;
  declare COMISSAOFIXA?: string;
  declare USACLASSIFICACAO?: string;
  declare PERCIVAICMANTECIP?: string;
  declare PERCALIQINTICMANTECIP?: string;
  declare PERCALIQEXTICMANTECIP?: string;
  declare PERCICMRED?: string;
  declare PERCIVA?: string;
  declare PERCALIQINT?: string;
  declare PERCALIQEXT?: string;
  declare CODAUXILIAR2?: string;
  declare VENDADIRETA?: string;
  declare PASSELIVRE?: string;
  declare MODULO2?: string;
  declare RUA2?: string;
  declare NUMERO2?: string;
  declare APTO2?: string;
  declare CODPASSEFISCAL?: string;
  declare TIPOALTURAPALETE?: string;
  declare NUMLOTE?: string;
  declare DTVENC?: Date;
  declare PERINDENIZ?: string;
  declare PERPIS?: string;
  declare MULTIPLO?: string;
  declare VLVENDATEMP?: string;
  declare TIPOMERC?: string;
  declare NORMAFORNECEDOR?: string;
  declare TIPOCALCST?: string;
  declare PERICMFRETE?: string;
  declare LOTEMINCOMPRA?: string;
  declare TIPOSUGCOMPRA?: string;
  declare LOTEINCCOMPRA?: string;
  declare LOTEPRODUCAO?: string;
  declare AUTORIZATIPO4?: string;
  declare ACEITAVENDAFRACAO?: string;
  declare CODFUNCCADASTRO?: string;
  declare CODFUNCULTALTER?: string;
  declare CODFISCAL?: string;
  declare SITTRIBUT?: string;
  declare MARGEMMIN?: string;
  declare FLAGS?: string;
  declare FLAG0?: string;
  declare FLAG1?: string;
  declare FLAG2?: string;
  declare LARGURAARM?: string;
  declare COMPRIMENTOARM?: string;
  declare ALTURAARM?: string;
  declare VOLUMEARM?: string;
  declare CAMAPAPAL?: string;
  declare TIPOPROD?: string;
  declare TIPOPAL?: string;
  declare TIPOARM?: string;
  declare CAPACIDADEPICKING?: string;
  declare CODCARACPROD?: string;
  declare CODTIPOESTRUTURA?: string;
  declare RESTRICAOBLOCADO?: string;
  declare PONTOREPOSICAO?: string;
  declare TIPOPALPUL?: string;
  declare CODTIPOESTRUTURAPUL?: string;
  declare CODPRODMASTER?: string;
  declare QTUNITCT?: string;
  declare RUACT?: string;
  declare NUMEROCT?: string;
  declare APTOCT?: string;
  declare MODULOCT?: string;
  declare RUACX?: string;
  declare APTOCX?: string;
  declare MODULOCX?: string;
  declare UNIDADECT?: string;
  declare VLPAUTA?: string;
  declare VLPAUTAIPI?: string;
  declare EMBALAGEMMASTER?: string;
  declare EMBALAGEMCT?: string;
  declare NUMDIASMAXVENDA?: string;
  declare USAALIQCREDICMSDIFER?: string;
  declare PERCALIQCREDICMSDIFEREST?: string;
  declare PERCALIQCREDICMSDIFERINTER?: string;
  declare PSICOTROPICO?: string;
  declare CODLINHAPROD?: string;
  declare CUSTOREPTAB?: string;
  declare PRECOMAXCONSUM?: string;
  declare PRECOMAXCONSUMTAB?: string;
  declare PERCDESC5?: string;
  declare NUMLISTAINVENTROT?: string;
  declare NUMSEQINVENTROT?: string;
  declare MEDICAMENTOHOSPITALAR?: string;
  declare PERCBONIFICVENDA?: string;
  declare PRINCIPIOATIVO?: string;
  declare TIPOTRIBUTMEDIC?: string;
  declare DEPOSITO?: string;
  declare PREDIO?: string;
  declare NIVEL?: string;
  declare CODEQUIPE?: string;
  declare PERCSUFRAMA?: string;
  declare EXPORTABALANCA?: string;
  declare CODINFNUTRI?: string;
  declare SOMENTETV3?: string;
  declare PCOMTLMKT?: string;
  declare SEQTABPRECO?: string;
  declare QTPONTOPEDIDO?: string;
  declare QTMINPRODUZIR?: string;
  declare PRAZOMEDIOPRODUCAO?: string;
  declare NOMECOMERCIAL?: string;
  declare FRACAOSEPARACAO?: string;
  declare FATORTRANSF?: string;
  declare TAMANHOLOTEFAB?: string;
  declare VELOCIDADEESP?: string;
  declare VELOCIDADEOPERACIONAL?: string;
  declare EFICIENCIAOPERACIONAL?: string;
  declare CODFILIALPRODUTORA?: string;
  declare FATORUNFARM?: string;
  declare VOLUMEREC?: string;
  declare PRAZO?: string;
  declare PRAZOENTR?: string;
  declare CODPRINCIPATIVO?: string;
  declare CODPRODSINTEGRA?: string;
  declare TIPORESTRICAOMED?: string;
  declare INFORMACOESTECNICAS?: string;
  declare FRETEESPECIAL?: string;
  declare DIRFOTOPROD?: string;
  declare CUSTOREPMC?: string;
  declare TIPOMP?: string;
  declare PESOBRUTOMASTER?: string;
  declare PESOLIQMASTER?: string;
  declare PCKROTATIVO?: string;
  declare PRAZOEXPURGO?: string;
  declare NUMULTEXPURGO?: string;
  declare DTULTEXPURGO?: Date;
  declare DTPROXEXPURGO?: Date;
  declare PERCDESC6?: string;
  declare PERCDESC7?: string;
  declare PERCDESC8?: string;
  declare PERCDESC9?: string;
  declare PERCDESC10?: string;
  declare NUMORIGINAL?: string;
  declare DEPOSITOCX?: string;
  declare PREDIOCX?: string;
  declare NIVELCX?: string;
  declare PONTOREPOSICAOCX?: string;
  declare CAPACIDADEPICKINGCX?: string;
  declare DENOMINACAOCOMUNBRASILEIRA?: string;
  declare PERCTOLERANCIAVAL?: string;
  declare DESCRICAO5?: string;
  declare DESCRICAO6?: string;
  declare DESCRICAO7?: string;
  declare CUSTOPROXIMACOMPRA?: string;
  declare CODDISTRIB?: string;
  declare ABASTEPALETE?: string;
  declare ABASTEPALETECX?: string;
  declare FRACIONADO?: string;
  declare MEDCODFUNCLIBVENDA?: string;
  declare MEDDTLIBVENDA?: Date;
  declare CODNESTLETERCEIROS?: string;
  declare FATORCONVERSAONESTLE?: string;
  declare PERCVENDA?: string;
  declare CONFAZ?: string;
  declare MULTIPLO2?: string;
  declare ANVISANUMREGMED?: string;
  declare ANVISAQTEMBALAGEM?: string;
  declare ANVISAFORMAFARM?: string;
  declare ANVISAVIAADM?: string;
  declare ANVISACLASTERAPEUTICA?: string;
  declare ANVISAUSOCONTINUO?: string;
  declare ANVISACAPINSTAL?: string;
  declare ANVISACONCEN?: string;
  declare ANVISAUNDOSAG?: string;
  declare ANVISANUMPRINCAT?: string;
  declare ANVISADESCPRINCAT1?: string;
  declare ANVISADESCPRINCAT2?: string;
  declare ANVISADESCPRINCAT3?: string;
  declare ANVISADESCPRINCAT4?: string;
  declare ANVISACOEFTEC?: string;
  declare ANVISAUNCOEFTEC?: string;
  declare PAISORIGEM?: string;
  declare TIPOEMBALAGEMNESTLE?: string;
  declare CODENDERECOAP?: string;
  declare CODENDERECOCX?: string;
  declare CUSTOREPZFM?: string;
  declare CUSTOREPZFMTAB?: string;
  declare PRECOMAXCONSUMZFM?: string;
  declare PRECOMAXCONSUMZFMTAB?: string;
  declare MEXIVA?: string;
  declare MEXIEPS?: string;
  declare MEXFPGC?: string;
  declare USACROSS?: string;
  declare USAWMS?: string;
  declare CODGENEROFISCAL?: string;
  declare QTMAXGONDULA?: string;
  declare QTMINGONDULA?: string;
  declare UTILIZARVASILHAME?: string;
  declare CODVASILHAME?: string;
  declare NUMSEQATU?: string;
  declare TIPOEMBALAGE?: string;
  declare TIPOCARGA?: string;
  declare ALIQAVULSADARE?: string;
  declare PERCBASEREDENT?: string;
  declare VLIPIPORKG?: string;
  declare TIPOPISCOFINSRETIDO?: string;
  declare ESPECIFICOATIVIDADEPR?: string;
  declare CODROTINAULTALTER?: string;
  declare COMISSAOPORLUCRATIVIDADE?: string;
  declare VLIPIPESO?: string;
  declare TIPOCOMISSAO?: string;
  declare TIPOESTOQUE?: string;
  declare PESOPECA?: string;
  declare RESTRICAOTRANSP?: string;
  declare CODPRAZOENT?: string;
  declare QTMETROS?: string;
  declare PESOPALETE?: string;
  declare CODENDERECOAL?: string;
  declare VALIDARLOTE?: string;
  declare CODGRADE?: string;
  declare CODCOR?: string;
  declare COLUNAGRADE?: string;
  declare ISENTOREGMS?: string;
  declare REGMS?: string;
  declare CODFISCALBONIFIC?: string;
  declare CODFISCALSR?: string;
  declare CUSTOREPANT?: string;
  declare ESTOQUEPORLOTE?: string;
  declare PROXNUMLOTE?: string;
  declare CONTROLAVALIDADEDOLOTE?: string;
  declare PREFIXOLOTE?: string;
  declare PRAZOMEDIOVENDA?: string;
  declare PERCCREDICMPRESUMIDO?: string;
  declare PONTOREPOSICAOAL?: string;
  declare CAPACIDADEPICKINGAL?: string;
  declare TIPONORMA?: string;
  declare RECMINARM?: string;
  declare NORMAPALETE?: string;
  declare REDBASEIVA?: string;
  declare REDBASEALIQEXT?: string;
  declare QTMINIMAATACADO?: string;
  declare QTMINIMAATACADOF?: string;
  declare CONCILIAIMPORTACAO?: string;
  declare PERCBONOUTRAS?: string;
  declare PERCIMPORTACAO?: string;
  declare PERCOFINSIMP?: string;
  declare PERPISIMP?: string;
  declare VLMAODEOBRA?: string;
  declare PCOMPROF1?: string;
  declare CODRISCO?: string;
  declare CODACONDICIONAMENTO?: string;
  declare CONFERENOCHECKOUT?: string;
  declare VLCALORICO?: string;
  declare PROTEINA?: string;
  declare LIPIDEO?: string;
  declare UMIDADE?: string;
  declare COL95?: string;
  declare SALMONELA?: string;
  declare BOLORESLEVEDURAS?: string;
  declare ESTFAUREAUS?: string;
  declare MOFADO?: string;
  declare TOTDEFEITO?: string;
  declare CODAGRUPMAPASEP?: string;
  declare PERCPERDAKG?: string;
  declare APROVEITACREDICMS?: string;
  declare APROVEITACREDPISCOFINS?: string;
  declare CUSTOFORNEC?: string;
  declare PERCDESCICMS?: string;
  declare PERCACRES?: string;
  declare PTABELAFORNEC?: string;
  declare CHECARMULTIPLOVENDABNF?: string;
  declare VLICMSANTECIPADO?: string;
  declare CLASSECOMISSAO?: string;
  declare FRACAOCIPA?: string;
  declare ANALISEDESC?: string;
  declare VOLPESMED?: string;
  declare PH?: string;
  declare DENSIDADE?: string;
  declare DOSEAMENTO?: string;
  declare CONTMICROBIANA?: string;
  declare IDENTIFICACAO?: string;
  declare IMPUREZA?: string;
  declare FRIABILIDADE?: string;
  declare DESINTEGRACAO?: string;
  declare DISSOLUCAO?: string;
  declare UNIFORMIDADE?: string;
  declare DIRASSINATURA?: string;
  declare VERSANALISE?: string;
  declare CONTLOGANALISE?: string;
  declare PESQPATOGENOS?: string;
  declare USAPULMAOREGULADOR?: string;
  declare QTPULMAOREGULADOR?: string;
  declare CODENDERECOPA?: string;
  declare CAPACIDADEPA?: string;
  declare PONTOREPOSICAOPA?: string;
  declare CODPRODEMBALAGEM?: string;
  declare CONSIDERARICMSANTECIPCUSTO?: string;
  declare PERCOFINS?: string;
  declare PERCREDICMS?: string;
  declare DTIMPORTINTEGRACAO?: Date;
  declare DTULTALTER?: Date;
  declare UMIDADEANALISE?: string;
  declare PERCDIFERENCAKGFRIO?: string;
  declare REDBASEALIQEXTBCR?: string;
  declare PERCALIQEXTBCR?: string;
  declare PERCALIQINTBCR?: string;
  declare VLADICIONALBCSTBCR?: string;
  declare VLPAUTABCR?: string;
  declare REDBASEIVABCR?: string;
  declare PERCIVABCR?: string;
  declare CALCCREDIPI?: string;
  declare ENVIARFORCAVENDAS?: string;
  declare DADOSTECNICOS?: string;
  declare CODFISCALENTTRANSF?: string;
  declare PRAZOMINVALIDADE?: string;
  declare PRAZOMAXVALIDADE?: string;
  declare UTILIZAPRECOMAXCONSUMIDOR?: string;
  declare PERCIMPPRODUTORURAL?: string;
  declare DESTAQUEFICHATECNICA?: string;
  declare NUMPAG?: string;
  declare LETRAPAGINA?: string;
  declare SEQPAGINA?: string;
  declare CODONU?: string;
  declare NATUREZAPRODUTO?: string;
  declare DATAVOCOLLECT?: Date;
  declare PERCICMSFRETEFOBST?: string;
  declare PERCICMSFRETEFOBSTBCR?: string;
  declare PERCIPIVENDATAB?: string;
  declare VLPAUTAIPIVENDA?: string;
  declare VLPAUTAIPIVENDATAB?: string;
  declare VLIPIPORKGVENDA?: string;
  declare VLIPIPORKGVENDATAB?: string;
  declare IMUNETRIB?: string;
  declare CODFORMATOPAPEL?: string;
  declare GRAMATURA?: string;
  declare CODUNIDMEDIDANF?: string;
  declare FATORCONVERSAOKG?: string;
  declare DESCPAPEL?: string;
  declare CODFISCALCONSIGFAT?: string;
  declare PERCDIFALIQUOTAS?: string;
  declare VLDIFALIQUOTAS?: string;
  declare PESOVARIAVEL?: string;
  declare VLPAUTAICMS?: string;
  declare VLADICIONALBCST?: string;
  declare COMPRACONSIGNADO?: string;
  declare CODFISCALCONSIG?: string;
  declare PRAZOGARANTIA?: string;
  declare CONTROLANUMSERIE?: string;
  declare QTDEMAXSEPARPEDIDO?: string;
  declare PERCDESPFORANF?: string;
  declare PRAZOMAXINDENIZACAO?: string;
  declare CODFILIALRETIRA?: string;
  declare CODMARCA?: string;
  declare PESOEMBALAGEM?: string;
  declare EX_DOSEAMENTO?: string;
  declare EX_IMPUREZA?: string;
  declare MARCA?: string;
  declare CONTROLANUMSERIA?: string;
  declare PVENDA?: string;
  declare DTULTALTERSRVPRC?: Date;
  declare EX_UMIDADE?: string;
  declare EX_COL95?: string;
  declare EX_SALMONELA?: string;
  declare EX_BOLORESLEVEDURAS?: string;
  declare EX_ESTFAUREAUS?: string;
  declare EX_MOFADO?: string;
  declare EX_TOTDEFEITO?: string;
  declare EX_VLCALORICO?: string;
  declare EX_PROTEINA?: string;
  declare EX_LIPIDEO?: string;
  declare EX_VOLPESMED?: string;
  declare EX_ANALISEDESC?: string;
  declare EX_UNIFORMIDADE?: string;
  declare EX_DISSOLUCAO?: string;
  declare EX_DESINTEGRACAO?: string;
  declare EX_FRIABILIDADE?: string;
  declare EX_IDENTIFICACAO?: string;
  declare EX_PESQPATOGENOS?: string;
  declare EX_CONTMICROBIANA?: string;
  declare EX_DENSIDADE?: string;
  declare EX_PH?: string;
  declare UNDPOREMBALAGEM?: string;
  declare PERCICMSDIFERIDO?: string;
  declare NUMDIASVALIDADEMIN?: string;
  declare PRECIFICESTRANGEIRA?: string;
  declare PERCSEGURO?: string;
  declare PERCDESPDENTRONF?: string;
  declare QTDMAXSEPARARPEDIDO?: string;
  declare FUNDAPIANO?: string;
  declare PERCDESCICMSDIF?: string;
  declare CODPRODDNF?: string;
  declare CAPVOLDNF?: string;
  declare FATORCONVDNF?: string;
  declare PERCALIQEXTGUIA?: string;
  declare CODPRODRELEV?: string;
  declare DTALTCUSTOFORNEC?: Date;
  declare CONTROLAPATRIMONIO?: string;
  declare BASEPISCOFINSLITRAGEM?: string;
  declare VALORPISLITRAGEM?: string;
  declare VALORCOFINSLITRAGEM?: string;
  declare PISRETIDO?: string;
  declare COFINSRETIDO?: string;
  declare IRRETIDO?: string;
  declare CSLLRETIDO?: string;
  declare EXTIPI?: string;
  declare ANVISA?: string;
  declare SIMPRO?: string;
  declare VLRAPLICINT?: string;
  declare VLIPI?: string;
  declare SITTRIBUTDEVFORNEC?: string;
  declare CODFISCALDEVFORNEC?: string;
  declare PRAZOMAXVENDA?: string;
  declare CATERGORIA?: string;
  declare CODLINHA?: string;
  declare PERCQUEBRAPRODUCAO?: string;
  declare PERMITEPRODUCAO?: string;
  declare LINHAPROD?: string;
  declare QTPRODUZIR?: string;
  declare APLICPERCIVAPAUTA?: string;
  declare INVENTARIOPARCIAL?: string;
  declare APLICREDBASEIVAPLIQ?: string;
  declare APLICREDBASEIVAPLIQBCR?: string;
  declare DTINICONTLOTE?: Date;
  declare CLASSEFLOW?: string;
  declare CONCENTRACAO?: string;
  declare VLFRETEPORKG?: string;
  declare CODTRIBPISCOFINS?: string;
  declare PERCMVAORIG?: string;
  declare ASSINATURA?: string;
  declare VLPAUTAPISCOFINS?: string;
  declare USAPISCOFINSLIT?: string;
  declare BASEPISCOFINSLIT?: string;
  declare VLPISLIT?: string;
  declare VLCOFINSLIT?: string;
  declare VLPAUTAPISCOFINSIMP?: string;
  declare USAPISCOFINSLITIMP?: string;
  declare BASEPISCOFINSLITIMP?: string;
  declare VLPISLITIMP?: string;
  declare VLCOFINSLITIMP?: string;
  declare CODSITTRIBPISCOFINS?: string;
  declare ROTINALANC?: string;
  declare SUGVENDA?: string;
  declare GERAICMSLIVROFISCALDEVFORNEC?: string;
  declare CODFISCALENTTV9?: string;
  declare LITRAGEM?: string;
  declare CODSITTRIBPISCOFINSDEV?: string;
  declare SITTRIBUTENT?: string;
  declare SITTRIBUTDEV?: string;
  declare DTEXPORTACAOWMS?: Date;
  declare DTIMPORTACAOWMS?: Date;
  declare CODNCMEX?: string;
  declare CODLINHANESTLE?: string;
  declare GTINCODAUXILIAR?: string;
  declare GTINCODAUXILIAR2?: string;
  declare CODEXCECAOPISCOFINS?: string;
  declare NOMEECOMMERCE?: string;
  declare TITULOECOMMERCE?: string;
  declare SUBTITULOECOMMERCE?: string;
  declare DIRETORIOFOTOS?: string;
  declare TIPOMEDICAMENTO?: string;
  declare GRUPOFATURAMENTO?: string;
  declare USAPMCBASEST?: string;
  declare PERCREDPMC?: string;
  declare SUBSTANCIA?: string;
  declare NUMCASASDECREDUCAOICMS?: string;
  declare CODDEPTOWEB?: string;
  declare CODSECAOWEB?: string;
  declare CODCATEGORIAWEB?: string;
  declare CODSUBCATEGORIAWEB?: string;
  declare CUSTOREPTABANT?: string;
  declare CUSTOREPZFMANT?: string;
  declare PRECOMAXCONSUMTABANT?: string;
  declare PRECOMAXCONSUMZFMANT?: string;
  declare CODTABLIT?: string;
  declare CODGRULIT?: string;
  declare OSCOMODATO?: string;
  declare OBRIGAPREENCCONTRATO?: string;
  declare GERAOSAUTOMATIC?: string;
  declare NUMSERVICO?: string;
  declare RESTRINGECOTACAO?: string;
  declare ATUPESOMASTERENT?: string;
  declare VLPAUTAICMSANTEC?: string;
  declare IPIPORVALOR?: string;
  declare PERCCARGATRIBMEDIA?: string;
  declare CODLINHAPRAZO?: string;
  declare CODUSUULTALTCOM?: string;
  declare UTILIZASELO?: string;
  declare QTMINSUGCOMPRA?: string;
  declare ENVIAINFTECNICANFE?: string;
  declare CONTROLADOIBAMA?: string;
  declare CESTABASICALEGIS?: string;
  declare CODINTERNO?: string;
  declare APLICACOES?: string;
  declare CALCCREDIPICONT?: string;
  declare APROVEITACREDICMSCONT?: string;
  declare APROVEITACREDPISCOFINSCONT?: string;
  declare GERABASEPISCOFINSSEMALIQ?: string;
  declare CODSITTRIBST?: string;
  declare PERCICMSBASEICMSANTECIPADO?: string;
  declare PERCIPISUSPENSO?: string;
  declare MYFROTA?: string;
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
  declare USALICENCAIMPORTACAO?: string;
  declare MULTIPLOCOMPRAS?: string;
  declare ENVIASNGPC?: string;
  declare REGISTROMSMED?: string;
  declare RETINOICO?: string;
  declare FATORCONVTRIB?: string;
  declare UNIDADETRIB?: string;
  declare VLIPISUSPENSO?: string;
  declare IDINTEGRACAOMYFROTA?: string;
  declare ANP?: string;
  declare SITTRIBUT_SERVICO?: string;
  declare PERCOFINS_SERVICO?: string;
  declare PERPIS_SERVICO?: string;
  declare STATUSSUCATA?: string;
  declare DTULTATUPCOMPRA?: Date;
  declare CONSIISUSPENSOBASEICMS?: string;
  declare CONSIPISUSPENSOBASEICMS?: string;
  declare CODUSUULTALTCOMTAB?: string;
  declare CODROTINAULTALTCOM?: string;
  declare CODROTINAULTALTCOMTAB?: string;
  declare COMISSAOSERVICOPRESTADO?: string;
  declare CODPRODFORNEC?: string;
  declare PRECIFICACAOAUTOMATICA?: string;
  declare CODFISCALCOCOMPRA?: string;
  declare CODFISCALCOREMESSA?: string;
  declare CODTIPOUSOMED?: string;
  declare CODTIPORECEIT?: string;
  declare CUSTOFORNECSEMST?: string;
  declare CUSTOPROXIMACOMPRASEMST?: string;
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
  declare IECTEREF?: string;
  declare DIAMETROINTERNO?: string;
  declare DIAMETROEXTERNO?: string;
  declare DIASCONSECENT?: string;
  declare NUMEROSSERIECONTROLADOS?: string;
  declare NUMREGAGRMAP?: string;
  declare IDEMBALAGEM?: string;
  declare TAMANHOPECA?: string;
  declare PESOMINIMO?: string;
  declare PESOMAXIMO?: string;
  declare DTFINUTICODPRODANTUTICAD?: Date;
  declare DSCPRODANTUTICAD?: string;
  declare CODFISCALDEVOPLOG?: string;
  declare CODFISCALENTOPLOG?: string;
  declare IDDESTAQUE?: string;
  declare INDUZLOTE?: string;
  declare TIPOEMBARQUEIMP?: string;
  declare PERCBONIFIC?: string;
  declare VERBADINPORPERC?: string;
  declare PERCBONTAB?: string;
  declare VLBONIFICTAB?: string;
  declare PERCBONIFICTAB?: string;
  declare PERCBONOUTRASTAB?: string;
  declare VLADICIONALBCICMSANTECIP?: string;
  declare APLICPERCIVAPAUTAICMSANTECIP?: string;
  declare PERCICMSFRETEFOBICMSANTECIP?: string;
  declare PERCMVAORIGICMSANTECIP?: string;
  declare PERCCARGATRIBMEDIAICMSANTECIP?: string;
  declare REDBASEIVAICMSANTECIP?: string;
  declare REDBASEALIQEXTICMSANTECIP?: string;
  declare CODSALMED?: string;
  declare CONSIDERARICMSANTECIPCUSTOCONT?: string;
  declare FORMAESTERILIZACAO?: string;
  declare APLICAPERCREDALIQIPI?: string;
  declare PERCIISUSPENSO?: string;
  declare PERPISCALCDI?: string;
  declare PERCOFINSCALCDI?: string;
  declare ESTOQUEPORDTVALIDADE?: string;
  declare PESOLIQDI?: string;
  declare IDINTEGRACAOCIASHOP?: string;
  declare ENVIAECOMMERCE?: string;
  declare COMISSAOSERVICOFUNCIONARIO?: string;
  declare GTINCODAUXILIARTRIB?: string;
  declare CODAUXILIARTRIB?: string;
  declare VERIFCRAMOATIVCALCST?: string;
  declare REGISTROPECA?: string;
  declare GERAICMSLIVROFISCALENT?: string;
  declare UTILIZACREDREDPISCOFINS?: string;
  declare COMODATO?: string;
  declare LINKFABRICANTE?: string;
  declare PRODUSAENGRADADO?: string;
  declare CODPRODENGRADADO?: string;
  declare FATCONVPRODENGRAD?: string;
  declare CODCEST?: string;
  declare CODCESTDEV?: string;
  declare CODIGOCNAE?: string;
  declare TEMPOSERVICO?: string;
  declare TIPOSERVICOVINCULADORECEITA?: string;
  declare INCIDENCIACPRB?: string;
  declare PERCENTUALCPRB?: string;
  declare PERCENTUALINCIDENCIA?: string;
  declare CFOPORIG?: string;
  declare MODBCST?: string;
  declare MODBCSTGUIA?: string;
  declare PERMITIRBROKERTV5?: string;
  declare VLFRETE?: string;
  declare ANTIDUMPING?: string;
  declare ENDERECAMENTOCUBAGEM?: string;
  declare DTULTALTCAD?: Date;
  declare CODFUNCULTALTCAD?: string;
  declare PERCFUNCEP?: string;
  declare PERCFECP?: string;
  declare PERCCSLL?: string;
  declare VLIPIPAUTATV10?: string;
  declare VLIPIPAUTATV10TAB?: string;
  declare LICITUSARCAP?: string;
  declare LICITPERCDESONERACAP?: string;
  declare LICITCONVENIOISENCAOICMS?: string;
  declare USAECOMMERCEUNILEVER?: string;
  declare LICITUSARDESONERAICM?: string;
  declare LICITPERCDESONERAICM?: string;
  declare PERCENTUALISS?: string;
  declare PESOBRUTOFRETE?: string;
  declare CODFISCALREMENTFUT?: string;
  declare CODFISCALENTENTFUT?: string;
  declare SITTRIBUTENTFUT?: string;
  declare PERCIVA2?: string;
  declare EMBVENDAECOMMERCEUNILEVER?: string;
  declare CODFISCALBENEFICSAIDA?: string;
  declare CODFISCALBENEFICRETORNO?: string;
  declare CODFISCALBENEFICENTRADA?: string;
  declare SITTRIBUTBENEFICSAIDA?: string;
  declare SITTRIBUTBENEFICRETORNO?: string;
  declare SITTRIBUTBENEFICENTRADA?: string;
  declare PERCICMSDESONERACAO?: string;
  declare ACEITATROCAINSERVIVEL?: string;
  declare CODINSERVIVEL?: string;
  declare CARCACABATERIA?: string;
  declare UTILIZAPRECOFABRICA?: string;
  declare ISENTOTCIF?: string;
  declare UNIDADETRIBEX?: string;
  declare FATORCONVTRIBEX?: string;
  declare DESCANP?: string;
  declare BLOQUEIOACORDOPARCERIA?: string;
  declare PERACRESCIMOIPI?: string;
  declare CODAGREGACAO?: string;
  declare USACODAGREGACAO?: string;
  declare ISENTOSTCOZINHAINDUSTRIAL?: string;
  declare CODPRINCIPATIVO2?: string;
  declare UTILIZAMULTIPLICADOR?: string;
  declare PGLP?: string;
  declare PGNN?: string;
  declare PGNI?: string;
  declare VPART?: string;
  declare FATORCONVERSAOBIONEXO?: string;
  declare PGLI?: string;
  declare PGLN?: string;
  declare USAMAIORVALORPARACALCULOICMS?: string;
  declare USABASESTNOFCP?: string;
  declare UNIDADEPADRAO?: string;
  declare DESCRICAODINAMICA?: string;
  declare TIPOINTEGRACAOB2B?: string;
  declare GRAMATURALICIT?: string;
  declare IDSOFITVIEW?: string;
  declare DTULTALTERSOFITVIEW?: Date;
  declare DTEXCLUSAOSOFITVIEW?: Date;
  declare CODMOTISENCAOANVISA?: string;
  declare USAICMSDESONERACAO?: string;
  declare CODSAZONALIDADEMED?: string;
  declare CODADWORDS?: string;
  declare EXIBESEMESTOQUEECOMMERCE?: string;
  declare LINKID?: string;
  declare CODCAMPLOMADEE?: string;
  declare UTILIZAINTEGRACAOKIBON?: string;
  declare PREDOMINANCIA?: string;
  declare USABASEREDICMSPRESUMIDO?: string;
  declare NUMERO?: string;
  declare NUMEROCX?: string;
  declare ALIQUOTATCIF?: string;
  declare CLASSEVENDAQT?: string;
  declare PMPFMEDICAMENTO?: string;
  declare PRECOFABRICA?: string;
  declare USAPMPFBASEST?: string;
  declare USAPFABBASEST?: string;
  declare PERCREDPMPF?: string;
  declare PERCREDPFAB?: string;
  declare OBSCONTXCAMPO?: string;
  declare OBSCONTXTEXTO?: string;
  declare OBSFISCOXCAMPO?: string;
  declare OBSFISCOXTEXTO?: string;
  declare CONVENIOISENCAOICMSMED?: string;
  declare MSGCIRCULAR?: string;
  declare MSGCIRCULAR_DTINI?: Date;
  declare MSGCIRCULAR_DTFIM?: Date;
  declare IONSYNC?: string;
  declare USAMAIORVALORPARACALCULOIPI?: string;
  declare DTALTERC5?: string;
  declare PERMITEMULTIPLICACAOPDV?: string;
  declare CUSTOREPANT2?: string;
  declare CUSTOREPANT3?: string;


  static id = 30205;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {      
    CODPROD: {
      type: DataTypes.STRING(22),
      primaryKey: true,
      allowNull: false,       	
    },
    DESCRICAO: {
      type: DataTypes.STRING(120),
      allowNull: false,       	
    },
    EMBALAGEM: {
      type: DataTypes.STRING(12),
      allowNull: false,       	
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
    },
    CODSEC: {
      type: DataTypes.STRING(22),
      allowNull: false,       	
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
    },
    DTCADASTRO: {
      type: DataTypes.DATE		
    },
    VOLUME: {
      type: DataTypes.STRING(22)		
    },
    CODAUXILIAR: {
      type: DataTypes.STRING(22),      	
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
    FOLHAROSTO: {
      type: DataTypes.STRING(1)		
    },
    DTEXCLUSAO: {
      type: DataTypes.DATE		
    },
    MODULO: {
      type: DataTypes.STRING(22),      	
    },
    RUA: {
      type: DataTypes.STRING(22),      	
    },
    APTO: {
      type: DataTypes.STRING(22),      	
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
    CORREDOR: {
      type: DataTypes.STRING(4)		
    },
    LARGURAM3: {
      type: DataTypes.STRING(22)		
    },
    ALTURAM3: {
      type: DataTypes.STRING(22)		
    },
    COMPRIMENTOM3: {
      type: DataTypes.STRING(22)		
    },
    TIPORESTRICAO: {
      type: DataTypes.STRING(1)		
    },
    QTTOTPALFRAC: {
      type: DataTypes.STRING(22)		
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
    PERCST: {
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
    DTULTALTCUSTOREP: {
      type: DataTypes.DATE		
    },
    NBM: {
      type: DataTypes.STRING(15)		
    },
    CODFAB: {
      type: DataTypes.STRING(30)		
    },
    TRIBFEDERAL: {
      type: DataTypes.STRING(15)		
    },
    PERCIPIVENDA: {
      type: DataTypes.STRING(22)		
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
    CODPRODSIMILAR: {
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
    PERCDESPFIN: {
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
    PERCCOMMOT: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
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
    COMISSAOFIXA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    USACLASSIFICACAO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERCIVAICMANTECIP: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQINTICMANTECIP: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQEXTICMANTECIP: {
      type: DataTypes.STRING(22)		
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
    VENDADIRETA: {
      type: DataTypes.STRING(1)		
    },
    PASSELIVRE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    MODULO2: {
      type: DataTypes.STRING(22)		
    },
    RUA2: {
      type: DataTypes.STRING(22)		
    },
    NUMERO2: {
      type: DataTypes.STRING(22)		
    },
    APTO2: {
      type: DataTypes.STRING(22)		
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
    VLVENDATEMP: {
      type: DataTypes.STRING(22)		
    },
    TIPOMERC: {
      type: DataTypes.STRING(2)		
    },
    NORMAFORNECEDOR: {
      type: DataTypes.STRING(10)		
    },
    TIPOCALCST: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERICMFRETE: {
      type: DataTypes.STRING(22)		
    },
    LOTEMINCOMPRA: {
      type: DataTypes.STRING(22)		
    },
    TIPOSUGCOMPRA: {
      type: DataTypes.STRING(2)		
    },
    LOTEINCCOMPRA: {
      type: DataTypes.STRING(22)		
    },
    LOTEPRODUCAO: {
      type: DataTypes.STRING(22)		
    },
    AUTORIZATIPO4: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
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
    CODFISCAL: {
      type: DataTypes.STRING(22)		
    },
    SITTRIBUT: {
      type: DataTypes.STRING(3)		
    },
    MARGEMMIN: {
      type: DataTypes.STRING(22)		
    },
    FLAGS: {
      type: DataTypes.STRING(1)		
    },
    FLAG0: {
      type: DataTypes.STRING(2)		
    },
    FLAG1: {
      type: DataTypes.STRING(2)		
    },
    FLAG2: {
      type: DataTypes.STRING(2)		
    },
    LARGURAARM: {
      type: DataTypes.STRING(22)		
    },
    COMPRIMENTOARM: {
      type: DataTypes.STRING(22)		
    },
    ALTURAARM: {
      type: DataTypes.STRING(22)		
    },
    VOLUMEARM: {
      type: DataTypes.STRING(22)		
    },
    CAMAPAPAL: {
      type: DataTypes.STRING(22)		
    },
    TIPOPROD: {
      type: DataTypes.STRING(22)		
    },
    TIPOPAL: {
      type: DataTypes.STRING(22)		
    },
    TIPOARM: {
      type: DataTypes.STRING(22),
      defaultValue: '9'	
    },
    CAPACIDADEPICKING: {
      type: DataTypes.STRING(22)		
    },
    CODCARACPROD: {
      type: DataTypes.STRING(22)		
    },
    CODTIPOESTRUTURA: {
      type: DataTypes.STRING(22)		
    },
    RESTRICAOBLOCADO: {
      type: DataTypes.STRING(22)		
    },
    PONTOREPOSICAO: {
      type: DataTypes.STRING(22)		
    },
    TIPOPALPUL: {
      type: DataTypes.STRING(22)		
    },
    CODTIPOESTRUTURAPUL: {
      type: DataTypes.STRING(22)		
    },
    CODPRODMASTER: {
      type: DataTypes.STRING(22)		
    },
    QTUNITCT: {
      type: DataTypes.STRING(22)		
    },
    RUACT: {
      type: DataTypes.STRING(22)		
    },
    NUMEROCT: {
      type: DataTypes.STRING(22)		
    },
    APTOCT: {
      type: DataTypes.STRING(22)		
    },
    MODULOCT: {
      type: DataTypes.STRING(22)		
    },
    RUACX: {
      type: DataTypes.STRING(22)		
    },
    APTOCX: {
      type: DataTypes.STRING(22)		
    },
    MODULOCX: {
      type: DataTypes.STRING(22)		
    },
    UNIDADECT: {
      type: DataTypes.STRING(2)		
    },
    VLPAUTA: {
      type: DataTypes.STRING(22)		
    },
    VLPAUTAIPI: {
      type: DataTypes.STRING(22)		
    },
    EMBALAGEMMASTER: {
      type: DataTypes.STRING(12)		
    },
    EMBALAGEMCT: {
      type: DataTypes.STRING(12)		
    },
    NUMDIASMAXVENDA: {
      type: DataTypes.STRING(22)		
    },
    USAALIQCREDICMSDIFER: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERCALIQCREDICMSDIFEREST: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQCREDICMSDIFERINTER: {
      type: DataTypes.STRING(22)		
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
    MEDICAMENTOHOSPITALAR: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERCBONIFICVENDA: {
      type: DataTypes.STRING(22)		
    },
    PRINCIPIOATIVO: {
      type: DataTypes.STRING(100)		
    },
    TIPOTRIBUTMEDIC: {
      type: DataTypes.STRING(2)		
    },
    DEPOSITO: {
      type: DataTypes.STRING(22)		
    },
    PREDIO: {
      type: DataTypes.STRING(22)		
    },
    NIVEL: {
      type: DataTypes.STRING(22)		
    },
    CODEQUIPE: {
      type: DataTypes.STRING(22)		
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
    SOMENTETV3: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PCOMTLMKT: {
      type: DataTypes.STRING(22)		
    },
    SEQTABPRECO: {
      type: DataTypes.STRING(22)		
    },
    QTPONTOPEDIDO: {
      type: DataTypes.STRING(22)		
    },
    QTMINPRODUZIR: {
      type: DataTypes.STRING(22)		
    },
    PRAZOMEDIOPRODUCAO: {
      type: DataTypes.STRING(22)		
    },
    NOMECOMERCIAL: {
      type: DataTypes.STRING(100)		
    },
    FRACAOSEPARACAO: {
      type: DataTypes.STRING(22),
      defaultValue: 25000	
    },
    FATORTRANSF: {
      type: DataTypes.STRING(22)		
    },
    TAMANHOLOTEFAB: {
      type: DataTypes.STRING(22)		
    },
    VELOCIDADEESP: {
      type: DataTypes.STRING(22)		
    },
    VELOCIDADEOPERACIONAL: {
      type: DataTypes.STRING(22)		
    },
    EFICIENCIAOPERACIONAL: {
      type: DataTypes.STRING(22)		
    },
    CODFILIALPRODUTORA: {
      type: DataTypes.STRING(2)		
    },
    FATORUNFARM: {
      type: DataTypes.STRING(22)		
    },
    VOLUMEREC: {
      type: DataTypes.STRING(22)		
    },
    PRAZO: {
      type: DataTypes.STRING(22)		
    },
    PRAZOENTR: {
      type: DataTypes.STRING(22)		
    },
    CODPRINCIPATIVO: {
      type: DataTypes.STRING(22)		
    },
    CODPRODSINTEGRA: {
      type: DataTypes.STRING(20)		
    },
    TIPORESTRICAOMED: {
      type: DataTypes.STRING(2),
      defaultValue: 'NR'	
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
    CUSTOREPMC: {
      type: DataTypes.STRING(22)		
    },
    TIPOMP: {
      type: DataTypes.STRING(2)		
    },
    PESOBRUTOMASTER: {
      type: DataTypes.STRING(22)		
    },
    PESOLIQMASTER: {
      type: DataTypes.STRING(22)		
    },
    PCKROTATIVO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PRAZOEXPURGO: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    NUMULTEXPURGO: {
      type: DataTypes.STRING(22)		
    },
    DTULTEXPURGO: {
      type: DataTypes.DATE		
    },
    DTPROXEXPURGO: {
      type: DataTypes.DATE		
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
    DEPOSITOCX: {
      type: DataTypes.STRING(22)		
    },
    PREDIOCX: {
      type: DataTypes.STRING(22)		
    },
    NIVELCX: {
      type: DataTypes.STRING(22)		
    },
    PONTOREPOSICAOCX: {
      type: DataTypes.STRING(22)		
    },
    CAPACIDADEPICKINGCX: {
      type: DataTypes.STRING(22)		
    },
    DENOMINACAOCOMUNBRASILEIRA: {
      type: DataTypes.STRING(10)		
    },
    PERCTOLERANCIAVAL: {
      type: DataTypes.STRING(22)		
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
    CUSTOPROXIMACOMPRA: {
      type: DataTypes.STRING(22)		
    },
    CODDISTRIB: {
      type: DataTypes.STRING(4)		
    },
    ABASTEPALETE: {
      type: DataTypes.STRING(1)		
    },
    ABASTEPALETECX: {
      type: DataTypes.STRING(1)		
    },
    FRACIONADO: {
      type: DataTypes.STRING(1)		
    },
    MEDCODFUNCLIBVENDA: {
      type: DataTypes.STRING(22)		
    },
    MEDDTLIBVENDA: {
      type: DataTypes.DATE		
    },
    CODNESTLETERCEIROS: {
      type: DataTypes.STRING(15),
      defaultValue: '99990010'	
    },
    FATORCONVERSAONESTLE: {
      type: DataTypes.STRING(22)		
    },
    PERCVENDA: {
      type: DataTypes.STRING(22)		
    },
    CONFAZ: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    MULTIPLO2: {
      type: DataTypes.STRING(22)		
    },
    ANVISANUMREGMED: {
      type: DataTypes.STRING(20)		
    },
    ANVISAQTEMBALAGEM: {
      type: DataTypes.STRING(22)		
    },
    ANVISAFORMAFARM: {
      type: DataTypes.STRING(20)		
    },
    ANVISAVIAADM: {
      type: DataTypes.STRING(20)		
    },
    ANVISACLASTERAPEUTICA: {
      type: DataTypes.STRING(40)		
    },
    ANVISAUSOCONTINUO: {
      type: DataTypes.STRING(1)		
    },
    ANVISACAPINSTAL: {
      type: DataTypes.STRING(22)		
    },
    ANVISACONCEN: {
      type: DataTypes.STRING(22)		
    },
    ANVISAUNDOSAG: {
      type: DataTypes.STRING(3)		
    },
    ANVISANUMPRINCAT: {
      type: DataTypes.STRING(22)		
    },
    ANVISADESCPRINCAT1: {
      type: DataTypes.STRING(100)		
    },
    ANVISADESCPRINCAT2: {
      type: DataTypes.STRING(100)		
    },
    ANVISADESCPRINCAT3: {
      type: DataTypes.STRING(100)		
    },
    ANVISADESCPRINCAT4: {
      type: DataTypes.STRING(100)		
    },
    ANVISACOEFTEC: {
      type: DataTypes.STRING(20)		
    },
    ANVISAUNCOEFTEC: {
      type: DataTypes.STRING(3)		
    },
    PAISORIGEM: {
      type: DataTypes.STRING(40)		
    },
    TIPOEMBALAGEMNESTLE: {
      type: DataTypes.STRING(22)		
    },
    CODENDERECOAP: {
      type: DataTypes.STRING(22)		
    },
    CODENDERECOCX: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREPZFM: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREPZFMTAB: {
      type: DataTypes.STRING(22)		
    },
    PRECOMAXCONSUMZFM: {
      type: DataTypes.STRING(22)		
    },
    PRECOMAXCONSUMZFMTAB: {
      type: DataTypes.STRING(22)		
    },
    MEXIVA: {
      type: DataTypes.STRING(22)		
    },
    MEXIEPS: {
      type: DataTypes.STRING(22)		
    },
    MEXFPGC: {
      type: DataTypes.STRING(22)		
    },
    USACROSS: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    USAWMS: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    CODGENEROFISCAL: {
      type: DataTypes.STRING(22)		
    },
    QTMAXGONDULA: {
      type: DataTypes.STRING(22)		
    },
    QTMINGONDULA: {
      type: DataTypes.STRING(22)		
    },
    UTILIZARVASILHAME: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODVASILHAME: {
      type: DataTypes.STRING(22)		
    },
    NUMSEQATU: {
      type: DataTypes.STRING(22)		
    },
    TIPOEMBALAGE: {
      type: DataTypes.STRING(2),
      defaultValue: 'E1'	
    },
    TIPOCARGA: {
      type: DataTypes.STRING(22),
      defaultValue: '1'	
    },
    ALIQAVULSADARE: {
      type: DataTypes.STRING(22)		
    },
    PERCBASEREDENT: {
      type: DataTypes.STRING(22)		
    },
    VLIPIPORKG: {
      type: DataTypes.STRING(22)		
    },
    TIPOPISCOFINSRETIDO: {
      type: DataTypes.STRING(22)		
    },
    ESPECIFICOATIVIDADEPR: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    CODROTINAULTALTER: {
      type: DataTypes.STRING(22)		
    },
    COMISSAOPORLUCRATIVIDADE: {
      type: DataTypes.STRING(1)		
    },
    VLIPIPESO: {
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
    PESOPALETE: {
      type: DataTypes.STRING(22)		
    },
    CODENDERECOAL: {
      type: DataTypes.STRING(22)		
    },
    VALIDARLOTE: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
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
    ISENTOREGMS: {
      type: DataTypes.STRING(2),
      defaultValue: 'S'	
    },
    REGMS: {
      type: DataTypes.STRING(20)		
    },
    CODFISCALBONIFIC: {
      type: DataTypes.STRING(22)		
    },
    CODFISCALSR: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREPANT: {
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
    PERCCREDICMPRESUMIDO: {
      type: DataTypes.STRING(22)		
    },
    PONTOREPOSICAOAL: {
      type: DataTypes.STRING(22)		
    },
    CAPACIDADEPICKINGAL: {
      type: DataTypes.STRING(22)		
    },
    TIPONORMA: {
      type: DataTypes.STRING(1)		
    },
    RECMINARM: {
      type: DataTypes.STRING(22)		
    },
    NORMAPALETE: {
      type: DataTypes.STRING(10)		
    },
    REDBASEIVA: {
      type: DataTypes.STRING(22)		
    },
    REDBASEALIQEXT: {
      type: DataTypes.STRING(22)		
    },
    QTMINIMAATACADO: {
      type: DataTypes.STRING(22)		
    },
    QTMINIMAATACADOF: {
      type: DataTypes.STRING(22)		
    },
    CONCILIAIMPORTACAO: {
      type: DataTypes.STRING(1)		
    },
    PERCBONOUTRAS: {
      type: DataTypes.STRING(22)		
    },
    PERCIMPORTACAO: {
      type: DataTypes.STRING(22)		
    },
    PERCOFINSIMP: {
      type: DataTypes.STRING(22)		
    },
    PERPISIMP: {
      type: DataTypes.STRING(22)		
    },
    VLMAODEOBRA: {
      type: DataTypes.STRING(22)		
    },
    PCOMPROF1: {
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
    VLCALORICO: {
      type: DataTypes.STRING(100)		
    },
    PROTEINA: {
      type: DataTypes.STRING(100)		
    },
    LIPIDEO: {
      type: DataTypes.STRING(100)		
    },
    UMIDADE: {
      type: DataTypes.STRING(100)		
    },
    COL95: {
      type: DataTypes.STRING(100)		
    },
    SALMONELA: {
      type: DataTypes.STRING(100)		
    },
    BOLORESLEVEDURAS: {
      type: DataTypes.STRING(100)		
    },
    ESTFAUREAUS: {
      type: DataTypes.STRING(100)		
    },
    MOFADO: {
      type: DataTypes.STRING(100)		
    },
    TOTDEFEITO: {
      type: DataTypes.STRING(100)		
    },
    CODAGRUPMAPASEP: {
      type: DataTypes.STRING(2)		
    },
    PERCPERDAKG: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    APROVEITACREDICMS: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    APROVEITACREDPISCOFINS: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CUSTOFORNEC: {
      type: DataTypes.STRING(22)		
    },
    PERCDESCICMS: {
      type: DataTypes.STRING(22)		
    },
    PERCACRES: {
      type: DataTypes.STRING(22)		
    },
    PTABELAFORNEC: {
      type: DataTypes.STRING(22)		
    },
    CHECARMULTIPLOVENDABNF: {
      type: DataTypes.STRING(1)		
    },
    VLICMSANTECIPADO: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    CLASSECOMISSAO: {
      type: DataTypes.STRING(2)		
    },
    FRACAOCIPA: {
      type: DataTypes.STRING(22)		
    },
    ANALISEDESC: {
      type: DataTypes.STRING(100)		
    },
    VOLPESMED: {
      type: DataTypes.STRING(100)		
    },
    PH: {
      type: DataTypes.STRING(100)		
    },
    DENSIDADE: {
      type: DataTypes.STRING(100)		
    },
    DOSEAMENTO: {
      type: DataTypes.STRING(100)		
    },
    CONTMICROBIANA: {
      type: DataTypes.STRING(100)		
    },
    IDENTIFICACAO: {
      type: DataTypes.STRING(100)		
    },
    IMPUREZA: {
      type: DataTypes.STRING(100)		
    },
    FRIABILIDADE: {
      type: DataTypes.STRING(100)		
    },
    DESINTEGRACAO: {
      type: DataTypes.STRING(100)		
    },
    DISSOLUCAO: {
      type: DataTypes.STRING(100)		
    },
    UNIFORMIDADE: {
      type: DataTypes.STRING(100)		
    },
    DIRASSINATURA: {
      type: DataTypes.STRING(140)		
    },
    VERSANALISE: {
      type: DataTypes.STRING(22),
      defaultValue: 1	
    },
    CONTLOGANALISE: {
      type: DataTypes.STRING(22),
      defaultValue: 1	
    },
    PESQPATOGENOS: {
      type: DataTypes.STRING(100)		
    },
    USAPULMAOREGULADOR: {
      type: DataTypes.STRING(1)		
    },
    QTPULMAOREGULADOR: {
      type: DataTypes.STRING(22)		
    },
    CODENDERECOPA: {
      type: DataTypes.STRING(22)		
    },
    CAPACIDADEPA: {
      type: DataTypes.STRING(22)		
    },
    PONTOREPOSICAOPA: {
      type: DataTypes.STRING(22)		
    },
    CODPRODEMBALAGEM: {
      type: DataTypes.STRING(22)		
    },
    CONSIDERARICMSANTECIPCUSTO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    PERCOFINS: {
      type: DataTypes.STRING(22)		
    },
    PERCREDICMS: {
      type: DataTypes.STRING(22)		
    },
    DTIMPORTINTEGRACAO: {
      type: DataTypes.DATE		
    },
    DTULTALTER: {
      type: DataTypes.DATE		
    },
    UMIDADEANALISE: {
      type: DataTypes.STRING(100)		
    },
    PERCDIFERENCAKGFRIO: {
      type: DataTypes.STRING(22)		
    },
    REDBASEALIQEXTBCR: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQEXTBCR: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQINTBCR: {
      type: DataTypes.STRING(22)		
    },
    VLADICIONALBCSTBCR: {
      type: DataTypes.STRING(22)		
    },
    VLPAUTABCR: {
      type: DataTypes.STRING(22)		
    },
    REDBASEIVABCR: {
      type: DataTypes.STRING(22)		
    },
    PERCIVABCR: {
      type: DataTypes.STRING(22)		
    },
    CALCCREDIPI: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    ENVIARFORCAVENDAS: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    DADOSTECNICOS: {
      type: DataTypes.STRING(4000)		
    },
    CODFISCALENTTRANSF: {
      type: DataTypes.STRING(22)		
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
    PERCIMPPRODUTORURAL: {
      type: DataTypes.STRING(22)		
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
    DATAVOCOLLECT: {
      type: DataTypes.DATE		
    },
    PERCICMSFRETEFOBST: {
      type: DataTypes.STRING(22)		
    },
    PERCICMSFRETEFOBSTBCR: {
      type: DataTypes.STRING(22)		
    },
    PERCIPIVENDATAB: {
      type: DataTypes.STRING(22)		
    },
    VLPAUTAIPIVENDA: {
      type: DataTypes.STRING(22)		
    },
    VLPAUTAIPIVENDATAB: {
      type: DataTypes.STRING(22)		
    },
    VLIPIPORKGVENDA: {
      type: DataTypes.STRING(22)		
    },
    VLIPIPORKGVENDATAB: {
      type: DataTypes.STRING(22)		
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
    CODFISCALCONSIGFAT: {
      type: DataTypes.STRING(22)		
    },
    PERCDIFALIQUOTAS: {
      type: DataTypes.STRING(22)		
    },
    VLDIFALIQUOTAS: {
      type: DataTypes.STRING(22)		
    },
    PESOVARIAVEL: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    VLPAUTAICMS: {
      type: DataTypes.STRING(22)		
    },
    VLADICIONALBCST: {
      type: DataTypes.STRING(22)		
    },
    COMPRACONSIGNADO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    CODFISCALCONSIG: {
      type: DataTypes.STRING(22)		
    },
    PRAZOGARANTIA: {
      type: DataTypes.STRING(22)		
    },
    CONTROLANUMSERIE: {
      type: DataTypes.STRING(1)		
    },
    QTDEMAXSEPARPEDIDO: {
      type: DataTypes.STRING(22)		
    },
    PERCDESPFORANF: {
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
    EX_DOSEAMENTO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    EX_IMPUREZA: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    MARCA: {
      type: DataTypes.STRING(20)		
    },
    CONTROLANUMSERIA: {
      type: DataTypes.STRING(1)		
    },
    PVENDA: {
      type: DataTypes.STRING(22)		
    },
    DTULTALTERSRVPRC: {
      type: DataTypes.DATE		
    },
    EX_UMIDADE: {
      type: DataTypes.STRING(1)		
    },
    EX_COL95: {
      type: DataTypes.STRING(1)		
    },
    EX_SALMONELA: {
      type: DataTypes.STRING(1)		
    },
    EX_BOLORESLEVEDURAS: {
      type: DataTypes.STRING(1)		
    },
    EX_ESTFAUREAUS: {
      type: DataTypes.STRING(1)		
    },
    EX_MOFADO: {
      type: DataTypes.STRING(1)		
    },
    EX_TOTDEFEITO: {
      type: DataTypes.STRING(1)		
    },
    EX_VLCALORICO: {
      type: DataTypes.STRING(1)		
    },
    EX_PROTEINA: {
      type: DataTypes.STRING(1)		
    },
    EX_LIPIDEO: {
      type: DataTypes.STRING(1)		
    },
    EX_VOLPESMED: {
      type: DataTypes.STRING(1)		
    },
    EX_ANALISEDESC: {
      type: DataTypes.STRING(1)		
    },
    EX_UNIFORMIDADE: {
      type: DataTypes.STRING(1)		
    },
    EX_DISSOLUCAO: {
      type: DataTypes.STRING(1)		
    },
    EX_DESINTEGRACAO: {
      type: DataTypes.STRING(1)		
    },
    EX_FRIABILIDADE: {
      type: DataTypes.STRING(1)		
    },
    EX_IDENTIFICACAO: {
      type: DataTypes.STRING(1)		
    },
    EX_PESQPATOGENOS: {
      type: DataTypes.STRING(1)		
    },
    EX_CONTMICROBIANA: {
      type: DataTypes.STRING(1)		
    },
    EX_DENSIDADE: {
      type: DataTypes.STRING(1)		
    },
    EX_PH: {
      type: DataTypes.STRING(1)		
    },
    UNDPOREMBALAGEM: {
      type: DataTypes.STRING(22)		
    },
    PERCICMSDIFERIDO: {
      type: DataTypes.STRING(22)		
    },
    NUMDIASVALIDADEMIN: {
      type: DataTypes.STRING(22)		
    },
    PRECIFICESTRANGEIRA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERCSEGURO: {
      type: DataTypes.STRING(22)		
    },
    PERCDESPDENTRONF: {
      type: DataTypes.STRING(22)		
    },
    QTDMAXSEPARARPEDIDO: {
      type: DataTypes.STRING(22)		
    },
    FUNDAPIANO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    PERCDESCICMSDIF: {
      type: DataTypes.STRING(22)		
    },
    CODPRODDNF: {
      type: DataTypes.STRING(22)		
    },
    CAPVOLDNF: {
      type: DataTypes.STRING(22)		
    },
    FATORCONVDNF: {
      type: DataTypes.STRING(22)		
    },
    PERCALIQEXTGUIA: {
      type: DataTypes.STRING(22)		
    },
    CODPRODRELEV: {
      type: DataTypes.STRING(22)		
    },
    DTALTCUSTOFORNEC: {
      type: DataTypes.DATE		
    },
    CONTROLAPATRIMONIO: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    BASEPISCOFINSLITRAGEM: {
      type: DataTypes.STRING(22)		
    },
    VALORPISLITRAGEM: {
      type: DataTypes.STRING(22)		
    },
    VALORCOFINSLITRAGEM: {
      type: DataTypes.STRING(22)		
    },
    PISRETIDO: {
      type: DataTypes.STRING(22)		
    },
    COFINSRETIDO: {
      type: DataTypes.STRING(22)		
    },
    IRRETIDO: {
      type: DataTypes.STRING(22)		
    },
    CSLLRETIDO: {
      type: DataTypes.STRING(22)		
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
    VLRAPLICINT: {
      type: DataTypes.STRING(22),      	
    },
    VLIPI: {
      type: DataTypes.STRING(22)		
    },
    SITTRIBUTDEVFORNEC: {
      type: DataTypes.STRING(3)		
    },
    CODFISCALDEVFORNEC: {
      type: DataTypes.STRING(22)		
    },
    PRAZOMAXVENDA: {
      type: DataTypes.STRING(22)		
    },
    CATERGORIA: {
      type: DataTypes.STRING(2)		
    },
    CODLINHA: {
      type: DataTypes.STRING(22)		
    },
    PERCQUEBRAPRODUCAO: {
      type: DataTypes.STRING(22)		
    },
    PERMITEPRODUCAO: {
      type: DataTypes.STRING(1)		
    },
    LINHAPROD: {
      type: DataTypes.STRING(22)		
    },
    QTPRODUZIR: {
      type: DataTypes.STRING(22)		
    },
    APLICPERCIVAPAUTA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    INVENTARIOPARCIAL: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    APLICREDBASEIVAPLIQ: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    APLICREDBASEIVAPLIQBCR: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    DTINICONTLOTE: {
      type: DataTypes.DATE		
    },
    CLASSEFLOW: {
      type: DataTypes.STRING(6)		
    },
    CONCENTRACAO: {
      type: DataTypes.STRING(22)		
    },
    VLFRETEPORKG: {
      type: DataTypes.STRING(22)		
    },
    CODTRIBPISCOFINS: {
      type: DataTypes.STRING(22)		
    },
    PERCMVAORIG: {
      type: DataTypes.STRING(22)		
    },
    ASSINATURA: {
      type: DataTypes.STRING(255)		
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
    VLPAUTAPISCOFINSIMP: {
      type: DataTypes.STRING(22)		
    },
    USAPISCOFINSLITIMP: {
      type: DataTypes.STRING(1)		
    },
    BASEPISCOFINSLITIMP: {
      type: DataTypes.STRING(22)		
    },
    VLPISLITIMP: {
      type: DataTypes.STRING(22)		
    },
    VLCOFINSLITIMP: {
      type: DataTypes.STRING(22)		
    },
    CODSITTRIBPISCOFINS: {
      type: DataTypes.STRING(22)		
    },
    ROTINALANC: {
      type: DataTypes.STRING(48)		
    },
    SUGVENDA: {
      type: DataTypes.STRING(22),
      defaultValue: '0'	
    },
    GERAICMSLIVROFISCALDEVFORNEC: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    CODFISCALENTTV9: {
      type: DataTypes.STRING(22)		
    },
    LITRAGEM: {
      type: DataTypes.STRING(22)		
    },
    CODSITTRIBPISCOFINSDEV: {
      type: DataTypes.STRING(22)		
    },
    SITTRIBUTENT: {
      type: DataTypes.STRING(3)		
    },
    SITTRIBUTDEV: {
      type: DataTypes.STRING(3)		
    },
    DTEXPORTACAOWMS: {
      type: DataTypes.DATE		
    },
    DTIMPORTACAOWMS: {
      type: DataTypes.DATE		
    },
    CODNCMEX: {
      type: DataTypes.STRING(20)		
    },
    CODLINHANESTLE: {
      type: DataTypes.STRING(22)		
    },
    GTINCODAUXILIAR: {
      type: DataTypes.STRING(22)		
    },
    GTINCODAUXILIAR2: {
      type: DataTypes.STRING(22)		
    },
    CODEXCECAOPISCOFINS: {
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
    USAPMCBASEST: {
      type: DataTypes.STRING(1)		
    },
    PERCREDPMC: {
      type: DataTypes.STRING(22)		
    },
    SUBSTANCIA: {
      type: DataTypes.STRING(10)		
    },
    NUMCASASDECREDUCAOICMS: {
      type: DataTypes.STRING(22),
      defaultValue: '2'	
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
    CUSTOREPTABANT: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREPZFMANT: {
      type: DataTypes.STRING(22)		
    },
    PRECOMAXCONSUMTABANT: {
      type: DataTypes.STRING(22)		
    },
    PRECOMAXCONSUMZFMANT: {
      type: DataTypes.STRING(22)		
    },
    CODTABLIT: {
      type: DataTypes.STRING(2)		
    },
    CODGRULIT: {
      type: DataTypes.STRING(2)		
    },
    OSCOMODATO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    OBRIGAPREENCCONTRATO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    GERAOSAUTOMATIC: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    NUMSERVICO: {
      type: DataTypes.STRING(22)		
    },
    RESTRINGECOTACAO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    ATUPESOMASTERENT: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    VLPAUTAICMSANTEC: {
      type: DataTypes.STRING(22)		
    },
    IPIPORVALOR: {
      type: DataTypes.STRING(1)		
    },
    PERCCARGATRIBMEDIA: {
      type: DataTypes.STRING(22)		
    },
    CODLINHAPRAZO: {
      type: DataTypes.STRING(22)		
    },
    CODUSUULTALTCOM: {
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
    APLICACOES: {
      type: DataTypes.STRING(500)		
    },
    CALCCREDIPICONT: {
      type: DataTypes.STRING(1)		
    },
    APROVEITACREDICMSCONT: {
      type: DataTypes.STRING(1)		
    },
    APROVEITACREDPISCOFINSCONT: {
      type: DataTypes.STRING(1)		
    },
    GERABASEPISCOFINSSEMALIQ: {
      type: DataTypes.STRING(1)		
    },
    CODSITTRIBST: {
      type: DataTypes.STRING(2)		
    },
    PERCICMSBASEICMSANTECIPADO: {
      type: DataTypes.STRING(22)		
    },
    PERCIPISUSPENSO: {
      type: DataTypes.STRING(22)		
    },
    MYFROTA: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
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
    USALICENCAIMPORTACAO: {
      type: DataTypes.STRING(1)		
    },
    MULTIPLOCOMPRAS: {
      type: DataTypes.STRING(22)		
    },
    ENVIASNGPC: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
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
    VLIPISUSPENSO: {
      type: DataTypes.STRING(22)		
    },
    IDINTEGRACAOMYFROTA: {
      type: DataTypes.STRING(16),
      defaultValue: Sequelize.literal('SYS_GUID()')
    },
    ANP: {
      type: DataTypes.STRING(22)		
    },
    SITTRIBUT_SERVICO: {
      type: DataTypes.STRING(3)		
    },
    PERCOFINS_SERVICO: {
      type: DataTypes.STRING(22)		
    },
    PERPIS_SERVICO: {
      type: DataTypes.STRING(22)		
    },
    STATUSSUCATA: {
      type: DataTypes.STRING(22)		
    },
    DTULTATUPCOMPRA: {
      type: DataTypes.DATE		
    },
    CONSIISUSPENSOBASEICMS: {
      type: DataTypes.STRING(1)		
    },
    CONSIPISUSPENSOBASEICMS: {
      type: DataTypes.STRING(1)		
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
    COMISSAOSERVICOPRESTADO: {
      type: DataTypes.STRING(22)		
    },
    CODPRODFORNEC: {
      type: DataTypes.STRING(22)		
    },
    PRECIFICACAOAUTOMATICA: {
      type: DataTypes.STRING(2)		
    },
    CODFISCALCOCOMPRA: {
      type: DataTypes.STRING(22)		
    },
    CODFISCALCOREMESSA: {
      type: DataTypes.STRING(22)		
    },
    CODTIPOUSOMED: {
      type: DataTypes.STRING(22)		
    },
    CODTIPORECEIT: {
      type: DataTypes.STRING(22)		
    },
    CUSTOFORNECSEMST: {
      type: DataTypes.STRING(22)		
    },
    CUSTOPROXIMACOMPRASEMST: {
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
    IECTEREF: {
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
    NUMEROSSERIECONTROLADOS: {
      type: DataTypes.STRING(22),
      defaultValue: 0	
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
    CODFISCALDEVOPLOG: {
      type: DataTypes.STRING(22)		
    },
    CODFISCALENTOPLOG: {
      type: DataTypes.STRING(22)		
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
    PERCBONIFIC: {
      type: DataTypes.STRING(22)		
    },
    VERBADINPORPERC: {
      type: DataTypes.STRING(1)		
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
    VLADICIONALBCICMSANTECIP: {
      type: DataTypes.STRING(22)		
    },
    APLICPERCIVAPAUTAICMSANTECIP: {
      type: DataTypes.STRING(1)		
    },
    PERCICMSFRETEFOBICMSANTECIP: {
      type: DataTypes.STRING(22)		
    },
    PERCMVAORIGICMSANTECIP: {
      type: DataTypes.STRING(22)		
    },
    PERCCARGATRIBMEDIAICMSANTECIP: {
      type: DataTypes.STRING(22)		
    },
    REDBASEIVAICMSANTECIP: {
      type: DataTypes.STRING(22)		
    },
    REDBASEALIQEXTICMSANTECIP: {
      type: DataTypes.STRING(22)		
    },
    CODSALMED: {
      type: DataTypes.STRING(22)		
    },
    CONSIDERARICMSANTECIPCUSTOCONT: {
      type: DataTypes.STRING(1)		
    },
    FORMAESTERILIZACAO: {
      type: DataTypes.STRING(500)		
    },
    APLICAPERCREDALIQIPI: {
      type: DataTypes.STRING(1)		
    },
    PERCIISUSPENSO: {
      type: DataTypes.STRING(22)		
    },
    PERPISCALCDI: {
      type: DataTypes.STRING(22)		
    },
    PERCOFINSCALCDI: {
      type: DataTypes.STRING(22)		
    },
    ESTOQUEPORDTVALIDADE: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    PESOLIQDI: {
      type: DataTypes.STRING(22)		
    },
    IDINTEGRACAOCIASHOP: {
      type: DataTypes.STRING(250)		
    },
    ENVIAECOMMERCE: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    COMISSAOSERVICOFUNCIONARIO: {
      type: DataTypes.STRING(22)		
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
    GERAICMSLIVROFISCALENT: {
      type: DataTypes.STRING(1)		
    },
    UTILIZACREDREDPISCOFINS: {
      type: DataTypes.STRING(1)		
    },
    COMODATO: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    LINKFABRICANTE: {
      type: DataTypes.STRING(100)		
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
    CODCEST: {
      type: DataTypes.STRING(7)		
    },
    CODCESTDEV: {
      type: DataTypes.STRING(7)		
    },
    CODIGOCNAE: {
      type: DataTypes.STRING(22)		
    },
    TEMPOSERVICO: {
      type: DataTypes.STRING(22)		
    },
    TIPOSERVICOVINCULADORECEITA: {
      type: DataTypes.STRING(9)		
    },
    INCIDENCIACPRB: {
      type: DataTypes.STRING(8)		
    },
    PERCENTUALCPRB: {
      type: DataTypes.STRING(22)		
    },
    PERCENTUALINCIDENCIA: {
      type: DataTypes.STRING(22)		
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
    PERMITIRBROKERTV5: {
      type: DataTypes.STRING(1),
      defaultValue: 'S'	
    },
    VLFRETE: {
      type: DataTypes.STRING(22)		
    },
    ANTIDUMPING: {
      type: DataTypes.STRING(1)		
    },
    ENDERECAMENTOCUBAGEM: {
      type: DataTypes.STRING(1),
      defaultValue: 'N'	
    },
    DTULTALTCAD: {
      type: DataTypes.DATE		
    },
    CODFUNCULTALTCAD: {
      type: DataTypes.STRING(22)		
    },
    PERCFUNCEP: {
      type: DataTypes.STRING(22)		
    },
    PERCFECP: {
      type: DataTypes.STRING(22)		
    },
    PERCCSLL: {
      type: DataTypes.STRING(22)		
    },
    VLIPIPAUTATV10: {
      type: DataTypes.STRING(22)		
    },
    VLIPIPAUTATV10TAB: {
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
    PERCENTUALISS: {
      type: DataTypes.STRING(22)		
    },
    PESOBRUTOFRETE: {
      type: DataTypes.STRING(22)		
    },
    CODFISCALREMENTFUT: {
      type: DataTypes.STRING(22)		
    },
    CODFISCALENTENTFUT: {
      type: DataTypes.STRING(22)		
    },
    SITTRIBUTENTFUT: {
      type: DataTypes.STRING(3)		
    },
    PERCIVA2: {
      type: DataTypes.STRING(22)		
    },
    EMBVENDAECOMMERCEUNILEVER: {
      type: DataTypes.STRING(1),
      defaultValue: 'U'	
    },
    CODFISCALBENEFICSAIDA: {
      type: DataTypes.STRING(22)		
    },
    CODFISCALBENEFICRETORNO: {
      type: DataTypes.STRING(22)		
    },
    CODFISCALBENEFICENTRADA: {
      type: DataTypes.STRING(22)		
    },
    SITTRIBUTBENEFICSAIDA: {
      type: DataTypes.STRING(3)		
    },
    SITTRIBUTBENEFICRETORNO: {
      type: DataTypes.STRING(3)		
    },
    SITTRIBUTBENEFICENTRADA: {
      type: DataTypes.STRING(3)		
    },
    PERCICMSDESONERACAO: {
      type: DataTypes.STRING(22)		
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
    PERACRESCIMOIPI: {
      type: DataTypes.STRING(22)		
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
    UTILIZAMULTIPLICADOR: {
      type: DataTypes.STRING(1)		
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
    PGLI: {
      type: DataTypes.STRING(22)		
    },
    PGLN: {
      type: DataTypes.STRING(22)		
    },
    USAMAIORVALORPARACALCULOICMS: {
      type: DataTypes.STRING(1)		
    },
    USABASESTNOFCP: {
      type: DataTypes.STRING(1)		
    },
    UNIDADEPADRAO: {
      type: DataTypes.STRING(2)		
    },
    DESCRICAODINAMICA: {
      type: DataTypes.STRING(1000)		
    },
    TIPOINTEGRACAOB2B: {
      type: DataTypes.STRING(22)		
    },
    GRAMATURALICIT: {
      type: DataTypes.STRING(22)		
    },
    IDSOFITVIEW: {
      type: DataTypes.STRING(10)		
    },
    DTULTALTERSOFITVIEW: {
      type: DataTypes.DATE		
    },
    DTEXCLUSAOSOFITVIEW: {
      type: DataTypes.DATE		
    },
    CODMOTISENCAOANVISA: {
      type: DataTypes.STRING(255)		
    },
    USAICMSDESONERACAO: {
      type: DataTypes.STRING(1)		
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
    USABASEREDICMSPRESUMIDO: {
      type: DataTypes.STRING(1)		
    },
    NUMERO: {
      type: DataTypes.STRING(22)		
    },
    NUMEROCX: {
      type: DataTypes.STRING(22)		
    },
    ALIQUOTATCIF: {
      type: DataTypes.STRING(22)		
    },
    CLASSEVENDAQT: {
      type: DataTypes.STRING(1)		
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
    MSGCIRCULAR: {
      type: DataTypes.STRING(4000)		
    },
    MSGCIRCULAR_DTINI: {
      type: DataTypes.DATE		
    },
    MSGCIRCULAR_DTFIM: {
      type: DataTypes.DATE		
    },
    IONSYNC: {
      type: DataTypes.STRING(1)		
    },
    USAMAIORVALORPARACALCULOIPI: {
      type: DataTypes.STRING(1)		
    },
    DTALTERC5: {
      type: DataTypes.STRING(11)		
    },
    PERMITEMULTIPLICACAOPDV: {
      type: DataTypes.STRING(1)		
    },
    CUSTOREPANT2: {
      type: DataTypes.STRING(22)		
    },
    CUSTOREPANT3: {
      type: DataTypes.STRING(22)		
    },
  };

  static foreignsKeys = [{
    fields: ['CODFORNEC'],
    type: 'foreign key',
    references: { 
      table: PcFornec,
      field: 'CODFORNEC'
    }
  },{
    fields: ['CODEPTO'],
    type: 'foreign key',
    references: { 
      table: PcDepto,
      field: 'CODEPTO'
    }
  },{
    fields: ['CODSEC'],
    type: 'foreign key',
    references: { 
      table: PcSecao,
      field: 'CODSEC'
    }
  },{
    fields: ['CODMARCA'],
    type: 'foreign key',
    references: { 
      table: PcMarca,
      field: 'CODMARCA'
    }
  },{
    fields: ['CODCATEGORIA'],
    type: 'foreign key',
    references: { 
      table: PcCategoria,
      field: 'CODCATEGORIA'
    }
  },{
    fields: ['CODCATEGORIA'],
    type: 'foreign key',
    references: { 
      table: PcCategoria,
      field: 'CODCATEGORIA'
    }
  },{
    fields: ['CODLINHAPROD'],
    type: 'foreign key',
    references: { 
      table: PcLinhaProd,
      field: 'CODLINHAPROD'
    }
  },{
    fields: ['CODPRAZOENT'],
    type: 'foreign key',
    references: { 
      table: PcPrazo,
      field: 'CODPRAZOENT'
    }
  },{
    fields: ['CODDISTRIB'],
    type: 'foreign key',
    references: { 
      table: PcDistrib,
      field: 'CODDISTRIB'
    }
  }];  



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
  static async createData(params: any,returnRaw: boolean = true) {
    let queryParams = params.queryParams?.values || params.values || params.queryParams || params || {};
    let result = await this.create(queryParams,{returning:false}); //out of buffer
    result = await this.getOneByID(queryParams.CODPROD,{raw:returnRaw});
    return result;
  }
  static putData = this.createData;
  
};