'use strict';


import { DataTypes } from "sequelize";
import  BaseSjdTableModel  from "./BaseSjdTableModel.js";

/**
 * class model
 */
export default class SjdProduto_Origem extends BaseSjdTableModel {

    //table fields
    declare CODPROD: number;
    declare CODORIGEMDADO: number;
    declare CODPROD_NA_ORIGEM: number;
    declare CODPROD_ERP: number;
    declare DESCRICAO: string;
    declare CODFORNECORIGEM: number;
    declare CODFORNEC_ERP: number;
    declare CODEPTOORIGEM: number;
    declare CODEPTO_ERP: number;
    declare CODUNIDADEORIGEM: number;
    declare CODNEGOCIOORIGEM: number;
    declare CODCATEGORIAORIGEM: number;
    declare CODSUBCATEGORIA1ORIGEM: number;
    declare CODSUBCATEGORIA2ORIGEM: number;
    declare CODSUBCATEGORIA3ORIGEM: number;
    declare EXISTE_ERP: number;
    declare CODSITUACAOREGISTRO: number;


    static id = 39100;
    static tableName = this.name.toUpperCase();
    static model = null;


    static fields = {
        CODPROD:{
            type: DataTypes.INTEGER,
            allowNull:false, 
            primaryKey: true
        },
        CODORIGEMDADO:{
            type: DataTypes.INTEGER
        },
        CODPROD_NA_ORIGEM:{
            type: DataTypes.INTEGER
        },
        CODPROD_ERP:{
            type: DataTypes.INTEGER
        },
        DESCRICAO:{
            type: DataTypes.STRING(200)
        },
        CODFORNECORIGEM:{
            type: DataTypes.INTEGER
        },
        CODFORNEC_ERP:{
            type: DataTypes.INTEGER
        },
        CODEPTOORIGEM:{
            type: DataTypes.INTEGER
        },
        CODEPTO_ERP:{
            type: DataTypes.INTEGER
        },
        CODUNIDADEORIGEM:{
            type: DataTypes.INTEGER
        },
        CODNEGOCIOORIGEM:{
            type: DataTypes.INTEGER
        },
        CODCATEGORIAORIGEM:{
            type: DataTypes.INTEGER
        },
        CODSUBCATEGORIA1ORIGEM:{
            type: DataTypes.INTEGER
        },
        CODSUBCATEGORIA2ORIGEM:{
            type: DataTypes.INTEGER
        },
        CODSUBCATEGORIA3ORIGEM:{
            type: DataTypes.INTEGER
        },
        EXISTE_ERP:{
            type: DataTypes.INTEGER
        },
        CODSITUACAOREGISTRO:{
            type: DataTypes.INTEGER
        }
    }    
    static foreignsKeys = [];
 
};