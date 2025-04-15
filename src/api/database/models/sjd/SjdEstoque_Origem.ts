'use strict';


import { DataTypes } from "sequelize";
import  BaseSjdTableModel  from "./BaseSjdTableModel.js";

/**
 * class model
 */
export default class SjdEstoque_Origem extends BaseSjdTableModel {

    //table fields
    declare CODITEMEST: number;
    declare CODORIGEMDADO: number;
    declare CODFILIALORIGEM: number;
    declare CODFILIAL_ERP: number;
    declare CODPRODORIGEM: number;
    declare CODPROD_ERP: number;    
    declare CODFORNECDISPORIGEM: number;
    declare CODFORNECDISP_ERP: number;
    declare CODPESSOADISPORIGEM: number;
    declare CODPESSOADISP_ERP: number;
    declare CODENDERECODISPORIGEM: number;
    declare CODENDERECODISP_ERP: number;
    declare NUMLOTE: string;
    declare QTFISICO: number;
    declare QTGERENCIAL: number;
    declare QTCOMERCIAL: number;
    declare QTRESERVADA: number;
    declare QTPENDENTESAIDA: number;
    declare QTBLOQUEADA: number;
    declare QTAVARIADA: number;
    declare QTVENCIDA: number;
    declare QTAVENCERDENTROSEMANA: number;
    declare QTAVENCERDENTROQUINZENA: number;
    declare QTAVENCERDENTROMES: number;
    declare QTAVENCERDENTROBIMESTRE: number;
    declare QTAVENCERDENTROTRIMESTRE: number;
    declare QTAVENCERDENTROQUADRIMESTRE: number;
    declare QTAVENCERDENTROSEMESTRE: number;
    declare QTAVENCERDENTROANO: number;
    declare QTAVENCERMAISANO: number;
    declare QTINDISPONIVEL: number;
    declare QTMINIMA: number;
    declare QTTRANSMITIDO: number;
    declare FORMULACALCULODISPONIVEL: string;
    declare QTFISICODISPONIVEL: number;
    declare QTGERENCIALDISPONIVEL: number;
    declare QTCOMERCIALDISPONIVEL: number;
    declare DTVENCIEMNTO: Date;
    declare PERCDESC: number;
    declare DTULTENT: Date;
    declare SYNCED: number;
    declare CODSITUACAOREGISTRO: number;


    static id = 39101;
    static tableName = this.name.toUpperCase();
    static model = null;


    static fields = {
        CODITEMEST: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        CODORIGEMDADO: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 1
        },
        CODFILIALORIGEM: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 1
        },
        CODFILIAL_ERP: {
            type: DataTypes.BIGINT
        },
        CODPRODORIGEM: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        CODPROD_ERP: {
            type: DataTypes.BIGINT
        },
        CODFORNECDISPORIGEM: {
            type: DataTypes.BIGINT
        },
        CODFORNECDISP_ERP: {
            type: DataTypes.BIGINT
        },
        CODPESSOADISPORIGEM: {
            type: DataTypes.BIGINT
        },
        CODPESSOADISP_ERP: {
            type: DataTypes.BIGINT
        },
        CODENDERECODISPORIGEM: {
            type: DataTypes.BIGINT
        },
        CODENDERECODISP_ERP: {
            type: DataTypes.BIGINT
        },
        NUMLOTE: {
            type: DataTypes.TEXT,
        },
        QTFISICO: {
            type: DataTypes.DECIMAL(32,10),
            allowNull: false,
            defaultValue: 0
        },
        QTGERENCIAL: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTCOMERCIAL: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTRESERVADA: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTPENDENTESAIDA: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTBLOQUEADA: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTAVARIADA: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTVENCIDA: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTAVENCERDENTROSEMANA: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTAVENCERDENTROQUINZENA: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTAVENCERDENTROMES: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTAVENCERDENTROBIMESTRE: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTAVENCERDENTROTRIMESTRE: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTAVENCERDENTROQUADRIMESTRE: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTAVENCERDENTROSEMESTRE: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTAVENCERDENTROANO: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTAVENCERMAISANO: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTINDISPONIVEL: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTMINIMA: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTTRANSMITIDO: {
            type: DataTypes.DECIMAL(32,10),
        },
        FORMULACALCULODISPONIVEL: {
            type: DataTypes.TEXT,
        },
        QTFISICODISPONIVEL: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTGERENCIALDISPONIVEL: {
            type: DataTypes.DECIMAL(32,10),
        },
        QTCOMERCIALDISPONIVEL: {
            type: DataTypes.DECIMAL(32,10),
        },
        DTVENCIEMNTO: {
            type: DataTypes.DATE
        },
        PERCDESC: {
            type: DataTypes.DECIMAL(32,10),
        },
        DTULTENT: {
            type: DataTypes.DATE
        },
        SYNCED: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        CODSITUACAOREGISTRO: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        }
    }    
    static foreignsKeys : any[] = [];
 
};