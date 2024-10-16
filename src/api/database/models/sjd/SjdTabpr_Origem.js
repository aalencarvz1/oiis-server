'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseSjdTableModel } = require("./BaseSjdTableModel");

/**
 * class model
 */
class SjdTabpr_Origem extends BaseSjdTableModel {
  static id = 40111;
  static tableName = this.name.toUpperCase();
  static model = null;


  static fields = {
    CODITEMTABPR:{
        type: DataTypes.INTEGER(9),
        allowNull:false,
        primaryKey:true  
    },
    CODORIGEMDADO:{
        type: DataTypes.INTEGER(9)
    },
    CODFILIALORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODFILIAL_ERP:{
        type: DataTypes.STRING(2)
    },
    CODPRODORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODPROD_ERP:{
        type: DataTypes.INTEGER(9)
    },
    CODREGIAOORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODREGIAO_ERP:{
        type: DataTypes.INTEGER(9)
    },
    CODTIPOPESSOAORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODTIPOPESSOA_ERP:{
        type: DataTypes.INTEGER(9)
    },
    CODGRUPOORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODGRUPO_ERP:{
        type: DataTypes.INTEGER(9)
    },
    PCOMPRA1:{
        type: DataTypes.DECIMAL(18,10)
    },
    PCOMPRA2:{
        type: DataTypes.DECIMAL(18,10)
    },
    PCOMPRA3:{
        type: DataTypes.DECIMAL(18,10)
    },
    PCOMPRA4:{
        type: DataTypes.DECIMAL(18,10)
    },
    PCOMPRA5:{
        type: DataTypes.DECIMAL(18,10)
    },
    PCOMPRA6:{
        type: DataTypes.DECIMAL(18,10)
    },
    PCOMPRA7:{
        type: DataTypes.DECIMAL(18,10)
    },
    PCOMPRA8:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCDESCPCOMPRA1:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCDESCPCOMPRA2:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCDESCPCOMPRA3:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCDESCPCOMPRA4:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCDESCPCOMPRA5:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCDESCPCOMPRA6:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCDESCPCOMPRA7:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCDESCPCOMPRA8:{
        type: DataTypes.DECIMAL(18,10)
    },
    DTATUALIZACAO:{
        type: DataTypes.DATE
    },
    ATUALIZARPCOMPRA:{
        type: DataTypes.INTEGER(1)
    },
    QTENTRADA:{
        type: DataTypes.DECIMAL(18,10)
    },
    VALOR:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCDESC:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLDESCONTO:{
        type: DataTypes.DECIMAL(18,10)
    },
    CODICMTAB:{
        type: DataTypes.DECIMAL(18,10)
    },
    PCOMREP1:{
        type: DataTypes.DECIMAL(18,10)
    },
    MARGEM:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCCREDICMS:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCPIS:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCCOFINS:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCCREDICMPRESUMIDO:{
        type: DataTypes.DECIMAL(18,10)
    },
    PERCSUFRAMA:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLR_LIQ_COMPRA:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLCREDICMS:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLCREDPIS:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLCREDCOFINS:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLCREDPRESUMIDO:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLCREDSUFRAMA:{
        type: DataTypes.DECIMAL(18,10)
    },
    QTEST:{
        type: DataTypes.DECIMAL(18,10)
    },
    CUSTOFINATUAL:{
        type: DataTypes.DECIMAL(18,10)
    },
    BASE_CUSTO_ENTRADA:{
        type: DataTypes.DECIMAL(18,10)
    },
    CUSTO_FINANCEIRO:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLIMPOSTOSCMV:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLCOMISSAO:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLMARGEM:{
        type: DataTypes.DECIMAL(18,10)
    },
    CMV:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLVENDA:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLBASESTENT:{
        type: DataTypes.DECIMAL(18,10)
    },
    ICMSPROPRIO:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLR_CALCULO_ICMS_IVA:{
        type: DataTypes.DECIMAL(18,10)
    },
    BASEST:{
        type: DataTypes.DECIMAL(18,10)
    },
    ICMSST:{
        type: DataTypes.DECIMAL(18,10)
    },
    ICMSRETENCAO:{
        type: DataTypes.DECIMAL(18,10)
    },
    VLR_ENTRADA:{
        type: DataTypes.DECIMAL(18,10)
    },
    CUSTO_ENTRADA:{
        type: DataTypes.DECIMAL(18,10)
    },
    QTENTMEDIA:{
        type: DataTypes.DECIMAL(18,10)
    },
    CODST:{
        type: DataTypes.INTEGER(9)
    },
    NUMREGIAO:{
        type: DataTypes.INTEGER(9)
    },
    DTIMPORTACAO:{
        type: DataTypes.DATE
    },
    CODSITUACAOREGISTRO:{
        type: DataTypes.INTEGER(9)
    },
  }    
  static foreignsKeys = [];
 
};


module.exports = {SjdTabpr_Origem}