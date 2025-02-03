'use strict';


import { DataTypes } from "sequelize";
import  BaseSjdTableModel  from "./BaseSjdTableModel.js";

/**
 * class model
 */
export default class SjdHistEst_Origem extends BaseSjdTableModel {

    //table fields
    declare CODHISTEST: number;
    declare CODORIGEMDADO: number;
    declare CODITEMEST: number;
    declare CODLOTEITEMEST: number;
    declare NUMTRANSENT: number;
    declare CODOPER: string;
    declare DTMOV: Date;
    declare QTMOV: number;

    
    static id = 39102;
    static tableName = this.name.toUpperCase();
    static model = null;


    static fields = {
        CODHISTEST: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true
        },
        CODORIGEMDADO: {
            type: DataTypes.BIGINT,
            allowNull: false,
            defaultValue: 1
        },
        CODITEMEST: {
            type: DataTypes.BIGINT,
            allowNull: false,
        },
        CODLOTEITEMEST: {
            type: DataTypes.BIGINT
        },
        NUMTRANSENT: {
            type: DataTypes.BIGINT
        },
        CODOPER: {
            type: DataTypes.STRING,
            allowNull: false
        },
        DTMOV: {
            type: DataTypes.DATE,
            allowNull: false
        },
        QTMOV: {
            type: DataTypes.DECIMAL(32,10),
            allowNull: false
        }
    }    
    static foreignsKeys = [];
 
};