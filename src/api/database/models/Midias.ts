'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Tables  from "./Tables.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Midias extends BaseTableModel {

  //table fields
  declare table_ref_id:  number;    
  declare record_ref_id:  number;
  declare numeric_order: number;
  declare name: string;
  declare type: string;
  declare local_path: string;
  declare content_base64: string;
  declare description:  string;


  static id = 50000;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Midias.getBaseTableModelFields(),...{      
      table_ref_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },    
      record_ref_id: {
        type: DataTypes.BIGINT.UNSIGNED
      },
      numeric_order: {
        type: DataTypes.INTEGER
      },
      name:{
        type: DataTypes.STRING(256)
      },
      type:{
        type: DataTypes.STRING(256)
      },
      local_path:{
        type: DataTypes.TEXT
      },
      content_base64:{
        type: DataTypes.TEXT
      },
      description: {
        type: DataTypes.TEXT
      },
    }
  };
  
  static uniqueFields = [];

  static constraints = [...(Midias.getBaseTableModelConstraints() || []),...[]];


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
      result = super.getForeignKeys();
      result.push({
        fields: ['table_ref_id'],
        type: 'foreign key',
        references: { 
            table: Tables,
            field: 'id'
        },
        onUpdate: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }
  
};