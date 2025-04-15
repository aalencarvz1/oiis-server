'use strict';


import { DataTypes } from "sequelize";
import  BaseTableModel  from './BaseTableModel.js';
import  Conditions  from "./Conditions.js";
import Utils from "../../controllers/utils/Utils.js";


/**
 * class model
 */
export default class Condition_Items extends BaseTableModel {

  //table fields
  declare condition_id: number;
  declare value: string;
  declare expression: string;


  static id = 7005;
  static tableName = this.name.toLowerCase();
  static adjustedForeignKeys : boolean = false;
  

  static fields = {
    ...Condition_Items.getBaseTableModelFields(),...{           
      condition_id:{
        type: DataTypes.BIGINT.UNSIGNED,
        allowNull:false
      },
      value:{
        type: DataTypes.TEXT
      },
      expression: {
        type: DataTypes.TEXT
      }      
    }
  };

  static constraints = [...(Condition_Items.getBaseTableModelConstraints() || []),...[]];


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
        fields: ['condition_id'],
        type: 'foreign key',
        references: { 
            table: Conditions,
            field: 'id'
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      });
    }
    //Utils.logf(this.name,'getForeignKeys');
    return result;
  }
};
