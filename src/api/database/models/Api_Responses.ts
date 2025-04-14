'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Api_Request_Calls  from "./Api_Request_Calls.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Api_Responses extends BaseTableModel {

  //table fields
  declare api_request_call_id: number;
  declare response_status_code: number;
  declare response: string;



  static id = 20005;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Api_Responses.getBaseTableModelFields(),...{            
      api_request_call_id: {
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      response_status_code: {
        type: DataTypes.INTEGER.UNSIGNED
      }, 
      response: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Api_Responses.getBaseTableModelConstraints() || []),...[]];

  static foreignsKeys : any[] = [];
    

  /**
   * get the foreign keys avoiding ciclyc imports on BaseTableModel
   * @override
   * @created 2025-04-14
   * @version 1.0.0
   */
  static getForeignKeys(): any[] {
    //Utils.logi(this.name,'getForeignKeys');
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
        fields: ['api_request_call_id'],
        type: 'foreign key',
        references: { 
            table: Api_Request_Calls,
            field: 'id'
        },    
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
      this.adjustedForeignKeys = newAdjustedForeignKeys;
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }


  /**
   * static initializer block
   */
  static {
    //Utils.logi(this.name,'STATIC');
    this.foreignsKeys = this.getForeignKeys();
    //Utils.logf(this.name,'STATIC');
  }
  
};