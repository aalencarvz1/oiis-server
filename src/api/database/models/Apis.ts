'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Apis extends BaseTableModel {

  //table fields
  declare name: string;
  declare default_method: string;
  declare default_end_point: string;            
  declare default_authorization:string; 
  declare default_request_params:string; 
  declare default_request_body_params:string; 
  declare default_webhook:string; 
  declare description: string;


  static id = 20000;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Apis.getBaseTableModelFields(),...{            
      name: {
        type: DataTypes.STRING(256),
        allowNull: false
      },
      default_method: {
        type: DataTypes.STRING(10),
      },
      default_end_point: {
        type: DataTypes.STRING(2000)
      },            
      default_authorization:{
        type: DataTypes.STRING(2000)
      }, 
      default_request_params:{
        type: DataTypes.TEXT
      }, 
      default_request_body_params:{
        type: DataTypes.TEXT
      }, 
      default_webhook:{
        type: DataTypes.STRING(2000)
      }, 
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [     
    'name'
  ];

  static constraints = [...(Apis.getBaseTableModelConstraints() || []),...[
    {
      name: Apis.tableName + '_u1',
      fields: [...Apis.getBaseTableModelUniqueFields(),...Apis.uniqueFields],
      type:"unique"
    }
  ]];

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