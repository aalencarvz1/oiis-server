'use strict';

import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Tables  from "./Tables.js";
import Utils from "../../controllers/utils/Utils.js";


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
    private static adjustedForeignKeys : boolean = false;
    
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


    static foreignsKeys : any[] = [];
    

    /**
     * get the foreign keys avoiding ciclyc imports on BaseTableModel
     * @override
     * @created 2025-04-14
     * @version 1.0.0
     */
    static getForeignKeys(): any[] {
      let result : any = this.foreignsKeys;
      if (!this.adjustedForeignKeys || !Utils.hasValue(this.foreignsKeys)) {
        result = [];
        let newAdjustedForeignKeys : boolean = true;
        let baseFks = this.getBaseTableModelForeignsKeys();
        for(let i = 0; i < baseFks.length; i++) {
          result.push(baseFks[i]);
          if (newAdjustedForeignKeys && typeof baseFks[i].references.table == 'string') newAdjustedForeignKeys = false;
        }        
        result.push({
            fields: ['table_ref_id'],
            type: 'foreign key',
            references: { 
                table: Tables,
                field: 'id'
            },
            onUpdate: 'cascade'
        });
        this.adjustedForeignKeys = newAdjustedForeignKeys;
      }
      return result;
    }
  
  
    /**
     * static initializer block
     */
    static {
      this.foreignsKeys = this.getForeignKeys();
    }
     
  
};