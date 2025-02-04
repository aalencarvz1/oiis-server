'use strict';


import { DataTypes } from "sequelize";
import  BaseSjdTableModel  from "./BaseSjdTableModel.js";

/**
 * class model
 */
export default class SjdTabpr_Origem_Log extends BaseSjdTableModel {

    //table fields
    declare CODITEMTABPR: number;
    declare CODORIGEMDADO: number;
    declare CODFILIALORIGEM: number;
    declare CODFILIAL_ERP: string;
    declare CODPRODORIGEM: number;
    declare CODPROD_ERP: number;
    declare CODREGIAOORIGEM: number;
    declare CODREGIAO_ERP: number;
    declare CODTIPOPESSOAORIGEM: number;
    declare CODTIPOPESSOA_ERP: number;
    declare CODGRUPOORIGEM: number;
    declare CODGRUPO_ERP: number;
    declare PCOMPRA1: number;
    declare PCOMPRA2: number;
    declare PCOMPRA3: number;
    declare PCOMPRA4: number;
    declare PCOMPRA5: number;
    declare PCOMPRA6: number;
    declare PCOMPRA7: number;
    declare PCOMPRA8: number;
    declare PERCDESCPCOMPRA1: number;
    declare PERCDESCPCOMPRA2: number;
    declare PERCDESCPCOMPRA3: number;
    declare PERCDESCPCOMPRA4: number;
    declare PERCDESCPCOMPRA5: number;
    declare PERCDESCPCOMPRA6: number;
    declare PERCDESCPCOMPRA7: number;
    declare PERCDESCPCOMPRA8: number;
    declare DTATUALIZACAO: Date;
    declare ATUALIZARPCOMPRA: number;
    declare QTENTRADA: number;
    declare VALOR: number;
    declare PERCDESC: number;
    declare VLDESCONTO: number;
    declare CODICMTAB: number;
    declare PCOMREP1: number;
    declare MARGEM: number;
    declare PERCCREDICMS: number;
    declare PERCPIS: number;
    declare PERCCOFINS: number;
    declare PERCCREDICMPRESUMIDO: number;
    declare PERCSUFRAMA: number;
    declare VLR_LIQ_COMPRA: number;
    declare VLCREDICMS: number;
    declare VLCREDPIS: number;
    declare VLCREDCOFINS: number;
    declare VLCREDPRESUMIDO: number;
    declare VLCREDSUFRAMA: number;
    declare QTEST: number;
    declare CUSTOFINATUAL: number;
    declare BASE_CUSTO_ENTRADA: number;
    declare CUSTO_FINANCEIRO: number;
    declare VLIMPOSTOSCMV: number;
    declare VLCOMISSAO: number;
    declare VLMARGEM: number;
    declare CMV: number;
    declare VLVENDA: number;
    declare VLBASESTENT: number;
    declare ICMSPROPRIO: number;
    declare VLR_CALCULO_ICMS_IVA: number;
    declare BASEST: number;
    declare ICMSST: number;
    declare ICMSRETENCAO: number;
    declare VLR_ENTRADA: number;
    declare CUSTO_ENTRADA: number;
    declare QTENTMEDIA: number;
    declare CODST: number;
    declare NUMREGIAO: number;
    declare DTIMPORTACAO: Date;
    declare CODSITUACAOREGISTRO: number;

    

    static id = 39103;
    static tableName = this.name.toUpperCase();
    static model = null;

    static noPrimaryKey = true;
    static removeAttr = 'id';

    static fields = {
        CODITEMTABPR:{
            type: DataTypes.INTEGER
        },
        CODORIGEMDADO:{
            type: DataTypes.INTEGER
        },
        CODFILIALORIGEM:{
            type: DataTypes.INTEGER
        },
        CODFILIAL_ERP:{
            type: DataTypes.STRING(2)
        },
        CODPRODORIGEM:{
            type: DataTypes.INTEGER
        },
        CODPROD_ERP:{
            type: DataTypes.INTEGER
        },
        CODREGIAOORIGEM:{
            type: DataTypes.INTEGER
        },
        CODREGIAO_ERP:{
            type: DataTypes.INTEGER
        },
        CODTIPOPESSOAORIGEM:{
            type: DataTypes.INTEGER
        },
        CODTIPOPESSOA_ERP:{
            type: DataTypes.INTEGER
        },
        CODGRUPOORIGEM:{
            type: DataTypes.INTEGER
        },
        CODGRUPO_ERP:{
            type: DataTypes.INTEGER
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
            type: DataTypes.INTEGER
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
            type: DataTypes.INTEGER
        },
        NUMREGIAO:{
            type: DataTypes.INTEGER
        },
        DTIMPORTACAO:{
            type: DataTypes.DATE
        },
        CODSITUACAOREGISTRO:{
            type: DataTypes.INTEGER
        },
    }    
    static foreignsKeys = [];
 
};