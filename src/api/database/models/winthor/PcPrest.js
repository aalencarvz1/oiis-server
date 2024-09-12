'use strict';

/*imports*/
const { DataTypes, Sequelize } = require("sequelize");
const { BaseWinthorTableModel } = require('./BaseWinthorTableModel');
const { PcCob } = require("./PcCob");
const { DatabaseUtils } = require("../../../controllers/database/DatabaseUtils");
const { Utils } = require("../../../controllers/utils/Utils");

/**
 * class model
 */
class PcPrest extends BaseWinthorTableModel {
  static id = 30215;
  static tableName = this.name.toUpperCase();
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

  static foreignsKeys = [{
    fields: ['CODCOB'],
    type: 'foreign key',
    references: { 
        table: PcCob,
        field: 'CODCOB'
    }
  }];
 
  static async getAllWarePixCobs(queryParams) {
    let result = null;
    try {
      console.log(queryParams);
      queryParams = queryParams.queryParams || queryParams;
      queryParams = DatabaseUtils.prepareQueryParams(queryParams || {});      
      queryParams.include = queryParams.include || [];
      queryParams.include.push({
        model: PcCob.getModel(),
        required:true,
        raw:true,
        attributes:[],
        on:{
          [Sequelize.Op.and]: [
            Sequelize.where(Sequelize.col(`${PcCob.tableName}.CODCOB`),'=',Sequelize.col(`${PcPrest.tableName}.CODCOB`)),
            Sequelize.where(Sequelize.fn('coalesce',Sequelize.col(`${PcCob.tableName}.BOLETO`),'N'),'=',Sequelize.literal(`'N'`)),
            {
              CODCOB: {
                [Sequelize.Op.notIn] : ['DEP','DESD','ESTR','CANC'],        
              }
            },
            {
              CODCOB: {
                [Sequelize.Op.notLike] : '%BNF%',
              }
            },
            {
              CODCOB: {
                [Sequelize.Op.notLike] : '%DEV%',
              }
            }
          ]
        }
      });
      console.log(queryParams);
      queryParams.where.VALOR = {[Sequelize.Op.gt] : 0};
      result = await PcPrest.getModel().findAll(queryParams);
    } catch (e) {
      Utils.log(e);
    }    
    return result;
  }
  
};


module.exports = {PcPrest}