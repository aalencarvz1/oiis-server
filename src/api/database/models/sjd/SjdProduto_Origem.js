'use strict';

/*imports*/
const { DataTypes } = require("sequelize");
const { BaseSjdTableModel } = require("./BaseSjdTableModel");

/**
 * class model
 */
class SjdProduto_Origem extends BaseSjdTableModel {
  static id = 40100;
  static model = null;


  static fields = {
    CODPROD:{
        type: DataTypes.INTEGER(9),
        allowNull:false, 
        primaryKey: true
    },
    CODORIGEMDADO:{
        type: DataTypes.INTEGER(9)
    },
    CODPROD_NA_ORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODPROD_ERP:{
        type: DataTypes.INTEGER(9)
    },
    DESCRICAO:{
        type: DataTypes.STRING(200)
    },
    CODFORNECORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODFORNEC_ERP:{
        type: DataTypes.INTEGER(9)
    },
    CODEPTOORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODEPTO_ERP:{
        type: DataTypes.INTEGER(9)
    },
    CODUNIDADEORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODNEGOCIOORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODCATEGORIAORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODSUBCATEGORIA1ORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODSUBCATEGORIA2ORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    CODSUBCATEGORIA3ORIGEM:{
        type: DataTypes.INTEGER(9)
    },
    EXISTE_ERP:{
        type: DataTypes.INTEGER(1)
    },
    CODSITUACAOREGISTRO:{
        type: DataTypes.INTEGER(9)
    }
  }    
  static foreignsKeys = [];
 
};


module.exports = {SjdProduto_Origem}