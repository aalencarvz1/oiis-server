'use strict';

import { DataTypes } from "sequelize";
import BaseTableModel from "./BaseTableModel.js";
import Languages from "./Languages.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Texts extends BaseTableModel {

  //table fields 
  declare language_id: number;
  declare text: string;


  static id = 249;
  static tableName = this.name.toLowerCase();
  private static adjustedForeignKeys : boolean = false;
  
  static fields = {
    ...Texts.getBaseTableModelFields(),...{     
      language_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull: false
      },
      text: {
        type: DataTypes.STRING(2000),
        allowNull:false
      }
    }
  };
  
  static uniqueFields = [];

  static constraints = [];


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
        fields: ['language_id'],
        type: 'foreign key',
        references: { 
            table: Languages,
            field: 'id'
        },
        onUpdate: 'cascade'
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
