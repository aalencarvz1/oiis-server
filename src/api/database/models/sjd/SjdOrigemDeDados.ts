'use strict';


import { DataTypes } from "sequelize";
import  BaseSjdTableModel  from "./BaseSjdTableModel.js";

/**
 * class model
 */
export default class SjdOrigemDeDados extends BaseSjdTableModel {

    //table fields
    declare CODORIGEMDADO: number;
    declare ORIGEM: string;


    static id = 39000;
    static tableName = this.name.toUpperCase();
    static model = null;


    static fields = {
        CODORIGEMDADO:{
            type: DataTypes.INTEGER,
            allowNull:false,
            primaryKey:true  
        },
        ORIGEM:{
            type: DataTypes.STRING(2000),
            allowNull:false
        }
    }    
    static foreignsKeys = [];
    
};