'use strict';


import { DataTypes } from "sequelize";
import  BaseSjdTableModel  from "./BaseSjdTableModel.js";

/**
 * class model
 */
export default class SjdLogAnaliseEnt extends BaseSjdTableModel {

    //table fields
    declare DTENT: Date;
    declare CODFILIAL: number;
    declare CODPROD: number;
    declare DESCRICAO: string;
    declare CODNCMEX: string;
    declare NUMPED: number;
    declare NUMNOTA: number;
    declare NUMTRANSENT: number;
    declare NUMTRANSITEM: number;
    declare QT: number;
    declare PRECOULTENT: number;
    declare PRECOENT: number;
    declare VLST: number;
    declare PRECOTABORIGEM: number;
    declare FORNECEDORAURORA: number;
    declare CODFORNEC: number;
    declare FORNECEDOR: string;
    declare UFFORNEC: string;
    declare TIPOFORNEC: string;
    declare ROTINALANC: string;
    declare EQUIPLANC: string;
    declare FUNCLANC: string;
    declare PERCICMSNF: number;
    declare PERCICMSREDNF: number;
    declare PERCBASEREDNF: number;
    declare PERCICMSDIFERIDONF: number;
    declare PERCDESCICMSDIFERIDONF: number;
    declare PERCICMSRESULTANTENF: number;
    declare PERCIPINF: number;
    declare ALIQICMS1NF: number;
    declare ALIQICMS2NF: number;
    declare IVANF: number;
    declare PERCIVANF: number;
    declare BASEICMSSTNF: number;
    declare VLICMSNF: number;
    declare VLICMSSTNF: number;
    declare CODFISCALNF: number;
    declare SITTRIBUTNF: number;
    declare CODSTPISCOFINSNF: number;
    declare PERCPISNF: number;
    declare PERCCOFINSNF: number;
    declare PERCCREDICMSNF: number;
    declare CODFIGURA: number;
    declare PERCICMSFIG: number;
    declare PERCICMSREDFIG: number;
    declare PERCBASEREDFIG: number;
    declare PERCICMSDIFERIDOFIG: number;
    declare PERCDESCICMSDIFERIDOFIG: number;
    declare PERCICMSRESULTANTEFIG: number;
    declare PERCIPIFIG: number;
    declare ALIQICMS1FIG: number;
    declare ALIQICMS2FIG: number;
    declare IVAFIG: number;
    declare PERCIVAFIG: number;
    declare BASEICMSSTFIG: number;
    declare VLICMSFIG: number;
    declare VLICMSSTFIG: number;
    declare CODFISCALFIG: number;
    declare SITTRIBUTFIG: number;
    declare CODSTPISCOFINSFIG: number;
    declare PERCPISFIG: number;
    declare PERCCOFINSFIG: number;
    declare PERCCREDICMSFIG: number;
    declare OBSERVACOES: string;
    declare CODOPER: string;
    declare CODEXCECAOPISCOFINSFIG: number;
    declare IMPORTADO: number;
    declare NUMTRANSVENDAORIG: number;
    declare TEMDIVERGENCIATRIB: number;
    declare TEMDIVERGENCIAPRECO: number;
    declare TEMDIVERGENCIAPRECOTABFORNEC: number;
    declare BASEICMSFIG: number;
    declare BASEICMSNF: number;


    static id = 39110;
    static tableName = this.name.toUpperCase();
    static model = null;


    static fields = {
        DTENT: { 
            type: DataTypes.DATE 
        },
        CODFILIAL: { 
            type: DataTypes.INTEGER 
        },
        CODPROD: { 
            type: DataTypes.INTEGER 
        },
        DESCRICAO: { 
            type: DataTypes.STRING(200) 
        },
        CODNCMEX: { 
            type: DataTypes.STRING(20) 
        },
        NUMPED: { 
            type: DataTypes.INTEGER 
        },
        NUMNOTA: { 
            type: DataTypes.INTEGER 
        },
        NUMTRANSENT: { 
            type: DataTypes.INTEGER 
        },
        NUMTRANSITEM: { 
            type: DataTypes.INTEGER 
        },
        QT: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PRECOULTENT: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PRECOENT: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        VLST: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PRECOTABORIGEM: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        FORNECEDORAURORA: { 
            type: DataTypes.INTEGER 
        },
        CODFORNEC: { 
            type: DataTypes.INTEGER 
        },
        FORNECEDOR: { 
            type: DataTypes.STRING(200) 
        },
        UFFORNEC: { 
            type: DataTypes.STRING(2) 
        },
        TIPOFORNEC: { 
            type: DataTypes.STRING(1) 
        },
        ROTINALANC: { 
            type: DataTypes.STRING(50) 
        },
        EQUIPLANC: { 
            type: DataTypes.STRING(50) 
        },
        FUNCLANC: { 
            type: DataTypes.STRING(50) 
        },
        PERCICMSNF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCICMSREDNF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCBASEREDNF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCICMSDIFERIDONF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCDESCICMSDIFERIDONF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCICMSRESULTANTENF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCIPINF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        ALIQICMS1NF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        ALIQICMS2NF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        IVANF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCIVANF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        BASEICMSSTNF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        VLICMSNF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        VLICMSSTNF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        CODFISCALNF: { 
            type: DataTypes.INTEGER 
        },
        SITTRIBUTNF: { 
            type: DataTypes.INTEGER 
        },
        CODSTPISCOFINSNF: { 
            type: DataTypes.INTEGER 
        },
        PERCPISNF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCCOFINSNF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCCREDICMSNF: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        CODFIGURA: { 
            type: DataTypes.INTEGER 
        },
        PERCICMSFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCICMSREDFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCBASEREDFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCICMSDIFERIDOFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCDESCICMSDIFERIDOFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCICMSRESULTANTEFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCIPIFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        ALIQICMS1FIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        ALIQICMS2FIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        IVAFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCIVAFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        BASEICMSSTFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        VLICMSFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        VLICMSSTFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        CODFISCALFIG: { 
            type: DataTypes.INTEGER 
        },
        SITTRIBUTFIG: { 
            type: DataTypes.INTEGER 
        },
        CODSTPISCOFINSFIG: { 
            type: DataTypes.INTEGER 
        },
        PERCPISFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCCOFINSFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        PERCCREDICMSFIG: { 
            type: DataTypes.DECIMAL(18,10) 
        },
        OBSERVACOES: { 
            type: DataTypes.STRING(4000) 
        },
        CODOPER: { 
            type: DataTypes.STRING(100) 
        },
        CODEXCECAOPISCOFINSFIG: { 
            type: DataTypes.INTEGER 
        },
        IMPORTADO: { 
            type: DataTypes.INTEGER 
        },
        NUMTRANSVENDAORIG: { 
            type: DataTypes.INTEGER 
        },
        TEMDIVERGENCIATRIB: { 
            type: DataTypes.INTEGER 
        },
        TEMDIVERGENCIAPRECO: { 
            type: DataTypes.INTEGER 
        },
        TEMDIVERGENCIAPRECOTABFORNEC: { 
            type: DataTypes.INTEGER 
        },
        BASEICMSFIG: { 
            type: DataTypes.DECIMAL(18,6) 
        },
        BASEICMSNF: { 
            type: DataTypes.DECIMAL(18,6)
        }
    }    
    static foreignsKeys = [];
    
};