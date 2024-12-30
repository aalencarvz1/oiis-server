'use strict';

import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Tables  from "./Tables.js";


/**
 * class model
 */
export default class Logistic_Logs extends BaseTableModel {

    //table fields
    declare table_ref_id: number;       
    declare record_ref_id: number;
    declare operation: string;
    declare json_object: string;      
    declare column_name: string;
    declare old_value:  string;
    declare new_value:  string;
    declare latitude: number;
    declare longitude: number;
    declare observations: string;


    static id = 12100;
    static tableName = this.name.toLowerCase();
    
    static fields = {
        ...Logistic_Logs.getBaseTableModelFields(),...{    
            table_ref_id:{
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull:false
            },       
            record_ref_id:{
                type: DataTypes.BIGINT.UNSIGNED,
                allowNull:false
            },
            operation:{
                type: DataTypes.STRING(10),
                allowNull:false,
                defaultValue: 'UPDATE'
            },      
            json_object:{
                type: DataTypes.TEXT
            },      
            column_name:{
                type: DataTypes.STRING(256),
            },
            old_value: {
                type: DataTypes.TEXT,
            },
            new_value: {
                type: DataTypes.TEXT,
            },
            latitude:{
                type: DataTypes.DECIMAL(18,10)
            },
            longitude:{
                type: DataTypes.DECIMAL(18,10)
            },
            observations:{
                type: DataTypes.TEXT
            },
        }
    };
    
    static uniqueFields = [];

    static constraints = [...(Logistic_Logs.getBaseTableModelConstraints() || []),...[]];

    static foreignsKeys = [...(this.getBaseTableModelForeignsKeys()||[]),...[
        {
        fields: ['table_ref_id'],
        type: 'foreign key',
        references: { 
            table: Tables,
            field: 'id'
        },
        onUpdate: 'cascade'
        }
    ]];
  
};