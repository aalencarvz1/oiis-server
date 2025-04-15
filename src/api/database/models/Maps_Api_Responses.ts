'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Maps_Api_Responses extends BaseTableModel {

  //table fields
  declare entity: string;
  declare entity_id: string;
  declare library: string;  
  declare request_params: string;  
  declare response_status_code: number;
  declare response_status: string; 
  declare response: string;
  declare response_expire_at: Date;


  static id = 20010;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Maps_Api_Responses.getBaseTableModelFields(),...{            
      entity: {
        type: DataTypes.STRING(255)
      },
      entity_id: {
        type: DataTypes.STRING(255)
      },
      library: {
        type: DataTypes.STRING(255)
      },
      request_params: {
        type: DataTypes.TEXT
      },
      response_status_code: {
        type: DataTypes.INTEGER.UNSIGNED
      }, 
      response_status: {
        type: DataTypes.STRING(255)
      }, 
      response: {
        type: DataTypes.TEXT
      },
      response_expire_at: {
        type: DataTypes.DATE
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Maps_Api_Responses.getBaseTableModelConstraints() || []),...[]];

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