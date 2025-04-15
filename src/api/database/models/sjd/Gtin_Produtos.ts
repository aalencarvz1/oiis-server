'use strict';


import { DataTypes } from "sequelize";
import  BaseSjdTableModel  from "./BaseSjdTableModel.js";

/**
 * class model
 */
export default class Gtin_Produtos extends BaseSjdTableModel {

    //table fields
    declare CODPROD: number;
    declare UPDATED_GTIN_MASTER: number;
    declare UPDATED_GTIN_UN: number;
    declare UPDATED_AT: Date;


    static id = 39000;
    static tableName = this.name.toUpperCase();
    static model = null;


    static fields = {
        CODPROD:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true  
        },
        UPDATED_GTIN_MASTER:{
            type: DataTypes.INTEGER
        },
        UPDATED_GTIN_UN:{
            type: DataTypes.INTEGER
        },
        UPDATED_AT:{
            type: DataTypes.DATE
        }
    }    
    static foreignsKeys : any[] = [];
    
};