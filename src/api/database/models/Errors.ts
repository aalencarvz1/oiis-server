'use strict';


import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Utils from "../../controllers/utils/Utils.js";



/**
 * class model
 */
export default class Errors extends BaseTableModel {

    //table fields
    declare id: number;
    declare object_type: string;
    declare object_name: string;
    declare line: string;
    declare code: string;
    declare message: string;
    declare data: string;

    static tableName = this.name.toLowerCase();
    static adjustedForeignKeys : boolean = false;
    
    static fields = {
        id: {
            type : DataTypes.BIGINT.UNSIGNED,                
            autoIncrement : true,
            primaryKey: true,               
            allowNull: false 
        },
        object_type: {
            type: DataTypes.STRING(255)
        },
        object_name: {
            type: DataTypes.STRING(255)
        },
        line: {
            type: DataTypes.STRING(255)
        },
        code: {
            type: DataTypes.STRING(255)
        },
        message: {
            type: DataTypes.STRING(2000)
        },
        data: {
            type: DataTypes.STRING(2000)
        }
    };
    static constraints = [];

    static foreignsKeys: any[];
};
